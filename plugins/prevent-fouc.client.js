export default defineNuxtPlugin({
  name: 'prevent-fouc',
  enforce: 'pre', // This ensures the plugin runs before others
  setup() {
    // Add a style element to hide body until styles are loaded
    const style = document.createElement('style')
    style.textContent = `
      body:not(.content-loaded) {
        visibility: hidden;
      }
      body.content-loaded {
        visibility: visible;
      }
    `
    document.head.appendChild(style)

    // Mark body as loaded immediately on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('content-loaded')
    })

    // Ensure body is shown even if something goes wrong
    window.addEventListener('load', () => {
      document.body.classList.add('content-loaded')
    })

    // Mark as loaded after a short timeout as fallback
    setTimeout(() => {
      document.body.classList.add('content-loaded')
    }, 100)
  }
})
