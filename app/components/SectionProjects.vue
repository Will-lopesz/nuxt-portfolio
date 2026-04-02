<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <!-- Header -->
    <div class="section-padding pb-0">
      <div class="max-w-6xl mx-auto text-center">
        <p
          ref="label"
          class="text-sm font-medium tracking-[0.2em] uppercase mb-4 opacity-0"
          style="color: var(--portfolio-accent)"
        >
          {{ $t("projects.label") }}
        </p>
        <h2
          ref="title"
          class="text-3xl md:text-5xl font-bold mb-6 opacity-0"
          style="color: var(--portfolio-text-primary)"
        >
          {{ $t("projects.title") }}
        </h2>
        <p
          ref="subtitle"
          class="text-lg max-w-2xl mx-auto opacity-0"
          style="color: var(--portfolio-text-secondary)"
        >
          {{ $t("projects.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Horizontal scroll container -->
    <div ref="scrollContainer" class="relative mt-20">
      <div ref="scrollTrack" class="flex gap-8 px-8 md:px-16 will-change-transform">
        <div
          v-for="(project, index) in projects"
          :key="project.titleKey"
          :ref="(el) => (cardRefs[index] = el as HTMLElement)"
          class="shrink-0 w-[85vw] md:w-150 lg:w-175 transition-all duration-500"
        >
          <div class="glass-card overflow-hidden group h-full">
            <!-- Phone mockup area -->
            <div
              class="relative h-72 md:h-80 flex items-center justify-center overflow-hidden"
              :style="{ background: project.gradient }"
            >
              <!-- Placeholder phone mockup -->
              <div
                class="relative w-44 md:w-52 h-56 md:h-64 rounded-4xl border-[3px] border-white/20 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style="background: var(--portfolio-surface-alt)"
              >
                <div
                  class="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20"
                />
                <div class="flex items-center justify-center h-full">
                  <span class="text-3xl">{{ project.icon }}</span>
                </div>
              </div>
            </div>

            <!-- Card content -->
            <div class="p-6 md:p-8">
              <h3
                class="text-xl md:text-2xl font-bold mb-2"
                style="color: var(--portfolio-text-primary)"
              >
                {{ $t(project.titleKey) }}
              </h3>
              <p
                class="text-sm mb-4 leading-relaxed"
                style="color: var(--portfolio-text-secondary)"
              >
                {{ $t(project.descriptionKey) }}
              </p>

              <!-- Tech stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="text-xs px-3 py-1 rounded-full font-medium"
                  style="
                    background: var(--portfolio-glass-bg);
                    border: 1px solid var(--portfolio-glass-border);
                    color: var(--portfolio-accent);
                  "
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Impact -->
              <p class="text-sm font-medium" style="color: var(--portfolio-accent)">
                {{ $t(project.impactKey) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Spacer to allow last card to have breathing room -->
        <div class="shrink-0 w-16 md:w-24" />
      </div>

      <!-- Scroll progress bar -->
      <div class="max-w-6xl mx-auto px-8 mt-12 mb-20">
        <div
          class="h-0.5 rounded-full overflow-hidden"
          style="background: var(--portfolio-glass-border)"
        >
          <div
            ref="progressBar"
            class="h-full rounded-full w-0"
            style="background: var(--portfolio-accent)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { gsap, ScrollTrigger } = useGsap();

  const sectionRef = ref<HTMLElement>();
  const scrollContainer = ref<HTMLElement>();
  const scrollTrack = ref<HTMLElement>();
  const progressBar = ref<HTMLElement>();
  const label = ref<HTMLElement>();
  const title = ref<HTMLElement>();
  const subtitle = ref<HTMLElement>();
  const cardRefs = ref<HTMLElement[]>([]);

  const projects = [
    {
      titleKey: "projects.designsystem.title",
      descriptionKey: "projects.designsystem.description",
      stack: ["React Native", "TypeScript", "Design System"],
      impactKey: "projects.designsystem.impact",
      icon: "🧩",
      gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    },
    {
      titleKey: "projects.mundoim.title",
      descriptionKey: "projects.mundoim.description",
      stack: ["React Native", "Expo", "Firebase"],
      impactKey: "projects.mundoim.impact",
      icon: "📱",
      gradient: "linear-gradient(135deg, #0EA5E9, #6366F1)",
    },
    {
      titleKey: "projects.instrutor.title",
      descriptionKey: "projects.instrutor.description",
      stack: ["React Native", "Expo", "Remote Config"],
      impactKey: "projects.instrutor.impact",
      icon: "🎓",
      gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    },
    {
      titleKey: "projects.crm.title",
      descriptionKey: "projects.crm.description",
      stack: ["React Native", "Offline-first", "Firebase"],
      impactKey: "projects.crm.impact",
      icon: "💼",
      gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    },
    {
      titleKey: "projects.smartpos.title",
      descriptionKey: "projects.smartpos.description",
      stack: ["Android", "Kotlin", "Jetpack Compose"],
      impactKey: "projects.smartpos.impact",
      icon: "💳",
      gradient: "linear-gradient(135deg, #10B981, #0EA5E9)",
    },
    {
      titleKey: "projects.impay.title",
      descriptionKey: "projects.impay.description",
      stack: ["React Native", "Expo", "NestJS", "Redis"],
      impactKey: "projects.impay.impact",
      icon: "🏦",
      gradient: "linear-gradient(135deg, #6366F1, #A855F7)",
    },
    {
      titleKey: "projects.flutter.title",
      descriptionKey: "projects.flutter.description",
      stack: ["Flutter", "Dart"],
      impactKey: "projects.flutter.impact",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #EC4899, #F97316)",
    },
  ];

  onMounted(() => {
    const ctx = gsap.context(() => {
      // Header animations
      ScrollTrigger.create({
        trigger: sectionRef.value!,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.fromTo(
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

          // Initialize cards with their starting state
          cardRefs.value.forEach((card, i) => {
            tl.fromTo(
              card,
              { opacity: 0.4, scale: 0.92 },
              { opacity: 0.4, scale: 0.92, duration: 0.1 },
              "-=0.3"
            );
          });
        },
      });

      // Horizontal scroll with GSAP ScrollTrigger
      const totalWidth = scrollTrack.value!.scrollWidth - scrollContainer.value!.offsetWidth;

      const horizontalScrollTl = gsap.to(scrollTrack.value!, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer.value!,
          start: "top 15%",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self: globalThis.ScrollTrigger) => {
            // Update progress bar
            if (progressBar.value) {
              gsap.set(progressBar.value, {
                width: `${self.progress * 100}%`,
              });
            }

            // Update card opacity/scale based on visibility in viewport
            const containerWidth = scrollContainer.value!.offsetWidth;
            const scrollPos = Math.abs(gsap.getProperty(scrollTrack.value!, "x") as number);

            cardRefs.value.forEach((card) => {
              const cardLeft = card.offsetLeft;
              const cardRight = cardLeft + card.offsetWidth;

              // Check if card is visible in the current viewport
              const isVisible = cardRight > scrollPos && cardLeft < scrollPos + containerWidth;

              gsap.set(card, {
                opacity: isVisible ? 1 : 0.4,
                scale: isVisible ? 1 : 0.92,
              });
            });
          },
        },
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
