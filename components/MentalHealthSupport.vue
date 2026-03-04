<script setup lang="ts">
defineProps<{
  title?: string
  text?: string
  links?: { name: string; description: string; url: string }[]
  crisisText?: string
}>()
</script>

<template>
  <section class="support-section">
    <div class="support-inner">
      <div class="support-label">Support</div>
      <h3 class="support-title">{{ title }}</h3>
      <p class="support-text">{{ text }}</p>
      <div class="support-links">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="support-link"
        >
          <span class="support-link-name">{{ link.name }}</span>
          <span class="support-link-desc">{{ link.description }}</span>
        </a>
      </div>
      <p class="support-crisis" v-html="crisisText" />
    </div>
  </section>
</template>

<style scoped>
.support-section {
  margin-top: 48px;
  padding: 2.5rem;
  background: var(--paper);
  border: 1px solid var(--faint);
  border-radius: var(--radius);
}
.support-inner {
  max-width: 560px;
}
.support-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--green);
  margin-bottom: 12px;
}
.support-title {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 12px;
}
.support-text {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 24px;
}
.support-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.support-link {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0.875rem 1.125rem;
  background: var(--bg);
  border: 1px solid var(--faint);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  flex: 1;
  min-width: 150px;
}
.support-link:hover {
  border-color: rgba(42, 92, 69, 0.25);
  box-shadow: 0 2px 12px rgba(42, 92, 69, 0.06);
}
.support-link-name {
  font-family: var(--serif);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink);
}
.support-link-desc {
  font-family: var(--mono);
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.support-crisis {
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.8;
}
.support-crisis a {
  color: var(--green);
  text-decoration: none;
}
.support-crisis a:hover {
  text-decoration: underline;
}
</style>
