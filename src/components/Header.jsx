import { languages } from '../data/copy'

const navLinkClass =
  'nav-lift inline-flex min-h-10 items-center whitespace-nowrap rounded-lg px-1.5 text-xs sm:px-2.5 sm:text-sm'

function Header({ text, language, setLanguage }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-1.5 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3">
        <a
          href="#home"
          aria-label={text.home}
          className="nav-lift inline-flex size-10 shrink-0 items-center justify-center gap-2 rounded-lg sm:w-auto sm:px-2"
        >
          <img
            src="/IconPortfolio.ico"
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
          <a href="#about" className={navLinkClass}>{text.about}</a>
          <a href="#projects" className={navLinkClass}>{text.projects}</a>
        </nav>

        <div
          role="group"
          aria-label={text.language}
          className="flex shrink-0 rounded-full border border-border bg-background p-0.5 sm:ml-2 sm:gap-1 sm:p-1"
        >
          {languages.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-label={label}
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
              className="nav-lift grid size-8 cursor-pointer place-items-center rounded-full text-xs font-semibold uppercase"
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