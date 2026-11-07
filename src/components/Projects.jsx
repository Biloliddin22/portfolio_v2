import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

function Projects({ text, language }) {
  const [schoolSystem, ...otherProjects] = projects

  return (
    <section aria-labelledby="projects-heading" className="px-5 py-14 sm:px-6 sm:py-20 mb-14">
      <div className="mx-auto max-w-6xl">
        <div id="projects" className="mb-8 max-w-[66ch] sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">{text.projects}</p>
          <h2 id="projects-heading" data-reveal="" className="mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{text.projectsTitle}</h2>
        </div>

        <ProjectCard project={schoolSystem} text={text} language={language} />

        <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-y-0">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} text={text} language={language} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
