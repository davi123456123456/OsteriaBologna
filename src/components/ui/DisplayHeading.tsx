"use client";

import { Fragment, useRef } from "react";
import { useMotion } from "@/lib/gsap";
import { dur, ease, fontsReady, MQ } from "@/lib/motion";

type Props = {
  as?: "h1" | "h2" | "h3";
  /** Una riga per elemento: le interruzioni sono parte del disegno del titolo. */
  lines: string[];
  size?: "display" | "heading-lg";
  id?: string;
  className?: string;
  /** false per i titoli già visibili al caricamento (pagine legali): niente M5 */
  reveal?: boolean;
};

/**
 * Titolo display (M5): rivelazione a righe con maschera all'entrata nel viewport, una volta.
 * Lo split avviene solo dopo i font ed è rifatto al resize (autoSplit). Con reduced-motion:
 * fade di 0.3s. Senza JavaScript il titolo è semplicemente lì.
 */
export function DisplayHeading({ as: Tag = "h2", lines, size = "display", id, className = "", reveal = true }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useMotion(
    ({ gsap, SplitText }) => {
      const el = ref.current;
      if (!el || !reveal) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (ctx.conditions?.reduce) {
          gsap.from(el, {
            opacity: 0,
            duration: dur.reducedFade,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          return;
        }
        let split: InstanceType<typeof SplitText> | null = null;
        let cancelled = false;
        fontsReady().then(() => {
          if (cancelled) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: dur.text,
                ease: ease.text,
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    ref,
  );

  return (
    <Tag ref={ref} id={id} className={`${size === "display" ? "type-display" : "type-heading-lg"} ${className}`}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className="block">{line}</span>
        </Fragment>
      ))}
    </Tag>
  );
}
