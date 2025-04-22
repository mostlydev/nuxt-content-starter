<template>
  <div class="nuxt-site min-h-screen flex flex-col">
    <Navbar />

    <main class="site-main px-0 w-full flex-grow" style="padding-top: 72px;">
      <div class="w-11/12 max-w-screen-lg mx-auto my-0 ">
        <slot />
      </div>
    </main>

    <footer class="site-footer bg-zinc-900 text-zinc-400 text-center text-sm py-6 mt-16">
      <div class="max-w-screen-lg mx-auto my-0 relative z-10">
        <p>&copy; {{ new Date().getFullYear() }} Company Name. All rights reserved.</p>
        <div class="footer-links mt-2">
          <NuxtLink to="/contact" class="text-zinc-400 hover:text-zinc-200 ">Contact Us</NuxtLink> &dash;
          <NuxtLink to="/privacy-policy" class="text-zinc-400 hover:text-zinc-200">Privacy Policy</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No script needed anymore
</script>
<style scoped>
.nuxt-site {
  flex-direction: column;
}

.site-footer {
  position: relative;
  overflow: hidden;
}
</style>
