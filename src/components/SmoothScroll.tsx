"use client";

import { useEffect } from "react";
import { loadRuntime } from "@/lib/gsap";
import { initSmoothScroll, scrollToElement } from "@/lib/smooth-scroll";

const HIGHLIGHT_MS = 1600;

/** Evidenzia le voci di destinazione di un collegamento menù ↔ vini (M10). */
function highlight(ids: string[]) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.removeAttribute("data-highlight");
    // riavvia la transizione anche se la voce era già evidenziata
    void el.offsetWidth;
    el.setAttribute("data-highlight", "");
    window.setTimeout(() => el.removeAttribute("data-highlight"), HIGHLIGHT_MS);
  }
}

/**
 * Lenis + ScrollTrigger e gestione delle ancore interne: scroll morbido che tiene conto di
 * nav e sottonav (scroll-margin-top), poi focus sulla destinazione e, per i collegamenti
 * piatto ↔ vino, l'evidenziazione zafferano.
 */
export function SmoothScroll() {
  useEffect(() => {
    const destroy = initSmoothScroll();

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || url.origin !== location.origin || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const pair = a.dataset.pair?.split(",").filter(Boolean);
      scrollToElement(target, () => {
        if (pair?.length) highlight(pair);
        if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
      });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // posizioni corrette quando font e immagini hanno finito di caricare
    const refresh = () => loadRuntime().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      destroy();
    };
  }, []);
  return null;
}
