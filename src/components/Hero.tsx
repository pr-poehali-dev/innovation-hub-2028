import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/5662b6d9-4d91-4f3c-8c21-7a6dd74e41d1/bucket/ccbf912d-e760-47b4-a766-0a25bc8cc0aa.JPG"
          alt="Дмитрий и Екатерина"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 opacity-80 font-light">
          Приглашение на свадьбу
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 leading-none">
          Дмитрий<br />
          <span className="font-light italic">&</span><br />
          Екатерина
        </h1>
        <p className="text-lg md:text-2xl mt-8 opacity-90 tracking-[0.2em] uppercase font-light">
          1 августа 2026
        </p>
      </div>
    </div>
  );
}