// Sanity schema — copy this into your Sanity Studio project
// e.g. sanity-studio/schemas/homePage.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      description: 'Main headline. Use line breaks as needed.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      description: 'Paragraph below the headline.',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaNote',
      title: 'Hero CTA Note',
      type: 'string',
      description: 'Small text next to the button, e.g. "Anonymous. No account. 2 minutes."',
    }),

    // ── Stats ──
    defineField({
      name: 'stats',
      title: 'Stats Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'accent', title: 'Use accent color?', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── Insight columns ──
    defineField({
      name: 'insightLeft',
      title: 'Insight — Left Column',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 5 }),
        defineField({ name: 'source', title: 'Source attribution', type: 'string' }),
      ],
    }),
    defineField({
      name: 'insightRight',
      title: 'Insight — Right Column',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 5 }),
      ],
    }),

    // ── Index section ──
    defineField({
      name: 'indexSubtitle',
      title: 'Index Section Subtitle',
      type: 'string',
      description: 'e.g. "The ghosting index 👻"',
    }),
    defineField({
      name: 'indexTitle',
      title: 'Index Section Title',
      type: 'string',
      description: 'e.g. "Who ghosts, and when (mockup data)"',
    }),

    // ── Bottom CTA ──
    defineField({
      name: 'bottomCtaText',
      title: 'Bottom CTA Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bottomCtaButton',
      title: 'Bottom CTA Button Label',
      type: 'string',
    }),

    // ── Mental health section ──
    defineField({
      name: 'supportTitle',
      title: 'Support Section Title',
      type: 'string',
    }),
    defineField({
      name: 'supportText',
      title: 'Support Section Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'supportLinks',
      title: 'Support Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'supportCrisisText',
      title: 'Crisis Line Text',
      type: 'string',
      description: 'e.g. "In crisis? Call 113 (NL)"',
    }),

    // ── Footer ──
    defineField({
      name: 'footerLeft',
      title: 'Footer Left Text',
      type: 'string',
    }),
    defineField({
      name: 'footerRight',
      title: 'Footer Right Text (italic)',
      type: 'string',
    }),

    // ── Nav ──
    defineField({
      name: 'navStats',
      title: 'Nav Stats',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short stat strings shown in the nav bar, e.g. "247 reports"',
      validation: (Rule) => Rule.max(3),
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
