<script setup lang="ts">
import { LABELS, scoreClass, type SortKey } from '~/composables/useCompanyData'

defineProps<{
  subtitle?: string
  title?: string
}>()

const { visible, remaining, total, visibleCount, sortKey, setSort, loadMore } = useCompanyData()

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
        <div class="th">Severity</div>
        <div class="th right">Score</div>
      </div>

      <div v-for="company in visible" :key="company.name" class="co-row">
        <div>
          <div class="co-name">{{ company.name }}</div>
        </div>
        <div class="cell cell-stage">{{ company.stage }}</div>
        <div class="cell cell-duration">{{ company.duration }}</div>
        <div class="cell">
          <span class="pill" :class="scoreClass(company.score)">
            <span class="pip" />{{ LABELS[scoreClass(company.score)] }}
          </span>
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
  </div>
</template>

<style scoped>
.index-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
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
  padding: 3px 8px;
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
  padding: 10px 20px;
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
  padding: 14px 20px;
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
  padding: 14px 20px;
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
  padding: 8px 20px;
  font-family: var(--sans);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--ink);
  cursor: pointer;
  border-radius: var(--radius);
  transition: border-color 0.12s, background 0.12s;
}
.btn-load:hover { border-color: var(--green); background: var(--green-lt); color: var(--green); }

@media (max-width: 768px) {
  .table-head { display: none; }
  .co-row { grid-template-columns: 1fr 1fr; }
  .cell-stage, .cell-duration { display: none; }
  .index-head { flex-direction: column; align-items: flex-start; }
}
</style>
