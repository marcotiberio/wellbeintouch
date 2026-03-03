<script setup lang="ts">
const { content } = usePageContent()
</script>

<template>
  <div>
    <NavBar />
    <HeroSection :content="content" />

    <main>
      <InsightQuote :left="content.insightLeft" :right="content.insightRight" />
      <CompanyIndex :subtitle="content.indexSubtitle" :title="content.indexTitle" />
      <MentalHealthSupport
        :title="content.supportTitle"
        :text="content.supportText"
        :crisis-text="content.supportCrisisText"
      />
    </main>

    <SiteFooter :left="content.footerLeft" :right="content.footerRight" />
    <ReportModal />
  </div>
</template>

<style scoped>
main {
  max-width: 1680px;
  margin: 0 auto;
  padding: 96px 48px 88px;
}

@media (max-width: 768px) {
  main { padding: 0 20px 64px; }
}
</style>
