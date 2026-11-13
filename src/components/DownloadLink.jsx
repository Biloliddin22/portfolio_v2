import { useEffect, useRef, useState } from 'react'
import { notify } from '../notifications'

export default function DownloadLink({ href, children, ...props }) {
  const request = useRef(null)
  const [pending, setPending] = useState(false)
  useEffect(() => () => request.current?.abort(), [])

  async function download(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (request.current) return
    const controller = new AbortController()
    request.current = controller
    setPending(true)
    try {
      // Fetch only after a click. Cached examples still work without a connection.
      const response = await fetch(href, { signal: controller.signal })
      if (!response.ok || response.headers.get('content-type')?.includes('text/html')) throw new Error('Unavailable file')
      const blob = await response.blob()
      if (!blob.size) throw new Error('Empty file')
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = href.split('/').pop()
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch (error) {
      if (error.name !== 'AbortError') notify(navigator.onLine ? 'downloadError' : 'downloadOffline')
    } finally {
      request.current = null
      if (!controller.signal.aborted) setPending(false)
    }
  }

  return <a {...props} href={href} download onClick={download} aria-busy={pending}>
    {pending && <span className="media-spinner size-4" aria-hidden="true" />}{children}
  </a>
}
