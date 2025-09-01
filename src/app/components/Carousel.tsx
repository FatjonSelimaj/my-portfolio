"use client";
import * as React from "react";

type CarouselProps<T> = {
  items: T[];
  // ⬇️ rinominato per soddisfare Next type checker
  renderItemAction: (item: T, index: number) => React.ReactNode;
  title?: string;
  className?: string;
  showDots?: boolean;
};

export default function Carousel<T>({
  items,
  renderItemAction,
  title,
  className = "",
  showDots = true,
}: CarouselProps<T>) {
  const [index, setIndex] = React.useState(0);
  const total = items.length;

  const goPrev = React.useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const goNext = React.useCallback(() => setIndex(i => Math.min(total - 1, i + 1)), [total]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!total) return null;

  return (
    <div className={`relative ${className}`}>
      {title && <h2 className="text-xl mb-4">{title}</h2>}

      <div className="overflow-hidden rounded bg-white">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((it, i) => (
            <div key={i} className="min-w-full p-2">
              {renderItemAction(it, i)}
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Precedente"
        onClick={goPrev}
        disabled={index === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 border rounded-full w-10 h-10 flex items-center justify-center shadow disabled:opacity-40"
      >
        ‹
      </button>
      <button
        aria-label="Successivo"
        onClick={goNext}
        disabled={index === total - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 border rounded-full w-10 h-10 flex items-center justify-center shadow disabled:opacity-40"
      >
        ›
      </button>

      {showDots && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Vai alla slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
