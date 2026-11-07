import { languages } from '../data/copy'

function Header({ text, language, setLanguage }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-2.5 sm:flex sm:justify-between sm:px-6 sm:py-3">
        <a
          href="#home"
          aria-label={text.home}
          className="nav-lift inline-flex shrink-0 items-center justify-center justify-self-start rounded-lg px-2 py-1.5"
        >
          <img
            src="/IconPortfolio.ico"
            alt=""
            width="28"
            height="28"
            className="size-7 object-contain mr-2"
          />
          {text.name.split(' ')[0]}
        </a>

        <nav aria-label={text.navigation} className="col-span-2 row-start-2 flex flex-wrap gap-1 sm:ml-auto">
          <a href="#about" className="nav-lift rounded-lg px-2.5 py-1.5 text-sm">{text.about}</a>
          <a href="#projects" className="nav-lift rounded-lg px-2.5 py-1.5 text-sm">{text.projects}</a>
        </nav>

        <div role="group" aria-label={text.language} className="col-start-2 row-start-1 flex gap-1 rounded-full border border-border bg-background p-1 sm:ml-3">
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
