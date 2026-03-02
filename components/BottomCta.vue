<script setup lang="ts">
defineProps<{
  text?: string
  buttonLabel?: string
}>()
const { open } = useReportModal()
</script>

<template>
  <div class="bottom-cta">
    <p class="bottom-cta-text">{{ text }}</p>
    <button class="btn-primary" @click="open">{{ buttonLabel }}</button>
  </div>
</template>

<style scoped>
.bottom-cta {
  margin-top: 48px;
  background: var(--paper);
  border: 1px solid var(--faint);
  border-radius: var(--radius);
  padding: 40px 40px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
}
.bottom-cta-text { font-size: 0.92rem; color: var(--muted); line-height: 1.8; max-width: 460px; }
.bottom-cta-text strong { color: var(--ink); font-weight: 500; }

@media (max-width: 768px) {
  .bottom-cta { grid-template-columns: 1fr; }
}
</style>
