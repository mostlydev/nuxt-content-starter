<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Add color-scheme meta tag to support OS-level preference
useHead({
  title: 'Nuxt Content Starter',
  titleTemplate: '%s | Nuxt Content Starter',
  meta: [
    {
      name: 'color-scheme',
      content: 'light dark'
    }
  ]
})
</script>

<style>
/* Minimal CSS - Tailwind will handle most styling via main.css */
</style>
