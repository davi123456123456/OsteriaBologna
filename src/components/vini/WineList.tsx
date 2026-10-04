import { vini } from "@/data/vini";
import { categoryId } from "@/lib/slug";
import { Caption } from "../ui/Caption";
import { CategoryNav } from "../ui/CategoryNav";
import { DisplayHeading } from "../ui/DisplayHeading";
import { Wine } from "./Wine";

/** Lista dei 20 vini in 4 categorie (§7.7.3), con sottonavigazione sticky in versione scura. */
export function WineList() {
  return (
    <div className="relative">
      <CategoryNav
        tone="dark"
        label="Categorie della carta dei vini"
        items={vini.map((c) => ({ id: categoryId("vini", c.slug), label: c.titolo }))}
      />
      {vini.map((c) => {
        const id = categoryId("vini", c.slug);
        return (
          <section key={c.slug} id={id} data-anchor aria-labelledby={`${id}-title`} className="pt-[clamp(56px,7vw,104px)]">
            <DisplayHeading as="h3" size="heading-lg" id={`${id}-title`} lines={[c.titolo]} />
            {c.sottotitolo ? (
              <Caption tone="light" className="mt-16">
                {c.sottotitolo}
              </Caption>
            ) : null}
            <ul className="mt-28 border-t border-filo-scuro">
              {c.vini.map((w) => (
                <li key={w.slug} className="border-b border-filo-scuro">
                  <Wine wine={w} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {/* [CONFERMARE] */}
      <Caption tone="light" className="mt-42">
        Disponibilità e annate possono variare: chiedi al personale.
      </Caption>
    </div>
  );
}
