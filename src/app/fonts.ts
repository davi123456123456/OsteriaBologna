import { Fraunces } from "next/font/google";
import localFont from "next/font/local";

// Font self-hosted (brief §3): next/font scarica Fraunces in fase di build e lo serve dal
// dominio del sito, Satoshi è locale. Nessuna chiamata a server esterni a runtime.
// TT Ramillas non è in _source-assets/fonts: si usa il sostituto indicato, Fraunces.

export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: true,
  // i titoli in serif sono tutti sotto la piega: non rubano banda al wordmark (LCP)
  preload: false,
});

// Satoshi (Fontshare, licenza ITF FFL: file originali, non modificati — vedi src/fonts).
export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});
