import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { noticeText } from '../notifications'

export default function Notifications({ language }) {
  const [notice, setNotice] = useState(null)
  const [container, setContainer] = useState(document.body)
  const element = useRef(null)
  const timer = useRef(null)
  const paused = useRef(false)
  const previousFocus = useRef(null)

  useEffect(() => {
    const receive = (event) => {
      previousFocus.current = document.activeElement
      setNotice({ code: event.detail, id: performance.now() })
    }
    const fullscreen = () => setContainer(document.fullscreenElement || document.body)
    window.addEventListener('portfolio-notice', receive)
    document.addEventListener('fullscreenchange', fullscreen)
    return () => {
      window.removeEventListener('portfolio-notice', receive)
      document.removeEventListener('fullscreenchange', fullscreen)
    }
  }, [])

  useEffect(() => {
    const box = element.current
    if (!notice || !box) return
    box.showPopover?.()
    timer.current = setTimeout(() => {
      if (!paused.current) setNotice(null)
    }, 4500)
    return () => clearTimeout(timer.current)
  }, [notice, container])

  function resume() {
    if (element.current?.matches(':hover, :focus-within')) return
    paused.current = false
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setNotice(null), 4500)
  }

  return createPortal(
    <div className="notice-region" role="status" aria-live="polite" aria-atomic="true">
      {notice && <div ref={element} popover="manual" className="site-notice" onMouseEnter={() => { paused.current = true }} onMouseLeave={resume} onFocus={() => { paused.current = true }} onBlur={resume}>
        <p>{noticeText(notice.code, language)}</p>
        <button type="button" className="press-feedback" aria-label={noticeText('close', language)} onClick={() => {
          if (element.current?.contains(document.activeElement)) previousFocus.current?.focus?.({ preventScroll: true })
          paused.current = false
          setNotice(null)
        }}>×</button>
      </div>}
    </div>, container,
  )
}
