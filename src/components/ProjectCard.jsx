import SchoolSystemPreview from './SchoolSystemPreview'
import ReadingPreview from './ReadingPreview'
import TasbehPreview from './TasbehPreview'
import TechnologyTags from './TechnologyTags'

function ProjectCard({ project, text, language }) {
  const { title, description, highlights } = project.text[language]
  const preview = project.id === 'ielts-reading'
    ? <ReadingPreview text={text.readingPreview} />
    : <TasbehPreview text={text.tasbehPreview} />

  return (
    <article
      className={`card-lift grid overflow-hidden rounded-3xl border border-border bg-surface ${project.featured ? 'lg:grid-cols-[1.25fr_1fr]' : 'md:row-span-2 md:grid-rows-subgrid'}`}
    >
      {project.featured && (
        <div className="flex min-w-0 items-center border-b border-border bg-accent-light/65 p-3 sm:p-5 lg:border-r lg:border-b-0">
          <SchoolSystemPreview text={text.preview} language={language} />
        </div>
      )}
      {!project.featured && (
        <div className="border-b border-border bg-accent-light/65 p-3 sm:p-5">
          {preview}
        </div>
      )}

      <div className="flex min-w-0 flex-col items-start p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {project.featured ? text.featured : text.project}
        </p>
        <h3 className="mt-2 text-balance text-2xl leading-tight font-bold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-[58ch] text-pretty text-base leading-relaxed text-secondary">{description}</p>

        {highlights && (
          <ul className="mt-5 grid w-full gap-x-5 gap-y-2 text-sm leading-relaxed text-secondary sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <TechnologyTags items={project.technologies} />
        </div>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="nav-lift mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold"
          >
            {project.id === 'ielts-reading' ? text.openPlatform : text.demo}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
