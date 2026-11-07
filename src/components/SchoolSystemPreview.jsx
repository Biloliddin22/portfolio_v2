const money = [
  [120000, 25000, 95000],
  [99000, 45000, 54000],
  [219000, 70000, 149000],
]
const queueCounts = [0, 1, 1]
const sidebarGroups = [1, 3, 4]

function SchoolSystemPreview({ text, language }) {
  const number = new Intl.NumberFormat(language)

  return (
    <figure className="dashboard-preview w-full">
      <div className="preview-frame overflow-hidden rounded-2xl border border-[#e3e5f0] bg-gray-50 text-[#251b58] shadow-sm">
        <div className="preview-mobile-brand bg-[#251b58] px-3 py-2 font-bold text-white">Joseph School</div>
        <div className="min-w-0 p-2.5 sm:p-3">
          <div className="mb-2 flex justify-end">
            <span className="rounded-md border border-[#e3e5f0] bg-white px-1.5 py-1">{text.about}</span>
          </div>
          <div className="mb-3">
            <p className="text-base leading-tight font-bold sm:text-lg">{text.title}</p>
            <p className="mt-1 text-[#6b6b8a]">{text.welcome}</p>
          </div>

          <div className="preview-summary rounded-lg bg-white p-2.5 shadow-sm">
            <div className="preview-lessons min-w-0">
              <p className="mb-1.5 font-bold">{text.lessons}</p>
              <dl className="preview-lesson-counts">
                {text.counts.map((label) => (
                  <div key={label} className="flex items-center justify-between gap-1 py-1.5">
                    <dt className="text-[#6b6b8a]">{label}</dt>
                    <dd className="text-sm leading-none font-bold tabular-nums">7</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="min-w-0">
              <p className="mb-1.5 font-bold">{text.money}</p>
              <table className="w-full border-collapse text-right tabular-nums">
                <thead className="text-[#6b6b8a]">
                  <tr className="border-b border-[#e3e5f0]">
                    {text.columns.map((column) => (
                      <th key={column} scope="col" className="px-0.5 pb-1 font-medium first:text-left">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {money.map((amounts, row) => (
                    <tr key={text.methods[row]} className={row === 2 ? 'bg-gray-100 font-bold' : 'border-b border-[#e3e5f0]'}>
                      <th scope="row" className="px-0.5 py-1 text-left font-semibold">{text.methods[row]}</th>
                      {amounts.map((amount, column) => (
                        <td key={column} className={`px-0.5 py-1 whitespace-nowrap ${['text-green-700', 'text-red-600', ''][column]}`}>
                          {number.format(amount)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            {text.lists.map((label, index) => (
              <div key={label} className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-2 font-bold shadow-sm">
                <span>{label} ({queueCounts[index]})</span>
                <span className="preview-chevron" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="preview-sidebar bg-[#251b58] p-2 text-white">
          <p className="mb-3 text-[1.15em] leading-tight font-bold">Joseph School</p>
          <ul className="grid gap-1">
            {text.sidebar.map((label, index) => (
              <li
                key={label}
                className={`flex items-center justify-between gap-1 rounded-md px-1.5 py-1 ${index === 0 ? 'bg-white font-semibold text-[#251b58]' : ''}`}
              >
                {label}
                {sidebarGroups.includes(index) && <span className="preview-chevron" aria-hidden="true" />}
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-white/20 pt-2">
            <p className="mb-1 text-white/80">{text.viewAs}</p>
            <p className="rounded bg-white px-1.5 py-1 text-[#251b58]">{text.owner}</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-snug text-secondary">{text.caption}</figcaption>
    </figure>
  )
}

export default SchoolSystemPreview
