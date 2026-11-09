const questions = [1, 2, 3, 4, 5]

function ReadingPreview({ text }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#e3e5f0] bg-white text-[0.6875rem] leading-snug text-[#251b58] shadow-sm">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 border-b border-[#e3e5f0] px-2.5 py-2 sm:px-3">
          <span className="font-semibold">{text.title}</span>
          <span className="font-bold tabular-nums">42:18</span>
          <span className="justify-self-end rounded-md bg-[#251b58] px-1.5 py-1 font-medium text-white">{text.submit}</span>
        </div>

        <div className="grid flex-1 grid-cols-2 divide-x divide-[#e3e5f0]">
          <div className="min-w-0 p-2.5 sm:p-3">
            <p className="text-[#6b6b8a]">{text.passage}</p>
            <p className="mt-1 font-bold">{text.passageTitle}</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              {text.passageBefore} <mark className="rounded-xs bg-amber-100 px-0.5">{text.highlight}</mark> {text.passageAfter}
            </p>
          </div>
          <div className="min-w-0 p-2.5 sm:p-3">
            <p className="font-bold">{text.questions}</p>
            <p className="mt-2 leading-relaxed text-gray-700">{text.question}</p>
            <ul className="mt-2 grid gap-1.5">
              {text.answers.map((answer, index) => (
                <li key={answer} className={`flex items-center gap-1.5 rounded-md border px-1.5 py-1 ${index === 0 ? 'border-[#c9d8f5] bg-[#e8f0ff]' : 'border-[#e3e5f0]'}`}>
                  <span aria-hidden="true" className={`size-2 shrink-0 rounded-full border ${index === 0 ? 'border-[#251b58] bg-[#251b58]' : 'border-[#a0a3bd]'}`} />
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 border-t border-[#e3e5f0] px-2.5 py-2 sm:px-3">
          <span className="mr-1 font-semibold">{text.passage}</span>
          {questions.map((question) => (
            <span
              key={question}
              className={`grid size-5 place-items-center rounded-md tabular-nums ${question === 1 ? 'bg-[#251b58] text-white' : 'bg-gray-100'}`}
            >
              {question}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-snug text-secondary">{text.caption}</figcaption>
    </figure>
  )
}

export default ReadingPreview
