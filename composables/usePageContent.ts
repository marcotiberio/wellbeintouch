import { createClient } from '@sanity/client'

const FALLBACK = {
  heroEyebrow: 'Hiring Process Transparency Index',
  heroHeadline: 'They said\nwe\'ll be\nin touch (lol)',
  heroSubtext: 'A public record of hiring processes — scored on what actually matters. How long it takes. How much of your time it costs. Whether they ever reply.',
  heroCtaLabel: 'File a report',
  heroCtaNote: 'Anonymous.\nNo account. 2 minutes.',
  stats: [
    { label: 'Records filed', value: '247', accent: true },
    { label: 'Companies indexed', value: '83', accent: true },
    { label: 'Candidates ghosted', value: '61%', accent: false },
    { label: 'Avg. time to reply', value: 'Never', accent: false },
  ],
  insightLeft: {
    label: 'Research note',
    text: 'Being ghosted after a job application violates fundamental psychological needs — the sense of belonging, self-esteem, and the need for closure. It leaves candidates in a state of unresolved uncertainty that the brain cannot process as a clean rejection. It is not a minor frustration. It is a documented harm.',
    source: 'Psychology Today, 2023 · Wood et al., University of Mississippi, 2023',
  },
  insightRight: {
    label: 'Notes to candidates',
    text: 'Your time has value. The average hiring process runs 44 days — longer for senior roles. 61% of candidates are ghosted before it\'s over. This platform scores companies on four parameters so you can decide whether applying is worth it before you find out the hard way.',
  },
  indexSubtitle: 'Ghosting index',
  indexTitle: 'Who ghosts, and when (mock data)',
  bottomCtaText: 'Every report you file contributes to a company\'s permanent public score. The more data, the clearer the picture becomes — for everyone who comes after you. It takes two minutes and requires no account.',
  bottomCtaButton: 'File a report',
  supportTitle: 'If the silence is getting to you',
  supportText: 'Being ghosted isn\'t a reflection of your worth — but your brain doesn\'t always know that. If the job search is affecting your sleep, your confidence, or your sense of self, consider talking to a professional. It\'s not dramatic. It\'s maintenance.',
  supportLinks: [
    { name: 'iPractice', description: 'Online therapy, low barrier · NL', url: 'https://www.ipractice.nl' },
    { name: 'OpenUp', description: 'Mental health support · NL / EU', url: 'https://www.openup.com' },
    { name: 'Find a therapist', description: 'Psychology Today directory · Global', url: 'https://www.psychologytoday.com/intl/counsellors' },
  ],
  supportCrisisText: 'In crisis? Call 113 (NL) or find your local helpline at findahelpline.com',
  footerLeft: 'wellbeintouch.fyi — The Ghosting Index 👻',
  footerRight: 'No recruiters were harmed. Several were named.',
  navStats: ['247 reports', '83 companies', 'Status: Open'],
}

const QUERY = `*[_type == "homePage"][0]{
  heroEyebrow,
  heroHeadline,
  heroSubtext,
  heroCtaLabel,
  heroCtaNote,
  stats[]{label, value, accent},
  insightLeft{label, text, source},
  insightRight{label, text},
  indexSubtitle,
  indexTitle,
  bottomCtaText,
  bottomCtaButton,
  supportTitle,
  supportText,
  supportLinks[]{name, description, url},
  supportCrisisText,
  footerLeft,
  footerRight,
  navStats
}`

export function usePageContent() {
  const config = useRuntimeConfig()
  const { projectId, dataset, apiVersion, useCdn } = config.public.sanity as {
    projectId: string
    dataset: string
    apiVersion: string
    useCdn: boolean
  }

  const sanityData = useState<Record<string, any> | null>('page-content', () => null)

  // Fetch CMS content on client side (fallback used for SSR)
  if (import.meta.client && projectId) {
    onNuxtReady(async () => {
      try {
        const client = createClient({ projectId, dataset, apiVersion, useCdn })
        const data = await client.fetch(QUERY)
        if (data) sanityData.value = data
      } catch (e) {
        console.warn('[WBIT] Sanity fetch failed, using fallback content:', e)
      }
    })
  }

  const content = computed(() => {
    const s = sanityData.value
    if (!s) return FALLBACK

    return {
      heroEyebrow: s.heroEyebrow || FALLBACK.heroEyebrow,
      heroHeadline: s.heroHeadline || FALLBACK.heroHeadline,
      heroSubtext: s.heroSubtext || FALLBACK.heroSubtext,
      heroCtaLabel: s.heroCtaLabel || FALLBACK.heroCtaLabel,
      heroCtaNote: s.heroCtaNote || FALLBACK.heroCtaNote,
      stats: s.stats?.length ? s.stats : FALLBACK.stats,
      insightLeft: s.insightLeft?.text ? s.insightLeft : FALLBACK.insightLeft,
      insightRight: s.insightRight?.text ? s.insightRight : FALLBACK.insightRight,
      indexSubtitle: s.indexSubtitle || FALLBACK.indexSubtitle,
      indexTitle: s.indexTitle || FALLBACK.indexTitle,
      bottomCtaText: s.bottomCtaText || FALLBACK.bottomCtaText,
      bottomCtaButton: s.bottomCtaButton || FALLBACK.bottomCtaButton,
      supportTitle: s.supportTitle || FALLBACK.supportTitle,
      supportText: s.supportText || FALLBACK.supportText,
      supportLinks: s.supportLinks?.length ? s.supportLinks : FALLBACK.supportLinks,
      supportCrisisText: s.supportCrisisText || FALLBACK.supportCrisisText,
      footerLeft: s.footerLeft || FALLBACK.footerLeft,
      footerRight: s.footerRight || FALLBACK.footerRight,
      navStats: s.navStats?.length ? s.navStats : FALLBACK.navStats,
    }
  })

  return { content }
}
