import type { Dish as DishT } from "@/data/menu";
import { wineBySlug } from "@/data/vini";
import { dishId, wineId } from "@/lib/slug";
import { TextLink } from "../ui/TextLink";

/** Voce del menù: nome, descrizione, eventuale "Nel calice". Nessun prezzo, nessun hover. */
export function Dish({ dish }: { dish: DishT }) {
  const wine = dish.pairing ? wineBySlug(dish.pairing) : undefined;
  return (
    <article id={dishId(dish.slug)} tabIndex={-1} data-anchor className="pair-target py-28 outline-offset-[-1px]">
      <h4 className="type-item text-onice">{dish.nome}</h4>
      <p className="mt-8 max-w-[46ch] text-espresso">{dish.descrizione}</p>
      {wine ? (
        <p className="type-caption mt-14 text-noce">
          Nel calice:{" "}
          <TextLink href={`#${wineId(wine.slug)}`} data-pair={wineId(wine.slug)} className="text-onice">
            {wine.nome}
          </TextLink>
        </p>
      ) : null}
    </article>
  );
}
