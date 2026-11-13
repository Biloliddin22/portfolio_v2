import TechnologyTags from './TechnologyTags'

function About({ text }) {
  return (
    <section aria-labelledby="about-heading" className="border-y border-border bg-surface px-5 py-14 sm:px-6 sm:py-20">
      <div id="about" className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <div data-reveal="left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
            {text.about}
          </p>
          <h2 id="about-heading" className="mt-3 max-w-[22ch] text-balance text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {text.aboutTitle}
          </h2>
        </div>
        <div data-reveal="right" className="grid max-w-[64ch] gap-4 self-center text-base leading-relaxed text-secondary sm:text-lg">
          {text.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <div className="mx-auto mt-9 max-w-6xl border-t border-border pt-7 sm:mt-12 sm:pt-9">
        <h3 id="skills" className="text-xl font-bold tracking-tight sm:text-2xl"><span data-reveal="" className="inline-block">{text.skillsTitle}</span></h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {text.skills.map(({ label, title, description, tools }, index) => (
            <li key={tools[0]} data-reveal={index % 2 === 0 ? 'left' : 'right'} className="card-lift flex flex-col rounded-3xl border border-border bg-surface p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{label}</p>
              <h4 className="mt-2 text-xl leading-tight font-bold tracking-tight">{title}</h4>
              <p className="mt-3 max-w-[58ch] text-pretty text-sm leading-relaxed text-secondary sm:text-base">{description}</p>
              <div className="mt-auto pt-5">
                <TechnologyTags items={tools} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
