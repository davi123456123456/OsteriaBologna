"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { loadRuntime } from "@/lib/gsap";
import { ease, prefersReducedMotion } from "@/lib/motion";
import { lockScroll, scrollToElement, unlockScroll } from "@/lib/smooth-scroll";
import { Caption } from "./ui/Caption";

type Link = { id: string; label: string; href: string };

/**
 * Overlay del menu mobile (M11): pannello cantina che entra con clip-path dall'alto in 0.6s,
 * voci in serif che salgono con stagger 0.06s. Chiusura con "Chiudi", Esc o scegliendo una
 * voce; focus intrappolato nel pannello, scroll della pagina bloccato.
 */
export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  /** restoreFocus = false quando si chiude scegliendo una voce (il focus va alla sezione) */
  onClose: (restoreFocus?: boolean) => void;
  links: Link[];
}) {
  const panel = useRef<HTMLDivElement>(null);
  const pending = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // monta all'apertura; smonta alla fine dell'animazione di chiusura
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- il pannello resta montato durante l'uscita
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    const el = panel.current;
    if (!mounted || !el) return;
    const items = el.querySelectorAll("[data-menu-item]");
    const reduced = prefersReducedMotion();
    if (open) {
      lockScroll();
      closeBtn.current?.focus({ preventScroll: true });
    }
    // chiusura: smonta, sblocca e poi, se è stata scelta una voce, scorre alla sezione
    const done = () => {
      setMounted(false);
      unlockScroll();
      const target = pending.current;
      pending.current = null;
      if (target) scrollToElement(target, () => target.focus({ preventScroll: true }));
    };
    let cancelled = false;
    loadRuntime().then(({ gsap }) => {
      if (cancelled) return;
      if (open && reduced) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      } else if (open) {
        gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: ease.reveal });
        gsap.fromTo(items, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: ease.text, stagger: 0.06, delay: 0.25 });
      } else if (reduced) {
        gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done });
      } else {
        gsap.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: ease.reveal, onComplete: done });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, mounted]);

  // Esc e trappola del focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(true);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;
  return (
    <div
      ref={panel}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col bg-cantina text-pergamena lg:hidden"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div className="wrap flex h-[var(--nav-h)] shrink-0 items-center justify-between">
        <span className="type-ui">{site.nome}</span>
        <button ref={closeBtn} type="button" onClick={() => onClose(true)} className="type-ui min-h-44 min-w-44 pl-12 text-right">
          Chiudi
        </button>
      </div>
      <nav aria-label="Principale" className="wrap flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-16">
          {links.map((l) => (
            <li key={l.id} className="overflow-hidden pt-[0.14em] -mt-[0.14em]">
              <a
                href={l.href}
                data-menu-item
                onClick={(e) => {
                  const target = document.getElementById(l.id);
                  if (!target) return; // pagina diversa dalla home: navigazione normale
                  e.preventDefault();
                  pending.current = target;
                  history.replaceState(null, "", `#${l.id}`);
                  onClose(false);
                }}
                className="type-serif block text-[48px] leading-[0.95] tracking-[-0.035em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap flex flex-col gap-6 pb-[max(28px,env(safe-area-inset-bottom))]">
        <a href={site.telefonoHref} className="type-subheading text-[28px]">
          {site.telefonoDisplay}
        </a>
        <Caption tone="light">P.IVA {site.piva}</Caption>
      </div>
    </div>
  );
}
