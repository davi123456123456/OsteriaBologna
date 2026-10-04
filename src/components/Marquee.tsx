import { Fragment } from "react";

const PIATTI = [
  "Tagliatelle al ragù",
  "Tortellini in brodo",
  "Gnocco fritto",
  "Cotoletta alla bolognese",
  "Passatelli",
  "Zuppa inglese",
  "Torta di riso",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {PIATTI.map((p) => (
        <Fragment key={p}>
          <span className="type-heading-sm whitespace-nowrap">{p}</span>
          <span className="diamond" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Marquee dei piatti (M4): CSS translateX(0 → -50%) su contenuto duplicato, 27s lineare,
 * in pausa al passaggio del mouse, fermo con reduced-motion. Decorativo: i piatti sono nel menù.
 */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      data-theme="light"
      className="marquee relative flex h-[clamp(88px,9vw,120px)] items-center overflow-hidden border-y border-filo bg-pergamena text-onice"
    >
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
