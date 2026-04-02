<template>
  <!-- Top-right controls (always visible) -->
  <div class="fixed top-6 right-6 z-50 flex items-center gap-2">
    <LanguageSwitcher />
    <ThemeToggle />
    <!-- Mobile hamburger -->
    <button
      class="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
      style="
        background: var(--portfolio-glass-bg);
        border: 1px solid var(--portfolio-glass-border);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      "
      aria-label="Open menu"
      @click="openDrawer"
    >
      <svg
        class="w-5 h-5"
        style="color: var(--portfolio-accent)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <!-- Desktop floating pill nav -->
  <nav
    class="fixed top-6 left-1/2 -translate-x-1/2 z-40 px-1 py-1 rounded-full transition-all duration-500 hidden md:block"
    :class="visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'"
    style="
      background: var(--portfolio-glass-bg);
      border: 1px solid var(--portfolio-glass-border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    "
  >
    <div class="flex items-center gap-1">
      <button
        v-for="section in sections"
        :key="section.id"
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer"
        :style="
          active === section.id
            ? {
                background: 'var(--portfolio-accent)',
                color: 'var(--portfolio-surface)',
              }
            : {
                color: 'var(--portfolio-text-secondary)',
              }
        "
        @click="scrollTo(section.id)"
      >
        {{ section.labelKey ? $t(section.labelKey) : section.label }}
      </button>
    </div>
  </nav>

  <!-- Mobile drawer overlay -->
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-50"
        style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px)"
        @click="closeDrawer"
      />
    </Transition>

    <!-- Mobile drawer panel -->
    <Transition name="drawer-panel">
      <div
        v-if="drawerOpen"
        ref="drawerRef"
        class="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
        style="
          background: var(--portfolio-surface-alt);
          border-left: 1px solid var(--portfolio-glass-border);
        "
        @keydown.escape="closeDrawer"
      >
        <!-- Drawer header -->
        <div
          class="flex items-center justify-between px-6 py-5"
          style="border-bottom: 1px solid var(--portfolio-glass-border)"
        >
          <span
            class="text-sm font-bold tracking-widest uppercase"
            style="color: var(--portfolio-accent)"
          >
            Menu
          </span>
          <button
            class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            style="background: var(--portfolio-glass-bg)"
            aria-label="Close menu"
            @click="closeDrawer"
          >
            <svg
              class="w-4 h-4"
              style="color: var(--portfolio-text-secondary)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer nav links -->
        <nav class="flex-1 px-4 py-6">
          <div class="space-y-1">
            <button
              v-for="section in sections"
              :key="section.id"
              class="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              :style="
                active === section.id
                  ? {
                      background: 'var(--portfolio-glass-bg)',
                      color: 'var(--portfolio-accent)',
                    }
                  : {
                      color: 'var(--portfolio-text-secondary)',
                    }
              "
              @click="navigateTo(section.id)"
            >
              {{ section.labelKey ? $t(section.labelKey) : section.label }}
            </button>
          </div>
        </nav>

        <!-- Drawer footer with controls -->
        <div
          class="px-6 py-5 flex items-center gap-3"
          style="border-top: 1px solid var(--portfolio-glass-border)"
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const { t: $t } = useI18n();

  const visible = ref(false);
  const active = ref("");
  const drawerOpen = ref(false);
  const drawerRef = ref<HTMLElement>();

  const sections = [
    { id: "metrics", label: "Impact", labelKey: "nav.impact" },
    { id: "projects", label: "Work", labelKey: "nav.work" },
    { id: "expertise", label: "Expertise", labelKey: "nav.expertise" },
    { id: "timeline", label: "Journey", labelKey: "nav.journey" },
    { id: "about", label: "About", labelKey: "nav.about" },
    { id: "contact", label: "Contact", labelKey: "nav.contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openDrawer = () => {
    drawerOpen.value = true;
    document.body.style.overflow = "hidden";
    nextTick(() => {
      drawerRef.value?.focus();
    });
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    document.body.style.overflow = "";
  };

  const navigateTo = (id: string) => {
    closeDrawer();
    nextTick(() => scrollTo(id));
  };

  onMounted(() => {
    const handleScroll = () => {
      visible.value = window.scrollY > window.innerHeight * 0.5;

      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            active.value = section.id;
            break;
          }
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen.value) closeDrawer();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleEscape);

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    });
  });
</script>

<style scoped>
  .drawer-overlay-enter-active,
  .drawer-overlay-leave-active {
    transition: opacity 0.3s ease;
  }
  .drawer-overlay-enter-from,
  .drawer-overlay-leave-to {
    opacity: 0;
  }

  .drawer-panel-enter-active,
  .drawer-panel-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .drawer-panel-enter-from,
  .drawer-panel-leave-to {
    transform: translateX(100%);
  }
</style>
