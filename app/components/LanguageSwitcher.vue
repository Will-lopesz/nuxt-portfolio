<template>
  <button
    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
    style="
      background: var(--portfolio-glass-bg);
      border: 1px solid var(--portfolio-glass-border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    "
    :aria-label="`Switch to ${locale === 'pt' ? 'English' : 'Português'}`"
    @click="toggle"
  >
    <span class="text-xs font-bold tracking-wide" style="color: var(--portfolio-accent)">
      {{ locale === "pt" ? "EN" : "PT" }}
    </span>
  </button>
</template>

<script setup lang="ts">
  const { locale, setLocale } = useI18n();

  const toggle = () => {
    setLocale(locale.value === "pt" ? "en" : "pt");
  };
</script>
