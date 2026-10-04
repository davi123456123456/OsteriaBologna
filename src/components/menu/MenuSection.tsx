import { menu } from "@/data/menu";
import { categoryId } from "@/lib/slug";
import { Caption } from "../ui/Caption";
import { CategoryNav } from "../ui/CategoryNav";
import { DisplayHeading } from "../ui/DisplayHeading";
import { MenuCategory } from "./MenuCategory";

/** Il menù (§7.6): 18 piatti in 5 categorie, nessun prezzo. */
export function MenuSection() {
  return (
    <section id="menu" tabIndex={-1} data-theme="light" aria-labelledby="menu-title" className="bg-pergamena pt-section outline-none">
      <div className="wrap">
        <DisplayHeading id="menu-title" lines={["Il menù"]} />
        <p className="type-lead mt-28 sm:mt-42">La cucina della tradizione bolognese, dalla sfoglia alla brace.</p>
      </div>

      <div className="relative mt-56 sm:mt-72">
        <CategoryNav
          label="Categorie del menù"
          items={menu.map((c) => ({ id: categoryId("menu", c.slug), label: c.titolo }))}
          padClassName="px-[max(var(--spacing-gutter),calc((100vw-1760px)/2))]"
        />
        {menu.map((c) => (
          <MenuCategory key={c.slug} category={c} />
        ))}
      </div>

      <div className="wrap pt-56 pb-section">
        {/* Reg. UE 1169/2011 */}
        <Caption>Per informazioni su allergeni e intolleranze rivolgiti al nostro personale.</Caption>
        {/* [CONFERMARE col cliente] */}
        <Caption className="mt-6">Il menù può variare secondo stagione.</Caption>
      </div>
    </section>
  );
}
