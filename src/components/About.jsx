function About() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              About
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Building practical software for real needs.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-secondary">
            <p>
              I’m a software developer and teacher focused on building useful,
              practical digital products.
            </p>

            <p>
              My work ranges from frontend applications to backend systems,
              databases, and tools designed around real-world workflows.
            </p>

            <p>
              I enjoy understanding a problem deeply, designing a clear
              solution, and improving it through real usage rather than simply
              building features for their own sake.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About