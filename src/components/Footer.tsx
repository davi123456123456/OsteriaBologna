import Link from "next/link";
import { site } from "@/data/site";
import { Caption } from "./ui/Caption";

/** Footer (§7.9): tre colonne, riga legale con la P.IVA, wordmark gigante tagliato dal bordo. */
export function Footer() {
  const anno = new Date().getFullYear();
  const social = [
    site.email && { label: site.email, href: `mailto:${site.email}` },
    site.instagram && { label: "Instagram", href: site.instagram },
    site.facebook && { label: "Facebook", href: site.facebook },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-cantina text-pergamena">
      <div className="wrap grid-12 gap-y-42 pt-section pb-56">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Caption tone="light" as="h2" className="mb-16">
            {site.nome}
          </Caption>
          <address className="not-italic">{site.indirizzo}</address>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Caption tone="light" as="h2" className="mb-16">
            Orari
          </Caption>
          <ul>
            {site.orari.map(([giorni, ore]) => (
              <li key={giorni} className="flex flex-wrap gap-x-16">
                <span>{giorni}</span>
                <span>{ore}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Caption tone="light" as="h2" className="mb-16">
            Contatti
          </Caption>
          <ul className="space-y-4">
            <li>
              <a href={site.telefonoHref} className="text-link">
                {site.telefonoDisplay}
              </a>
            </li>
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-link" rel="noopener" target={s.href.startsWith("http") ? "_blank" : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <div className="type-caption flex flex-wrap gap-x-[clamp(24px,3vw,48px)] gap-y-10 border-t border-filo-scuro pt-20 pb-28 text-noce-chiaro">
          <span>
            © {anno} {site.ragioneSociale}
          </span>
          <span>P.IVA {site.piva}</span>
          <Link href="/privacy" className="text-link">
            Privacy
          </Link>
          <Link href="/cookie" className="text-link">
            Cookie
          </Link>
          {/* finché il cliente non fornisce un originale con diritti chiari: [FOTO_SALA_ORIGINALE] */}
          <span>Foto sala: © Suppapapa</span>
          <span>{site.creditoStudio}</span>
        </div>
      </div>

      {/* Il wordmark chiude la pagina come la hero l'ha aperta, tagliato dal bordo (~18%). */}
      <div aria-hidden="true" className="wrap overflow-hidden [container-type:inline-size]">
        {/* "OSTERIA BOLOGNA" misura 8.95em: su una riga riempie la colonna; sotto i 640px va su due */}
        <p className="footer-wordmark type-wordmark">
          <span className="sm:hidden">
            Osteria
            <br />
            Bologna
          </span>
          <span className="hidden whitespace-nowrap sm:inline">{site.nome}</span>
        </p>
      </div>
    </footer>
  );
}
