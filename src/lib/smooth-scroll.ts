"use client";

// Lenis sincronizzato con ScrollTrigger (brief §3), caricato dopo l'idratazione. Disattivato con
// prefers-reduced-motion: in quel caso tutte le funzioni ripiegano sullo scroll nativo.
import type Lenis from "lenis";
import { loadRuntime } from "./gsap";
import { prefersReducedMotion } from "./motion";

let lenis: Lenis | null = null;
let locks = 0;

export function initSmoothScroll(): () => void {
  if (lenis || prefersReducedMotion()) return () => {};
  let cancelled = false;
  let teardown = () => {};
  Promise.all([import("lenis"), loadRuntime()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
    if (cancelled) return;
    const instance = new LenisCtor({ autoRaf: false, lerp: 0.11 });
    lenis = instance;
    if (locks > 0) instance.stop(); // l'intro della hero ha già bloccato lo scroll
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    teardown = () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  });
  return () => {
    cancelled = true;
    teardown();
  };
}

export const getLenis = () => lenis;

/** Blocca lo scroll (intro della hero, menu mobile). Le chiamate si sommano. */
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  lenis?.start();
}

/**
 * Scorre fino a un elemento tenendo conto del suo scroll-margin-top (nav + sottonav, in CSS su
 * [data-anchor]). La destinazione si calcola dalla posizione reale della finestra, non dallo
 * stato interno di Lenis, che può essere rimasto indietro dopo uno scroll nativo.
 */
export function scrollToElement(el: HTMLElement, onDone?: () => void) {
  if (lenis) {
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - margin;
    lenis.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: () => onDone?.(),
    });
    return;
  }
  el.scrollIntoView({ block: "start", behavior: "auto" });
  // lascia al browser un frame per assestare lo scroll
  requestAnimationFrame(() => onDone?.());
}
