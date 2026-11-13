import { useSyncExternalStore } from 'react'

const copy = {
  en: 'Offline. Video, installers and external demos need an internet connection.',
  ru: 'Офлайн. Для видео, установщиков и внешних демо нужен интернет.',
  uz: 'Oflayn. Video, o‘rnatish fayllari va tashqi demolar uchun internet kerak.',
}

function subscribe(notify) {
  window.addEventListener('online', notify)
  window.addEventListener('offline', notify)
  return () => {
    window.removeEventListener('online', notify)
    window.removeEventListener('offline', notify)
  }
}

function getOnlineStatus() {
  return navigator.onLine
}

function OfflineNotice({ language }) {
  const online = useSyncExternalStore(subscribe, getOnlineStatus)
  if (online) return null

  return (
    <p role="status" className="fixed right-3 bottom-3 left-3 z-40 rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-secondary shadow-sm sm:left-auto sm:max-w-sm">
      {copy[language]}
    </p>
  )
}

export default OfflineNotice
