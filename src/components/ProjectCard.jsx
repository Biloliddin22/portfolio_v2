import FamilyTreeViewer from './FamilyTreeViewer'
import SchoolSystemPreview from './SchoolSystemPreview'
import ReadingPreview from './ReadingPreview'
import TasbehPreview from './TasbehPreview'
import TechnologyTags from './TechnologyTags'

function ProjectCard({ project, text, language }) {
  const { title, description, highlights, linkLabel } = project.text[language]
  const { path, demo } = project
  const previews = {
    'school-system': <SchoolSystemPreview text={text.preview} language={language} />,
    bilkin: (
      <figure className="mx-auto w-full max-w-lg">
        <FamilyTreeViewer language={language} caption={project.text[language].previewCaption} className="shadow-sm" />
        <figcaption className="mt-3 text-xs leading-snug text-secondary">
          {project.text[language].previewCaption}
        </figcaption>
      </figure>
    ),
    'ielts-reading': <ReadingPreview text={text.readingPreview} />,
    tasbeh: <TasbehPreview text={text.tasbehPreview} />,
  }

  return (
    <article
      data-reveal="zoom"
      className={`card-lift grid overflow-hidden rounded-3xl border border-border bg-surface ${project.featured ? 'lg:grid-cols-[1.25fr_1fr]' : 'md:row-span-2 md:grid-rows-subgrid'}`}
    >
      <div className={`min-w-0 border-b border-border bg-accent-light/65 p-3 sm:p-5 ${project.featured ? 'flex items-center lg:border-r lg:border-b-0' : ''}`}>
        {previews[project.id]}
      </div>

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

        {(path || demo) && (
          <a
            href={path ?? demo}
            target={demo ? '_blank' : undefined}
            rel={demo ? 'noreferrer' : undefined}
            className="nav-lift mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold"
          >
            {linkLabel ?? (project.featured ? text.demo : text.openPlatform)}
            <span aria-hidden="true">{path ? '→' : '↗'}</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
