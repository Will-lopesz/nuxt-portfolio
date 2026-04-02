<template>
  <section
    id="about"
    ref="sectionRef"
    class="section-padding relative overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <!-- Photo placeholder -->
        <div ref="photoWrapper" class="opacity-0 flex justify-center md:justify-start">
          <div class="relative">
            <!-- Glow ring -->
            <div
              class="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
              style="background: linear-gradient(135deg, var(--portfolio-accent), #818cf8)"
            />
            <!-- Photo container -->
            <div
              class="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden"
              style="
                background: var(--portfolio-surface-alt);
                border: 1px solid var(--portfolio-glass-border);
              "
            >
              <!-- Placeholder avatar -->
              <img
                src="/me.webp"
                alt="Foto de perfil"
                class="w-full h-full object-cover object-center select-none"
                draggable="false"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Text content -->
        <div ref="textContent" class="opacity-0">
          <p
            class="text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style="color: var(--portfolio-accent)"
          >
            {{ $t("about.label") }}
          </p>
          <h2
            class="text-3xl md:text-4xl font-bold mb-6"
            style="color: var(--portfolio-text-primary)"
          >
            {{ $t("about.title") }}
            <span class="gradient-text">{{ $t("about.titleHighlight") }}</span>
          </h2>
          <div
            class="space-y-4 text-base leading-relaxed"
            style="color: var(--portfolio-text-secondary)"
          >
            <p>{{ $t("about.paragraph1") }}</p>
            <p>{{ $t("about.paragraph2") }}</p>
            <p>{{ $t("about.paragraph3") }}</p>
          </div>

          <!-- Key traits -->
          <div class="mt-8 flex flex-wrap gap-3">
            <span
              v-for="traitKey in traitKeys"
              :key="traitKey"
              class="text-sm px-4 py-2 rounded-full font-medium"
              style="
                background: var(--portfolio-glass-bg);
                border: 1px solid var(--portfolio-glass-border);
                color: var(--portfolio-accent);
              "
            >
              {{ $t(traitKey) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { gsap, ScrollTrigger } = useGsap();

  const sectionRef = ref<HTMLElement>();
  const photoWrapper = ref<HTMLElement>();
  const textContent = ref<HTMLElement>();

  const traitKeys = [
    "about.traits.ownership",
    "about.traits.product",
    "about.traits.architecture",
    "about.traits.leadership",
    "about.traits.learner",
  ];

  onMounted(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.value!,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            photoWrapper.value!,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
          );
          gsap.fromTo(
            textContent.value!,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: 0.2,
            }
          );
        },
      });
    }, sectionRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
