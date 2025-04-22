<template>
  <div class="two-column-container my-8">
    <div class="grid md:grid-cols-2 gap-8">
      <div class="column-left">
        <slot name="left" />
      </div>
      <div class="column-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Two-column layout component for Nuxt Content
</script>
