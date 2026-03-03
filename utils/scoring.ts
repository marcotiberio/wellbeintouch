export const STAGE_WEIGHTS: Record<string, number> = {
  application: 1.0,
  first_interview: 1.3,
  later_interview: 1.5,
  unpaid_work: 1.8,
  final: 2.0,
  post_offer: 2.2,
}

export const DURATION_MULTIPLIERS: Record<string, number> = {
  under_1w: 0.8,
  '1_2w': 1.0,
  '2_4w': 1.2,
  '1_3m': 1.5,
  over_3m: 1.8,
}

export interface ReportRow {
  company_name: string
  role: string
  role_type: string
  stage: string
  duration: string
  notes: string | null
  ref_code: string
  created_at: string
}

export function computeScore(reports: ReportRow[]): {
  score: number
  ghosting: 'good' | 'warn' | 'bad'
} {
  if (reports.length === 0) return { score: 50, ghosting: 'warn' }

  const penalties = reports.map((r) => {
    const stageW = STAGE_WEIGHTS[r.stage] ?? 1.0
    const durM = DURATION_MULTIPLIERS[r.duration] ?? 1.0
    return stageW * durM
  })

  const avg = penalties.reduce((a, b) => a + b, 0) / penalties.length
  const raw = 100 - avg * 20
  const score = Math.round(Math.max(0, Math.min(100, raw)))
  const ghosting = score >= 70 ? 'good' : score >= 45 ? 'warn' : 'bad'

  return { score, ghosting }
}

/** Returns the most common value in an array */
export function mode<T>(arr: T[]): T {
  const counts = new Map<T, number>()
  for (const v of arr) counts.set(v, (counts.get(v) ?? 0) + 1)
  let best = arr[0]
  let max = 0
  for (const [v, c] of counts) {
    if (c > max) { best = v; max = c }
  }
  return best
}

/** Human-readable stage labels */
export const STAGE_LABELS: Record<string, string> = {
  application: 'After application',
  first_interview: 'After 1st interview',
  later_interview: 'After further rounds',
  unpaid_work: 'After unpaid work',
  final: 'After final round',
  post_offer: 'Post-offer',
}

/** Human-readable duration labels */
export const DURATION_LABELS: Record<string, string> = {
  under_1w: '< 1 week',
  '1_2w': '1–2 weeks',
  '2_4w': '2–4 weeks',
  '1_3m': '1–3 months',
  over_3m: '3+ months',
}
