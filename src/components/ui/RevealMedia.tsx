"use client";

import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/gsap";
import { dur, ease, MQ } from "@/lib/motion";

/**
 * Scopertura dal basso dei media del menù (M8): clip-path inset(100% 0 0 0) → inset(0) in 1.2s,
 * l'immagine interna da scale 1.15 a 1. Una volta sola. Con reduced-motion: fade 0.3s.
 */
export function RevealMedia({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-reveal-inner]");
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        const st = { trigger: el, start: "top 85%", once: true };
        if (ctx.conditions?.reduce) {
          gsap.from(el, { opacity: 0, duration: dur.reducedFade, scrollTrigger: st });
          return;
        }
        const tl = gsap.timeline({ scrollTrigger: st });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: dur.revealLong, ease: ease.reveal, clearProps: "clipPath" },
        );
        if (inner) tl.fromTo(inner, { scale: 1.15 }, { scale: 1, duration: dur.revealLong, ease: ease.reveal }, 0);
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
