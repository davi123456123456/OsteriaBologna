import type { ReactNode } from "react";
import { DisplayHeading } from "./ui/DisplayHeading";

/** Pagina legale semplice (§7.10): titolo display, corpo a una colonna max 68ch. */
export function LegalPage({ lines, children }: { lines: string[]; children: ReactNode }) {
  return (
    <section data-theme="light" aria-labelledby="legal-title" className="bg-pergamena pt-[calc(var(--nav-h)+var(--spacing-section))] pb-section">
      <div className="wrap">
        <DisplayHeading as="h1" id="legal-title" lines={lines} reveal={false} />
        <div className="mt-42 max-w-[68ch] space-y-16 sm:mt-56">{children}</div>
      </div>
    </section>
  );
}
