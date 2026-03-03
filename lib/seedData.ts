import type { Company } from '~/composables/useCompanyData'

export const SEED_COMPANIES: Company[] = [
  { name: 'Booking.com',           industry: 'Tech / SaaS',            ghosting: 'good', score: 81, reports: 18, stage: 'After application',    duration: '2–4 weeks',  roleType: 'employee' },
  { name: 'DEPT®',                 industry: 'Design Agency',          ghosting: 'good', score: 74, reports: 9,  stage: 'After 1st interview',  duration: '1–2 weeks',  roleType: 'freelancer' },
  { name: 'Adyen',                 industry: 'Finance',                ghosting: 'good', score: 88, reports: 14, stage: 'After application',    duration: '1–2 weeks',  roleType: 'employee' },
  { name: 'ING Group',             industry: 'Finance',                ghosting: 'warn', score: 52, reports: 22, stage: 'After further rounds', duration: '1–3 months', roleType: 'contractor' },
  { name: 'Coolblue',              industry: 'Retail / E-commerce',    ghosting: 'good', score: 79, reports: 11, stage: 'After 1st interview',  duration: '2–4 weeks',  roleType: 'employee' },
  { name: 'Randstad',              industry: 'Recruitment / Staffing', ghosting: 'bad',  score: 24, reports: 31, stage: 'After unpaid work',    duration: '3+ months',  roleType: 'freelancer' },
  { name: 'Philips',               industry: 'Healthcare',             ghosting: 'warn', score: 49, reports: 16, stage: 'After further rounds', duration: '1–3 months', roleType: 'employee' },
  { name: 'WeTransfer',            industry: 'Tech / SaaS',            ghosting: 'good', score: 85, reports: 7,  stage: 'After application',    duration: '< 1 week',   roleType: 'employee' },
  { name: 'Takeaway.com',          industry: 'Tech / SaaS',            ghosting: 'bad',  score: 19, reports: 27, stage: 'After unpaid work',    duration: '3+ months',  roleType: 'contractor' },
  { name: 'NS (Dutch Rail)',       industry: 'Other',                  ghosting: 'bad',  score: 33, reports: 12, stage: 'After further rounds', duration: '1–3 months', roleType: 'employee' },
  { name: 'Heineken',              industry: 'Other',                  ghosting: 'warn', score: 61, reports: 8,  stage: 'After 1st interview',  duration: '2–4 weeks',  roleType: 'employee' },
  { name: 'Bol.com',               industry: 'Retail / E-commerce',    ghosting: 'good', score: 76, reports: 19, stage: 'After application',    duration: '2–4 weeks',  roleType: 'employee' },
  { name: 'TomTom',                industry: 'Tech / SaaS',            ghosting: 'bad',  score: 28, reports: 15, stage: 'After final round',    duration: '1–3 months', roleType: 'freelancer' },
  { name: 'IKEA Netherlands',      industry: 'Retail / E-commerce',    ghosting: 'good', score: 83, reports: 21, stage: 'After application',    duration: '1–2 weeks',  roleType: 'employee' },
  { name: 'Accenture NL',          industry: 'Consulting',             ghosting: 'bad',  score: 31, reports: 24, stage: 'After unpaid work',    duration: '3+ months',  roleType: 'contractor' },
  { name: 'Flow Commerce',         industry: 'Tech / SaaS',            ghosting: 'good', score: 67, reports: 5,  stage: 'After 1st interview',  duration: '2–4 weeks',  roleType: 'freelancer' },
  { name: 'Nationale-Nederlanden', industry: 'Finance',                ghosting: 'bad',  score: 38, reports: 13, stage: 'After further rounds', duration: '1–3 months', roleType: 'employee' },
  { name: 'Bunq',                  industry: 'Finance',                ghosting: 'good', score: 90, reports: 6,  stage: 'After application',    duration: '< 1 week',   roleType: 'employee' },
  { name: 'Nikon Europe',          industry: 'Other',                  ghosting: 'bad',  score: 21, reports: 9,  stage: 'After final round',    duration: '3+ months',  roleType: 'freelancer' },
  { name: 'KPN',                   industry: 'Tech / SaaS',            ghosting: 'bad',  score: 35, reports: 17, stage: 'After further rounds', duration: '1–3 months', roleType: 'contractor' },
]

/** Map company name → industry for known companies */
export const INDUSTRY_MAP: Record<string, string> = Object.fromEntries(
  SEED_COMPANIES.map((c) => [c.name, c.industry])
)
