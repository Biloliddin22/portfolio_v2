import { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/Header'
import Notifications from './components/Notifications'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import { copy, languages } from './data/copy'

const languageKey = 'portfolio.language'

function App({ ProjectPage }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(languageKey)
    return languages.some(({ code }) => code === saved) ? saved : 'en'
  })
  const text = copy[language]
  const title = ProjectPage ? `BilKin | ${text.name}` : text.title
  const homePath = ProjectPage ? '/' : ''

  useEffect(() => {
    document.documentElement.lang = language
    document.title = title
    localStorage.setItem(languageKey, language)
  }, [language, title])

  useLayoutEffect(() => {
    // Direct links from project pages can arrive before React mounts the anchor.
    const anchor = document.getElementById(window.location.hash.slice(1))
    anchor?.scrollIntoView({ behavior: 'instant' })

    if (!('IntersectionObserver' in window)) {
      return
    }

    const root = document.getElementById('root')
    const revealObserver = new IntersectionObserver((entries) => {
      let cardIndex = 0
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || target.hasAttribute('data-revealed')) continue

        if (target.classList.contains('card-lift')) {
          target.style.setProperty('--reveal-delay', `${Math.min(cardIndex++, 2) * 70}ms`)
        }
        target.dataset.revealed = ''
        if (!target.hasAttribute('data-repeat-reveal')) revealObserver.unobserve(target)
      }
    }, { rootMargin: '0px 0px -48px 0px' })

    const exitObserver = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting || !target.hasAttribute('data-revealed')) continue
        if (target.matches(':focus-within') || root.querySelector('dialog[open]')) continue
        if ([...target.querySelectorAll('video')].some((video) => !video.paused && !video.ended)) continue

        target.dataset.replay = ''
        delete target.dataset.revealed
      }
    })

    const targets = root.querySelectorAll('[data-reveal]')
    targets.forEach((element) => {
      if (element.classList.contains('card-lift') || element.closest('footer, [data-repeat-reveals]')) {
        element.dataset.repeatReveal = ''
        exitObserver.observe(element)
      }
      revealObserver.observe(element)
    })
    root.dataset.revealReady = ''
    return () => {
      revealObserver.disconnect()
      exitObserver.disconnect()
      delete root.dataset.revealReady
      targets.forEach((element) => {
        delete element.dataset.repeatReveal
        delete element.dataset.replay
        delete element.dataset.revealed
      })
    }
  }, [ProjectPage])

  return (
    <>
      <Header text={text} language={language} setLanguage={setLanguage} homePath={homePath} />
      {ProjectPage ? <ProjectPage language={language} /> : (
        <main>
          <Hero text={text} />
          <About text={text} />
          <Projects text={text} language={language} />
        </main>
      )}
      <Footer text={text} homePath={homePath} />
      <Notifications language={language} />
    </>
  )
}

export default App
