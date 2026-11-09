function TasbehPreview({ text }) {
  return (
    <figure className="flex h-full flex-col">
      <div aria-hidden="true" className="flex flex-1 flex-col gap-2.5 rounded-xl border border-[#dbe6cc] bg-[#fefce8] p-3 text-[#263916] shadow-sm sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="text-sm font-bold tracking-tight">Tasbeh</p>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="grid grid-cols-2 rounded-full border border-[#dbe6cc] bg-[#ecf2db] p-0.5 text-[0.625rem] font-semibold">
              <span className="rounded-full bg-[#fffef6] px-1.5 py-1 text-center text-[#0e6434] shadow-sm">{text.freestyle}</span>
              <span className="px-1.5 py-1 text-center">{text.daily}</span>
            </div>
            <span className="grid size-6 place-items-center rounded-full border border-[#dbe6cc] bg-[#fffef6] leading-none">⋯</span>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-[0.6875rem]">
          <div>
            <p className="mb-0.5 font-medium text-[#55684a]">{text.zikr}</p>
            <p className="flex items-center justify-between gap-1 rounded-lg border border-[#dbe6cc] bg-[#fffef6] px-2.5 py-1">
              Allohu Akbar <span>▾</span>
            </p>
          </div>
          <div>
            <p className="mb-0.5 font-medium text-[#55684a]">{text.limit}</p>
            <p className="flex items-center justify-between gap-2 rounded-lg border border-[#dbe6cc] bg-[#fffef6] px-2.5 py-1">
              33 <span>▾</span>
            </p>
          </div>
        </div>

        <div className="grid flex-1 items-center py-2">
          <p className="rounded-2xl border border-[#dbe6cc] bg-[#fffef6] px-3 py-2.5 text-center text-base font-semibold">Allohu Akbar</p>
        </div>

        <div className="relative grid justify-items-center gap-1 rounded-2xl bg-[#147a41] px-5 py-3 text-white tabular-nums shadow-sm">
          <svg className="absolute top-2 right-2 size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 4v6h-6M19.2 10a8 8 0 1 0 .3 4" />
          </svg>
          <span className="text-4xl leading-none font-semibold">22</span>
          <span className="flex items-center gap-2 text-xs">
            / 33 <span className="h-3 w-px bg-white/50" /> × 1
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-snug text-secondary">{text.caption}</figcaption>
    </figure>
  )
}

export default TasbehPreview
