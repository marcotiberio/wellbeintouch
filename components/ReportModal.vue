<script setup lang="ts">
const { isOpen, close } = useReportModal()

const showSuccess = ref(false)
const refCode = ref('')

// Form state
const company = ref('')
const role = ref('')
const roleType = ref('')
const stage = ref('')
const duration = ref('')
const notes = ref('')

// Error state
const errors = reactive({
  company: false,
  role: false,
  roleType: false,
  stage: false,
  duration: false,
})

const roleTypeOptions = [
  { value: 'employee', label: 'Employee' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'contractor', label: 'Contractor' },
]

const stageOptions = [
  { value: 'application', label: 'After application' },
  { value: 'first_interview', label: 'After 1st interview' },
  { value: 'later_interview', label: 'After further rounds' },
  { value: 'unpaid_work', label: 'After unpaid work' },
  { value: 'final', label: 'After final round' },
  { value: 'post_offer', label: 'Post-offer' },
]

const durationOptions = [
  { value: 'under_1w', label: 'Less than a week' },
  { value: '1_2w', label: '1–2 weeks' },
  { value: '2_4w', label: '2–4 weeks' },
  { value: '1_3m', label: '1–3 months' },
  { value: 'over_3m', label: '3+ months' },
]

function validate(): boolean {
  errors.company = !company.value.trim()
  errors.role = !role.value.trim()
  errors.roleType = !roleType.value
  errors.stage = !stage.value
  errors.duration = !duration.value
  return !errors.company && !errors.role && !errors.roleType && !errors.stage && !errors.duration
}

function submit() {
  if (!validate()) return
  refCode.value = 'WBIT-' + String(Math.floor(Math.random() * 900000) + 100000)
  showSuccess.value = true
}

function resetForm() {
  company.value = ''
  role.value = ''
  roleType.value = ''
  stage.value = ''
  duration.value = ''
  notes.value = ''
  errors.company = false
  errors.role = false
  errors.roleType = false
  errors.stage = false
  errors.duration = false
  showSuccess.value = false
}

function handleClose() {
  close()
  setTimeout(resetForm, 200)
}

function onOverlayClick(e: Event) {
  if (e.target === e.currentTarget) handleClose()
}

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) handleClose()
  }
  document.addEventListener('keydown', handler)
  onUnmounted(() => document.removeEventListener('keydown', handler))
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      @click="onOverlayClick"
    >
      <div class="modal">
        <div class="modal-header">
          <div class="modal-header-text">
            <div class="modal-title">File a ghosting report</div>
            <div class="modal-subtitle">Anonymous · Public record · Takes about 2 minutes</div>
          </div>
          <button class="modal-close" @click="handleClose">Close</button>
        </div>

        <!-- FORM -->
        <form v-if="!showSuccess" novalidate @submit.prevent="submit">
          <div class="form-body">
            <div class="form-section-label">Who ghosted you?</div>

            <div class="form-row">
              <div class="field" :class="{ error: errors.company }">
                <label class="form-label">Company name <span class="req">*</span></label>
                <input
                  v-model="company"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  autocomplete="off"
                  @input="errors.company = false"
                />
              </div>
              <div class="field" :class="{ error: errors.role }">
                <label class="form-label">Role applied for <span class="req">*</span></label>
                <input
                  v-model="role"
                  type="text"
                  placeholder="e.g. Senior Visual Designer"
                  @input="errors.role = false"
                />
              </div>
            </div>

            <div class="form-row full" style="margin-bottom: 18px;">
              <div class="field" :class="{ error: errors.roleType }">
                <label class="form-label">Role type <span class="req">*</span></label>
                <div class="toggle-row">
                  <label
                    v-for="opt in roleTypeOptions"
                    :key="opt.value"
                    class="toggle-label"
                    :class="{ active: roleType === opt.value }"
                    @click="roleType = opt.value; errors.roleType = false"
                  >
                    {{ opt.label }}
                  </label>
                </div>
              </div>
            </div>

            <hr class="divider" />

            <div class="form-section-label">When did they go silent?</div>

            <div class="form-row full" style="margin-bottom: 18px;">
              <div class="field" :class="{ error: errors.stage }">
                <label class="form-label">Stage when ghosted <span class="req">*</span></label>
                <div class="toggle-row">
                  <label
                    v-for="opt in stageOptions"
                    :key="opt.value"
                    class="toggle-label"
                    :class="{ active: stage === opt.value }"
                    @click="stage = opt.value; errors.stage = false"
                  >
                    {{ opt.label }}
                  </label>
                </div>
              </div>
            </div>

            <div class="form-row full" style="margin-bottom: 18px;">
              <div class="field" :class="{ error: errors.duration }">
                <label class="form-label">How long did the process run? <span class="req">*</span></label>
                <div class="toggle-row">
                  <label
                    v-for="opt in durationOptions"
                    :key="opt.value"
                    class="toggle-label"
                    :class="{ active: duration === opt.value }"
                    @click="duration = opt.value; errors.duration = false"
                  >
                    {{ opt.label }}
                  </label>
                </div>
              </div>
            </div>

            <hr class="divider" />

            <div class="form-section-label">Anything to add?</div>
            <div class="form-row full">
              <div class="field">
                <label class="form-label">Optional note <span class="opt">(one or two sentences)</span></label>
                <textarea
                  v-model="notes"
                  placeholder="&quot;They asked for a 3-day case study then disappeared.&quot;"
                />
              </div>
            </div>
          </div>

          <div class="form-footer">
            <div class="form-footer-note">
              Anonymous — no account required.<br />All submissions are public record.
            </div>
            <button type="submit" class="btn-primary">Submit report</button>
          </div>
        </form>

        <!-- SUCCESS -->
        <div v-else class="modal-success">
          <div class="stamp">Received</div>
          <p class="success-text">
            Your report has been filed and will contribute to this company's public score.
            Thank you for helping other candidates make a more informed decision.
          </p>
          <div class="success-ref">Ref: {{ refCode }}</div>

          <div class="success-support">
            <p class="success-support-text">
              If the hiring process has been weighing on you,
              you're not alone — and talking to someone can help.
            </p>
            <a href="https://www.psychologytoday.com/intl/counsellors" target="_blank" rel="noopener" class="success-support-link">
              Find a therapist near you →
            </a>
          </div>

          <div class="success-actions">
            <button class="btn-secondary" @click="resetForm">Submit another</button>
            <button class="btn-primary" @click="handleClose">Close</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 24, 0.5);
  z-index: 200;
  overflow-y: auto;
  padding: 40px 20px 60px;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.modal {
  background: var(--paper);
  border: 1px solid var(--faint);
  border-radius: 4px;
  width: 100%;
  max-width: 640px;
  margin: auto;
  flex-shrink: 0;
  animation: modalIn 0.25s ease;
  box-shadow: 0 24px 64px rgba(28,28,24,0.12), 0 4px 12px rgba(28,28,24,0.06);
}

.modal-header {
  padding: 22px 28px 18px;
  border-bottom: 1px solid var(--faint);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.modal-title {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.3;
}
.modal-subtitle {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-top: 4px;
}
.modal-close {
  background: none;
  border: 1px solid var(--faint);
  color: var(--muted);
  font-family: var(--sans);
  font-size: 0.78rem;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: var(--radius);
  transition: border-color 0.12s, color 0.12s;
  flex-shrink: 0;
  margin-top: 2px;
}
.modal-close:hover { border-color: var(--ink); color: var(--ink); }

.form-body { padding: 28px 28px 8px; }
.form-section-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--faint);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.form-row.full { grid-template-columns: 1fr; }
.field { display: flex; flex-direction: column; gap: 5px; }
.divider { border: none; border-top: 1px solid var(--faint); margin: 22px 0 20px; }

.form-footer {
  padding: 18px 28px;
  border-top: 1px solid var(--faint);
  background: var(--bg);
  border-radius: 0 0 4px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.form-footer-note {
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--muted);
  line-height: 1.7;
}

.modal-success { padding: 56px 40px; text-align: center; }
.stamp {
  display: inline-block;
  border: 1.5px solid var(--green);
  color: var(--green);
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 10px 30px;
  letter-spacing: 0.05em;
  transform: rotate(-1.5deg);
  margin-bottom: 28px;
  border-radius: 2px;
}
.success-text { font-size: 0.9rem; color: var(--muted); max-width: 360px; margin: 0 auto 12px; line-height: 1.8; }
.success-ref {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.success-support {
  background: var(--bg);
  border: 1px solid var(--faint);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 28px;
  text-align: left;
}
.success-support-text {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 8px;
}
.success-support-link {
  font-family: var(--sans);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--green);
  text-decoration: none;
}
.success-support-link:hover { text-decoration: underline; }

.success-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .modal-overlay { padding: 0; }
  .modal { min-height: 100dvh; border-radius: 0; }
  .form-row { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: flex-start; }
}
</style>
