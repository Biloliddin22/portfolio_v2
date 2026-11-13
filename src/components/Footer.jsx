import { githubUrl, telegramUrl } from '../data/links'

const footerLinkClass = 'press-feedback inline-flex rounded-sm text-sm text-secondary transition hover:text-accent'

function Footer({ text, homePath = '' }) {
  const { prefix, love, by } = text.signature
  const year = new Date().getFullYear()
  const navigation = [
    ['#about', text.about],
    ['#skills', text.skillsTitle],
    ['#projects', text.projects],
  ]

  return (
    <footer className="site-footer border-t border-border bg-surface px-5 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 sm:grid-cols-[1.4fr_0.8fr_1fr] sm:gap-8 sm:py-12">
          <div data-reveal="" className="col-span-2 border-b border-border pb-4 sm:col-span-1 sm:border-b-0 sm:pb-0">
            <a href={`${homePath}#home`} className="press-feedback inline-flex rounded-sm text-lg font-bold tracking-tight transition hover:text-accent">
              {text.name}
            </a>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{text.role}</p>
          </div>
          <nav data-reveal="" aria-label={text.footer.navigation}>
            <h2 className="text-sm font-semibold">{text.footer.navigation}</h2>
            <ul className="mt-3 grid gap-2">
              {navigation.map(([href, label]) => (
                <li key={href}><a href={`${homePath}${href}`} className={footerLinkClass}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <div data-reveal="">
            <h2 className="text-sm font-semibold">{text.footer.contact}</h2>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-secondary">{text.footer.contactNote}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {[[githubUrl, 'GitHub'], [telegramUrl, 'Telegram']].map(([href, label]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer" className={footerLinkClass}>
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-reveal="" className="flex flex-col items-center gap-2 border-t border-border py-4 text-center text-xs text-secondary sm:flex-row sm:justify-between sm:gap-x-6 sm:py-5 sm:text-left sm:text-sm">
          <p>© {year} {text.name}</p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>{prefix}</span>
            <span className="creator-heart" role="img" aria-label={love}>♥</span>
            <span>{by}</span>
            <a href={telegramUrl} target="_blank" rel="noreferrer" className="press-feedback inline-flex rounded-sm font-semibold text-primary transition hover:text-accent">
              Biloliddin
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
