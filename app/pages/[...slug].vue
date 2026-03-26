<template>
  <div class="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-slate-900">
    <UError
      :error="{
        statusCode: 404,
        statusMessage: 'Página não encontrada',
        message: 'Bah... essa ai eu não fiz, fico te devendo',
      }"
    />
  </div>
</template>
