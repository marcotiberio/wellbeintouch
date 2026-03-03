<script setup lang="ts">
defineProps<{
  left?: string
  right?: string
}>()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <span>{{ left }}</span>
      <em>{{ right }}</em>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--paper);
  padding: 24px 48px;
  border-top: 1px solid var(--faint);
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.site-footer-inner {
  max-width: 1680px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
footer em {
  font-style: italic;
  font-family: var(--serif);
  font-size: 0.75rem;
  text-transform: none;
  letter-spacing: 0;
  color: var(--muted);
}

@media (max-width: 768px) {
  footer { padding: 16px 20px; }
}
</style>
