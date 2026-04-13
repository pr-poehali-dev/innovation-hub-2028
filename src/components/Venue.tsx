import Icon from "@/components/ui/icon";

export default function Venue() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-stone-50">
      <div className="flex-1 h-[400px] lg:h-auto">
        <img
          src="https://cdn.poehali.dev/projects/5662b6d9-4d91-4f3c-8c21-7a6dd74e41d1/bucket/eae7b536-02ec-4124-a3b9-76b0b35aa9bd.jpg"
          alt="Ресторан Галерея"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6">Место проведения</p>
        <h2 className="text-4xl md:text-5xl text-neutral-900 mb-8 leading-tight">
          Ресторан<br />
          <span className="italic font-light">Галерея</span>
        </h2>

        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-start gap-4">
            <Icon name="MapPin" size={18} className="text-stone-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">Адрес</p>
              <p className="text-neutral-800">Зелёный пер., 1А, село Соломино,<br />Белгородская область</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="Clock" size={18} className="text-stone-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">Начало торжества</p>
              <p className="text-neutral-800">1 августа 2026</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="Car" size={18} className="text-stone-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">Как добраться</p>
              <p className="text-neutral-800">Бесплатная парковка на территории</p>
            </div>
          </div>
        </div>

        <a
          href="https://yandex.ru/maps/?text=Зелёный+пер.+1А+село+Соломино+Белгородская+область"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-neutral-900 text-white border border-neutral-900 px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-stone-50 hover:text-neutral-900 w-fit"
        >
          Открыть на карте
        </a>
      </div>
    </div>
  );
}