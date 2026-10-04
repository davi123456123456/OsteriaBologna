import { DisplayHeading } from "../ui/DisplayHeading";
import { Grain } from "../ui/Grain";
import { WineList } from "./WineList";
import { WineStory } from "./WineStory";

/** La carta dei vini (§7.7): la "cantina" del sito, superficie scura con grana. */
export function ViniSection() {
  return (
    <section
      id="vini"
      tabIndex={-1}
      data-theme="dark"
      aria-labelledby="vini-title"
      className="relative border-t border-filo-scuro bg-cantina pt-section text-pergamena outline-none"
    >
      <Grain />
      <div className="wrap relative">
        <DisplayHeading id="vini-title" lines={["La carta", "dei vini"]} />
        <p className="type-lead mt-28 text-pergamena/85 sm:mt-42">
          Dai Colli Bolognesi ai grandi rossi d&apos;Italia, scelti per stare a tavola con la nostra cucina.
        </p>
      </div>
      <WineStory>
        <WineList />
      </WineStory>
    </section>
  );
}
