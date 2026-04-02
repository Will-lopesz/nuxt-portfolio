<template>
  <div>
    <FloatingNav />
    <SectionHero />
    <SectionMetrics />
    <SectionProjects />
    <SectionExpertise />
    <SectionFullStack />
    <SectionTimeline />
    <SectionAbout />
    <SectionCta />
  </div>
</template>

<script setup lang="ts">
  const { t } = useI18n();

  useHead({
    title: () => t("meta.title"),
    meta: [
      {
        name: "description",
        content: () => t("meta.description"),
      },
    ],
    link: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  });
</script>
