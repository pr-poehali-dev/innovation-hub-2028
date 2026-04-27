import { useEffect, useRef, useState } from "react";

const milestones = [
  "Помолвка",
  "Подготовка к свадьбе",
  "День свадьбы",
  "Начало совместной жизни",
];

export default function WeddingCalendar() {
  const weddingDay = 1;
  const month = "Август";
  const year = 2026;

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const startOffset = 5;
  const totalDays = 31;

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(milestones.length).fill(false));
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;
      const progress = Math.min(
        1,
        Math.max(0, (windowH - rect.top) / (windowH + sectionH))
      );
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const heartX = scrollProgress * 100;

  return (
    <div ref={sectionRef} className="bg-stone-50 py-24 px-6 flex flex-col items-center">
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
                      style={{
                        filter: "drop-shadow(0 0 6px #c9a98a)",
                        animation: "heartGlow 1.8s ease-in-out infinite",
                      }}
                      fill="none"
                    >
                      <path
                        d="M20 34s-14-9.5-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 34 15c0 9.5-14 19-14 19z"
                        fill="#c9a98a"
                        style={{ animation: "heartFill 1.8s ease-in-out infinite" }}
                      />
                      <path
                        d="M20 34s-14-9.5-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 34 15c0 9.5-14 19-14 19z"
                        stroke="#c9a98a"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                    <span className="relative z-10 text-sm font-semibold text-white">
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

      <div className="w-full max-w-md mt-16">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-8 text-center">Наш путь</p>

        <div className="relative">
          <div className="w-full h-px bg-stone-200 relative mb-2">
            <div
              className="absolute top-0 left-0 h-px bg-stone-400 transition-all duration-100"
              style={{ width: `${heartX}%` }}
            />
            <div
              className="absolute -top-3 transition-all duration-100"
              style={{ left: `calc(${heartX}% - 10px)` }}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5" style={{ filter: "drop-shadow(0 0 4px #c9a98a)", animation: "heartGlow 1.8s ease-in-out infinite" }} fill="none">
                <path
                  d="M10 17s-7-4.75-7-9.5A4 4 0 0 1 10 4.85 4 4 0 0 1 17 7.5C17 12.25 10 17 10 17z"
                  fill="#c9a98a"
                  style={{ animation: "heartFill 1.8s ease-in-out infinite" }}
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex flex-col items-center max-w-[22%] text-center transition-all duration-500"
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mb-2" />
                <p className="text-[10px] uppercase tracking-wide text-neutral-500 leading-tight">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartGlow {
          0%, 100% { filter: drop-shadow(0 0 4px #c9a98a) drop-shadow(0 0 8px #c9a98a); opacity: 1; }
          50% { filter: drop-shadow(0 0 10px #c9a98a) drop-shadow(0 0 20px #d4b898); opacity: 0.75; }
        }
        @keyframes heartFill {
          0%, 100% { fill: #c9a98a; opacity: 1; }
          50% { fill: #d4b898; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
