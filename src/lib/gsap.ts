"use client";

// GSAP caricato dopo l'idratazione (import dinamico): ~60 KB gzip in meno sul percorso critico
// del primo paint, dove c'è solo il wordmark (LCP). Plugin registrati una volta sola (brief §3).
import { useEffect, type DependencyList, type RefObject } from "react";
import type { ScrollTrigger as ScrollTriggerT } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextT } from "gsap/SplitText";

export type Runtime = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof ScrollTriggerT;
  SplitText: typeof SplitTextT;
};

let runtime: Promise<Runtime> | null = null;

export function loadRuntime(): Promise<Runtime> {
  runtime ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
    ([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      // La barra degli indirizzi su mobile non deve far ricalcolare (e saltare) i pin.
      ScrollTrigger.config({ ignoreMobileResize: true });
      return { gsap, ScrollTrigger, SplitText };
    },
  );
  return runtime;
}

type Setup = (rt: Runtime, ctx: gsap.Context) => void | (() => void);

/**
 * Equivalente di useGSAP con GSAP caricato in modo asincrono: la funzione gira dentro un
 * gsap.context() con lo scope indicato, e tutto (tween, ScrollTrigger, SplitText) viene
 * ripristinato allo smontaggio. Le chiamate partono nell'ordine di montaggio dei componenti,
 * quindi l'ordine di creazione degli ScrollTrigger segue quello della pagina.
 */
export function useMotion(setup: Setup, scope: RefObject<Element | null>, deps: DependencyList = []) {
  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let cleanup: void | (() => void);
    loadRuntime().then((rt) => {
      if (cancelled) return;
      ctx = rt.gsap.context((self) => {
        cleanup = setup(rt, self);
      }, scope.current ?? undefined);
    });
    return () => {
      cancelled = true;
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- le dipendenze sono passate dal chiamante
  }, deps);
}
