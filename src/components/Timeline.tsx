import { useEffect, useRef, useState } from "react";

const events = [
  {
    time: "15:00",
    title: "Сбор гостей / Фуршет",
    description: "Время пролетит незаметно за игристым и общением",
  },
  {
    time: "16:00",
    title: "Начало церемонии",
    description: "Незабываемая. Нежная. Трогательная.",
  },
  {
    time: "17:00",
    title: "Начало свадебного ужина",
    description: "Много танцев, веселья и, конечно, любви",
  },
  {
    time: "23:00",
    title: "Окончание свадебного дня",
    description: "",
  },
];

export default function Timeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(events.length).fill(false));

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
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col justify-center px-8 lg:px-16 py-16 bg-white max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6">Программа</p>
        <h2 className="text-4xl md:text-5xl text-neutral-900 mb-12 leading-tight">
          Тайминг<br />
          <span className="italic font-light">дня</span>
        </h2>

        <div className="relative">
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-stone-200" />

          <div className="flex flex-col gap-8">
            {events.map((ev, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex items-start gap-6 transition-all duration-700"
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? "translateX(0)" : "translateX(-24px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex flex-col items-center shrink-0 w-14">
                  <span className="text-sm font-semibold text-stone-600 tracking-wide">{ev.time}</span>
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-stone-400 shrink-0" />
                  <div>
                    <p className="text-base font-medium text-neutral-900 leading-snug">{ev.title}</p>
                    {ev.description && (
                      <p className="text-sm text-neutral-500 mt-1 italic">{ev.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
