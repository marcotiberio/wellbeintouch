<script setup lang="ts">
const { open } = useReportModal()
</script>

<template>
  <nav class="fade-in">
    <div class="nav-inner">
      <div class="nav-logo uppercase leading-none">👻</div>
      <div class="nav-right">
        <button class="nav-cta" @click="open">File a report</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  border-bottom: 1px solid var(--faint);
}
.nav-inner {
  max-width: 1680px;
  margin: 0 auto;
  padding: 1.25rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  font-size: 2rem;
  color: var(--ink);
  letter-spacing: -0.01em;
  display: inline-block;
  transition: transform 0.6s ease;
  cursor: default;
}
.nav-logo:hover {
  transform: rotate(360deg);
  transform-origin: center;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-cta {
  background: var(--green);
  color: #fff;
  border: none;
  padding: 0.625rem 1.375rem;
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
  nav { padding: 1rem 1.25rem; }
 .nav-inner { padding: 0; }
}
</style>
