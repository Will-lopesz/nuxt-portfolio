<template>
  <section
    id="timeline"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface-alt)"
  >
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-20">
        <p
          ref="label"
          class="text-sm font-medium tracking-[0.2em] uppercase mb-4 opacity-0"
          style="color: var(--portfolio-accent)"
        >
          {{ $t("timeline.label") }}
        </p>
        <h2
          ref="title"
          class="text-3xl md:text-5xl font-bold mb-6 opacity-0"
          style="color: var(--portfolio-text-primary)"
        >
          {{ $t("timeline.title") }}
        </h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          ref="timelineLine"
          class="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 origin-top scale-y-0"
          style="
            background: linear-gradient(
              180deg,
              var(--portfolio-accent),
              #818cf8,
              var(--portfolio-accent)
            );
          "
        />

        <div class="space-y-12 md:space-y-16">
          <div
            v-for="(item, index) in timeline"
            :key="item.yearKey"
            :ref="(el) => (itemRefs[index] = el as HTMLElement)"
            class="relative flex items-start gap-6 md:gap-0 opacity-0"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- Dot -->
            <div
              class="absolute left-6 md:left-1/2 w-3 h-3 rounded-full md:-translate-x-1/2 z-10 shrink-0"
              :style="{
                background: item.color,
                boxShadow: `0 0 20px ${item.color}`,
              }"
            />

            <!-- Content -->
            <div
              class="ml-14 md:ml-0 md:w-[calc(50%-2rem)]"
              :class="index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'"
            >
              <div class="glass-card p-6">
                <span class="text-xs font-bold tracking-widest" :style="{ color: item.color }">
                  {{ $t(item.yearKey) }}
                </span>
                <h3
                  class="text-lg font-bold mt-2 mb-1"
                  style="color: var(--portfolio-text-primary)"
                >
                  {{ $t(item.titleKey) }}
                </h3>
                <p class="text-sm mb-3" style="color: var(--portfolio-text-secondary)">
                  {{ $t(item.descriptionKey) }}
                </p>
                <div class="flex flex-wrap gap-2" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="text-xs px-2 py-0.5 rounded-full"
                    style="
                      background: var(--portfolio-glass-bg);
                      border: 1px solid var(--portfolio-glass-border);
                      color: var(--portfolio-text-secondary);
                    "
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
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
  const timelineLine = ref<HTMLElement>();
  const itemRefs = ref<HTMLElement[]>([]);

  const timeline = [
    {
      yearKey: "timeline.items.education.year",
      titleKey: "timeline.items.education.title",
      descriptionKey: "timeline.items.education.description",
      tags: ["Java", "OOP", "Systems"],
      color: "#38BDF8",
    },
    {
      yearKey: "timeline.items.firstexp.year",
      titleKey: "timeline.items.firstexp.title",
      descriptionKey: "timeline.items.firstexp.description",
      tags: ["PHP", "Bootstrap", "Flutter"],
      color: "#818CF8",
    },
    {
      yearKey: "timeline.items.transition.year",
      titleKey: "timeline.items.transition.title",
      descriptionKey: "timeline.items.transition.description",
      tags: ["Networking", "Field Work", "Resilience"],
      color: "#A855F7",
    },
    {
      yearKey: "timeline.items.mobile.year",
      titleKey: "timeline.items.mobile.title",
      descriptionKey: "timeline.items.mobile.description",
      tags: ["React Native", "WebSocket", "Security"],
      color: "#F472B6",
    },
    {
      yearKey: "timeline.items.mix.year",
      titleKey: "timeline.items.mix.title",
      descriptionKey: "timeline.items.mix.description",
      tags: ["Architecture", "Scale", "Leadership"],
      color: "#22C55E",
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
            );
        },
      });

      // Timeline line draw
      ScrollTrigger.create({
        trigger: timelineLine.value!,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self: globalThis.ScrollTrigger) => {
          gsap.set(timelineLine.value!, {
            scaleY: self.progress,
          });
        },
      });

      // Timeline items stagger
      itemRefs.value.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
              }
            );
          },
        });
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
