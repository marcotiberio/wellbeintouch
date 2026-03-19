# The Ghosting Index — Data Harvest Pipeline

Two scripts to bulk-collect ghosting data from Reddit and sync it to Supabase.

## Pipeline

```
Reddit (r/recruitinghell, r/jobs)
    ↓  reddit_harvest.py
CSV (reddit_ghosting_harvest.csv)
    ↓  upload to Google Sheets, review & clean
Google Sheet (cleaned)
    ↓  export as CSV
    ↓  sheet_to_supabase.py
Supabase (reports + companies tables)
```

---

## Step 1: Reddit Harvest

### Setup (one-time)

1. **Create a Reddit app** at https://reddit.com/prefs/apps
   - Click "create another app..."
   - Type: **script**
   - Name: `ghosting-index-harvest`
   - Redirect URI: `http://localhost:8080` (required but unused)
   - Note the **client ID** (under the app name) and **secret**

2. **Install dependencies**
   ```bash
   pip install praw anthropic
   ```

3. **Set environment variables**
   ```bash
   export REDDIT_CLIENT_ID="your_client_id"
   export REDDIT_CLIENT_SECRET="your_secret"
   export REDDIT_USER_AGENT="ghosting-index-harvest/1.0"
   export ANTHROPIC_API_KEY="your_api_key"
   ```

### Run

```bash
python reddit_harvest.py
```

This will:
- Search 10 ghosting-related queries across 2 subreddits
- Deduplicate posts (by Reddit post ID)
- Send each post to Claude for structured extraction
- Output `reddit_ghosting_harvest.csv`

**Expected output:** 200-500 usable reports from ~1000 posts.

**Cost estimate:** ~$2-5 in Claude API calls (Sonnet, ~500 posts × ~500 tokens each).

### Review

Open the CSV in Google Sheets. Review and clean:
- Remove low-confidence rows (`confidence` = "low")
- Fix company name typos / normalize (e.g., "Amazon" vs "Amazon Web Services")
- Remove duplicates (same company + same story from different posts)
- Remove anything that looks fake or satirical
- Export cleaned version as CSV

---

## Step 2: Sync to Supabase

### Prerequisites

- Supabase project with the Ghosting Index schema (see MVP Blueprint)
- Service role key (not anon key)

### Setup

```bash
pip install supabase
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_KEY="your_service_role_key"
```

### Dry run (preview without inserting)

```bash
python sheet_to_supabase.py --file reddit_ghosting_harvest_cleaned.csv --dry-run
```

### Sync only high-confidence reports

```bash
python sheet_to_supabase.py --file reddit_ghosting_harvest_cleaned.csv --filter-confidence high
```

### Full sync

```bash
python sheet_to_supabase.py --file reddit_ghosting_harvest_cleaned.csv
```

The script:
- Auto-normalizes column names (handles both Reddit harvest format AND Google Form export format)
- Creates companies that don't exist yet
- Generates deterministic ref codes (safe to re-run without duplicates)
- Calculates scores using the Ghosting Index algorithm

---

## Also works with Google Form exports

The sync script auto-detects Google Form CSV exports (the original 13 reports).
Just export the Google Sheet as CSV and run:

```bash
python sheet_to_supabase.py --file "Form Responses 1.csv"
```

It maps form fields like "When did they go silent?" → `stage` enum values automatically.

---

## CSV Schema

| Column | Type | Description |
|--------|------|-------------|
| company_name | string | Company that ghosted |
| role | string | Job role applied for |
| role_type | enum | employee / freelancer / contractor |
| stage | enum | application / first_interview / later_interview / unpaid_work / final / post_offer |
| duration | enum | under_1w / 1_2w / 2_4w / 1_3m / over_3m |
| notes | string | Brief detail (max 200 chars) |
| score | int | Calculated ghosting severity (0-100) |
| confidence | enum | high / medium / low (from LLM extraction) |
| source | string | "reddit" or "google_form" |
| source_url | string | Link to original Reddit post |
