#!/usr/bin/env python3
"""
The Ghosting Index — Reddit Harvest Script
Scrapes r/recruitinghell and r/jobs for ghosting stories,
extracts structured data using Claude API, outputs to CSV.

Usage:
  1. pip install praw anthropic
  2. Set environment variables (see below)
  3. python reddit_harvest.py

Environment variables:
  REDDIT_CLIENT_ID     — from reddit.com/prefs/apps (create a "script" app)
  REDDIT_CLIENT_SECRET — from the same app registration
  REDDIT_USER_AGENT    — e.g. "ghosting-index-harvest/1.0"
  ANTHROPIC_API_KEY    — your Anthropic API key
"""

import os
import csv
import json
import time
import praw
import anthropic
from datetime import datetime

# ---------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------

SUBREDDITS = ["recruitinghell", "jobs"]
SEARCH_QUERIES = [
    "ghosted",
    "never heard back",
    "no response after interview",
    "ghosted after interview",
    "ghosted after applying",
    "ghosted after final round",
    "ghosted after case study",
    "no rejection",
    "radio silence after",
    "still waiting to hear back",
]
MAX_POSTS_PER_QUERY = 100  # Reddit API returns max 100 per listing
OUTPUT_FILE = "reddit_ghosting_harvest.csv"
EXTRACTION_MODEL = "claude-sonnet-4-5-20250514"
RATE_LIMIT_DELAY = 1.0  # seconds between Claude API calls


# ---------------------------------------------------------------------------
# EXTRACTION PROMPT
# ---------------------------------------------------------------------------

EXTRACTION_PROMPT = """You are extracting structured ghosting report data from a Reddit post about a hiring experience.

Analyze the post and extract the following fields. If a field cannot be determined from the text, use null.

Fields to extract:
- company_name: The name of the company that ghosted the candidate. Must be a real, identifiable company name (not "a company" or "this startup"). If no specific company is named, return null.
- role: The job role/title mentioned (e.g., "Software Engineer", "Marketing Manager"). If not mentioned, return null.
- role_type: One of: "employee", "freelancer", "contractor". Default to "employee" if not specified.
- stage: The stage at which ghosting occurred. Must be one of:
    - "application" — ghosted after submitting application
    - "first_interview" — ghosted after first interview/phone screen
    - "later_interview" — ghosted after 2nd+ round interviews
    - "unpaid_work" — ghosted after case study, take-home assignment, or unpaid trial
    - "final" — ghosted after final round interview
    - "post_offer" — ghosted after receiving or discussing an offer
- duration: How long the silence lasted. Must be one of:
    - "under_1w" — less than a week
    - "1_2w" — 1-2 weeks
    - "2_4w" — 2-4 weeks
    - "1_3m" — 1-3 months
    - "over_3m" — more than 3 months
    If the post says something like "it's been a month" or "weeks later", map to the closest option.
- notes: A brief (max 150 chars) summary of any notable details (e.g., "4 rounds of interviews over 2 months", "was told offer coming Monday"). If nothing notable, return null.
- confidence: Your confidence that this is a genuine, specific ghosting report with an identifiable company. One of: "high", "medium", "low".

Return ONLY valid JSON, no markdown, no explanation:
{
  "company_name": "string or null",
  "role": "string or null",
  "role_type": "employee|freelancer|contractor",
  "stage": "application|first_interview|later_interview|unpaid_work|final|post_offer",
  "duration": "under_1w|1_2w|2_4w|1_3m|over_3m",
  "notes": "string or null",
  "confidence": "high|medium|low"
}

If this post is NOT about being ghosted by a specific company during a hiring process (e.g., it's a meme, general advice, or rant without specifics), return:
{"skip": true, "reason": "brief reason"}

Reddit post title: {title}
Reddit post body: {body}
Subreddit: r/{subreddit}
"""


# ---------------------------------------------------------------------------
# REDDIT CLIENT
# ---------------------------------------------------------------------------

def init_reddit():
    """Initialize Reddit API client via PRAW."""
    return praw.Reddit(
        client_id=os.environ["REDDIT_CLIENT_ID"],
        client_secret=os.environ["REDDIT_CLIENT_SECRET"],
        user_agent=os.environ.get("REDDIT_USER_AGENT", "ghosting-index-harvest/1.0"),
    )


def fetch_posts(reddit):
    """Fetch ghosting-related posts from target subreddits."""
    seen_ids = set()
    posts = []

    for subreddit_name in SUBREDDITS:
        subreddit = reddit.subreddit(subreddit_name)
        print(f"\n--- Scraping r/{subreddit_name} ---")

        for query in SEARCH_QUERIES:
            print(f"  Searching: '{query}'")
            try:
                results = subreddit.search(query, sort="relevance", time_filter="all", limit=MAX_POSTS_PER_QUERY)
                count = 0
                for post in results:
                    if post.id not in seen_ids and not post.is_self == False:
                        seen_ids.add(post.id)
                        posts.append({
                            "id": post.id,
                            "subreddit": subreddit_name,
                            "title": post.title,
                            "body": (post.selftext or "")[:3000],  # truncate very long posts
                            "score": post.score,
                            "url": f"https://reddit.com{post.permalink}",
                            "created": datetime.utcfromtimestamp(post.created_utc).isoformat(),
                        })
                        count += 1
                print(f"    Found {count} new posts")
            except Exception as e:
                print(f"    Error: {e}")

    print(f"\nTotal unique posts collected: {len(posts)}")
    # Sort by score (most upvoted = most likely real stories)
    posts.sort(key=lambda p: p["score"], reverse=True)
    return posts


# ---------------------------------------------------------------------------
# LLM EXTRACTION
# ---------------------------------------------------------------------------

def extract_data(client, post):
    """Use Claude to extract structured ghosting data from a post."""
    prompt = EXTRACTION_PROMPT.format(
        title=post["title"],
        body=post["body"][:2500],
        subreddit=post["subreddit"],
    )

    try:
        response = client.messages.create(
            model=EXTRACTION_MODEL,
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}],
        )
        text = response.content[0].text.strip()

        # Clean potential markdown wrapping
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        return json.loads(text)

    except json.JSONDecodeError:
        print(f"  JSON parse error for post {post['id']}")
        return {"skip": True, "reason": "json_parse_error"}
    except Exception as e:
        print(f"  API error for post {post['id']}: {e}")
        return {"skip": True, "reason": str(e)}


# ---------------------------------------------------------------------------
# SCORING (mirrors the Ghosting Index algorithm)
# ---------------------------------------------------------------------------

STAGE_WEIGHTS = {
    "application": 15,
    "first_interview": 30,
    "later_interview": 50,
    "unpaid_work": 70,
    "final": 80,
    "post_offer": 95,
}

DURATION_MULTIPLIERS = {
    "under_1w": 0.7,
    "1_2w": 0.9,
    "2_4w": 1.0,
    "1_3m": 1.2,
    "over_3m": 1.5,
}


def calculate_score(stage, duration):
    """Calculate ghosting severity score (0-100, higher = worse)."""
    weight = STAGE_WEIGHTS.get(stage, 30)
    multiplier = DURATION_MULTIPLIERS.get(duration, 1.0)
    return min(round(weight * multiplier), 100)


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    # Validate env
    for var in ["REDDIT_CLIENT_ID", "REDDIT_CLIENT_SECRET", "ANTHROPIC_API_KEY"]:
        if var not in os.environ:
            print(f"ERROR: Missing environment variable {var}")
            print("See script header for setup instructions.")
            return

    reddit = init_reddit()
    claude = anthropic.Anthropic()

    # Step 1: Fetch posts
    print("=" * 60)
    print("STEP 1: Fetching Reddit posts...")
    print("=" * 60)
    posts = fetch_posts(reddit)

    if not posts:
        print("No posts found. Check your Reddit API credentials.")
        return

    # Step 2: Extract structured data
    print("\n" + "=" * 60)
    print("STEP 2: Extracting structured data via Claude...")
    print("=" * 60)

    results = []
    skipped = 0

    for i, post in enumerate(posts):
        print(f"  [{i+1}/{len(posts)}] Processing: {post['title'][:60]}...")

        data = extract_data(claude, post)
        time.sleep(RATE_LIMIT_DELAY)

        if data.get("skip"):
            skipped += 1
            continue

        if not data.get("company_name"):
            skipped += 1
            continue

        # Calculate score
        score = calculate_score(
            data.get("stage", "application"),
            data.get("duration", "2_4w"),
        )

        results.append({
            "company_name": data["company_name"],
            "role": data.get("role", ""),
            "role_type": data.get("role_type", "employee"),
            "stage": data.get("stage", "application"),
            "duration": data.get("duration", "2_4w"),
            "notes": data.get("notes", ""),
            "score": score,
            "confidence": data.get("confidence", "medium"),
            "source": "reddit",
            "source_url": post["url"],
            "source_subreddit": post["subreddit"],
            "source_score": post["score"],
            "source_date": post["created"],
        })

        print(f"    → {data['company_name']} | {data.get('stage')} | score={score} | conf={data.get('confidence')}")

    # Step 3: Write CSV
    print("\n" + "=" * 60)
    print(f"STEP 3: Writing results to {OUTPUT_FILE}")
    print("=" * 60)
    print(f"  Total posts processed: {len(posts)}")
    print(f"  Skipped (no company/not ghosting): {skipped}")
    print(f"  Usable reports extracted: {len(results)}")

    if results:
        fieldnames = [
            "company_name", "role", "role_type", "stage", "duration",
            "notes", "score", "confidence",
            "source", "source_url", "source_subreddit", "source_score", "source_date",
        ]
        with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(results)
        print(f"\n  ✓ Saved {len(results)} reports to {OUTPUT_FILE}")
        print(f"  Next step: review in Google Sheets, then run sheet_to_supabase.py")
    else:
        print("\n  No usable reports extracted. Try adjusting search queries.")

    # Summary stats
    if results:
        high_conf = sum(1 for r in results if r["confidence"] == "high")
        med_conf = sum(1 for r in results if r["confidence"] == "medium")
        companies = len(set(r["company_name"] for r in results))
        avg_score = sum(r["score"] for r in results) / len(results)
        print(f"\n  --- Summary ---")
        print(f"  Unique companies: {companies}")
        print(f"  Average score: {avg_score:.1f}")
        print(f"  High confidence: {high_conf} | Medium: {med_conf} | Low: {len(results) - high_conf - med_conf}")


if __name__ == "__main__":
    main()
