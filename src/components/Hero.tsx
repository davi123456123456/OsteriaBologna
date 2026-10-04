"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { useMotion } from "@/lib/gsap";
import { fontsReady, prefersReducedMotion, saveData, SCRUB } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/smooth-scroll";
import posterBrace from "@/media/poster/hero-brace-poster.jpg";
import posterPadella from "@/media/poster/sfoglia-padella-poster.jpg";
import { buildCells, Tovaglia, TOVAGLIA_ID, tovagliaCols } from "./Tovaglia";
import { Caption } from "./ui/Caption";
import { GhostButton } from "./ui/GhostButton";
import { Grain } from "./ui/Grain";
import { VideoToggle } from "./ui/VideoToggle";

// TODO: sostituire con sorgente ≥1920px (la brace è larga 736px: a tutto schermo solo
// dietro overlay scuro e grana, che ne nascondono la morbidezza).
const VIDEO_LANDSCAPE = "/media/video/hero-brace.mp4";
const VIDEO_PORTRAIT = "/media/video/sfoglia-padella.mp4";
const LANDSCAPE = "(min-aspect-ratio: 1/1)";

const LINO = "#ded3c4";
const PERGAMENA = "#ebe3d5";

// Poster in art direction: il primo paint è subito quello giusto per l'orientamento.
const posterCommon = { alt: "", sizes: "100vw", quality: 75, loading: "eager" } as const;
const posterDesktop = getImageProps({ ...posterCommon, src: posterBrace }).props;
const posterMobile = getImageProps({ ...posterCommon, src: posterPadella }).props;

/**
 * Hero (§7.2). Media: brace in orizzontale, pasta in padella in verticale.
 * M1 — intro "la tovaglia si toglie", una volta per sessione.
 * M2 — uscita "la tovaglia si stende": timeline in scrub sulla hero alta 200svh (sticky CSS).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);
  const inView = useRef(true);

  // Sorgente video scelta con matchMedia; ogni sorgente si carica al massimo una volta.
  useEffect(() => {
    const v = video.current;
    if (!v || prefersReducedMotion() || saveData()) return;
     
    setVideoOn(true);
    const mq = window.matchMedia(LANDSCAPE);
    const apply = () => {
      const src = mq.matches ? VIDEO_LANDSCAPE : VIDEO_PORTRAIT;
      if (v.dataset.src === src) return;
      v.dataset.src = src;
      v.src = src;
      if (!userPaused.current && inView.current) v.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    // fuori dalla finestra il video si ferma
    const io = new IntersectionObserver(([e]) => {
      inView.current = Boolean(e?.isIntersecting);
      if (inView.current && !userPaused.current) v.play().catch(() => {});
      else v.pause();
    });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", apply);
      io.disconnect();
    };
  }, []);

  const toggleVideo = () => {
    const v = video.current;
    if (!v) return;
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) v.pause();
    else v.play().catch(() => {});
  };

  useMotion(
    ({ gsap, SplitText }, context) => {
      const el = root.current;
      const html = document.documentElement;
      const tov = document.getElementById(TOVAGLIA_ID);
      if (!el || !tov || !html.classList.contains("motion")) return;

      const q = <T extends Element = HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
      const wordmark = el.querySelector<HTMLElement>("[data-hero-wordmark]")!;
      const media = el.querySelector<HTMLElement>("[data-hero-media]")!;
      const mediaInner = el.querySelector<HTMLElement>("[data-hero-media-inner]")!;
      const darken = el.querySelector<HTMLElement>("[data-hero-darken]")!;
      const exitFades = q("[data-exit-fade]");
      const meta = el.querySelector<HTMLElement>("[data-hero-meta]")!;
      const metaLine = el.querySelector<HTMLElement>("[data-hero-line]")!;
      const leadRow = q("[data-hero-lead]");
      const cue = el.querySelector<HTMLElement>("[data-hero-cue]")!;
      const navItems = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-item]"));

      buildCells(tov);
      const cells = () => ({
        A: Array.from(tov.querySelectorAll<HTMLElement>("i.a")),
        B: Array.from(tov.querySelectorAll<HTMLElement>("i.b")),
      });

      // ── M2: uscita in scrub ─────────────────────────────────────────────
      let exit: gsap.core.Timeline | null = null;
      const buildExit = () =>
        context.add(() => {
          exit?.scrollTrigger?.kill();
          exit?.kill();
          const { A, B } = cells();
          const random = { amount: 0.3, from: "random" } as const;
          exit = gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom bottom",
                scrub: SCRUB,
                onUpdate: (self) => {
                  // La nav passa al tema chiaro (barra pergamena velata) quando le celle lino sono
                  // complete: a 0.8 il testo pergamena finiva illeggibile sopra le celle chiare.
                  const t = self.progress >= 0.62 ? "light" : "dark";
                  if (el.dataset.theme !== t) el.dataset.theme = t;
                },
              },
            })
            .fromTo(exitFades, { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0)
            .fromTo(wordmark, { yPercent: 0 }, { yPercent: -14, duration: 0.4 }, 0)
            .fromTo(mediaInner, { scale: 1 }, { scale: 1.06, duration: 0.4 }, 0)
            .fromTo(darken, { opacity: 0 }, { opacity: 0.2, duration: 0.4 }, 0)
            .fromTo(A, { scale: 0, backgroundColor: LINO }, { scale: 1.02, backgroundColor: LINO, duration: 0.15, stagger: random }, 0.15)
            .fromTo(B, { scale: 0 }, { scale: 1.02, duration: 0.15, stagger: random }, 0.45)
            .fromTo(A, { backgroundColor: LINO }, { backgroundColor: PERGAMENA, duration: 0.15, immediateRender: false }, 0.85)
            .set({}, {}, 1);
        });

      // ── M1: intro ────────────────────────────────────────────────────────
      // Se il JS arriva dopo che il failsafe CSS (4s) ha già tolto la tovaglia, o se la
      // pagina si è riaperta già scorsa, l'intro si salta.
      // Smontaggio (o doppio effetto di React Strict Mode in sviluppo) a intro in corso:
      // la parte asincrona non deve partire e lo scroll va sbloccato.
      let cancelled = false;
      let locked = false;
      const release = () => {
        if (!locked) return;
        locked = false;
        unlockScroll();
      };
      const wantsIntro = html.classList.contains("intro");
      const lateOrScrolled = performance.now() > 3500 || window.scrollY > 10;
      if (!wantsIntro || lateOrScrolled) {
        if (wantsIntro) {
          html.classList.remove("intro");
          try {
            sessionStorage.setItem("ob-intro", "1");
          } catch {}
        }
        buildExit();
      } else {
        tov.dataset.state = "running"; // ferma il failsafe CSS
        try {
          sessionStorage.setItem("ob-intro", "1");
        } catch {}
        lockScroll();
        locked = true;
        let splits: InstanceType<typeof SplitText>[] = [];
        fontsReady(1200).then(() => {
          if (cancelled) return;
          context.add(() => {
            const { A, B } = cells();
            const lines = Array.from(wordmark.querySelectorAll<HTMLElement>("[data-line]"));
            splits = lines.map((l) => SplitText.create(l, { type: "chars", mask: "chars", charsClass: "split-char", aria: "none" }));
            const [c1 = [], c2 = []] = splits.map((s) => s.chars);

            // lo stato iniziale passa dal CSS (html.intro) agli stili inline
            gsap.set([...A, ...B], { scale: 1.02 });
            gsap.set(tov, { backgroundColor: "transparent" });
            gsap.set(media, { opacity: 0, scale: 1.12 });
            gsap.set([...c1, ...c2], { yPercent: 110 });
            gsap.set([meta, ...leadRow, cue], { opacity: 0 });
            gsap.set(navItems, { opacity: 0, y: -12 });
            html.classList.remove("intro");

            const cellOut = { scale: 0, duration: 0.3, ease: "power3.inOut", stagger: { amount: 0.3, from: "random" } } as const;
            gsap
              .timeline({
                onComplete: () => {
                  splits.forEach((s) => s.revert());
                  splits = [];
                },
              })
              .to(B, cellOut, 0.05)
              .to(A, cellOut, 0.35)
              .to(media, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0.5)
              .to(c1, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.035 }, 0.8)
              .to(c2, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.035 }, 0.92)
              .fromTo(metaLine, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.5, ease: "expo.out" }, 1.1)
              .fromTo(meta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, 1.1)
              .to(leadRow, { opacity: 1, duration: 0.55, ease: "power2.out" }, 1.25)
              .to(navItems, { y: 0, opacity: 1, duration: 0.55, ease: "expo.out", stagger: 0.05, clearProps: "transform,opacity" }, 1.25)
              .to(cue, { opacity: 1, duration: 0.3 }, 1.8)
              .call(() => {
                tov.removeAttribute("data-state");
                release();
                buildExit();
              }, [], 1.8);
          });
        });
      }

      // Al cambio di larghezza: nuova griglia e nuova timeline di uscita.
      let lastW = window.innerWidth;
      let t = 0;
      const onResize = () => {
        window.clearTimeout(t);
        t = window.setTimeout(() => {
          const w = window.innerWidth;
          const colsChanged = tovagliaCols(w) !== tovagliaCols(lastW);
          if (w === lastW && !colsChanged) return; // solo altezza: barra degli indirizzi
          lastW = w;
          if (!exit) return; // intro in corso: ci pensa la fine dell'intro
          if (buildCells(tov)) buildExit();
        }, 200);
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelled = true;
        release();
        window.removeEventListener("resize", onResize);
        window.clearTimeout(t);
      };
    },
    root,
  );

  const anno = site.annoApertura;
  return (
    <section
      ref={root}
      id="hero"
      data-theme="dark"
      data-nav="hero"
      aria-labelledby="hero-title"
      className="hero relative bg-pergamena"
    >
      <div className="hero-stage sticky top-0 h-[100svh] overflow-hidden bg-cantina text-pergamena">
        <div data-hero-media className="absolute inset-0">
          <div data-hero-media-inner data-hero-fade className="absolute inset-0">
            <picture>
              <source media={LANDSCAPE} srcSet={posterDesktop.srcSet} sizes={posterDesktop.sizes} />
              <img
                {...posterMobile}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[50%_50%] [@media(min-aspect-ratio:1/1)]:object-[50%_55%]"
              />
            </picture>
            <video
              ref={video}
              aria-hidden="true"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              disablePictureInPicture
              onPlaying={() => setPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover object-[50%_50%] transition-opacity duration-700 [@media(min-aspect-ratio:1/1)]:object-[50%_55%] ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div className="hero-overlay absolute inset-0" />
        <div data-hero-darken className="absolute inset-0 bg-cantina opacity-0" />
        <Grain />

        <div className="wrap relative z-[1] flex h-full flex-col justify-end pt-[var(--nav-h)] pb-[max(28px,env(safe-area-inset-bottom))] sm:pb-42">
          <div data-exit-fade>
            <div data-hero-meta data-intro="fade" data-hero-fade className="mb-20 flex items-center gap-16 sm:mb-28 short:mb-12">
              <Caption tone="inherit" as="span">
                Trattoria bolognese
              </Caption>
              <span data-hero-line aria-hidden="true" className="h-px flex-1 bg-filo-scuro" />
              <Caption tone="inherit" as="span">
                {anno ? `Dal ${anno}` : "Bologna"}
              </Caption>
            </div>
          </div>

          <h1 id="hero-title" data-hero-wordmark data-hero-fade className="hero-wordmark type-wordmark -ml-[0.04em]">
            <span data-line className="block">
              Osteria
            </span>{" "}
            <span data-line className="block">
              Bologna
            </span>
          </h1>

          <div data-exit-fade className="mt-28 sm:mt-42 short:mt-16">
            <div className="flex flex-col gap-24 lg:flex-row lg:items-end lg:justify-between short:flex-row short:items-end short:justify-between short:gap-16">
              <p data-hero-lead data-intro="fade" data-hero-fade className="type-lead text-pergamena/85 short:max-w-[24ch] short:text-[16px]">
                La tradizione bolognese, dalla sfoglia alla brace.
              </p>
              <div data-hero-lead data-intro="fade" data-hero-fade className="flex flex-wrap gap-12 short:flex-nowrap short:gap-8">
                <GhostButton href={site.telefonoHref} tone="light" className="short:px-14 short:py-12">
                  Chiama per prenotare
                </GhostButton>
                <GhostButton href="#menu" tone="light" className="short:px-14 short:py-12">
                  Guarda il menù
                </GhostButton>
              </div>
            </div>
          </div>

          <div data-exit-fade className="mt-16 sm:mt-20 short:mt-4">
            <div data-hero-cue data-intro="fade" data-hero-fade className="flex items-center justify-end gap-24">
              {videoOn ? <VideoToggle paused={paused} onToggle={toggleVideo} label="il video" /> : null}
              <span className="flex items-center gap-10" aria-hidden="true">
                <span className="scroll-cue" />
                <span className="type-caption">Scorri</span>
              </span>
            </div>
          </div>
        </div>

        <Tovaglia />
      </div>
    </section>
  );
}
