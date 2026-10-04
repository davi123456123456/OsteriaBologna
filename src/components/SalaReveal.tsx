"use client";

import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/gsap";
import { dur, MQ, SCRUB } from "@/lib/motion";

/**
 * M6 "porta socchiusa": il contenitore parte da una fessura verticale e si apre a tutta
 * larghezza mentre l'immagine interna passa da scale 1.25 a 1 — entrare in sala.
 * Scrub da "top 80%" a "center 55%". Su mobile la fessura parte da inset(0 30% 0 30%).
 */
export function SalaReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    ({ gsap }) => {
      const el = ref.current;
      const inner = el?.querySelector<HTMLElement>("[data-reveal-inner]");
      if (!el || !inner) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        const { reduce, desktop } = ctx.conditions ?? {};
        if (reduce) {
          gsap.from(el, { opacity: 0, duration: dur.reducedFade, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          return;
        }
        const gap = desktop ? "41%" : "30%";
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top 80%", end: "center 55%", scrub: SCRUB } })
          .fromTo(el, { clipPath: `inset(0% ${gap} 0% ${gap})` }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
          .fromTo(inner, { scale: 1.25 }, { scale: 1 }, 0);
      });
      return () => mm.revert();
    },
    ref,
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
