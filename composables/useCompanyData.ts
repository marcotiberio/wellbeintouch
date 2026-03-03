import { createClient } from '@supabase/supabase-js'
import { computeScore, mode, STAGE_LABELS, DURATION_LABELS, type ReportRow } from '~/utils/scoring'
import { SEED_COMPANIES, INDUSTRY_MAP } from '~/utils/seedData'

export type RoleType = 'employee' | 'freelancer' | 'contractor'

export const ROLE_TYPE_LABELS: Record<RoleType, string> = {
  employee: 'Employee',
  freelancer: 'Freelancer',
  contractor: 'Contractor',
}

export interface Company {
  name: string
  industry: string
  ghosting: 'good' | 'warn' | 'bad'
  score: number
  reports: number
  stage: string
  duration: string
  roleType: RoleType
}

export type SortKey = 'score' | 'ghosting' | 'reports' | 'name'

const RATING_ORDER: Record<string, number> = { bad: 0, warn: 1, good: 2 }

export const LABELS: Record<string, string> = { good: 'Good', warn: 'Fair', bad: 'Poor' }

export function scoreClass(score: number): 'good' | 'warn' | 'bad' {
  return score >= 70 ? 'good' : score >= 45 ? 'warn' : 'bad'
}

/** Build Company[] from raw report rows + company metadata */
function buildCompanies(reports: ReportRow[], industryLookup: Record<string, string>): Company[] {
  // Group reports by company
  const grouped = new Map<string, ReportRow[]>()
  for (const r of reports) {
    const key = r.company_name
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(r)
  }

  const result: Company[] = []
  for (const [name, rows] of grouped) {
    const { score, ghosting } = computeScore(rows)
    const topStage = mode(rows.map((r) => r.stage))
    const topDuration = mode(rows.map((r) => r.duration))
    const topRoleType = mode(rows.map((r) => r.role_type)) as RoleType

    result.push({
      name,
      industry: industryLookup[name] ?? 'Other',
      score,
      ghosting,
      reports: rows.length,
      stage: STAGE_LABELS[topStage] ?? topStage,
      duration: DURATION_LABELS[topDuration] ?? topDuration,
      roleType: topRoleType,
    })
  }

  return result
}

export function useCompanyData() {
  const PAGE_SIZE = 10
  const sortKey = ref<SortKey>('score')
  const visibleCount = ref(PAGE_SIZE)

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabase?.url
  const supabaseKey = config.public.supabase?.anonKey

  // Reactive data source — starts with seed data, replaced by Supabase data if available
  const companies = ref<Company[]>(SEED_COMPANIES)

  // Fetch version counter (incremented to trigger refetch)
  const fetchVersion = useState<number>('company-data-version', () => 0)

  // Fetch live data from Supabase
  const fetchLive = async () => {
    if (!supabaseUrl || !supabaseKey) return

    try {
      const client = createClient(supabaseUrl, supabaseKey)

      // Fetch all reports and company metadata in parallel
      const [reportsRes, companiesRes] = await Promise.all([
        client.from('reports').select('*').order('created_at', { ascending: false }),
        client.from('companies').select('*'),
      ])

      if (reportsRes.error) throw reportsRes.error

      const reports: ReportRow[] = reportsRes.data ?? []

      // Build industry lookup from companies table + seed data
      const industryLookup: Record<string, string> = { ...INDUSTRY_MAP }
      if (companiesRes.data) {
        for (const c of companiesRes.data) {
          if (c.industry && c.industry !== 'Other') {
            industryLookup[c.name] = c.industry
          }
        }
      }

      if (reports.length > 0) {
        companies.value = buildCompanies(reports, industryLookup)
      }
      // If no reports yet, keep seed data as placeholder
    } catch (e) {
      console.warn('[WBIT] Supabase fetch failed, using seed data:', e)
      // Keep seed data — already set as default
    }
  }

  // Use useAsyncData for SSR-compatible fetching, keyed on version for refetch
  useAsyncData(
    `company-data-${fetchVersion.value}`,
    fetchLive,
    { watch: [fetchVersion] }
  )

  const sorted = computed(() => {
    const list = [...companies.value]
    switch (sortKey.value) {
      case 'score':
        list.sort((a, b) => b.score - a.score)
        break
      case 'ghosting':
        list.sort((a, b) => RATING_ORDER[a.ghosting] - RATING_ORDER[b.ghosting])
        break
      case 'reports':
        list.sort((a, b) => b.reports - a.reports)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    return list
  })

  const visible = computed(() => sorted.value.slice(0, visibleCount.value))
  const remaining = computed(() => sorted.value.length - visibleCount.value)
  const total = computed(() => sorted.value.length)

  function setSort(key: SortKey) {
    sortKey.value = key
    visibleCount.value = PAGE_SIZE
  }

  function loadMore() {
    visibleCount.value += PAGE_SIZE
  }

  /** Call after a new report is submitted to refresh the data */
  function refresh() {
    fetchVersion.value++
  }

  return {
    sorted,
    visible,
    remaining,
    total,
    sortKey,
    visibleCount,
    setSort,
    loadMore,
    refresh,
  }
}
