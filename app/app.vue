<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();

  onMounted(() => {
    if (colorMode.preference === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      colorMode.preference = isDark ? "dark" : "light";
    }
  });

  onMounted(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (colorMode.preference === "system") {
        colorMode.preference = e.matches ? "dark" : "light";
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    onBeforeUnmount(() => {
      mediaQuery.removeEventListener("change", handleChange);
    });
  });
</script>
