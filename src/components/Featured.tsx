export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/5662b6d9-4d91-4f3c-8c21-7a6dd74e41d1/bucket/de07b3f1-15c7-4228-8784-240ce2147bb0.JPG"
          alt="Дмитрий и Екатерина"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1" id="details">
        <h3 className="uppercase mb-4 text-sm tracking-[0.3em] text-neutral-500">Детали торжества</h3>
        <p className="text-2xl lg:text-4xl mb-10 text-neutral-900 leading-tight">
          Мы наконец-то решились — и теперь хотим разделить этот день с теми, кто нам дорог.
        </p>
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">Дата</span>
            <span className="text-lg text-neutral-900">1 августа 2026</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">Дресс-код</span>
            <span className="text-lg text-neutral-900">Торжественный</span>
          </div>
        </div>
      </div>
    </div>
  );
}