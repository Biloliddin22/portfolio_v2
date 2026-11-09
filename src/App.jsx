import { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/Header'
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
    if (ProjectPage) return

    // Direct links from project pages can arrive before React mounts the anchor.
    const anchor = document.getElementById(window.location.hash.slice(1))
    anchor?.scrollIntoView({ behavior: 'instant' })

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const root = document.getElementById('root')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = ''
          observer.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px 16px 0px' })

    root.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    root.dataset.revealReady = ''
    return () => {
      observer.disconnect()
      delete root.dataset.revealReady
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
    </>
  )
}

export default App
