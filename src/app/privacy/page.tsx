import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali di Osteria Bologna.",
};

export default function Privacy() {
  return (
    <LegalPage lines={["Privacy", "policy"]}>
      <p>[TESTO PRIVACY POLICY — da fornire]</p>
    </LegalPage>
  );
}
