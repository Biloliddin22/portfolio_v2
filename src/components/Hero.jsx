import me from '../assets/images/me.png'
import { githubUrl, telegramUrl } from '../data/links'

const socialLinkClass = 'nav-lift rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold'

function Hero({ text }) {
  return (
    <section id="home" className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <img
          src={me}
          alt={text.name}
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
          <a href="#projects" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
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
