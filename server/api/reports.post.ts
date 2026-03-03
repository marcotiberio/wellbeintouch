import { useSupabaseServer } from '~/server/utils/supabase'

const VALID_ROLE_TYPES = ['employee', 'freelancer', 'contractor']
const VALID_STAGES = ['application', 'first_interview', 'later_interview', 'unpaid_work', 'final', 'post_offer']
const VALID_DURATIONS = ['under_1w', '1_2w', '2_4w', '1_3m', 'over_3m']

function generateRefCode(): string {
  return 'WBIT-' + String(Math.floor(Math.random() * 900000) + 100000)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  const { company, role, roleType, stage, duration, notes } = body || {}

  if (!company?.trim()) throw createError({ statusCode: 400, message: 'Company name is required' })
  if (!role?.trim()) throw createError({ statusCode: 400, message: 'Role is required' })
  if (!VALID_ROLE_TYPES.includes(roleType)) throw createError({ statusCode: 400, message: 'Invalid role type' })
  if (!VALID_STAGES.includes(stage)) throw createError({ statusCode: 400, message: 'Invalid stage' })
  if (!VALID_DURATIONS.includes(duration)) throw createError({ statusCode: 400, message: 'Invalid duration' })

  const supabase = useSupabaseServer()
  const refCode = generateRefCode()

  // Insert the report
  const { error: reportError } = await supabase
    .from('reports')
    .insert({
      company_name: company.trim(),
      role: role.trim(),
      role_type: roleType,
      stage,
      duration,
      notes: notes?.trim() || null,
      ref_code: refCode,
    })

  if (reportError) {
    // Handle duplicate ref code (very unlikely) — retry once
    if (reportError.code === '23505' && reportError.message.includes('ref_code')) {
      const retryCode = generateRefCode()
      const { error: retryError } = await supabase
        .from('reports')
        .insert({
          company_name: company.trim(),
          role: role.trim(),
          role_type: roleType,
          stage,
          duration,
          notes: notes?.trim() || null,
          ref_code: retryCode,
        })
      if (retryError) {
        throw createError({ statusCode: 500, message: 'Failed to save report' })
      }
      // Upsert company
      await upsertCompany(supabase, company.trim())
      return { success: true, refCode: retryCode }
    }
    throw createError({ statusCode: 500, message: 'Failed to save report' })
  }

  // Upsert company into companies table (for industry metadata)
  await upsertCompany(supabase, company.trim())

  return { success: true, refCode }
})

async function upsertCompany(supabase: ReturnType<typeof useSupabaseServer>, name: string) {
  await supabase
    .from('companies')
    .upsert({ name }, { onConflict: 'name', ignoreDuplicates: true })
}
