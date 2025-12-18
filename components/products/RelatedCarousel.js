import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RelatedCarousel({ products = [], auto = true, interval = 3500 }) {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const el = containerRef.current;
    if (!el) return;

    let timer = null;
    const step = () => {
      if (paused) return;
      const first = el.firstElementChild;
      if (!first) return;
      const cardWidth = first.getBoundingClientRect().width + 16; // +gap
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + cardWidth;
      if (next >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    };

    timer = setInterval(step, interval);
    return () => timer && clearInterval(timer);
  }, [auto, interval, paused]);

  const scrollByCards = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const cardWidth = first ? first.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-1"
        style={{ scrollBehavior: "smooth" }}
        aria-label="Productos relacionados"
      >
        {products.map((p) => (
          <div key={p.slug} className="shrink-0 w-[72%] xs:w-[60%] sm:w-[45%] md:w-[32%] lg:w-[24%]">
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow hover:bg-white focus-accessible"
        aria-label="Anterior"
        onClick={() => scrollByCards(-1)}
      >
        <ChevronLeft className="text-navy" size={18} />
      </button>
      <button
        type="button"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow hover:bg-white focus-accessible"
        aria-label="Siguiente"
        onClick={() => scrollByCards(1)}
      >
        <ChevronRight className="text-navy" size={18} />
      </button>
    </div>
  );
}
