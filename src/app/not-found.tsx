import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { GhostButton } from "@/components/ui/GhostButton";

export const metadata: Metadata = { title: "Pagina non trovata" };

export default function NotFound() {
  return (
    <LegalPage lines={["Pagina", "non trovata"]}>
      <p>La pagina che cerchi non esiste o è stata spostata.</p>
      <p className="pt-16">
        <GhostButton href="/">Torna alla home</GhostButton>
      </p>
    </LegalPage>
  );
}
