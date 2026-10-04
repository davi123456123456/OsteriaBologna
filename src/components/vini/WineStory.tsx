"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import { useMotion } from "@/lib/gsap";
import { dur, ease, prefersReducedMotion } from "@/lib/motion";
import cantinaBotti from "@/media/img/cantina-botti.jpg";
import vignaAerea from "@/media/img/vigna-aerea.jpg";
import posterVino from "@/media/poster/vino-calice-poster.jpg";
import { Caption } from "../ui/Caption";
import { LazyVideo } from "../ui/LazyVideo";

type Step = { titolo: string; testo: string; pos: string } & (
  | { img: StaticImageData; alt: string }
  | { video: string; poster: StaticImageData }
);

const STEPS: Step[] = [
  { img: vignaAerea, alt: "Filari di vigna visti dall'alto", pos: "40% 50%", titolo: "La vigna",
    testo: "Si parte da casa: i Colli Bolognesi e la Romagna, con Pignoletto, Albana, Lambrusco e Sangiovese." },
  { img: cantinaBotti, alt: "Botti di rovere allineate in cantina", pos: "55% 50%", titolo: "La cantina",
    testo: "Poi l'Italia dei grandi rossi, dal Barolo al Brunello, dall'Amarone a Bolgheri, e le bollicine di Franciacorta, Trento e Champagne." },
  // [DIRITTI DA VERIFICARE] il video della bottiglia è un render dimostrativo (etichetta "2017 SUMMIT")
  { video: "/media/video/vino-calice.mp4", poster: posterVino, pos: "50% 45%", titolo: "Il calice",
    testo: "Ogni vino ha il suo piatto. Trovi l'abbinamento accanto a ogni etichetta, oppure chiedilo a noi." },
];

const pad = (n: number) => String(n).padStart(2, "0");
const HIDDEN = "inset(100% 0% 0% 0%)";
const SHOWN = "inset(0% 0% 0% 0%)";

function StepMedia({ step, sizes }: { step: Step; sizes: string }) {
  return "img" in step ? (
    <Image src={step.img} alt={step.alt} fill placeholder="blur" sizes={sizes} className="object-cover" style={{ objectPosition: step.pos }} />
  ) : (
    <LazyVideo
      src={step.video}
      poster={step.poster}
      sizes={sizes}
      objectPosition={step.pos}
      className="absolute inset-0 bg-[#000]"
      controlLabel="il video della bottiglia"
    />
  );
}

/**
 * "Dalla vigna al calice" (§7.7.2, M9). Desktop: cornice 4:5 sticky a sinistra; quando uno step
 * attraversa il centro del viewport il media nuovo entra sopra il precedente (clip-path dal basso,
 * 1.1s) e quello sotto scala a 1.06; tornando indietro si inverte. La cornice resta sticky anche
 * durante la lista dei vini (children), fino alla fine della sezione.
 * Mobile e senza JS: media inline in ogni step, la bottiglia come banda prima della lista.
 */
export function WineStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useMotion(
    ({ gsap, ScrollTrigger }) => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-layer]"));
        const inners = layers.map((l) => l.querySelector<HTMLElement>("[data-layer-inner]")!);
        const counter = el.querySelector<HTMLElement>("[data-story-count]")!;
        const caption = el.querySelector<HTMLElement>("[data-story-caption]")!;
        const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
        const reduced = prefersReducedMotion();
        let active = 0;

        // con reduced-motion i livelli si impilano in ordine e cambiano con un fade
        layers.forEach((l, i) =>
          gsap.set(l, reduced ? { zIndex: i, opacity: i === 0 ? 1 : 0 } : { clipPath: i === 0 ? SHOWN : HIDDEN }),
        );

        const swapText = (target: HTMLElement, text: string, dir: 1 | -1) => {
          if (reduced) {
            target.textContent = text;
            return;
          }
          gsap
            .timeline()
            .to(target, { yPercent: -110 * dir, duration: 0.2, ease: "power2.in" })
            .call(() => {
              target.textContent = text;
            })
            .fromTo(target, { yPercent: 110 * dir }, { yPercent: 0, duration: 0.2, ease: "power2.out" });
        };

        const go = (n: number) => {
          if (n === active || n < 0 || n >= layers.length) return;
          const forward = n > active;
          layers.forEach((l, i) => {
            gsap.killTweensOf([l, inners[i]]);
            if (reduced) {
              gsap.to(l, { opacity: i <= n ? 1 : 0, duration: dur.reducedFade });
              return;
            }
            if (forward) {
              if (i === n) {
                gsap.set(l, { zIndex: 2 });
                gsap.fromTo(l, { clipPath: HIDDEN }, { clipPath: SHOWN, duration: dur.reveal, ease: ease.reveal });
                gsap.set(inners[i]!, { scale: 1 });
              } else if (i < n) {
                gsap.set(l, { zIndex: 1, clipPath: SHOWN });
                gsap.to(inners[i]!, { scale: 1.06, duration: dur.reveal, ease: ease.reveal });
              } else {
                gsap.set(l, { zIndex: 0, clipPath: HIDDEN });
              }
            } else {
              if (i > n) {
                gsap.set(l, { zIndex: 2 });
                gsap.to(l, { clipPath: HIDDEN, duration: dur.reveal, ease: ease.reveal });
              } else if (i === n) {
                gsap.set(l, { zIndex: 1, clipPath: SHOWN });
                gsap.to(inners[i]!, { scale: 1, duration: dur.reveal, ease: ease.reveal });
              } else {
                gsap.set(l, { zIndex: 0, clipPath: SHOWN });
                gsap.set(inners[i]!, { scale: 1.06 });
              }
            }
          });
          active = n;
          swapText(counter, `${pad(n + 1)} / ${pad(layers.length)}`, forward ? 1 : -1);
          swapText(caption, STEPS[n]!.titolo, forward ? 1 : -1);
        };

        steps.forEach((step, i) => {
          if (i === 0) return;
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            onEnter: () => go(i),
            onLeaveBack: () => go(i - 1),
          });
        });
      });
      return () => mm.revert();
    },
    root,
  );

  return (
    <div ref={root} className="story wrap grid-12 mt-56 pb-section lg:mt-92">
      {/* Cornice sticky (desktop con JavaScript) */}
      <div className="story-frame-col">
        <div className="story-frame">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-cantina">
            {STEPS.map((s, i) => (
              <div key={s.titolo} data-layer className="absolute inset-0 overflow-hidden" style={{ zIndex: i === 0 ? 1 : 0 }}>
                <div data-layer-inner className="absolute inset-0">
                  <StepMedia step={s} sizes="(min-width: 1024px) 520px, 1px" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex items-baseline gap-24" aria-hidden="true">
            <span className="type-caption block overflow-hidden text-noce-chiaro tabular-nums">
              <span data-story-count className="block">
                01 / {pad(STEPS.length)}
              </span>
            </span>
            <span className="type-caption block overflow-hidden text-noce-chiaro">
              <span data-story-caption className="block">
                {STEPS[0]!.titolo}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="story-content">
        {STEPS.map((s, i) => (
          <article key={s.titolo} data-step className="story-step">
            {"img" in s ? (
              <div className="story-inline relative mb-28 aspect-[4/5] w-full max-w-[560px] overflow-hidden">
                <StepMedia step={s} sizes="(min-width: 640px) 560px, 100vw" />
              </div>
            ) : null}
            <Caption tone="light" as="span" className="block tabular-nums">
              {pad(i + 1)}
            </Caption>
            <h3 className="type-heading-sm mt-12">{s.titolo}</h3>
            <p className="mt-16 max-w-[44ch] text-pergamena/85">{s.testo}</p>
          </article>
        ))}

        {/* La bottiglia come banda alta 60svh, nel suo rapporto naturale 1:2 su nero (mobile) */}
        <div className="story-band relative -mx-[var(--spacing-gutter)] mt-56 mb-section h-[60svh] bg-[#000]">
          <div className="relative mx-auto aspect-[1/2] h-full">
            <LazyVideo
              src="/media/video/vino-calice.mp4"
              poster={posterVino}
              sizes="40vw"
              fit="contain"
              className="absolute inset-0"
              controlLabel="il video della bottiglia"
            />
          </div>
        </div>

        <div className="story-list">{children}</div>
      </div>
    </div>
  );
}
