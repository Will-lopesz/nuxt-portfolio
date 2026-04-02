<template>
  <section
    id="expertise"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface-alt)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-20">
        <p
          ref="label"
          class="text-sm font-medium tracking-[0.2em] uppercase mb-4 opacity-0"
          style="color: var(--portfolio-accent)"
        >
          {{ $t("expertise.label") }}
        </p>
        <h2
          ref="title"
          class="text-3xl md:text-5xl font-bold mb-6 opacity-0"
          style="color: var(--portfolio-text-primary)"
        >
          {{ $t("expertise.title") }}
        </h2>
        <p
          ref="subtitle"
          class="text-lg max-w-2xl mx-auto opacity-0"
          style="color: var(--portfolio-text-secondary)"
        >
          {{ $t("expertise.subtitle") }}
        </p>
      </div>

      <!-- Flow Diagram -->
      <div class="relative">
        <!-- Connecting line (animated) -->
        <div
          ref="connectLine"
          class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0 origin-left scale-x-0"
          style="background: linear-gradient(90deg, var(--portfolio-accent), #818cf8, #f472b6)"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div
            v-for="(step, index) in steps"
            :key="step.titleKey"
            :ref="(el) => (stepRefs[index] = el as HTMLElement)"
            class="glass-card p-8 text-center opacity-0"
          >
            <!-- Icon -->
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110"
              :style="{
                background: step.iconBg,
                boxShadow: `0 0 30px ${step.glow}`,
              }"
            >
              <span class="text-2xl">{{ step.icon }}</span>
            </div>

            <div
              class="text-xs font-bold tracking-widest uppercase mb-3"
              style="color: var(--portfolio-accent)"
            >
              {{ $t(step.phaseKey) }}
            </div>

            <h3 class="text-xl font-bold mb-3" style="color: var(--portfolio-text-primary)">
              {{ $t(step.titleKey) }}
            </h3>
            <p class="text-sm leading-relaxed" style="color: var(--portfolio-text-secondary)">
              {{ $t(step.descriptionKey) }}
            </p>

            <!-- Tech list -->
            <div class="mt-5 flex flex-wrap justify-center gap-2">
              <span
                v-for="tech in step.technologies"
                :key="tech"
                class="text-xs px-3 py-1 rounded-full"
                style="
                  background: var(--portfolio-glass-bg);
                  border: 1px solid var(--portfolio-glass-border);
                  color: var(--portfolio-text-secondary);
                "
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
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
  const connectLine = ref<HTMLElement>();
  const stepRefs = ref<HTMLElement[]>([]);

  const steps = [
    {
      phaseKey: "expertise.phase1.phase",
      titleKey: "expertise.phase1.title",
      descriptionKey: "expertise.phase1.description",
      icon: "🏗️",
      iconBg: "rgba(56, 189, 248, 0.15)",
      glow: "rgba(56, 189, 248, 0.1)",
      technologies: ["Clean Architecture", "Module Federation", "TypeScript", "Monorepo"],
    },
    {
      phaseKey: "expertise.phase2.phase",
      titleKey: "expertise.phase2.title",
      descriptionKey: "expertise.phase2.description",
      icon: "⚡",
      iconBg: "rgba(129, 140, 248, 0.15)",
      glow: "rgba(129, 140, 248, 0.1)",
      technologies: ["React Native", "Expo", "EAS Build", "Jest", "Detox"],
    },
    {
      phaseKey: "expertise.phase3.phase",
      titleKey: "expertise.phase3.title",
      descriptionKey: "expertise.phase3.description",
      icon: "🚀",
      iconBg: "rgba(244, 114, 182, 0.15)",
      glow: "rgba(244, 114, 182, 0.1)",
      technologies: ["App Store", "Google Play", "OTA Updates", "Sentry", "Firebase"],
    },
  ];

  onMounted(() => {
    const ctx = gsap.context(() => {
      // Header
      ScrollTrigger.create({
        trigger: sectionRef.value!,
        start: "top 80%",
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
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.3"
            )
            .fromTo(
              subtitle.value!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.3"
            );
        },
      });

      // Connecting line
      ScrollTrigger.create({
        trigger: connectLine.value!,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(connectLine.value!, {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
          });
        },
      });

      // Steps stagger
      stepRefs.value.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
                delay: i * 0.2,
              }
            );
          },
        });
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
