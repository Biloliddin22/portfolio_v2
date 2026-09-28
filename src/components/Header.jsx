function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-lg font-semibold text-slate-900">
          Biloliddin
        </a>

        <nav className="hidden gap-8 text-sm text-slate-600 md:flex">
          <a href="#about" className="transition hover:text-blue-600">
            About
          </a>
          <a href="#projects" className="transition hover:text-blue-600">
            Projects
          </a>
          <a href="#skills" className="transition hover:text-blue-600">
            Skills
          </a>
          <a href="#contact" className="transition hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header