"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/smooth-scroll";
import pastaPiatto from "@/media/img/pasta-piatto.jpg";
import sfogliaRulli from "@/media/img/sfoglia-rulli.jpg";
import sfogliaTaglio from "@/media/img/sfoglia-taglio.jpg";
import tagliatelleNastri from "@/media/img/tagliatelle-nastri.jpg";
import posterPadella from "@/media/poster/sfoglia-padella-poster.jpg";
import { Caption } from "./ui/Caption";
import { DisplayHeading } from "./ui/DisplayHeading";
import { LazyVideo } from "./ui/LazyVideo";

type Panel = {
  titolo: string;
  testo: string;
} & ({ img: StaticImageData; alt: string; pos?: string } | { video: string; poster: StaticImageData });

const PANELS: Panel[] = [
  { img: sfogliaRulli, alt: "La sfoglia all'uovo che esce dalla sfogliatrice", pos: "50% 50%",
    titolo: "La sfoglia", testo: "Uova e farina, lavorate fino a una sfoglia sottile e uniforme." },
  { img: sfogliaTaglio, alt: "La sfoglia tagliata a mano con la rotella, accanto al mattarello", pos: "50% 50%",
    titolo: "Il taglio", testo: "La sfoglia si taglia a mano, con la rotella, accanto al mattarello." },
  { img: tagliatelleNastri, alt: "Mani che srotolano le tagliatelle appena tagliate", pos: "50% 50%",
    titolo: "Le tagliatelle", testo: "Si srotolano i nastri: larghi, ruvidi, pronti per il ragù." },
  { video: "/media/video/sfoglia-padella.mp4", poster: posterPadella,
    titolo: "In padella", testo: "Mantecate al momento, perché il condimento abbracci la pasta." },
  // Il tartufo non è in menù: foto d'atmosfera, alt e didascalia generici (brief §2.2).
  { img: pastaPiatto, alt: "Un piatto di pasta fresca appena servito", pos: "50% 50%",
    titolo: "Al piatto", testo: "Poi in tavola, ancora fumanti." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * La sfoglia (§7.5, M7). Desktop con movimento: sezione fissata e binario orizzontale in scrub,
 * parallasse interna con containerAnimation, barra di avanzamento e contatore. Senza movimento
 * (o sotto i 1024px) è una griglia/lista statica: il layout lo decide il CSS (html.motion).
 */
export function Sfoglia() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);

  useMotion(
    ({ gsap, ScrollTrigger }) => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        if (!document.documentElement.classList.contains("motion")) return;
        const pinEl = el.querySelector<HTMLElement>("[data-sfoglia-pin]")!;
        const rail = el.querySelector<HTMLElement>("[data-sfoglia-rail]")!;
        const fill = el.querySelector<HTMLElement>("[data-sfoglia-fill]")!;
        const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"));
        const gutter = () => parseFloat(getComputedStyle(rail).paddingLeft) || 0;
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + gutter());

        const nearest = () => {
          const mid = window.innerWidth / 2;
          let best = 0;
          let bestD = Infinity;
          panels.forEach((p, i) => {
            const r = p.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - mid);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          return best + 1;
        };

        const track = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            pin: pinEl,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 1,
            onUpdate: (self) => {
              gsap.set(fill, { scaleX: self.progress });
              const n = nearest();
              setCurrent((c) => (c === n ? c : n));
            },
          },
        });

        // profondità: le immagini scorrono leggermente dentro la loro cornice
        el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((inner) => {
          gsap.fromTo(
            inner,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: inner.parentElement,
                containerAnimation: track,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // con la tastiera: il pannello che riceve il focus viene portato al centro
        const onFocus = (e: FocusEvent) => {
          const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel], [data-sfoglia-intro]");
          const st = track.scrollTrigger;
          if (!panel || !st) return;
          const left = panel.offsetLeft - (window.innerWidth - panel.offsetWidth) / 2;
          const p = gsap.utils.clamp(0, 1, left / distance());
          const y = st.start + p * (st.end - st.start);
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y, { immediate: true });
          else window.scrollTo(0, y);
        };
        el.addEventListener("focusin", onFocus);
        ScrollTrigger.refresh();
        return () => el.removeEventListener("focusin", onFocus);
      });
      return () => mm.revert();
    },
    root,
  );

  return (
    <section
      ref={root}
      id="sfoglia"
      data-theme="light"
      aria-labelledby="sfoglia-title"
      className="sfoglia relative overflow-x-clip bg-lino text-onice"
    >
      <div data-sfoglia-pin className="sfoglia-pin">
        <div data-sfoglia-rail className="sfoglia-rail">
          <div data-sfoglia-intro className="sfoglia-intro">
            <DisplayHeading id="sfoglia-title" lines={["La sfoglia"]} />
            {/* [VERIFICARE "ogni giorno" col cliente; in alternativa: "La pasta fresca nasce qui, prima di arrivare in tavola."] */}
            <p className="mt-28 max-w-[34ch] text-espresso sm:mt-42">
              Uova, farina e mani esperte. La pasta fresca nasce qui, ogni giorno, prima di arrivare in tavola.
            </p>
          </div>

          {PANELS.map((p, i) => (
            <figure key={p.titolo} data-panel className={`sfoglia-panel ${"video" in p ? "is-video" : ""}`}>
              <div className="sfoglia-media relative overflow-hidden">
                {"video" in p ? (
                  <LazyVideo
                    src={p.video}
                    poster={p.poster}
                    sizes="(min-width: 1024px) 400px, 92vw"
                    className="absolute inset-0"
                    controlLabel="il video della pasta in padella"
                  />
                ) : (
                  <div data-parallax className="sfoglia-parallax absolute inset-y-0">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 560px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: p.pos }}
                    />
                  </div>
                )}
              </div>
              <figcaption className="mt-20">
                {/* su lino il noce non arriva a 4.5:1: le didascalie usano espresso */}
                <Caption as="span" tone="inherit" className="block text-espresso">
                  {pad(i + 1)}
                </Caption>
                <h3 className="type-heading-sm mt-10">{p.titolo}</h3>
                <p className="mt-12 max-w-[34ch] text-espresso">{p.testo}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="sfoglia-progress wrap" aria-hidden="true">
          <div className="relative h-px flex-1 bg-filo">
            <div data-sfoglia-fill className="absolute inset-0 origin-left scale-x-0 bg-zafferano" />
          </div>
          <span className="type-caption tabular-nums text-espresso">
            {pad(current)} / {pad(PANELS.length)}
          </span>
        </div>
      </div>
    </section>
  );
}
