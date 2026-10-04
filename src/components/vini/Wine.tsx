import { Fragment } from "react";
import { dishBySlug } from "@/data/menu";
import type { Wine as WineT } from "@/data/vini";
import { dishId, wineId } from "@/lib/slug";
import { Caption } from "../ui/Caption";
import { TextLink } from "../ui/TextLink";

/**
 * "Abbinamento: …" con i collegamenti ai piatti (M10). Con due piatti e un testo "X e Y" ogni
 * nome diventa un link; altrimenti il testo intero porta al primo piatto ed evidenzia tutti.
 */
function Pairing({ testo, piatti = [] }: { testo: string; piatti?: string[] }) {
  const linked = piatti.filter((s) => dishBySlug(s));
  if (!linked.length) return <>{testo}</>;
  const parts = testo.split(" e ");
  if (linked.length > 1 && parts.length === linked.length) {
    return (
      <>
        {parts.map((part, i) => (
          <Fragment key={linked[i]}>
            {i > 0 ? " e " : null}
            <TextLink href={`#${dishId(linked[i]!)}`} data-pair={dishId(linked[i]!)} className="text-pergamena">
              {part}
            </TextLink>
          </Fragment>
        ))}
      </>
    );
  }
  return (
    <TextLink href={`#${dishId(linked[0]!)}`} data-pair={linked.map(dishId).join(",")} className="text-pergamena">
      {testo}
    </TextLink>
  );
}

/** Voce della carta dei vini: nome, produttore e regione, uvaggio, note. Mai la "Fascia". */
export function Wine({ wine }: { wine: WineT }) {
  return (
    <article id={wineId(wine.slug)} tabIndex={-1} data-anchor className="pair-target py-28 outline-offset-[-1px]">
      <h4 className="type-item text-pergamena">{wine.nome}</h4>
      <Caption tone="light" className="mt-10">
        {wine.produttore}, {wine.regione}
      </Caption>
      <p className="mt-12 text-[13px] leading-[1.4] tracking-[-0.011em] text-noce-chiaro">Uvaggio: {wine.uvaggio}</p>
      <p className="mt-8 max-w-[52ch] text-pergamena/85">{wine.note}</p>
      {wine.abbinamento ? (
        <p className="type-caption mt-14 text-noce-chiaro">
          Abbinamento: <Pairing {...wine.abbinamento} />
        </p>
      ) : null}
    </article>
  );
}
