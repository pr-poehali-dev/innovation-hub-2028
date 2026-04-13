export default function WeddingCalendar() {
  const weddingDay = 1;
  const month = "Август";
  const year = 2026;

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  // August 2026: starts on Saturday (index 5)
  const startOffset = 5;
  const totalDays = 31;

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-stone-50 py-24 px-6 flex flex-col items-center">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-4">Сохраните дату</p>
      <h2 className="text-4xl md:text-5xl text-neutral-900 mb-12 text-center">
        {month} {year}
      </h2>

      <div className="w-full max-w-md">
        <div className="grid grid-cols-7 mb-2">
          {days.map((d) => (
            <div key={d} className="text-center text-xs uppercase tracking-widest text-neutral-400 py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            const isWedding = day === weddingDay;
            return (
              <div
                key={i}
                className="flex items-center justify-center h-10 relative"
              >
                {isWedding ? (
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <svg
                      viewBox="0 0 40 40"
                      className="absolute inset-0 w-full h-full"
                      fill="none"
                    >
                      <path
                        d="M20 34s-14-9.5-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 34 15c0 9.5-14 19-14 19z"
                        fill="#c9a98a"
                        opacity="0.25"
                      />
                      <path
                        d="M20 34s-14-9.5-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 34 15c0 9.5-14 19-14 19z"
                        stroke="#c9a98a"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                    <span className="relative z-10 text-sm font-semibold text-stone-700">
                      {day}
                    </span>
                  </div>
                ) : (
                  <span className={`text-sm ${day ? "text-neutral-700" : ""}`}>
                    {day ?? ""}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-10 text-sm text-neutral-400 tracking-[0.2em] uppercase">
        1 · 08 · 2026
      </p>
    </div>
  );
}
