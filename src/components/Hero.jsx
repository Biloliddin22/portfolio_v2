import me from '../assets/images/me.webp'
import { githubUrl, telegramUrl } from '../data/links'

const socialLinkClass = 'nav-lift rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold'

function Hero({ text }) {
  return (
    <section id="home" className="hero-screen px-5 sm:px-6">
      <div className="hero-entrance mx-auto flex max-w-4xl flex-col items-center text-center">
        <img
          src={me}
          alt={text.name}
          fetchPriority="high"
          decoding="async"
          className="mb-6 size-32 rounded-full border-4 border-surface object-cover shadow-lg sm:mb-8 sm:size-40"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
          {text.role}
        </p>
        <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl">
          {text.name}
        </h1>
        <p className="mt-5 max-w-[50ch] text-pretty text-base leading-relaxed text-secondary sm:text-lg">
          {text.intro}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="nav-lift nav-primary rounded-xl border border-transparent px-5 py-3 text-sm font-semibold">
            {text.viewProjects}
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={socialLinkClass}
          >
            GitHub
          </a>
          <a href={telegramUrl} target="_blank" rel="noreferrer" className={socialLinkClass}>
            Telegram
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
