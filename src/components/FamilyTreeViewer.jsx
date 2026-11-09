import { useEffect, useEffectEvent, useId, useLayoutEffect, useRef, useState } from 'react'

export const familyTreeImage = '/bilkin-media/family-tree-example.png'

const copy = {
  en: { open: 'Enlarge family tree', title: 'Family tree', out: 'Zoom out', in: 'Zoom in', fit: 'Fit', close: 'Close' },
  ru: { open: 'Увеличить семейное дерево', title: 'Семейное дерево', out: 'Уменьшить', in: 'Увеличить', fit: 'Вписать', close: 'Закрыть' },
  uz: { open: 'Shajarani kattalashtirish', title: 'Shajara', out: 'Kichraytirish', in: 'Kattalashtirish', fit: 'Sig‘dirish', close: 'Yopish' },
}

const control = 'grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-surface text-primary disabled:cursor-default disabled:opacity-40 enabled:hover:bg-accent-light'

function FamilyTreeViewer({ language, caption, className }) {
  const text = copy[language]
  const titleId = useId()
  const trigger = useRef(null)
  const dialog = useRef(null)
  const viewport = useRef(null)
  const image = useRef(null)
  const zoomAnchor = useRef(null)
  const drag = useRef(null)
  const [zoom, setZoom] = useState(100)

  useLayoutEffect(() => {
    const anchor = zoomAnchor.current
    if (!anchor) return

    const view = viewport.current
    const bounds = image.current.getBoundingClientRect()
    view.scrollLeft += bounds.left + anchor.x * bounds.width - anchor.clientX
    view.scrollTop += bounds.top + anchor.y * bounds.height - anchor.clientY
    zoomAnchor.current = null
  }, [zoom])

  function changeZoom(requested, point) {
    const next = Math.max(100, Math.min(400, requested))
    if (next === zoom) return

    const view = viewport.current.getBoundingClientRect()
    const bounds = image.current.getBoundingClientRect()
    const clientX = point?.clientX ?? view.left + view.width / 2
    const clientY = point?.clientY ?? view.top + view.height / 2
    zoomAnchor.current = {
      clientX,
      clientY,
      x: (clientX - bounds.left) / bounds.width,
      y: (clientY - bounds.top) / bounds.height,
    }
    setZoom(next)
  }

  const zoomWithWheel = useEffectEvent((event) => {
    if (event.ctrlKey || event.deltaY === 0) return

    event.preventDefault()
    changeZoom(zoom - Math.sign(event.deltaY) * 25, event)
  })

  useEffect(() => {
    const view = viewport.current
    const onWheel = (event) => zoomWithWheel(event)
    view.addEventListener('wheel', onWheel, { passive: false })
    return () => view.removeEventListener('wheel', onWheel)
  }, [])

  function openViewer() {
    dialog.current.showModal()
    viewport.current.scrollTo(0, 0)
  }

  function closeViewer() {
    zoomAnchor.current = null
    drag.current = null
    setZoom(100)
    trigger.current.focus({ preventScroll: true })
  }

  function startDrag(event) {
    if (zoom === 100 || event.pointerType !== 'mouse' || event.button !== 0) return

    const view = event.currentTarget
    drag.current = { x: event.clientX + view.scrollLeft, y: event.clientY + view.scrollTop }
    view.setPointerCapture(event.pointerId)
  }

  function moveDrag(event) {
    if (!drag.current) return

    event.currentTarget.scrollLeft = drag.current.x - event.clientX
    event.currentTarget.scrollTop = drag.current.y - event.clientY
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={text.open}
        aria-haspopup="dialog"
        onClick={openViewer}
        className={`relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border ${className}`}
      >
        <img src={familyTreeImage} alt="" width={2736} height={2320} loading="lazy" decoding="async" className="block h-auto w-full" />
        <span aria-hidden="true" className="absolute top-2 right-2 grid size-9 place-items-center rounded-full border border-border bg-surface text-accent shadow-sm">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="m15 15 4 4m-8.5-11v5m-2.5-2.5h5" />
          </svg>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={closeViewer}
        className="family-tree-dialog fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none flex-col overflow-hidden bg-surface text-primary open:flex"
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border p-2 sm:px-4">
          <h2 id={titleId} className="pl-1 font-semibold">{text.title}</h2>
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" className={control} aria-label={text.out} title={text.out} disabled={zoom === 100} onClick={() => changeZoom(zoom - 50)}>−</button>
            <output className="min-w-10 text-center text-xs text-secondary tabular-nums">{zoom}%</output>
            <button type="button" className={control} aria-label={text.in} title={text.in} disabled={zoom === 400} onClick={() => changeZoom(zoom + 50)}>+</button>
            <button type="button" className={control} aria-label={text.fit} title={text.fit} disabled={zoom === 100} onClick={() => changeZoom(100)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 4H4v5m11-5h5v5m0 6v5h-5M4 15v5h5" />
                <rect x="8" y="8" width="8" height="8" rx="1" />
              </svg>
            </button>
            <button type="button" className={control} aria-label={text.close} title={text.close} onClick={() => dialog.current.close()}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={viewport}
          role="region"
          tabIndex={0}
          aria-label={caption}
          className={`min-h-0 flex-1 overflow-auto overscroll-contain bg-background [container-type:size] ${zoom > 100 ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onLostPointerCapture={() => { drag.current = null }}
        >
          <div className="grid min-h-full min-w-full w-max place-items-center">
            <img
              ref={image}
              src={familyTreeImage}
              alt={caption}
              width={2736}
              height={2320}
              loading="lazy"
              draggable={false}
              style={{ width: `calc(min(100cqw, 100cqh * 2736 / 2320) * ${zoom / 100})` }}
              className="h-auto max-w-none select-none"
            />
          </div>
        </div>
      </dialog>
    </>
  )
}

export default FamilyTreeViewer
