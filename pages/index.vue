<script setup lang="ts">
const { content } = usePageContent()
</script>

<template>
  <div>
    <NavBar :stats="content.navStats" />
    <HeroSection :content="content" />

    <main>
      <InsightQuote :left="content.insightLeft" :right="content.insightRight" />
      <CompanyIndex :subtitle="content.indexSubtitle" :title="content.indexTitle" />
      <BottomCta :text="content.bottomCtaText" :button-label="content.bottomCtaButton" />
      <MentalHealthSupport
        :title="content.supportTitle"
        :text="content.supportText"
        :links="content.supportLinks"
        :crisis-text="content.supportCrisisText"
      />
    </main>

    <SiteFooter :left="content.footerLeft" :right="content.footerRight" />
    <ReportModal />
  </div>
</template>

<style scoped>
main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 0 96px;
}

@media (max-width: 768px) {
  main { padding: 0 20px 64px; }
}
</style>
