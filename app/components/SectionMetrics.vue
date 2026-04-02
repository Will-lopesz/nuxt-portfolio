<template>
  <section
    id="metrics"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <div class="max-w-6xl mx-auto">
      <p
        ref="label"
        class="text-sm font-medium tracking-[0.2em] uppercase text-center mb-4 opacity-0"
        style="color: var(--portfolio-accent)"
      >
        {{ $t("metrics.label") }}
      </p>
      <h2
        ref="title"
        class="text-3xl md:text-5xl font-bold text-center mb-20 opacity-0"
        style="color: var(--portfolio-text-primary)"
      >
        {{ $t("metrics.title") }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.labelKey"
          :ref="(el) => (metricRefs[index] = el as HTMLElement)"
          class="glass-card p-8 md:p-10 text-center opacity-0"
        >
          <div class="text-5xl md:text-6xl font-bold mb-3" style="color: var(--portfolio-accent)">
            <span :ref="(el) => (counterRefs[index] = el as HTMLElement)">0</span
            >{{ metric.suffix }}
          </div>
          <p class="text-lg font-medium mb-2" style="color: var(--portfolio-text-primary)">
            {{ $t(metric.labelKey) }}
          </p>
          <p class="text-sm" style="color: var(--portfolio-text-secondary)">
            {{ $t(metric.descriptionKey) }}
          </p>
        </div>
      </div>

      <!-- Sole developer badge -->
      <div ref="badge" class="mt-16 flex justify-center opacity-0">
        <div class="glass-card inline-flex items-center gap-3 px-6 py-3 rounded-full">
          <div
            class="w-2 h-2 rounded-full animate-pulse"
            style="background: var(--portfolio-accent)"
          />
          <span class="text-sm font-medium" style="color: var(--portfolio-text-secondary)">
            {{ $t("metrics.badge") }}
          </span>
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
  const badge = ref<HTMLElement>();
  const metricRefs = ref<HTMLElement[]>([]);
  const counterRefs = ref<HTMLElement[]>([]);

  const metrics = [
    {
      value: 50000,
      suffix: "+",
      labelKey: "metrics.users.label",
      descriptionKey: "metrics.users.description",
    },
    {
      value: 600,
      suffix: "+",
      labelKey: "metrics.schools.label",
      descriptionKey: "metrics.schools.description",
    },
    {
      value: 3,
      suffix: "M+",
      labelKey: "metrics.impacted.label",
      descriptionKey: "metrics.impacted.description",
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
          gsap.to(label.value!, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.fromTo(
            title.value!,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
          );
        },
      });

      // Metric cards staggered reveal + count-up
      metricRefs.value.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 50, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.15,
              }
            );

            // Count-up
            const counter = { val: 0 };
            const metric = metrics[i];
            if (!metric) return;
            const target = metric.value;
            gsap.to(counter, {
              val: target,
              duration: 2,
              delay: i * 0.15 + 0.3,
              ease: "power2.out",
              onUpdate: () => {
                if (counterRefs.value[i]) {
                  counterRefs.value[i].textContent =
                    target >= 1000
                      ? Math.floor(counter.val).toLocaleString("en-US")
                      : Math.floor(counter.val).toString();
                }
              },
            });
          },
        });
      });

      // Badge
      ScrollTrigger.create({
        trigger: badge.value!,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            badge.value!,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        },
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
