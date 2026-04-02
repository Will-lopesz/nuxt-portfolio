<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
    style="background-color: var(--portfolio-surface)"
  >
    <!-- Animated gradient background -->
    <div class="absolute inset-0 z-0">
      <div
        ref="gradientOrb1"
        class="absolute w-150 h-150 rounded-full opacity-30 blur-[120px]"
        style="background: var(--portfolio-accent); top: -10%; left: -10%"
      />
      <div
        ref="gradientOrb2"
        class="absolute w-125 h-125 rounded-full opacity-20 blur-[100px]"
        style="background: #818cf8; bottom: -15%; right: -10%"
      />
      <div
        ref="gradientOrb3"
        class="absolute w-75 h-75 rounded-full opacity-15 blur-[80px]"
        style="background: #f472b6; top: 40%; left: 50%"
      />
    </div>

    <!-- Subtle grid pattern -->
    <div
      class="absolute inset-0 z-0 opacity-[0.03]"
      style="
        background-image:
          linear-gradient(var(--portfolio-text-secondary) 1px, transparent 1px),
          linear-gradient(90deg, var(--portfolio-text-secondary) 1px, transparent 1px);
        background-size: 60px 60px;
      "
    />

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <div ref="heroContent">
        <p
          ref="heroTag"
          class="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 opacity-0"
          style="color: var(--portfolio-accent)"
        >
          {{ $t("hero.tag") }}
        </p>

        <h1
          ref="heroTitle"
          class="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8 opacity-0"
          style="color: var(--portfolio-text-primary)"
        >
          {{ $t("hero.title1") }}
          <br />
          <span class="gradient-text">{{ $t("hero.title2") }}</span> {{ $t("hero.title3") }}
          <br />
          {{ $t("hero.title4") }}
        </h1>

        <p
          ref="heroSubtitle"
          class="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0"
          style="color: var(--portfolio-text-secondary)"
        >
          {{ $t("hero.subtitle") }}
        </p>

        <div ref="heroCta" class="opacity-0">
          <button
            class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 cursor-pointer"
            style="background: var(--portfolio-accent); color: var(--portfolio-surface)"
            @click="scrollToWork"
          >
            {{ $t("hero.cta") }}
            <svg
              class="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      ref="scrollIndicator"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
    >
      <span
        class="text-xs tracking-widest uppercase"
        style="color: var(--portfolio-text-secondary)"
        >{{ $t("hero.scroll") }}</span
      >
      <div class="w-px h-8 overflow-hidden" style="background: var(--portfolio-glass-border)">
        <div ref="scrollLine" class="w-full h-full" style="background: var(--portfolio-accent)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { gsap, ScrollTrigger } = useGsap();

  const heroRef = ref<HTMLElement>();
  const gradientOrb1 = ref<HTMLElement>();
  const gradientOrb2 = ref<HTMLElement>();
  const gradientOrb3 = ref<HTMLElement>();
  const heroTag = ref<HTMLElement>();
  const heroTitle = ref<HTMLElement>();
  const heroSubtitle = ref<HTMLElement>();
  const heroCta = ref<HTMLElement>();
  const scrollIndicator = ref<HTMLElement>();
  const scrollLine = ref<HTMLElement>();

  const scrollToWork = () => {
    const target = document.getElementById("metrics");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  onMounted(() => {
    const ctx = gsap.context(() => {
      // Floating orbs animation
      gsap.to(gradientOrb1.value!, {
        x: 80,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(gradientOrb2.value!, {
        x: -60,
        y: -50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(gradientOrb3.value!, {
        x: 40,
        y: -30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Content entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(heroTag.value!, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .fromTo(
          heroTitle.value!,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          heroSubtitle.value!,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          heroCta.value!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(scrollIndicator.value!, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

      // Scroll line animation
      gsap.fromTo(
        scrollLine.value!,
        { y: "-100%" },
        {
          y: "100%",
          duration: 1.5,
          repeat: -1,
          ease: "power1.inOut",
        }
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.value!,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self: globalThis.ScrollTrigger) => {
          const progress = self.progress;
          gsap.set(heroRef.value!.querySelector(".z-10"), {
            y: progress * 100,
            opacity: 1 - progress * 1.5,
          });
        },
      });
    }, heroRef.value!);

    onUnmounted(() => ctx.revert());
  });
</script>
