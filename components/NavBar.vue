<script setup lang="ts">
defineProps<{
  stats?: string[]
}>()
const { open } = useReportModal()
</script>

<template>
  <nav class="fade-in">
    <div class="nav-logo">We'll Be In Touch</div>
    <div class="nav-right">
      <div class="nav-meta">
        <span v-for="(s, i) in stats" :key="i">{{ s }}</span>
      </div>
      <button class="nav-cta" @click="open">File a report</button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--faint);
  background: var(--paper);
}
.nav-logo {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-meta {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: flex;
  gap: 24px;
}
.nav-cta {
  background: var(--green);
  color: #fff;
  border: none;
  padding: 10px 22px;
  font-family: var(--sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  border-radius: var(--radius);
  transition: background 0.15s, transform 0.08s;
}
.nav-cta:hover { background: #1e4433; }
.nav-cta:active { transform: translateY(1px); }

@media (max-width: 768px) {
  nav { padding: 16px 20px; }
  .nav-meta { display: none; }
}
</style>
