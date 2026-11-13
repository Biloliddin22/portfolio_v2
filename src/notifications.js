export function notify(code) {
  window.dispatchEvent(new CustomEvent('portfolio-notice', { detail: code }))
}

const messages = {
  en: {
    videoOffline: 'Connect to the internet to watch the video, then press Play again.',
    videoError: 'The video is unavailable right now. Please try playing it again.',
    downloadOffline: 'This file is not saved on your device. Connect to the internet and try again.',
    downloadError: 'The file could not be downloaded. Please try again.',
    close: 'Close notification',
  },
  ru: {
    videoOffline: 'Для просмотра видео нужен интернет. Подключитесь и нажмите «Смотреть» ещё раз.',
    videoError: 'Сейчас видео недоступно. Попробуйте запустить его ещё раз.',
    downloadOffline: 'Этот файл не сохранён на устройстве. Подключитесь к интернету и повторите скачивание.',
    downloadError: 'Не удалось скачать файл. Попробуйте ещё раз.',
    close: 'Закрыть уведомление',
  },
  uz: {
    videoOffline: 'Videoni ko‘rish uchun internetga ulaning va ijroni qayta boshlang.',
    videoError: 'Hozir video mavjud emas. Qayta ijro etib ko‘ring.',
    downloadOffline: 'Bu fayl qurilmangizda saqlanmagan. Internetga ulaning va qayta urinib ko‘ring.',
    downloadError: 'Faylni yuklab bo‘lmadi. Qayta urinib ko‘ring.',
    close: 'Bildirishnomani yopish',
  },
}

export function noticeText(code, language) {
  return messages[language]?.[code] || messages.en[code] || ''
}
