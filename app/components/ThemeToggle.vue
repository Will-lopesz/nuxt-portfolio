<template>
  <button
    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
    style="
      background: var(--portfolio-glass-bg);
      border: 1px solid var(--portfolio-glass-border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    "
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Transition name="theme-icon" mode="out-in">
      <svg
        v-if="isDark"
        key="sun"
        class="w-5 h-5"
        style="color: var(--portfolio-accent)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        v-else
        key="moon"
        class="w-5 h-5"
        style="color: var(--portfolio-accent)"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Transition>
  </button>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.preference === "dark");

  const toggle = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
  };
</script>

<style scoped>
  .theme-icon-enter-active,
  .theme-icon-leave-active {
    transition: all 0.2s ease;
  }
  .theme-icon-enter-from {
    opacity: 0;
    transform: rotate(-90deg) scale(0);
  }
  .theme-icon-leave-to {
    opacity: 0;
    transform: rotate(90deg) scale(0);
  }
</style>
