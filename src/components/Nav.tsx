"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { GhostButton } from "./ui/GhostButton";
import { MobileMenu } from "./MobileMenu";

export const NAV_LINKS = [
  { id: "menu", label: "Menù" },
  { id: "vini", label: "Vini" },
  { id: "trattoria", label: "La trattoria" },
  { id: "contatti", label: "Contatti" },
] as const;

type Theme = "hero" | "light" | "dark";

/**
 * Navigazione fissa (§7.1). M3: il tema segue la sezione sotto la nav, letta con un hit-test
 * sulla linea centrale della barra a ogni scroll (rAF). La hero dichiara il proprio tema
 * (data-theme) e lo cambia a 0.8 dell'uscita.
 */
export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const header = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>(home ? "hero" : "light");
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = header.current;
      if (!bar) return;
      const y = bar.offsetHeight / 2;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !bar.contains(el))
        ?.closest<HTMLElement>("[data-theme]");
      if (under) {
        const t = under.dataset.theme === "dark" ? (under.dataset.nav === "hero" ? "hero" : "dark") : "light";
        setTheme(t);
      }
      // sezione corrente: quella che occupa il centro alto della finestra
      const mid = document
        .elementsFromPoint(window.innerWidth / 2, window.innerHeight * 0.4)
        .find((el) => !bar.contains(el))
        ?.closest<HTMLElement>("section[id]");
      const id = mid?.id ?? null;
      setCurrent(NAV_LINKS.some((l) => l.id === id) ? id : null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // la hero cambia tema durante lo scrub senza che cambi la sezione sotto la nav
    const mo = new MutationObserver(onScroll);
    document.querySelectorAll("[data-theme]").forEach((el) => mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        ref={header}
        data-theme={theme}
        className="site-nav fixed inset-x-0 top-0 z-50 h-[var(--nav-h)]"
      >
        <div className="wrap flex h-full items-center gap-24">
          {/* [LOGO] — sostituibile con l'SVG del cliente. Ancore semplici, non <Link>: sulla home
              eviterebbe il prefetch della pagina stessa; dalle altre pagine un caricamento pieno
              fa girare lo script inline della tovaglia prima del primo paint. */}
          <a
            href={home ? "#top" : "/"}
            data-nav-item
            className="type-ui shrink-0 py-12"
            aria-label={home ? `${site.nome}, torna all'inizio` : `${site.nome}, home`}
          >
            {site.nome}
          </a>

          <nav aria-label="Principale" className="ml-[clamp(24px,7vw,120px)] hidden lg:block">
            <ul className="flex items-center gap-32">
              {NAV_LINKS.map((l) => (
                <li key={l.id} data-nav-item>
                  <a href={href(l.id)} className="nav-link type-ui" aria-current={current === l.id ? "true" : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-8 lg:gap-0" data-nav-item>
            {/* touch: chiamata diretta · mouse: la sezione contatti col numero in grande */}
            <GhostButton href={site.telefonoHref} compact className="only-coarse">
              Prenota
            </GhostButton>
            <GhostButton href={href("contatti")} compact className="only-fine">
              Prenota
            </GhostButton>
            <button
              ref={menuButton}
              type="button"
              className="type-ui nojs:hidden min-h-44 min-w-44 pl-12 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={open}
        onClose={(restoreFocus = true) => {
          setOpen(false);
          if (restoreFocus) menuButton.current?.focus({ preventScroll: true });
        }}
        links={NAV_LINKS.map((l) => ({ ...l, href: href(l.id) }))}
      />
    </>
  );
}
