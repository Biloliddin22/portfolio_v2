function TasbehPreview({ text }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="grid flex-1 place-items-center rounded-xl border border-[#e3e5f0] bg-white p-5 text-[#251b58] shadow-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <div aria-hidden="true" className="grid size-20 place-items-center rounded-full border-4 border-[#c9d8f5] border-t-[#251b58] border-r-[#251b58] bg-[#e8f0ff] text-2xl font-semibold tabular-nums">
            33
          </div>
          <p className="text-sm font-semibold">{text.title}</p>
          <p className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-secondary">{text.status}</p>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-snug text-secondary">{text.caption}</figcaption>
    </figure>
  )
}

export default TasbehPreview
