<script setup lang="ts">
defineProps<{
  content?: {
    heroEyebrow?: string
    heroHeadline?: string
    heroSubtext?: string
    heroCtaLabel?: string
    heroCtaNote?: string
    stats?: { label: string; value: string; accent: boolean }[]
  }
}>()
const { open } = useReportModal()
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-eyebrow fade-in fade-in-1">{{ content?.heroEyebrow }}</div>
      <h1 class="fade-in fade-in-2">
        They said<br />
        <em>we'll be in touch (lol)</em>
      </h1>
      <div class="hero-body fade-in fade-in-3">
        <div>
          <p class="hero-text">{{ content?.heroSubtext }}</p>
          <div class="hero-cta">
            <button class="btn-primary" @click="open">{{ content?.heroCtaLabel }}</button>
            <span class="btn-note" v-html="content?.heroCtaNote?.replace(/\\n/g, '<br />')" />
          </div>
        </div>
        <div class="hero-stats">
          <div v-for="(stat, i) in content?.stats" :key="i" class="stat-cell">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value" :class="{ accent: stat.accent }">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--paper);
  padding: 96px 48px 88px;
  border-bottom: 1px solid var(--faint);
  overflow: hidden;
  position: relative;
}
.hero::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(42,92,69,0.05) 0%, transparent 70%);
  top: -200px; right: -100px;
  pointer-events: none;
}
.hero-inner { max-width: 1440px; margin: 0 auto; }
.hero-eyebrow {
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--green);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
}
h1 {
  font-family: var(--serif);
  font-size: clamp(3rem, 6.5vw, 5.8rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 0;
}
h1 em {
  font-style: normal;
  color: var(--green);
}
.hero-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: end;
  margin-top: 52px;
}
.hero-text {
  font-size: 1.05rem;
  color: var(--muted);
  line-height: 1.8;
  max-width: 420px;
}
.hero-text strong { color: var(--ink); font-weight: 500; }
.hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--faint);
  border: 1px solid var(--faint);
  align-self: end;
}
.stat-cell {
  background: var(--paper);
  padding: 20px 22px;
}
.stat-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 6px;
}
.stat-value {
  font-family: var(--serif);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1;
}
.stat-value.accent { color: var(--green); }
.hero-cta {
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.btn-note {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .hero { padding: 60px 20px 52px; }
  .hero-body { grid-template-columns: 1fr; gap: 36px; }
  .hero-stats { grid-template-columns: 1fr 1fr; }
  h1 { font-size: 3rem; }
}
</style>
