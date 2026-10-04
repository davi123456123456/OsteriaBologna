"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

/**
 * Sottonavigazione sticky delle categorie (§7.6.1, §7.7.3). La voce attiva ha una
 * sottolineatura zafferano 1px che scivola tra le voci (transizione left/width, 400ms).
 * Su mobile la barra scorre in orizzontale e la voce attiva si centra da sola.
 * Il click è gestito dallo scroll globale (Lenis, con l'offset di nav e sottonav).
 */
export function CategoryNav({
  items,
  label,
  tone = "light",
  padClassName = "",
}: {
  items: Item[];
  label: string;
  tone?: "light" | "dark";
  /** padding orizzontale della riga di voci (allinea al gutter della pagina) */
  padClassName?: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [line, setLine] = useState<{ left: number; width: number } | null>(null);

  // categoria attiva: l'ultima il cui inizio ha superato la linea sotto la sottonav
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const lineY = (bar.current?.getBoundingClientRect().bottom ?? 120) + 24;
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= lineY) current = it.id;
      }
      // oltre la fine dell'ultima categoria nessuna voce è attiva
      const last = document.getElementById(items[items.length - 1]!.id);
      if (last && last.getBoundingClientRect().bottom < lineY) current = null;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // posizione della sottolineatura e centratura della voce attiva su mobile
  useLayoutEffect(() => {
    const scroller = bar.current?.querySelector<HTMLElement>("[data-scroller]");
    const link = active ? bar.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!scroller || !link) {
      setLine(null);
      return;
    }
    setLine({ left: link.offsetLeft, width: link.offsetWidth });
    if (scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollTo({ left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const dark = tone === "dark";
  return (
    <div
      ref={bar}
      className={`sticky top-[var(--nav-h)] z-20 border-b ${dark ? "border-filo-scuro bg-cantina text-pergamena" : "border-filo bg-pergamena text-onice"}`}
    >
      <nav aria-label={label}>
        <div data-scroller className="relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className={`relative flex h-[var(--subnav-h)] w-max items-stretch gap-28 sm:gap-32 ${padClassName}`}>
            {items.map((it) => (
              <li key={it.id} className="flex">
                <a
                  href={`#${it.id}`}
                  aria-current={active === it.id ? "true" : undefined}
                  className={`type-caption flex items-center whitespace-nowrap text-[13px] transition-colors duration-[400ms] ${
                    active === it.id ? "" : dark ? "text-noce-chiaro hover:text-pergamena" : "text-noce hover:text-onice"
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-zafferano transition-[transform,width,opacity] duration-[400ms] ease-[var(--ease-editorial)]"
            style={{
              width: line?.width ?? 0,
              transform: `translateX(${line?.left ?? 0}px)`,
              opacity: line ? 1 : 0,
            }}
          />
        </div>
      </nav>
    </div>
  );
}
