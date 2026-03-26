<template>
  <div class="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-slate-900">
    <NuxtLink to="/" class="absolute top-6 left-6">
      <UButton icon="i-heroicons-arrow-left-20-solid" color="sky" variant="ghost" />
    </NuxtLink>

    <UError
      :error="{
        statusCode: error?.statusCode || 404,
        statusMessage: error?.statusMessage || 'Página não encontrada',
        message: 'Bah... essa ai eu não fiz, fico te devendo',
      }"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    error: any;
  }>();

  const handleError = () => clearError({ redirect: "/" });
</script>
