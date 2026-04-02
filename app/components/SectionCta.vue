<template>
  <section
    id="contact"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <!-- Glow accents -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full opacity-15 blur-[120px] pointer-events-none"
      style="background: var(--portfolio-accent)"
    />

    <div class="relative max-w-3xl mx-auto text-center">
      <p
        ref="label"
        class="text-sm font-medium tracking-[0.2em] uppercase mb-6 opacity-0"
        style="color: var(--portfolio-accent)"
      >
        {{ $t("cta.label") }}
      </p>

      <h2
        ref="title"
        class="text-4xl md:text-6xl font-bold mb-8 opacity-0"
        style="color: var(--portfolio-text-primary)"
      >
        {{ $t("cta.title1") }}
        <br />
        <span class="gradient-text">{{ $t("cta.titleHighlight") }}</span>
      </h2>

      <p
        ref="subtitle"
        class="text-lg md:text-xl mb-12 opacity-0"
        style="color: var(--portfolio-text-secondary)"
      >
        {{ $t("cta.subtitle") }}
      </p>

      <!-- CTA Buttons -->
      <div ref="buttons" class="flex flex-wrap justify-center gap-4 opacity-0">
        <a
          v-for="link in links"
          :key="link.labelKey"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
          :style="
            link.primary
              ? {
                  background: 'var(--portfolio-accent)',
                  color: 'var(--portfolio-surface)',
                }
              : {
                  background: 'var(--portfolio-glass-bg)',
                  border: '1px solid var(--portfolio-glass-border)',
                  color: 'var(--portfolio-text-primary)',
                }
          "
        >
          <UIcon :name="link.icon" class="w-5 h-5" aria-hidden="true" />
          {{ $t(link.labelKey) }}
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <!-- Footer -->
      <div
        ref="footer"
        class="mt-20 pt-8 opacity-0"
        style="border-top: 1px solid var(--portfolio-glass-border)"
      >
        <p class="text-sm" style="color: var(--portfolio-text-secondary)">
          {{ $t("cta.footer") }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { gsap, ScrollTrigger } = useGsap();

  const sectionRef = ref<HTMLElement>();
  const label = ref<HTMLElement>();
  const title = ref<HTMLElement>();
  const subtitle = ref<HTMLElement>();
  const buttons = ref<HTMLElement>();
  const footer = ref<HTMLElement>();

  const links = [
    {
      labelKey: "cta.linkedin",
      icon: "i-simple-icons-linkedin",
      url: "https://www.linkedin.com/in/william-lopes-856080143",
      primary: true,
    },
    {
      labelKey: "cta.github",
      icon: "i-simple-icons-github",
      url: "https://github.com/Will-lopesz",
      primary: false,
    },
    {
      labelKey: "cta.email",
      icon: "i-heroicons-envelope",
      url: "mailto:lopes.will1616@gmail.com",
      primary: false,
    },
  ];
  import { UIcon } from "#components";

  onMounted(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.value!,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .fromTo(
              label.value!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            )
            .fromTo(
              title.value!,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
              "-=0.3"
            )
            .fromTo(
              subtitle.value!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.4"
            )
            .fromTo(
              buttons.value!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.3"
            )
            .fromTo(footer.value!, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
        },
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
