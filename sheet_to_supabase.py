#!/usr/bin/env python3
"""
The Ghosting Index — Sheet-to-Supabase Sync
Reads a cleaned CSV (from Google Sheets export) and pushes reports to Supabase.

Usage:
  1. pip install supabase
  2. Set environment variables (see below)
  3. python sheet_to_supabase.py --file reddit_ghosting_harvest.csv

Environment variables:
  SUPABASE_URL         — your Supabase project URL
  SUPABASE_SERVICE_KEY — service role key (not anon key — we need insert perms)

CSV expected columns:
  company_name, role, role_type, stage, duration, notes, score
  (other columns like source, source_url etc. are optional and preserved)
"""

import os
import csv
import json
import argparse
import hashlib
from datetime import datetime

try:
    from supabase import create_client, Client
except ImportError:
    print("ERROR: Install supabase-py first: pip install supabase")
    exit(1)


# ---------------------------------------------------------------------------
# SCORING (same as reddit_harvest.py — kept in sync)
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


def generate_ref_code(row):
    """Generate a deterministic ref code from row data (prevents duplicates on re-run)."""
    seed = f"{row['company_name']}|{row.get('role', '')}|{row.get('stage', '')}|{row.get('source_url', '')}"
    hash_hex = hashlib.md5(seed.encode()).hexdigest()[:6].upper()
    return f"WBIT-{hash_hex}"


# ---------------------------------------------------------------------------
# GOOGLE FORM CSV MAPPING
# (for the original Google Form export — different column names & values)
# ---------------------------------------------------------------------------

STAGE_MAP_FROM_FORM = {
    "After I applied": "application",
    "After my first interview": "first_interview",
    "After multiple interview rounds": "later_interview",
    "After a case study or unpaid work": "unpaid_work",
    "After the final round": "final",
    "After I received (or was promised) an offer": "post_offer",
}

DURATION_MAP_FROM_FORM = {
    "Less than a week": "under_1w",
    "1-2 weeks": "1_2w",
    "2-4 weeks": "2_4w",
    "1-2 months": "1_3m",
    "2+ months": "over_3m",
}

ROLE_TYPE_MAP_FROM_FORM = {
    "As an employee": "employee",
    "As a freelancer": "freelancer",
    "As a contractor": "contractor",
}


def normalize_row(row):
    """
    Normalize a CSV row to our internal schema.
    Handles both:
      - Output from reddit_harvest.py (already normalized)
      - Export from the Google Form (needs mapping)
    """
    # Check if this is already in our normalized format
    if "stage" in row and row["stage"] in STAGE_WEIGHTS:
        return row  # Already normalized (from reddit_harvest.py)

    # Google Form export format
    normalized = {}

    # Company name
    normalized["company_name"] = (
        row.get("company_name")
        or row.get("Company name")
        or row.get("What company ghosted you?")
        or ""
    ).strip()

    # Role
    normalized["role"] = (
        row.get("role")
        or row.get("Role applied for")
        or row.get("What role did you apply for?")
        or ""
    ).strip()

    # Role type
    raw_role_type = (
        row.get("role_type")
        or row.get("Role type")
        or row.get("Were you applying as...")
        or "employee"
    ).strip()
    normalized["role_type"] = ROLE_TYPE_MAP_FROM_FORM.get(raw_role_type, raw_role_type.lower())

    # Stage
    raw_stage = (
        row.get("stage")
        or row.get("When did they go silent?")
        or row.get("At what stage did they ghost you?")
        or "application"
    ).strip()
    normalized["stage"] = STAGE_MAP_FROM_FORM.get(raw_stage, raw_stage)

    # Duration
    raw_duration = (
        row.get("duration")
        or row.get("How long before being ghosted?")
        or row.get("How long has it been since you heard from them?")
        or "2_4w"
    ).strip()
    normalized["duration"] = DURATION_MAP_FROM_FORM.get(raw_duration, raw_duration)

    # Notes
    normalized["notes"] = (
        row.get("notes")
        or row.get("Anything to add?")
        or row.get("Any additional details?")
        or ""
    ).strip()[:200]

    # Preserve source info if present
    for key in ["source", "source_url", "source_subreddit", "source_score", "source_date", "confidence"]:
        if key in row:
            normalized[key] = row[key]

    return normalized


# ---------------------------------------------------------------------------
# SUPABASE SYNC
# ---------------------------------------------------------------------------

def sync_to_supabase(supabase: Client, rows):
    """Insert reports into Supabase, upserting companies as needed."""
    companies_seen = set()
    inserted = 0
    skipped = 0
    errors = 0

    for i, raw_row in enumerate(rows):
        row = normalize_row(raw_row)

        if not row.get("company_name"):
            print(f"  [{i+1}] SKIP — no company name")
            skipped += 1
            continue

        company_name = row["company_name"]

        # Upsert company (if not already done this run)
        if company_name.lower() not in companies_seen:
            try:
                # Check if company exists
                existing = supabase.table("companies").select("id").eq("name", company_name).execute()
                if not existing.data:
                    supabase.table("companies").insert({
                        "name": company_name,
                        "industry": "Other",
                    }).execute()
                    print(f"  Created company: {company_name}")
                companies_seen.add(company_name.lower())
            except Exception as e:
                print(f"  Warning: company upsert for '{company_name}': {e}")

        # Calculate score
        score = calculate_score(row.get("stage", "application"), row.get("duration", "2_4w"))
        ref_code = generate_ref_code(row)

        # Insert report
        report = {
            "company_name": company_name,
            "role": row.get("role", ""),
            "role_type": row.get("role_type", "employee"),
            "stage": row.get("stage", "application"),
            "duration": row.get("duration", "2_4w"),
            "notes": row.get("notes", ""),
            "ref_code": ref_code,
        }

        try:
            # Check for duplicate ref_code
            existing = supabase.table("reports").select("id").eq("ref_code", ref_code).execute()
            if existing.data:
                print(f"  [{i+1}] SKIP (duplicate) — {company_name} | {ref_code}")
                skipped += 1
                continue

            supabase.table("reports").insert(report).execute()
            print(f"  [{i+1}] ✓ {company_name} — {row.get('stage')} — score {score} — {ref_code}")
            inserted += 1

        except Exception as e:
            print(f"  [{i+1}] ERROR — {company_name}: {e}")
            errors += 1

    return inserted, skipped, errors


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Sync ghosting reports from CSV to Supabase")
    parser.add_argument("--file", required=True, help="Path to CSV file")
    parser.add_argument("--dry-run", action="store_true", help="Parse and validate without inserting")
    parser.add_argument("--filter-confidence", choices=["high", "medium", "low"],
                       help="Only sync reports at or above this confidence level")
    args = parser.parse_args()

    # Validate env
    for var in ["SUPABASE_URL", "SUPABASE_SERVICE_KEY"]:
        if var not in os.environ:
            print(f"ERROR: Missing environment variable {var}")
            return

    # Read CSV
    print(f"Reading {args.file}...")
    with open(args.file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    print(f"  Found {len(rows)} rows")

    # Filter by confidence if requested
    if args.filter_confidence:
        confidence_order = {"high": 3, "medium": 2, "low": 1}
        min_conf = confidence_order[args.filter_confidence]
        rows = [r for r in rows if confidence_order.get(r.get("confidence", "medium"), 2) >= min_conf]
        print(f"  After confidence filter (>= {args.filter_confidence}): {len(rows)} rows")

    if not rows:
        print("No rows to process.")
        return

    if args.dry_run:
        print("\n--- DRY RUN ---")
        for i, raw_row in enumerate(rows):
            row = normalize_row(raw_row)
            score = calculate_score(row.get("stage", "application"), row.get("duration", "2_4w"))
            ref = generate_ref_code(row)
            print(f"  {row.get('company_name', '?'):30s} | {row.get('stage', '?'):20s} | {row.get('duration', '?'):8s} | score={score:3d} | {ref}")
        print(f"\n  Total: {len(rows)} reports ready to sync")
        return

    # Connect to Supabase
    print("\nConnecting to Supabase...")
    supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])

    # Sync
    print("\nSyncing reports...\n")
    inserted, skipped, errors = sync_to_supabase(supabase, rows)

    print(f"\n{'=' * 50}")
    print(f"  Inserted: {inserted}")
    print(f"  Skipped:  {skipped}")
    print(f"  Errors:   {errors}")
    print(f"{'=' * 50}")


if __name__ == "__main__":
    main()
