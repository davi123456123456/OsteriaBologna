import Image from "next/image";
import { isPlaceholder, mapsHref, site } from "@/data/site";
import cucina from "@/media/img/cucina-bn.jpg";
import { DisplayHeading } from "./ui/DisplayHeading";
import { GhostButton } from "./ui/GhostButton";

/** Prenota un tavolo (§7.8): numero grande, informazioni, foto in bianco e nero a tutta altezza. */
export function Contatti() {
  return (
    <section
      id="contatti"
      tabIndex={-1}
      data-theme="light"
      aria-labelledby="contatti-title"
      className="grid bg-pergamena outline-none lg:min-h-[100svh] lg:grid-cols-2"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-square lg:order-2 lg:aspect-auto lg:min-h-[100svh]">
        <Image
          src={cucina}
          alt="In cucina, un cuoco impiatta da un pentolino"
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_38%]"
        />
      </div>

      <div className="flex flex-col justify-center px-gutter py-section lg:order-1 lg:pr-[clamp(32px,5vw,92px)]">
        <DisplayHeading id="contatti-title" lines={["Prenota", "un tavolo"]} />
        <p className="mt-28 max-w-[40ch] sm:mt-42">Per prenotare o per qualsiasi richiesta, chiamaci.</p>
        <a href={site.telefonoHref} className="type-subheading text-link mt-20 self-start">
          {site.telefonoDisplay}
        </a>

        <dl className="mt-42 max-w-[560px] border-t border-filo">
          <div className="grid grid-cols-[minmax(96px,30%)_1fr] gap-16 border-b border-filo py-16">
            <dt className="type-caption pt-[3px] text-noce">Indirizzo</dt>
            <dd>{site.indirizzo}</dd>
          </div>
          <div className="grid grid-cols-[minmax(96px,30%)_1fr] gap-16 border-b border-filo py-16">
            <dt className="type-caption pt-[3px] text-noce">Orari</dt>
            <dd>
              <ul>
                {site.orari.map(([giorni, ore]) => (
                  <li key={giorni} className="flex flex-wrap gap-x-16">
                    <span>{giorni}</span>
                    <span>{ore}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid grid-cols-[minmax(96px,30%)_1fr] gap-16 border-b border-filo py-16">
            <dt className="type-caption pt-[3px] text-noce">Telefono</dt>
            <dd>
              <a href={site.telefonoHref} className="text-link">
                {site.telefonoDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-32 flex flex-wrap gap-12">
          <GhostButton href={site.telefonoHref}>Chiama ora</GhostButton>
          <GhostButton
            href={mapsHref}
            target="_blank"
            rel="noopener"
            aria-label={`Indicazioni stradali${isPlaceholder(site.indirizzo) ? "" : ` per ${site.indirizzo}`} (si apre in una nuova scheda)`}
          >
            Indicazioni stradali
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
