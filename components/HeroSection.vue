<script setup lang="ts">
const { open } = useReportModal()
defineProps<{
  content?: {
    heroHeadline?: string
    heroSubtext?: string
    heroCtaLabel?: string
    heroCtaNote?: string
  }
}>()
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <h1 class="fade-in fade-in-1">
        <em>They said</em><br>
        we'll be in touch (lol)
      </h1>
      <div class="hero-body fade-in fade-in-2">
        <div>
          <p class="hero-text">{{ content?.heroSubtext }}</p>
          <div class="hero-cta">
            <button class="btn-primary" @click="open">{{ content?.heroCtaLabel }}</button>
            <span class="btn-note" v-html="content?.heroCtaNote?.replace(/\\n/g, '<br />')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--paper);
  margin: 0 auto;
  padding: 6rem 3rem 5.5rem;
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
.hero-inner { 
  max-width: 1680px;
  margin: 0 auto;
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
  .hero { padding: 3.75rem 1.25rem 3.25rem; }
  .hero-body { grid-template-columns: 1fr; gap: 36px; }
  h1 { font-size: 3rem; }
}
</style>
