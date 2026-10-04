import Image from "next/image";
import sala from "@/media/img/sala.jpg";
import { SalaReveal } from "./SalaReveal";
import { Caption } from "./ui/Caption";
import { DisplayHeading } from "./ui/DisplayHeading";
import { Grain } from "./ui/Grain";
import { TextLink } from "./ui/TextLink";

/** La trattoria (§7.4): testo a sinistra, la sala che si apre come una porta socchiusa (M6). */
export function Trattoria() {
  return (
    <section
      id="trattoria"
      tabIndex={-1}
      data-theme="light"
      aria-labelledby="trattoria-title"
      className="bg-pergamena py-section outline-none"
    >
      <div className="wrap grid-12 items-start gap-y-56">
        <div className="col-span-12 lg:col-span-5">
          <DisplayHeading id="trattoria-title" lines={["Sfoglia,", "brodo", "e brace."]} />
          <div className="mt-42 max-w-[60ch] space-y-16 sm:mt-56">
            <p>
              Osteria Bologna è una trattoria nel senso più vero: tovaglie a quadretti, pasta fresca, il brodo di
              cappone dei tortellini e la brace accesa per la carne. Una cucina che non insegue le mode e parla la
              lingua della tradizione bolognese.
            </p>
            <p>
              In tavola arrivano i piatti di sempre, dalle tagliatelle al ragù alla cotoletta alla bolognese, fino
              alla zuppa inglese. Ad accompagnarli c&apos;è una carta dei vini che parte dai Colli Bolognesi e
              attraversa l&apos;Italia.
            </p>
          </div>
          <p className="mt-32">
            <TextLink href="#menu">Scopri il menù</TextLink>
          </p>
        </div>

        <figure className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-[clamp(0px,4vw,64px)]">
          {/* TODO: sostituire con sorgente ≥1920px [FOTO_SALA_ORIGINALE] — oggi 735px: max 880px CSS */}
          <SalaReveal className="relative aspect-video w-full max-w-[880px] lg:ml-auto">
            <div data-reveal-inner className="absolute inset-0">
              <Image
                src={sala}
                alt="La sala dell'osteria: tavoli apparecchiati con tovaglie a quadretti e lampade a sospensione"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 880px, 100vw"
                className="object-cover object-[50%_50%]"
              />
              <Grain />
            </div>
          </SalaReveal>
          <Caption as="figcaption" className="mt-12 lg:ml-auto lg:max-w-[880px]">
            La sala
          </Caption>
        </figure>
      </div>
    </section>
  );
}
