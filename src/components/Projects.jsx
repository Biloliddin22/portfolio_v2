import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

function Projects() {
  const [schoolSystem, ...otherProjects] = projects

  return (
    <section id="projects" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Projects
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Selected work
          </h2>

          <p className="mt-4 text-lg leading-8 text-secondary">
            Projects built around real problems, practical workflows, and
            continuous improvement.
          </p>
        </div>

        <ProjectCard project={schoolSystem} large />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects