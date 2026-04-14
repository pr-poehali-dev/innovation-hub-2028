import { useState } from "react";

const RSVP_URL = "https://script.google.com/macros/s/AKfycbxOFLEVKtZQHp5GNWINpSOsTVEeVvVUBI_pmkfKLm2sl3CN-Zfxi2MP-pa9hMFXRkIe/exec";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, guests_count: guests, comment }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setGuests(1); setComment("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white py-24 px-6 flex flex-col items-center" id="rsvp">
      <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-4">Ответьте до 1 июля</p>
      <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4 text-center">
        Подтвердите присутствие
      </h2>
      <p className="text-neutral-500 mb-12 text-center max-w-md">
        Мы будем рады видеть вас на нашем торжестве
      </p>

      {status === "success" ? (
        <div className="text-center py-12">
          <p className="text-3xl md:text-4xl text-neutral-800 mb-4">Спасибо!</p>
          <p className="text-neutral-500">Мы ждём вас 1 августа 2026</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Ваше имя *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="border-b border-neutral-300 focus:border-neutral-800 outline-none py-2 text-neutral-900 placeholder:text-neutral-300 bg-transparent transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Количество гостей
            </label>
            <div className="flex items-center gap-4 pt-1">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGuests(n)}
                  className={`w-10 h-10 border text-sm transition-all duration-200 ${
                    guests === n
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Пожелания (необязательно)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Диетические предпочтения, пожелания..."
              className="border-b border-neutral-300 focus:border-neutral-800 outline-none py-2 text-neutral-900 placeholder:text-neutral-300 bg-transparent resize-none transition-colors duration-200"
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-neutral-900 text-white border border-neutral-900 px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {status === "loading" ? "Отправляем..." : "Подтвердить присутствие"}
          </button>
        </form>
      )}
    </div>
  );
}