import Image from "next/image";
import type { MenuCategory as Category } from "@/data/menu";
import { wineBySlug } from "@/data/vini";
import { categoryId, wineId } from "@/lib/slug";
import carneTagliere from "@/media/img/carne-tagliere.jpg";
import pastaMantecata from "@/media/img/pasta-mantecata.jpg";
import primoRagu from "@/media/img/primo-ragu.jpg";
import posterCrostini from "@/media/poster/antipasti-crostini-poster.jpg";
import { Caption } from "../ui/Caption";
import { DisplayHeading } from "../ui/DisplayHeading";
import { LazyVideo } from "../ui/LazyVideo";
import { RevealMedia } from "../ui/RevealMedia";
import { TextLink } from "../ui/TextLink";
import { Dish } from "./Dish";

type Layout = "media-left" | "media-right" | "type";
const LAYOUT: Record<string, Layout> = {
  antipasti: "media-left",
  primi: "media-right",
  secondi: "media-left",
  contorni: "type",
  dolci: "type",
};

function Media({ slug }: { slug: string }) {
  if (slug === "antipasti") {
    return (
      <figure>
        <RevealMedia className="relative aspect-[4/5] w-full">
          <div data-reveal-inner className="absolute inset-0">
            <LazyVideo
              src="/media/video/antipasti-crostini.mp4"
              poster={posterCrostini}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="absolute inset-0"
              controlLabel="il video dei crostini"
            />
          </div>
        </RevealMedia>
        <Caption as="figcaption" className="mt-12">
          Crostini e salumi
        </Caption>
      </figure>
    );
  }
  if (slug === "primi") {
    return (
      <figure className="relative pb-[clamp(36px,6vw,72px)]">
        <RevealMedia className="relative aspect-[4/5] w-full">
          <div data-reveal-inner className="absolute inset-0">
            <Image
              src={pastaMantecata}
              alt="Pasta fresca all'uovo mantecata, servita con la pinza"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[45%_50%]"
            />
          </div>
        </RevealMedia>
        {/* Inserto: solo la metà sinistra del collage (piatto), mai i grembiuli col logo. */}
        <div className="absolute bottom-0 left-0 w-[42%] -translate-x-[12%] lg:w-[38%]">
          <RevealMedia className="bg-pergamena p-8">
            <div className="relative aspect-[366/563] overflow-hidden">
              <div data-reveal-inner className="absolute inset-0">
                <Image
                  src={primoRagu}
                  alt="Un primo di pasta al sugo in un piatto fondo bianco"
                  fill
                  placeholder="blur"
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>
          </RevealMedia>
        </div>
      </figure>
    );
  }
  if (slug === "secondi") {
    return (
      <figure>
        <RevealMedia className="relative aspect-[3/2] w-full">
          <div data-reveal-inner className="absolute inset-0">
            <Image
              src={carneTagliere}
              alt="Bistecca con l'osso alla brace, tagliata su un tagliere di legno"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[50%_50%]"
            />
          </div>
        </RevealMedia>
        <Caption as="figcaption" className="mt-12">
          Alla brace
        </Caption>
      </figure>
    );
  }
  return null;
}

function Header({ category }: { category: Category }) {
  const pairing = category.pairingCategoria ? wineBySlug(category.pairingCategoria) : undefined;
  return (
    <header>
      <DisplayHeading as="h3" size="heading-lg" id={`${categoryId("menu", category.slug)}-title`} lines={[category.titolo]} />
      {category.sottotitolo ? <Caption className="mt-16">{category.sottotitolo}</Caption> : null}
      {pairing ? (
        <p className="type-caption mt-10 text-noce">
          Nel calice:{" "}
          <TextLink href={`#${wineId(pairing.slug)}`} data-pair={wineId(pairing.slug)} className="text-onice">
            {pairing.nome}
          </TextLink>
        </p>
      ) : null}
    </header>
  );
}

/**
 * Categoria del menù (§7.6.2–3). Con media: media sticky da un lato (sinistra per antipasti e
 * secondi, destra per i primi), titolo ed elenco dall'altro. Senza media (contorni, dolci):
 * layout solo tipografico, titolo sticky a sinistra e voci su due colonne.
 */
export function MenuCategory({ category }: { category: Category }) {
  const layout = LAYOUT[category.slug] ?? "type";
  const id = categoryId("menu", category.slug);
  const list = (
    <ul className="border-t border-filo">
      {category.piatti.map((d) => (
        <li key={d.slug} className="border-b border-filo">
          <Dish dish={d} />
        </li>
      ))}
    </ul>
  );

  if (layout === "type") {
    return (
      <section id={id} data-anchor aria-labelledby={`${id}-title`} className="wrap grid-12 gap-y-28 pt-[clamp(72px,9vw,140px)]">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+var(--subnav-h)+40px)]">
            <Header category={category} />
          </div>
        </div>
        <ul className="col-span-12 grid grid-cols-1 border-t border-filo sm:grid-cols-2 sm:gap-x-24 lg:col-span-8 lg:col-start-5">
          {category.piatti.map((d) => (
            <li key={d.slug} className="border-b border-filo">
              <Dish dish={d} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const right = layout === "media-right";
  return (
    <section id={id} data-anchor aria-labelledby={`${id}-title`} className="wrap grid-12 gap-y-28 pt-[clamp(72px,9vw,140px)] lg:grid-rows-[auto_1fr]">
      <div className={`col-span-12 lg:row-start-1 lg:col-span-6 ${right ? "lg:col-start-1" : "lg:col-start-7"}`}>
        <Header category={category} />
      </div>
      <div
        className={`col-span-12 max-w-[560px] sm:max-w-[min(560px,80%)] lg:row-span-2 lg:row-start-1 lg:max-w-[560px] lg:self-start lg:sticky lg:top-[calc(var(--nav-h)+var(--subnav-h)+40px)] ${
          right ? "lg:col-span-5 lg:col-start-8 lg:justify-self-end lg:w-full" : "lg:col-span-5 lg:col-start-1 lg:w-full"
        } ${category.slug === "secondi" ? "max-w-none sm:max-w-none lg:max-w-none" : ""}`}
      >
        <Media slug={category.slug} />
      </div>
      <div className={`col-span-12 lg:row-start-2 lg:col-span-6 ${right ? "lg:col-start-1" : "lg:col-start-7"}`}>{list}</div>
    </section>
  );
}
