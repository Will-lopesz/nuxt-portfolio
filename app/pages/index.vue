<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-sky-50 dark:bg-slate-900 transition-colors duration-300"
  >
    <div class="absolute top-6 right-6">
      <UButton
        icon="i-heroicons-moon-20-solid"
        variant="ghost"
        @click="toggleDarkMode"
        :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
      />
    </div>

    <div class="text-center px-6">
      <h1 class="text-4xl font-bold text-sky-900 dark:text-sky-100 mb-4">Bem-vindo ao Portfólio</h1>
      <p class="text-lg text-sky-700 dark:text-sky-300 mb-8">Em breve novidades por aqui! 🚀</p>
      <UButton to="/sobre"> Explorar </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.preference === "dark");

  const toggleDarkMode = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
  };
</script>
