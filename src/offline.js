export function registerOfflineSupport() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator) || !window.isSecureContext) return

  async function register() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      let lastCheck = performance.now()
      function checkForUpdate() {
        if (document.hidden || !navigator.onLine || !registration.active) return
        const now = performance.now()
        if (now - lastCheck < 30_000) return
        lastCheck = now
        registration.update().catch(() => {})
      }
      document.addEventListener('visibilitychange', checkForUpdate)
      window.addEventListener('online', checkForUpdate)
      window.addEventListener('focus', checkForUpdate)
    } catch (error) {
      console.warn('Portfolio offline cache could not be prepared', error)
    }
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(register, { timeout: 4000 })
    } else {
      window.setTimeout(register, 1000)
    }
  }

  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}
