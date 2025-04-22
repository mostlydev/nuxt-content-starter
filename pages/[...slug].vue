<script setup>
const slug = useRoute().params.slug
const { data: page } = await useAsyncData(`content-${Array.isArray(slug) ? slug.join('/') : slug}`, () => {
  const path = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`
  return queryCollection('content').path(path).first()
})

useSeoMeta({
  title: page.value?.title || 'Page Not Found',
  description: page.value?.description || 'The requested page could not be found'
})

// Set 404 status and redirect to home after 5 seconds if page not found
const router = useRouter()
if (!page.value) {
  // Set HTTP status to 404
  setResponseStatus(404)

  // Redirect to home with 302 redirect after 5 seconds
  setTimeout(() => {
    navigateTo('/', { redirectCode: 302 })
  }, 5000)
}
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="text-center max-w-md">
      <h1 class="text-4xl font-bold text-primary-50 dark:text-primary-50 mb-4">Page Not Found</h1>
      <p class="text-zinc-100 dark:text-zinc-100 mb-6">Sorry, we couldn't find the page you're looking for.</p>
      <p class="text-zinc-100 dark:text-zinc-100 text-sm mb-8">Redirecting to home page in 5 seconds...</p>
      <NuxtLink to="/" class="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white hover:text-white rounded-md transition-colors">
        Go Home Now
      </NuxtLink>
    </div>
  </div>
</template>
