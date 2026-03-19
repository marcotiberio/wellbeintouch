export interface Company {
  name: string
  industry: string
  score: number
  reports: number
  stage: string
  duration: string
}

export type SortKey = 'score' | 'reports' | 'name'

export function scoreClass(score: number): 'good' | 'warn' | 'bad' {
  return score >= 50 ? 'bad' : score >= 20 ? 'warn' : 'good'
}

export function ghostCount(score: number): number {
  return Math.max(1, Math.min(5, Math.ceil(score / 20)))
}

export function ghostLabel(score: number): string {
  const labels = ['Barely ghosted', 'Left on read', 'Gone cold', 'Full phantom', 'Corporate Houdini']
  return labels[ghostCount(score) - 1]
}

export function ghostEmojis(score: number): string {
  return '👻'.repeat(ghostCount(score))
}

// Real reports — scoring model:
// Stage weights: application=15, 1st interview=30, further rounds=50, case study=70, final round=80, post-offer=95
// Duration multipliers: <1 week=×0.7, 1–2 weeks=×0.9, 1–2 months=×1.2, 2+ months=×1.5
// Score = stage × duration, capped at 100. Company score = average of all reports.

const COMPANIES: Company[] = [
  { name: 'Hunkemöller',        industry: 'Retail',       score: 11, reports: 1, stage: 'After application',    duration: '< 1 week' },
  { name: 'Adidas',             industry: 'Retail',       score: 14, reports: 1, stage: 'After application',    duration: '1–2 weeks' },
  { name: 'Craft',              industry: 'Recruiting Agency', score: 14, reports: 1, stage: 'After application', duration: '1–2 weeks' },
  { name: 'ING',                industry: 'Finance',      score: 14, reports: 1, stage: 'After application',    duration: '1–2 weeks' },
  { name: 'Ace & Tate',         industry: 'Retail',       score: 18, reports: 1, stage: 'After application',    duration: '1–2 months' },
  { name: 'Buck',               industry: 'Design Agency',score: 18, reports: 1, stage: 'After application',    duration: '1–2 months' },
  { name: 'Build in Amsterdam', industry: 'Design Agency',score: 18, reports: 1, stage: 'After application',    duration: '1–2 months' },
  { name: 'Did Another Thing',  industry: 'Design Agency',score: 18, reports: 1, stage: 'After application',    duration: '1–2 months' },
  { name: 'AKQA',               industry: 'Design Agency',score: 23, reports: 1, stage: 'After application',    duration: '2+ months' },
  { name: 'Gladia',             industry: 'Tech',         score: 23, reports: 1, stage: 'After application',    duration: '2+ months' },
  { name: 'Provoke Labs',       industry: 'Design Agency',score: 23, reports: 1, stage: 'After application',    duration: '2+ months' },
  { name: 'MODIFI',              industry: 'Fintech',      score: 36, reports: 1, stage: 'After 1st interview',  duration: '3–4 weeks' },
  { name: 'The July',           industry: 'Design Agency',score: 56, reports: 2, stage: 'After case study',     duration: '1–2 months' },
]

export function useCompanyData() {
  const PAGE_SIZE = 50
  const sortKey = ref<SortKey>('score')
  const visibleCount = ref(PAGE_SIZE)

  const sorted = computed(() => {
    const list = [...COMPANIES]
    switch (sortKey.value) {
      case 'score':
        list.sort((a, b) => b.score - a.score)
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

  return {
    sorted,
    visible,
    remaining,
    total,
    sortKey,
    visibleCount,
    setSort,
    loadMore,
  }
}
