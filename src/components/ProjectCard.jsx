import SchoolSystemPreview from './SchoolSystemPreview'

function ProjectCard({ project, large = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        large ? 'md:grid md:grid-cols-[1.1fr_0.9fr]' : ''
      }`}
    >
        <div className="flex min-h-64 items-center justify-center bg-accent-light p-4 sm:p-6">
        {project.id === 'school-system' ? (
            <SchoolSystemPreview />
        ) : project.image ? (
            <img
            src={project.image}
            alt={project.title}
            className="h-full w-full rounded-2xl object-cover"
            />
        ) : (
            <span className="text-sm font-medium text-secondary">
            Project preview
            </span>
        )}
        </div>

      <div className="flex flex-col p-7 md:p-8">
        <p className="mb-3 text-sm font-medium text-accent">
          {project.type}
        </p>

        <h3 className="text-2xl font-bold tracking-tight text-primary">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-secondary">
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <ul className="mt-6 grid gap-2 text-sm text-secondary sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-5 pt-8">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary transition hover:text-accent"
            >
              Live demo →
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary transition hover:text-accent"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard