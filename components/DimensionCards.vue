<template>
  <div class="dimensions">
    <div v-for="dim in dimensions" :key="dim.title" class="dim-card">
      <span class="dim-icon">{{ dim.icon }}</span>
      <div class="dim-title">{{ dim.title }}</div>
      <div class="dim-desc">{{ dim.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dimensions = [
  { icon: '⏱', title: 'Process Length', desc: 'Stages, total duration, and whether unpaid work was required.' },
  { icon: '📬', title: 'Responsiveness', desc: 'Speed of replies, communication quality, whether timelines were honoured.' },
  { icon: '💶', title: 'Salary Transparency', desc: 'Was a range published upfront, or did you find out at the end?' },
  { icon: '👻', title: 'Ghosting', desc: 'Did they disappear, at which stage, and did you ever get a reason?' },
]
</script>

<style scoped>
.dimensions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 64px;
}
.dim-card {
  background: var(--paper);
  border: 1px solid var(--faint);
  padding: 24px 20px;
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dim-card:hover {
  border-color: rgba(42,92,69,0.2);
  box-shadow: 0 4px 20px rgba(42,92,69,0.06);
}
.dim-icon { font-size: 1.3rem; margin-bottom: 12px; display: block; }
.dim-title {
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 6px;
}
.dim-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }

@media (max-width: 768px) {
  .dimensions { grid-template-columns: 1fr 1fr; gap: 10px; }
}
</style>
