<script setup lang="ts">
defineProps<{
  left?: { label?: string; text?: string; source?: string }
  right?: { label?: string; text?: string }
}>()
</script>

<template>
  <div class="insight fade-in fade-in-4 grid md:grid-cols-2 gap-16">
    <div class="insight-body">
      <div class="insight-label">{{ left?.label }}</div>
      <p class="insight-text">{{ left?.text }}</p>
      <div v-if="left?.source" class="insight-source">{{ left.source }}</div>
    </div>
    <div class="insight-body">
      <div class="insight-label">{{ right?.label }}</div>
      <p class="insight-text">{{ right?.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.insight {
  margin-bottom: 64px;
  align-items: start;
}
.insight-mark {
  font-family: var(--serif);
  font-style: italic;
  font-size: 5rem;
  line-height: 1;
  color: var(--faint);
  user-select: none;
  margin-top: -8px;
}
.insight-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--green);
  margin-bottom: 10px;
}
.insight-text {
  font-family: var(--serif);
  font-size: 1.18rem;
  font-style: italic;
  line-height: 1.75;
  color: var(--ink);
  max-width: 600px;
}
.insight-text strong {
  font-style: normal;
  font-weight: 500;
  color: var(--green);
}
.insight-source {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 14px;
}
</style>
