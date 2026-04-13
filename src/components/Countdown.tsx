import { useEffect, useState } from "react";

function getTimeLeft() {
  const wedding = new Date("2026-08-01T00:00:00");
  const now = new Date();
  const diff = wedding.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Дней", value: time.days },
    { label: "Часов", value: time.hours },
    { label: "Минут", value: time.minutes },
    { label: "Секунд", value: time.seconds },
  ];

  return (
    <div className="bg-neutral-900 py-24 px-6 flex flex-col items-center">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-4">До торжества осталось</p>
      <h2 className="text-3xl md:text-4xl text-white mb-16 text-center font-light italic">
        1 августа 2026
      </h2>

      <div className="flex gap-8 md:gap-16">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tabular-nums leading-none">
              {pad(value)}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
