import { useLayoutEffect, useRef } from 'react'
import { languages } from '../data/copy'

const navLinkClass =
  'nav-lift inline-flex min-h-10 items-center whitespace-nowrap rounded-lg px-1.5 text-sm font-medium min-[360px]:text-[0.9375rem] sm:px-2.5'

function Header({ text, language, setLanguage, homePath = '' }) {
  const headerRef = useRef(null)

  useLayoutEffect(() => {
    if (!('ResizeObserver' in window)) return

    const header = headerRef.current
    const pageStyle = document.documentElement.style
    const updateHeaderHeight = () => {
      pageStyle.setProperty('--header-height', `${header.getBoundingClientRect().height}px`)
    }

    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(header, { box: 'border-box' })

    return () => {
      observer.disconnect()
      pageStyle.removeProperty('--header-height')
    }
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-2.5 py-2 min-[360px]:gap-1.5 min-[360px]:px-3 sm:gap-3 sm:px-6 sm:py-3">
        <a
          href={`${homePath}#home`}
          aria-label={text.home}
          className="nav-lift inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-lg min-[360px]:size-10 sm:w-auto sm:px-2"
        >
          <img
            src="/portfolio-icon.png"
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="hidden font-semibold sm:inline">
            {text.name.split(' ')[0]}
          </span>
        </a>

        <nav aria-label={text.navigation} className="flex items-center sm:ml-auto sm:gap-1">
          <a href={`${homePath}#about`} className={navLinkClass}>{text.about}</a>
          <a href={`${homePath}#projects`} className={navLinkClass}>{text.projects}</a>
        </nav>

        <div
          role="group"
          aria-label={text.language}
          style={{ '--language-index': languages.findIndex(({ code }) => code === language) }}
          className="language-switch flex shrink-0 rounded-full border border-border bg-background p-0.5 sm:ml-2 sm:gap-1 sm:p-1"
        >
          {languages.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-label={label}
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
              className="language-choice press-feedback grid size-7 cursor-pointer place-items-center rounded-full text-xs font-semibold uppercase min-[360px]:size-8"
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
