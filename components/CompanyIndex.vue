<script setup lang="ts">
import { scoreClass, ghostEmojis, ghostLabel, ghostCount, type SortKey } from '~/composables/useCompanyData'

defineProps<{
  subtitle?: string
  title?: string
}>()

const { visible, remaining, total, visibleCount, sortKey, setSort, loadMore } = useCompanyData()

const explainerOpen = ref(false)

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'score', label: 'Score' },
  { key: 'name', label: 'Name' },
]
</script>

<template>
  <div>
    <!-- Header -->
    <div class="index-head">
      <div class="index-title-wrap">
        <span class="index-subtitle">{{ subtitle }}</span>
      </div>
      <div class="sort-row">
        <span>Sort by</span>
        <button
          v-for="opt in sortOptions"
          :key="opt.key"
          class="sort-btn"
          :class="{ active: sortKey === opt.key }"
          @click="setSort(opt.key)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <div class="table-head">
        <div class="th">Company</div>
        <div class="th">Ghosted at</div>
        <div class="th">Duration</div>
        <div class="th">Ghost rating</div>
        <div class="th right">Score</div>
      </div>

      <div v-for="company in visible" :key="company.name" class="co-row">
        <div>
          <div class="co-name">{{ company.name }}</div>
        </div>
        <div class="cell cell-stage">{{ company.stage }}</div>
        <div class="cell cell-duration">{{ company.duration }}</div>
        <div class="cell cell-ghosts" :title="ghostLabel(company.score)">
          {{ ghostEmojis(company.score) }}
        </div>
        <div class="cell right">
          <div class="score-num" :class="scoreClass(company.score)">{{ company.score }}</div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div v-if="remaining > 0" class="load-more-row">
      <span class="load-more-note">Showing {{ Math.min(visibleCount, total) }} of {{ total }}</span>
      <button class="btn-load" @click="loadMore">Load more</button>
    </div>

    <!-- Scoring Explainer -->
    <div class="explainer">
      <button class="explainer-toggle" @click="explainerOpen = !explainerOpen">
        <span class="explainer-label">How we score</span>
        <span class="explainer-arrow" :class="{ open: explainerOpen }">&#x25BE;</span>
      </button>
      <div class="explainer-body" :class="{ open: explainerOpen }">
      <p class="explainer-intro">
        Every score is built from two things: <em>how far you got</em> before they vanished, and <em>how long you waited</em> before accepting they weren't coming back. Multiply one by the other. That's your number. No vibes, no opinions — just math and disappointment.
      </p>

      <div class="explainer-grid">
        <div class="explainer-col">
          <div class="explainer-col-label">Stage weight</div>
          <div class="explainer-col-desc">The deeper you got, the worse it is.</div>
          <ul class="explainer-list">
            <li><span class="ex-val">15</span> After application</li>
            <li><span class="ex-val">30</span> After 1st interview</li>
            <li><span class="ex-val">50</span> After further rounds</li>
            <li><span class="ex-val">70</span> After case study / unpaid work</li>
            <li><span class="ex-val">80</span> After final round</li>
            <li><span class="ex-val">95</span> Post-offer (yes, really)</li>
          </ul>
        </div>

        <div class="explainer-col">
          <div class="explainer-col-label">Duration multiplier</div>
          <div class="explainer-col-desc">Silence gets louder over time.</div>
          <ul class="explainer-list">
            <li><span class="ex-val">&times;0.7</span> Less than a week</li>
            <li><span class="ex-val">&times;0.9</span> 1&ndash;2 weeks</li>
            <li><span class="ex-val">&times;1.2</span> 1&ndash;2 months</li>
            <li><span class="ex-val">&times;1.5</span> 2+ months</li>
          </ul>
        </div>

        <div class="explainer-col">
          <div class="explainer-col-label">Ghost rating</div>
          <div class="explainer-col-desc">Where the score lands.</div>
          <ul class="explainer-list">
            <li><span class="ex-val">👻</span> Barely ghosted</li>
            <li><span class="ex-val">👻👻</span> Left on read</li>
            <li><span class="ex-val">👻👻👻</span> Gone cold</li>
            <li><span class="ex-val">👻👻👻👻</span> Full phantom</li>
            <li><span class="ex-val">👻👻👻👻👻</span> Corporate Houdini</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.index-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--faint);
}
.index-title-wrap { display: flex; align-items: baseline; gap: 14px; }
.index-subtitle {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}
.sort-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.sort-btn {
  background: none;
  border: none;
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  cursor: pointer;
  padding: 0.1875rem 0.5rem;
  border-radius: 100px;
  transition: background 0.12s, color 0.12s;
}
.sort-btn:hover { color: var(--ink); background: var(--faint); }
.sort-btn.active { color: var(--green); background: var(--green-lt); }

.table-wrap {
  border: 1px solid var(--faint);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--paper);
}
.table-head {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 0.8fr 0.8fr;
  padding: 0.625rem 1.25rem;
  background: var(--bg);
  border-bottom: 1px solid var(--faint);
}
.th {
  font-family: var(--mono);
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}
.th.right { text-align: right; }

.co-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 0.8fr 0.8fr;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--faint);
  align-items: center;
  transition: background 0.1s;
}
.co-row:last-child { border-bottom: none; }
.co-row:hover { background: rgba(42,92,69,0.025); }

.co-name {
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
}
.co-ind {
  font-family: var(--mono);
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-top: 2px;
}
.cell {
  font-size: 0.78rem;
  color: var(--muted);
  font-family: var(--mono);
}
.cell.right { text-align: right; }
.cell-stage {
  font-family: var(--sans);
  font-size: 0.82rem;
  color: var(--ink);
  font-weight: 400;
}
.cell-ghosts {
  font-family: initial;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}
.cell-duration {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
}
.score-reports {
  font-family: var(--mono);
  font-size: 0.57rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: right;
  margin-top: 3px;
}

.load-more-row {
  border-top: 1px solid var(--faint);
  padding: 0.875rem 0.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg);
}
.load-more-note {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.btn-load {
  background: none;
  border: 1px solid var(--faint);
  padding: 0.5rem 1.25rem;
  font-family: var(--sans);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--ink);
  cursor: pointer;
  border-radius: var(--radius);
  transition: border-color 0.12s, background 0.12s;
}
.btn-load:hover { border-color: var(--green); background: var(--green-lt); color: var(--green); }

.explainer {
  background: var(--paper);
  border: 1px solid var(--faint);
  border-radius: var(--radius);
}
.explainer-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
}
.explainer-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--green);
}
.explainer-arrow {
  font-size: 0.8rem;
  color: var(--muted);
  transition: transform 0.2s;
}
.explainer-arrow.open {
  transform: rotate(180deg);
}
.explainer-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.explainer-body.open {
  max-height: 50rem;
}
.explainer-intro {
  padding: 0 2rem;
  font-family: var(--serif);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.75;
  color: var(--ink);
  max-width: 640px;
  margin-bottom: 2rem;
}
.explainer-intro em {
  font-style: normal;
  font-weight: 500;
  color: var(--green);
}
.explainer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 0 2rem 2rem;
}
.explainer-col-label {
  font-family: var(--mono);
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.25rem;
}
.explainer-col-desc {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 1rem;
}
.explainer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--ink);
}
.ex-val {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--green);
  display: inline-block;
  min-width: 2.5rem;
}

@media (max-width: 768px) {
  .table-head { grid-template-columns: 3fr 1fr 1fr; }
  .table-head .th:nth-child(2), .table-head .th:nth-child(3) { display: none; }
  .co-row { grid-template-columns: 3fr 1fr 1fr; }
  .cell-stage, .cell-duration { display: none; }
  .index-head { flex-direction: column; align-items: flex-start; }
  .explainer-grid { grid-template-columns: 1fr; }
}
</style>
