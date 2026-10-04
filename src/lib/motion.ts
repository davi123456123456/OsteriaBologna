// Costanti di movimento (brief §5): pochi momenti orchestrati, il resto è carta stampata.

export const ease = {
  /** hover e micro-interazioni */
  editorial: "cubic-bezier(0.25,0.46,0.45,0.94)",
  /** scoperture con clip-path */
  reveal: "cubic-bezier(0.77,0,0.175,1)",
  /** testi */
  text: "expo.out",
} as const;

export const dur = {
  hover: 0.4,
  reveal: 1.1,
  revealLong: 1.2,
  text: 0.9,
  reducedFade: 0.3,
} as const;

/** Tutto ciò che è legato allo scroll. */
export const SCRUB = 0.8;

/** Query di gsap.matchMedia(): desktop/mobile × movimento/ridotto. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;

/** Risparmio dati: i video restano sul poster. */
export const saveData = () =>
  typeof navigator !== "undefined" &&
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/** Font pronti, ma senza aspettare più di `max` ms. */
export function fontsReady(max = 1200): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return Promise.resolve();
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((r) => setTimeout(r, max)),
  ]);
}
