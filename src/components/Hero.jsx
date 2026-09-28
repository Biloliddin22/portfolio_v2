function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-slate-50 px-6 pt-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
            Software Developer
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Biloliddin Tuychiboev
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            I build practical web applications and digital tools designed to
            solve real problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              View projects
            </a>

            <a
              href="https://github.com/Biloliddin22"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-slate-400"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero