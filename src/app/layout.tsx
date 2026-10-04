import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { isPlaceholder, site, siteUrl } from "@/data/site";
import { fraunces, satoshi } from "./fonts";
import "./globals.css";

const title = "Osteria Bologna | Trattoria tradizionale bolognese";
const description =
  "Trattoria bolognese: pasta fresca, tortellini in brodo, carne alla brace e una carta dei vini dai Colli Bolognesi ai grandi rossi d'Italia. Prenota al +39 370 138 8515.";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: title, template: "%s | Osteria Bologna" },
  description,
  applicationName: site.nome,
  ...(isPlaceholder(site.dominio) ? {} : { alternates: { canonical: "/" } }),
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.nome,
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#292622",
  width: "device-width",
  initialScale: 1,
};

// Eseguito prima del primo paint: classi su <html> che governano tovaglia e motion.
//   js       JavaScript attivo (senza, la hero è subito visibile e statica)
//   motion   movimento consentito · reduced  prefers-reduced-motion
//   intro    prima visita della sessione sulla home: la tovaglia copre la hero
//   quiet    visite successive (o reduced-motion): la hero compare con un fade di 0.3s
const antiFlash = `(function(){var c=document.documentElement.classList,r=false,i=false;c.add("js");try{r=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}c.add(r?"reduced":"motion");if(!r&&location.pathname==="/"){try{i=!sessionStorage.getItem("ob-intro")}catch(e){}}c.add(i?"intro":"quiet")})();`;

function restaurantJsonLd() {
  const url = siteUrl().origin;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.nome,
    telephone: site.telefonoDisplay,
    servesCuisine: ["Bolognese", "Emiliana", "Italiana"],
    acceptsReservations: "True",
    hasMenu: `${url}/#menu`,
    url,
    image: `${url}/opengraph-image`,
  };
  // Indirizzo e orari solo se valorizzati: mai segnaposto nel JSON-LD (brief §11).
  if (!isPlaceholder(site.indirizzo)) {
    data.address = { "@type": "PostalAddress", streetAddress: site.indirizzo, addressLocality: "Bologna", addressCountry: "IT" };
  }
  const orari = site.orari.filter(([g, o]) => !isPlaceholder(g) && !isPlaceholder(o));
  if (orari.length) {
    // TODO: convertire le righe giorno-orario in openingHoursSpecification quando arrivano i dati
    data.openingHours = orari.map(([g, o]) => `${g} ${o}`);
  }
  return JSON.stringify(data);
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${satoshi.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlash }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: restaurantJsonLd() }} />
      </head>
      <body id="top">
        <a href="#contenuto" className="skip-link type-ui">
          Vai al contenuto
        </a>
        <SmoothScroll />
        <Nav />
        <main id="contenuto" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
