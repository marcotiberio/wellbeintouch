import { u as useRuntimeConfig, d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

let _client = null;
function useSupabaseServer() {
  if (_client) return _client;
  const config = useRuntimeConfig();
  const url = config.public.supabase.url;
  const serviceRoleKey = config.supabase.serviceRoleKey;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server config (URL or service role key)");
  }
  _client = createClient(url, serviceRoleKey);
  return _client;
}

const VALID_ROLE_TYPES = ["employee", "freelancer", "contractor"];
const VALID_STAGES = ["application", "first_interview", "later_interview", "unpaid_work", "final", "post_offer"];
const VALID_DURATIONS = ["under_1w", "1_2w", "2_4w", "1_3m", "over_3m"];
function generateRefCode() {
  return "WBIT-" + String(Math.floor(Math.random() * 9e5) + 1e5);
}
const reports_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { company, role, roleType, stage, duration, notes } = body || {};
  if (!(company == null ? void 0 : company.trim())) throw createError({ statusCode: 400, message: "Company name is required" });
  if (!(role == null ? void 0 : role.trim())) throw createError({ statusCode: 400, message: "Role is required" });
  if (!VALID_ROLE_TYPES.includes(roleType)) throw createError({ statusCode: 400, message: "Invalid role type" });
  if (!VALID_STAGES.includes(stage)) throw createError({ statusCode: 400, message: "Invalid stage" });
  if (!VALID_DURATIONS.includes(duration)) throw createError({ statusCode: 400, message: "Invalid duration" });
  const supabase = useSupabaseServer();
  const refCode = generateRefCode();
  const { error: reportError } = await supabase.from("reports").insert({
    company_name: company.trim(),
    role: role.trim(),
    role_type: roleType,
    stage,
    duration,
    notes: (notes == null ? void 0 : notes.trim()) || null,
    ref_code: refCode
  });
  if (reportError) {
    if (reportError.code === "23505" && reportError.message.includes("ref_code")) {
      const retryCode = generateRefCode();
      const { error: retryError } = await supabase.from("reports").insert({
        company_name: company.trim(),
        role: role.trim(),
        role_type: roleType,
        stage,
        duration,
        notes: (notes == null ? void 0 : notes.trim()) || null,
        ref_code: retryCode
      });
      if (retryError) {
        throw createError({ statusCode: 500, message: "Failed to save report" });
      }
      await upsertCompany(supabase, company.trim());
      return { success: true, refCode: retryCode };
    }
    throw createError({ statusCode: 500, message: "Failed to save report" });
  }
  await upsertCompany(supabase, company.trim());
  return { success: true, refCode };
});
async function upsertCompany(supabase, name) {
  await supabase.from("companies").upsert({ name }, { onConflict: "name", ignoreDuplicates: true });
}

export { reports_post as default };
//# sourceMappingURL=reports.post.mjs.map
