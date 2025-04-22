// Plugin to dynamically set font variables from runtimeConfig
export default defineNuxtPlugin({
  name: 'font-loader',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()

    if (process.client) {
      // Set CSS variables for fonts from runtime config
      document.documentElement.style.setProperty('--main-font', config.public.fonts.main)
      document.documentElement.style.setProperty('--code-font', config.public.fonts.code)
    }
  }
})
