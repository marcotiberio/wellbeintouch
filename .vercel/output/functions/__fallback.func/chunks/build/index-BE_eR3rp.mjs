import { defineComponent, unref, computed, toRef, isRef, toValue, getCurrentInstance, onServerPrefetch, mergeProps, ref, reactive, shallowRef, nextTick, useSSRContext, createElementBlock, provide, cloneVNode, h } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderTeleport, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRuntimeConfig, a as useNuxtApp, d as asyncDataDefaults, f as createError } from './server.mjs';
import { createClient } from '@sanity/client';
import { debounce } from 'perfect-debounce';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useReportModal() {
  const isOpen = useState("reportModal", () => false);
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  return { isOpen, open, close };
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    useReportModal();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fade-in" }, _attrs))} data-v-6a5729ef><div class="nav-logo" data-v-6a5729ef>We&#39;ll Be In Touch</div><div class="nav-right" data-v-6a5729ef><div class="nav-meta" data-v-6a5729ef><!--[-->`);
      ssrRenderList(__props.stats, (s, i) => {
        _push(`<span data-v-6a5729ef>${ssrInterpolate(s)}</span>`);
      });
      _push(`<!--]--></div><button class="nav-cta" data-v-6a5729ef>File a report</button></div></nav>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-6a5729ef"]]), { __name: "NavBar" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    content: {}
  },
  setup(__props) {
    useReportModal();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-1937a648><div class="hero-inner" data-v-1937a648><div class="hero-eyebrow fade-in fade-in-1" data-v-1937a648>${ssrInterpolate(__props.content?.heroEyebrow)}</div><h1 class="fade-in fade-in-2" data-v-1937a648> They said<br data-v-1937a648><em data-v-1937a648>we&#39;ll be<br data-v-1937a648>in touch (lol)</em></h1><div class="hero-body fade-in fade-in-3" data-v-1937a648><div data-v-1937a648><p class="hero-text" data-v-1937a648>${ssrInterpolate(__props.content?.heroSubtext)}</p><div class="hero-cta" data-v-1937a648><button class="btn-primary" data-v-1937a648>${ssrInterpolate(__props.content?.heroCtaLabel)}</button><span class="btn-note" data-v-1937a648>${__props.content?.heroCtaNote?.replace(/\\n/g, "<br />") ?? ""}</span></div></div><div class="hero-stats" data-v-1937a648><!--[-->`);
      ssrRenderList(__props.content?.stats, (stat, i) => {
        _push(`<div class="stat-cell" data-v-1937a648><div class="stat-label" data-v-1937a648>${ssrInterpolate(stat.label)}</div><div class="${ssrRenderClass([{ accent: stat.accent }, "stat-value"])}" data-v-1937a648>${ssrInterpolate(stat.value)}</div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-1937a648"]]), { __name: "HeroSection" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "InsightQuote",
  __ssrInlineRender: true,
  props: {
    left: {},
    right: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "insight fade-in fade-in-4 grid grid-cols-2 gap-16" }, _attrs))} data-v-c82d9c1a><div class="insight-body" data-v-c82d9c1a><div class="insight-label" data-v-c82d9c1a>${ssrInterpolate(__props.left?.label)}</div><p class="insight-text" data-v-c82d9c1a>${ssrInterpolate(__props.left?.text)}</p>`);
      if (__props.left?.source) {
        _push(`<div class="insight-source" data-v-c82d9c1a>${ssrInterpolate(__props.left.source)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="insight-body" data-v-c82d9c1a><div class="insight-label" data-v-c82d9c1a>${ssrInterpolate(__props.right?.label)}</div><p class="insight-text" data-v-c82d9c1a>${ssrInterpolate(__props.right?.text)}</p></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InsightQuote.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-c82d9c1a"]]), { __name: "InsightQuote" });
const ROLE_TYPE_LABELS = {
  employee: "Employee",
  freelancer: "Freelancer",
  contractor: "Contractor"
};
const companies = [
  { name: "Booking.com", industry: "Tech / SaaS", ghosting: "good", score: 81, reports: 18, stage: "After application", duration: "2–4 weeks", roleType: "employee" },
  { name: "DEPT®", industry: "Design Agency", ghosting: "good", score: 74, reports: 9, stage: "After 1st interview", duration: "1–2 weeks", roleType: "freelancer" },
  { name: "Adyen", industry: "Finance", ghosting: "good", score: 88, reports: 14, stage: "After application", duration: "1–2 weeks", roleType: "employee" },
  { name: "ING Group", industry: "Finance", ghosting: "warn", score: 52, reports: 22, stage: "After further rounds", duration: "1–3 months", roleType: "contractor" },
  { name: "Coolblue", industry: "Retail / E-commerce", ghosting: "good", score: 79, reports: 11, stage: "After 1st interview", duration: "2–4 weeks", roleType: "employee" },
  { name: "Randstad", industry: "Recruitment / Staffing", ghosting: "bad", score: 24, reports: 31, stage: "After unpaid work", duration: "3+ months", roleType: "freelancer" },
  { name: "Philips", industry: "Healthcare", ghosting: "warn", score: 49, reports: 16, stage: "After further rounds", duration: "1–3 months", roleType: "employee" },
  { name: "WeTransfer", industry: "Tech / SaaS", ghosting: "good", score: 85, reports: 7, stage: "After application", duration: "< 1 week", roleType: "employee" },
  { name: "Takeaway.com", industry: "Tech / SaaS", ghosting: "bad", score: 19, reports: 27, stage: "After unpaid work", duration: "3+ months", roleType: "contractor" },
  { name: "NS (Dutch Rail)", industry: "Other", ghosting: "bad", score: 33, reports: 12, stage: "After further rounds", duration: "1–3 months", roleType: "employee" },
  { name: "Heineken", industry: "Other", ghosting: "warn", score: 61, reports: 8, stage: "After 1st interview", duration: "2–4 weeks", roleType: "employee" },
  { name: "Bol.com", industry: "Retail / E-commerce", ghosting: "good", score: 76, reports: 19, stage: "After application", duration: "2–4 weeks", roleType: "employee" },
  { name: "TomTom", industry: "Tech / SaaS", ghosting: "bad", score: 28, reports: 15, stage: "After final round", duration: "1–3 months", roleType: "freelancer" },
  { name: "IKEA Netherlands", industry: "Retail / E-commerce", ghosting: "good", score: 83, reports: 21, stage: "After application", duration: "1–2 weeks", roleType: "employee" },
  { name: "Accenture NL", industry: "Consulting", ghosting: "bad", score: 31, reports: 24, stage: "After unpaid work", duration: "3+ months", roleType: "contractor" },
  { name: "Flow Commerce", industry: "Tech / SaaS", ghosting: "good", score: 67, reports: 5, stage: "After 1st interview", duration: "2–4 weeks", roleType: "freelancer" },
  { name: "Nationale-Nederlanden", industry: "Finance", ghosting: "bad", score: 38, reports: 13, stage: "After further rounds", duration: "1–3 months", roleType: "employee" },
  { name: "Bunq", industry: "Finance", ghosting: "good", score: 90, reports: 6, stage: "After application", duration: "< 1 week", roleType: "employee" },
  { name: "Nikon Europe", industry: "Other", ghosting: "bad", score: 21, reports: 9, stage: "After final round", duration: "3+ months", roleType: "freelancer" },
  { name: "KPN", industry: "Tech / SaaS", ghosting: "bad", score: 35, reports: 17, stage: "After further rounds", duration: "1–3 months", roleType: "contractor" }
];
const RATING_ORDER = { bad: 0, warn: 1, good: 2 };
const LABELS = { good: "Good", warn: "Fair", bad: "Poor" };
function scoreClass(score) {
  return score >= 70 ? "good" : score >= 45 ? "warn" : "bad";
}
function useCompanyData() {
  const PAGE_SIZE = 10;
  const sortKey = ref("score");
  const visibleCount = ref(PAGE_SIZE);
  const sorted = computed(() => {
    const list = [...companies];
    switch (sortKey.value) {
      case "score":
        list.sort((a, b) => b.score - a.score);
        break;
      case "ghosting":
        list.sort((a, b) => RATING_ORDER[a.ghosting] - RATING_ORDER[b.ghosting]);
        break;
      case "reports":
        list.sort((a, b) => b.reports - a.reports);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  });
  const visible = computed(() => sorted.value.slice(0, visibleCount.value));
  const remaining = computed(() => sorted.value.length - visibleCount.value);
  const total = computed(() => sorted.value.length);
  function setSort(key) {
    sortKey.value = key;
    visibleCount.value = PAGE_SIZE;
  }
  function loadMore() {
    visibleCount.value += PAGE_SIZE;
  }
  return {
    sorted,
    visible,
    remaining,
    total,
    sortKey,
    visibleCount,
    setSort,
    loadMore
  };
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CompanyIndex",
  __ssrInlineRender: true,
  props: {
    subtitle: {},
    title: {}
  },
  setup(__props) {
    const { visible, remaining, total, visibleCount, sortKey } = useCompanyData();
    const sortOptions = [
      { key: "score", label: "Score" },
      { key: "ghosting", label: "Ghosting" },
      { key: "reports", label: "Reports" },
      { key: "name", label: "Name" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-69af3e84><div class="index-head" data-v-69af3e84><div class="index-title-wrap" data-v-69af3e84><span class="index-subtitle" data-v-69af3e84>${ssrInterpolate(__props.subtitle)}</span><h2 class="index-title" data-v-69af3e84>${ssrInterpolate(__props.title)}</h2></div><div class="sort-row" data-v-69af3e84><span data-v-69af3e84>Sort by</span><!--[-->`);
      ssrRenderList(sortOptions, (opt) => {
        _push(`<button class="${ssrRenderClass([{ active: unref(sortKey) === opt.key }, "sort-btn"])}" data-v-69af3e84>${ssrInterpolate(opt.label)}</button>`);
      });
      _push(`<!--]--></div></div><div class="table-wrap" data-v-69af3e84><div class="table-head" data-v-69af3e84><div class="th" data-v-69af3e84>Company</div><div class="th" data-v-69af3e84>Role type</div><div class="th" data-v-69af3e84>Ghosted at</div><div class="th" data-v-69af3e84>Process length</div><div class="th" data-v-69af3e84>Ghosting</div><div class="th right" data-v-69af3e84>Score</div></div><!--[-->`);
      ssrRenderList(unref(visible), (company) => {
        _push(`<div class="co-row" data-v-69af3e84><div data-v-69af3e84><div class="co-name" data-v-69af3e84>${ssrInterpolate(company.name)}</div><div class="co-ind" data-v-69af3e84>${ssrInterpolate(company.industry)}</div></div><div class="cell cell-role-type" data-v-69af3e84>${ssrInterpolate(unref(ROLE_TYPE_LABELS)[company.roleType])}</div><div class="cell cell-stage" data-v-69af3e84>${ssrInterpolate(company.stage)}</div><div class="cell cell-duration" data-v-69af3e84>${ssrInterpolate(company.duration)}</div><div class="cell" data-v-69af3e84><span class="${ssrRenderClass([company.ghosting, "pill"])}" data-v-69af3e84><span class="pip" data-v-69af3e84></span>${ssrInterpolate(unref(LABELS)[company.ghosting])}</span></div><div class="cell right" data-v-69af3e84><div class="${ssrRenderClass([unref(scoreClass)(company.score), "score-num"])}" data-v-69af3e84>${ssrInterpolate(company.score)}</div><div class="score-reports" data-v-69af3e84>${ssrInterpolate(company.reports)} report${ssrInterpolate(company.reports !== 1 ? "s" : "")}</div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(remaining) > 0) {
        _push(`<div class="load-more-row" data-v-69af3e84><span class="load-more-note" data-v-69af3e84>Showing ${ssrInterpolate(Math.min(unref(visibleCount), unref(total)))} of ${ssrInterpolate(unref(total))}</span><button class="btn-load" data-v-69af3e84>Load more</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CompanyIndex.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-69af3e84"]]), { __name: "CompanyIndex" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BottomCta",
  __ssrInlineRender: true,
  props: {
    text: {},
    buttonLabel: {}
  },
  setup(__props) {
    useReportModal();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bottom-cta" }, _attrs))} data-v-cca94200><p class="bottom-cta-text" data-v-cca94200>${ssrInterpolate(__props.text)}</p><button class="btn-primary" data-v-cca94200>${ssrInterpolate(__props.buttonLabel)}</button></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BottomCta.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-cca94200"]]), { __name: "BottomCta" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MentalHealthSupport",
  __ssrInlineRender: true,
  props: {
    title: {},
    text: {},
    links: {},
    crisisText: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "support-section" }, _attrs))} data-v-ea9485ae><div class="support-inner" data-v-ea9485ae><div class="support-label" data-v-ea9485ae>Support</div><h3 class="support-title" data-v-ea9485ae>${ssrInterpolate(__props.title)}</h3><p class="support-text" data-v-ea9485ae>${ssrInterpolate(__props.text)}</p><div class="support-links" data-v-ea9485ae><!--[-->`);
      ssrRenderList(__props.links, (link) => {
        _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener" class="support-link" data-v-ea9485ae><span class="support-link-name" data-v-ea9485ae>${ssrInterpolate(link.name)}</span><span class="support-link-desc" data-v-ea9485ae>${ssrInterpolate(link.description)}</span></a>`);
      });
      _push(`<!--]--></div><p class="support-crisis" data-v-ea9485ae>${__props.crisisText ?? ""}</p></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MentalHealthSupport.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-ea9485ae"]]), { __name: "MentalHealthSupport" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SiteFooter",
  __ssrInlineRender: true,
  props: {
    left: {},
    right: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(_attrs)} data-v-47c174d7><span data-v-47c174d7>${ssrInterpolate(__props.left)}</span><em data-v-47c174d7>${ssrInterpolate(__props.right)}</em></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-47c174d7"]]), { __name: "SiteFooter" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReportModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen } = useReportModal();
    const showSuccess = ref(false);
    const refCode = ref("");
    const company = ref("");
    const role = ref("");
    const roleType = ref("");
    const stage = ref("");
    const duration = ref("");
    const notes = ref("");
    const errors = reactive({
      company: false,
      role: false,
      roleType: false,
      stage: false,
      duration: false
    });
    const roleTypeOptions = [
      { value: "employee", label: "Employee" },
      { value: "freelancer", label: "Freelancer" },
      { value: "contractor", label: "Contractor" }
    ];
    const stageOptions = [
      { value: "application", label: "After application" },
      { value: "first_interview", label: "After 1st interview" },
      { value: "later_interview", label: "After further rounds" },
      { value: "unpaid_work", label: "After unpaid work" },
      { value: "final", label: "After final round" },
      { value: "post_offer", label: "Post-offer" }
    ];
    const durationOptions = [
      { value: "under_1w", label: "Less than a week" },
      { value: "1_2w", label: "1–2 weeks" },
      { value: "2_4w", label: "2–4 weeks" },
      { value: "1_3m", label: "1–3 months" },
      { value: "over_3m", label: "3+ months" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isOpen)) {
          _push2(`<div class="modal-overlay" role="dialog" aria-modal="true" data-v-5613dff4><div class="modal" data-v-5613dff4><div class="modal-header" data-v-5613dff4><div class="modal-header-text" data-v-5613dff4><div class="modal-title" data-v-5613dff4>File a ghosting report</div><div class="modal-subtitle" data-v-5613dff4>Anonymous · Public record · Takes about 2 minutes</div></div><button class="modal-close" data-v-5613dff4>Close</button></div>`);
          if (!unref(showSuccess)) {
            _push2(`<form novalidate data-v-5613dff4><div class="form-body" data-v-5613dff4><div class="form-section-label" data-v-5613dff4>Who ghosted you?</div><div class="form-row" data-v-5613dff4><div class="${ssrRenderClass([{ error: unref(errors).company }, "field"])}" data-v-5613dff4><label class="form-label" data-v-5613dff4>Company name <span class="req" data-v-5613dff4>*</span></label><input${ssrRenderAttr("value", unref(company))} type="text" placeholder="e.g. Acme Corp" autocomplete="off" data-v-5613dff4></div><div class="${ssrRenderClass([{ error: unref(errors).role }, "field"])}" data-v-5613dff4><label class="form-label" data-v-5613dff4>Role applied for <span class="req" data-v-5613dff4>*</span></label><input${ssrRenderAttr("value", unref(role))} type="text" placeholder="e.g. Senior Visual Designer" data-v-5613dff4></div></div><div class="form-row full" style="${ssrRenderStyle({ "margin-bottom": "18px" })}" data-v-5613dff4><div class="${ssrRenderClass([{ error: unref(errors).roleType }, "field"])}" data-v-5613dff4><label class="form-label" data-v-5613dff4>Role type <span class="req" data-v-5613dff4>*</span></label><div class="toggle-row" data-v-5613dff4><!--[-->`);
            ssrRenderList(roleTypeOptions, (opt) => {
              _push2(`<label class="${ssrRenderClass([{ active: unref(roleType) === opt.value }, "toggle-label"])}" data-v-5613dff4>${ssrInterpolate(opt.label)}</label>`);
            });
            _push2(`<!--]--></div></div></div><hr class="divider" data-v-5613dff4><div class="form-section-label" data-v-5613dff4>When did they go silent?</div><div class="form-row full" style="${ssrRenderStyle({ "margin-bottom": "18px" })}" data-v-5613dff4><div class="${ssrRenderClass([{ error: unref(errors).stage }, "field"])}" data-v-5613dff4><label class="form-label" data-v-5613dff4>Stage when ghosted <span class="req" data-v-5613dff4>*</span></label><div class="toggle-row" data-v-5613dff4><!--[-->`);
            ssrRenderList(stageOptions, (opt) => {
              _push2(`<label class="${ssrRenderClass([{ active: unref(stage) === opt.value }, "toggle-label"])}" data-v-5613dff4>${ssrInterpolate(opt.label)}</label>`);
            });
            _push2(`<!--]--></div></div></div><div class="form-row full" style="${ssrRenderStyle({ "margin-bottom": "18px" })}" data-v-5613dff4><div class="${ssrRenderClass([{ error: unref(errors).duration }, "field"])}" data-v-5613dff4><label class="form-label" data-v-5613dff4>How long did the process run? <span class="req" data-v-5613dff4>*</span></label><div class="toggle-row" data-v-5613dff4><!--[-->`);
            ssrRenderList(durationOptions, (opt) => {
              _push2(`<label class="${ssrRenderClass([{ active: unref(duration) === opt.value }, "toggle-label"])}" data-v-5613dff4>${ssrInterpolate(opt.label)}</label>`);
            });
            _push2(`<!--]--></div></div></div><hr class="divider" data-v-5613dff4><div class="form-section-label" data-v-5613dff4>Anything to add?</div><div class="form-row full" data-v-5613dff4><div class="field" data-v-5613dff4><label class="form-label" data-v-5613dff4>Optional note <span class="opt" data-v-5613dff4>(one or two sentences)</span></label><textarea placeholder="&quot;They asked for a 3-day case study then disappeared.&quot;" data-v-5613dff4>${ssrInterpolate(unref(notes))}</textarea></div></div></div><div class="form-footer" data-v-5613dff4><div class="form-footer-note" data-v-5613dff4> Anonymous — no account required.<br data-v-5613dff4>All submissions are public record. </div><button type="submit" class="btn-primary" data-v-5613dff4>Submit report</button></div></form>`);
          } else {
            _push2(`<div class="modal-success" data-v-5613dff4><div class="stamp" data-v-5613dff4>Received</div><p class="success-text" data-v-5613dff4> Your report has been filed and will contribute to this company&#39;s public score. Thank you for helping other candidates make a more informed decision. </p><div class="success-ref" data-v-5613dff4>Ref: ${ssrInterpolate(unref(refCode))}</div><div class="success-support" data-v-5613dff4><p class="success-support-text" data-v-5613dff4> If the hiring process has been weighing on you, you&#39;re not alone — and talking to someone can help. </p><a href="https://www.psychologytoday.com/intl/counsellors" target="_blank" rel="noopener" class="success-support-link" data-v-5613dff4> Find a therapist near you → </a></div><div class="success-actions" data-v-5613dff4><button class="btn-secondary" data-v-5613dff4>Submit another</button><button class="btn-primary" data-v-5613dff4>Close</button></div></div>`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReportModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5613dff4"]]), { __name: "ReportModal" });
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const FALLBACK = {
  heroEyebrow: "Hiring Process Transparency Index",
  heroHeadline: "They said\nwe'll be\nin touch (lol)",
  heroSubtext: "A public record of hiring processes — scored on what actually matters. How long it takes. How much of your time it costs. Whether they ever reply.",
  heroCtaLabel: "File a report",
  heroCtaNote: "Anonymous.\nNo account. 2 minutes.",
  stats: [
    { label: "Records filed", value: "247", accent: true },
    { label: "Companies indexed", value: "83", accent: true },
    { label: "Candidates ghosted", value: "61%", accent: false },
    { label: "Avg. time to reply", value: "Never", accent: false }
  ],
  insightLeft: {
    label: "Research note",
    text: "Being ghosted after a job application violates fundamental psychological needs — the sense of belonging, self-esteem, and the need for closure. It leaves candidates in a state of unresolved uncertainty that the brain cannot process as a clean rejection. It is not a minor frustration. It is a documented harm.",
    source: "Psychology Today, 2023 · Wood et al., University of Mississippi, 2023"
  },
  insightRight: {
    label: "Notes to candidates",
    text: "Your time has value. The average hiring process runs 44 days — longer for senior roles. 61% of candidates are ghosted before it's over. This platform scores companies on four parameters so you can decide whether applying is worth it before you find out the hard way."
  },
  indexSubtitle: "Ghosting index",
  indexTitle: "Who ghosts, and when",
  bottomCtaText: "Every report you file contributes to a company's permanent public score. The more data, the clearer the picture becomes — for everyone who comes after you. It takes two minutes and requires no account.",
  bottomCtaButton: "File a report",
  supportTitle: "If the silence is getting to you",
  supportText: "Being ghosted isn't a reflection of your worth — but your brain doesn't always know that. If the job search is affecting your sleep, your confidence, or your sense of self, consider talking to a professional. It's not dramatic. It's maintenance.",
  supportLinks: [
    { name: "iPractice", description: "Online therapy, low barrier · NL", url: "https://www.ipractice.nl" },
    { name: "OpenUp", description: "Mental health support · NL / EU", url: "https://www.openup.com" },
    { name: "Find a therapist", description: "Psychology Today directory · Global", url: "https://www.psychologytoday.com/intl/counsellors" }
  ],
  supportCrisisText: "In crisis? Call 113 (NL) or find your local helpline at findahelpline.com",
  footerLeft: "wellbeintouch.fyi — Hiring Transparency Index",
  footerRight: "No recruiters were harmed. Several were named.",
  navStats: ["247 reports", "83 companies", "Status: Open"]
};
const QUERY = `*[_type == "homePage"][0]{
  heroEyebrow,
  heroHeadline,
  heroSubtext,
  heroCtaLabel,
  heroCtaNote,
  stats[]{label, value, accent},
  insightLeft{label, text, source},
  insightRight{label, text},
  indexSubtitle,
  indexTitle,
  bottomCtaText,
  bottomCtaButton,
  supportTitle,
  supportText,
  supportLinks[]{name, description, url},
  supportCrisisText,
  footerLeft,
  footerRight,
  navStats
}`;
function usePageContent() {
  const config = useRuntimeConfig();
  const { projectId, dataset, apiVersion, useCdn } = config.public.sanity;
  const sanityData = useState("page-content", () => null);
  useAsyncData("sanity-home", async () => {
    try {
      const client = createClient({ projectId, dataset, apiVersion, useCdn });
      const data = await client.fetch(QUERY);
      sanityData.value = data;
      return data;
    } catch {
      return null;
    }
  });
  const content = computed(() => {
    const s = sanityData.value;
    if (!s) return FALLBACK;
    return {
      heroEyebrow: s.heroEyebrow || FALLBACK.heroEyebrow,
      heroHeadline: s.heroHeadline || FALLBACK.heroHeadline,
      heroSubtext: s.heroSubtext || FALLBACK.heroSubtext,
      heroCtaLabel: s.heroCtaLabel || FALLBACK.heroCtaLabel,
      heroCtaNote: s.heroCtaNote || FALLBACK.heroCtaNote,
      stats: s.stats?.length ? s.stats : FALLBACK.stats,
      insightLeft: s.insightLeft?.text ? s.insightLeft : FALLBACK.insightLeft,
      insightRight: s.insightRight?.text ? s.insightRight : FALLBACK.insightRight,
      indexSubtitle: s.indexSubtitle || FALLBACK.indexSubtitle,
      indexTitle: s.indexTitle || FALLBACK.indexTitle,
      bottomCtaText: s.bottomCtaText || FALLBACK.bottomCtaText,
      bottomCtaButton: s.bottomCtaButton || FALLBACK.bottomCtaButton,
      supportTitle: s.supportTitle || FALLBACK.supportTitle,
      supportText: s.supportText || FALLBACK.supportText,
      supportLinks: s.supportLinks?.length ? s.supportLinks : FALLBACK.supportLinks,
      supportCrisisText: s.supportCrisisText || FALLBACK.supportCrisisText,
      footerLeft: s.footerLeft || FALLBACK.footerLeft,
      footerRight: s.footerRight || FALLBACK.footerRight,
      navStats: s.navStats?.length ? s.navStats : FALLBACK.navStats
    };
  });
  return { content };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { content } = usePageContent();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = __nuxt_component_0;
      const _component_HeroSection = __nuxt_component_1;
      const _component_InsightQuote = __nuxt_component_2;
      const _component_CompanyIndex = __nuxt_component_3;
      const _component_BottomCta = __nuxt_component_4;
      const _component_MentalHealthSupport = __nuxt_component_5;
      const _component_SiteFooter = __nuxt_component_6;
      const _component_ReportModal = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0d0b12da>`);
      _push(ssrRenderComponent(_component_NavBar, {
        stats: unref(content).navStats
      }, null, _parent));
      _push(ssrRenderComponent(_component_HeroSection, { content: unref(content) }, null, _parent));
      _push(`<main data-v-0d0b12da>`);
      _push(ssrRenderComponent(_component_InsightQuote, {
        left: unref(content).insightLeft,
        right: unref(content).insightRight
      }, null, _parent));
      _push(ssrRenderComponent(_component_CompanyIndex, {
        subtitle: unref(content).indexSubtitle,
        title: unref(content).indexTitle
      }, null, _parent));
      _push(ssrRenderComponent(_component_BottomCta, {
        text: unref(content).bottomCtaText,
        "button-label": unref(content).bottomCtaButton
      }, null, _parent));
      _push(ssrRenderComponent(_component_MentalHealthSupport, {
        title: unref(content).supportTitle,
        text: unref(content).supportText,
        links: unref(content).supportLinks,
        "crisis-text": unref(content).supportCrisisText
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_SiteFooter, {
        left: unref(content).footerLeft,
        right: unref(content).footerRight
      }, null, _parent));
      _push(ssrRenderComponent(_component_ReportModal, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d0b12da"]]);

export { index as default };
//# sourceMappingURL=index-BE_eR3rp.mjs.map
