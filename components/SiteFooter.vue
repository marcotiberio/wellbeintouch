<script setup lang="ts">
defineProps<{
  left?: string
  right?: string
}>()
</script>

<template>
  <footer>
    <span>{{ left }}</span>
    <em>{{ right }}</em>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--faint);
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
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
