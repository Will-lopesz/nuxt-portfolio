<template>
  <section
    id="fullstack"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-20">
        <p
          ref="label"
          class="text-sm font-medium tracking-[0.2em] uppercase mb-4 opacity-0"
          style="color: var(--portfolio-accent)"
        >
          {{ $t("fullstack.label") }}
        </p>
        <h2
          ref="title"
          class="text-3xl md:text-5xl font-bold mb-6 opacity-0"
          style="color: var(--portfolio-text-primary)"
        >
          {{ $t("fullstack.title") }}
        </h2>
        <p
          ref="subtitle"
          class="text-lg max-w-2xl mx-auto opacity-0"
          style="color: var(--portfolio-text-secondary)"
        >
          {{ $t("fullstack.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(tech, index) in techStack"
          :key="tech.name"
          :ref="(el) => (techRefs[index] = el as HTMLElement)"
          class="glass-card p-6 text-center group cursor-default opacity-0 transition-all duration-300 hover:border-(--portfolio-accent)/20"
        >
          <div
            class="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          >
            <UIcon :name="tech.icon" class="h-12 w-12 text-inherit" aria-hidden="true" />
          </div>
          <h3 class="text-sm font-bold mb-1" style="color: var(--portfolio-text-primary)">
            {{ tech.name }}
          </h3>
          <p class="text-xs" style="color: var(--portfolio-text-secondary)">
            {{ tech.category }}
          </p>
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
  const techRefs = ref<HTMLElement[]>([]);

  const techStack = [
    {
      name: "Vue.js",
      icon: "i-simple-icons-vuedotjs",
      category: "Web Interfaces",
    },
    {
      name: "Nuxt.js",
      icon: "i-simple-icons-nuxtdotjs",
      category: "SSR / Web Apps",
    },
    {
      name: "NestJS",
      icon: "i-simple-icons-nestjs",
      category: "APIs & Services",
    },
    {
      name: "Node.js",
      icon: "i-simple-icons-nodedotjs",
      category: "Runtime & Backend",
    },
    {
      name: "PostgreSQL",
      icon: "i-simple-icons-postgresql",
      category: "Relational Data",
    },
    {
      name: "MongoDB",
      icon: "i-simple-icons-mongodb",
      category: "Document Data",
    },
    {
      name: "Redis",
      icon: "i-simple-icons-redis",
      category: "Cache & Queues",
    },
  ];
  import { UIcon } from "#components";

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

      // Tech cards stagger
      techRefs.value.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                delay: i * 0.08,
              }
            );
          },
        });
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
