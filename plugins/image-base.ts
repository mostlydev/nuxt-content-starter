export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL

  // Remove double slashes and ensure proper path handling
  nuxtApp.hook('app:created', () => {
    if (process.client) {
      window.__NUXT__.config = window.__NUXT__.config || {}
      window.__NUXT__.config.app = window.__NUXT__.config.app || {}
      window.__NUXT__.config.app.baseURL = baseURL
      window.__NUXT__.config.public = window.__NUXT__.config.public || {}
      window.__NUXT__.config.public.baseURL = baseURL
    }
  })
})
