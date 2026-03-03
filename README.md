# We'll Be In Touch

**wellbeintouch.fyi** — The Ghosting Index 👻

A public index scoring companies on how they treat candidates during hiring, with a focus on ghosting.

## Setup

```bash
# Install dependencies
npm install

# Prepare Nuxt (generates types, etc.)
npm run postinstall
```

## Development

```bash
# Start dev server at http://localhost:3000
npm run dev
```

## Build & Deploy

```bash
# Build for production (Vercel/Node)
npm run build

# Or generate static site
npm run generate

# Preview production build locally
npm run preview
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Vercel auto-detects Nuxt — no config needed
4. Set custom domain to `wellbeintouch.fyi`

## Project Structure

```
wellbeintouch/
├── app.vue                    # Root shell
├── pages/
│   └── index.vue              # Landing page — assembles all components
├── components/
│   ├── NavBar.vue             # Top navigation
│   ├── HeroSection.vue        # Hero headline + stats
│   ├── InsightQuote.vue       # Research quote block
│   ├── DimensionCards.vue     # 4 scoring dimensions
│   ├── CompanyIndex.vue       # Sortable company table
│   ├── BottomCta.vue          # Call to action
│   ├── MentalHealthSupport.vue # Support resources
│   ├── SiteFooter.vue         # Footer
│   └── ReportModal.vue        # Report form + validation + success
├── composables/
│   ├── useCompanyData.ts      # Company data + sorting logic
│   └── useReportModal.ts      # Modal open/close state
├── assets/css/
│   └── main.css               # Design tokens + base styles
├── nuxt.config.ts             # Nuxt config (modules, SEO, fonts)
└── tailwind.config.ts         # Tailwind with custom WBIT tokens
```

## Tech Stack

- **Nuxt 3** — Vue framework with SSR/SSG
- **Tailwind CSS** — utility styling (layout/spacing)
- **Custom CSS vars** — brand design tokens (colors, fonts)
- **Google Fonts** — Lora, DM Sans, DM Mono

## What's Next

- [ ] Connect Supabase for form submissions
- [ ] Add Sanity CMS for company data
- [ ] Write manifesto page
- [ ] Deploy to Vercel under wellbeintouch.fyi
