function SchoolSystemPreview() {
  const moneyRows = [
    {
      label: 'Cash',
      income: '3 540 000',
      expenses: '420 000',
      net: '3 120 000',
    },
    {
      label: 'Card',
      income: '2 180 000',
      expenses: '300 000',
      net: '1 880 000',
    },
    {
      label: 'Total',
      income: '5 720 000',
      expenses: '720 000',
      net: '5 000 000',
      total: true,
    },
  ]

  const todoItems = [
    'Teacher message needs review',
    'Attendance requires marking',
    'Payment reminder due',
  ]

  return (
    <div className="w-full rounded-2xl bg-[#F6F7FB] p-3 shadow-sm sm:p-4">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-[#251B58]">
          Dashboard
        </h4>

        <p className="mt-1 text-xs text-[#6B6B8A]">
          Welcome back to Joseph School
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <section>
            <h5 className="mb-3 text-sm font-bold text-[#251B58]">
              Today's Lessons
            </h5>

            <div className="divide-y divide-[#E3E5F0]">
              <div className="flex items-center justify-between py-3">
                <span className="text-xs text-[#6B6B8A]">
                  Total lessons
                </span>

                <span className="text-xl font-bold text-[#251B58]">
                  18
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-xs text-[#6B6B8A]">
                  Awaiting mark
                </span>

                <span className="text-xl font-bold text-[#251B58]">
                  3
                </span>
              </div>
            </div>
          </section>

          <section className="lg:border-l lg:border-[#E3E5F0] lg:pl-5">
            <h5 className="mb-3 text-sm font-bold text-[#251B58]">
              Today's Money Movement
            </h5>

            <div className="overflow-hidden rounded-xl border border-[#E3E5F0]">
              <table className="w-full text-[10px] sm:text-xs">
                <thead>
                  <tr className="border-b border-[#E3E5F0] text-left text-[#6B6B8A]">
                    <th className="px-2 py-2 font-medium">
                      Method
                    </th>

                    <th className="px-2 py-2 text-right font-medium">
                      Income
                    </th>

                    <th className="px-2 py-2 text-right font-medium">
                      Expenses
                    </th>

                    <th className="px-2 py-2 text-right font-medium">
                      Net
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {moneyRows.map((row) => (
                    <tr
                      key={row.label}
                      className={`border-b border-[#E3E5F0] last:border-b-0 ${
                        row.total ? 'bg-[#F2F2F7] font-bold' : ''
                      }`}
                    >
                      <td className="px-2 py-2 text-[#251B58]">
                        {row.label}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-right text-green-600">
                        {row.income}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-right text-red-600">
                        {row.expenses}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-right text-[#251B58]">
                        {row.net}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-[#251B58]">
              To-do list
            </h5>

            <span className="rounded-full bg-[#E8F0FF] px-2 py-0.5 text-[10px] font-semibold text-[#251B58]">
              3
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {todoItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#E3E5F0] px-2 py-2"
              >
                <p className="truncate text-[10px] text-[#6B6B8A]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-[#251B58]">
              Payment Reminders
            </h5>

            <span className="rounded-full bg-[#FFE5E8] px-2 py-0.5 text-[10px] font-semibold text-[#E91C37]">
              4
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-[#E3E5F0] px-2 py-2">
              <div>
                <p className="text-[10px] font-medium text-[#251B58]">
                  Grammar 1
                </p>

                <p className="text-[9px] text-[#6B6B8A]">
                  2 lessons left
                </p>
              </div>

              <span className="text-[10px] font-semibold text-red-600">
                390 000
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#E3E5F0] px-2 py-2">
              <div>
                <p className="text-[10px] font-medium text-[#251B58]">
                  IELTS
                </p>

                <p className="text-[9px] text-[#6B6B8A]">
                  1 lesson left
                </p>
              </div>

              <span className="text-[10px] font-semibold text-red-600">
                690 000
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-[#251B58]">
              Student Follow-Ups
            </h5>

            <span className="rounded-full bg-[#FFF4DD] px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
              2
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="rounded-lg border border-[#E3E5F0] px-2 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#251B58]">
                  Practice 2
                </span>

                <span className="text-[9px] font-semibold text-yellow-700">
                  5 days
                </span>
              </div>

              <p className="mt-1 text-[9px] text-[#6B6B8A]">
                Needs follow-up
              </p>
            </div>

            <div className="rounded-lg border border-[#E3E5F0] px-2 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#251B58]">
                  Multilevel
                </span>

                <span className="text-[9px] font-semibold text-yellow-700">
                  7 days
                </span>
              </div>

              <p className="mt-1 text-[9px] text-[#6B6B8A]">
                Needs follow-up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolSystemPreview