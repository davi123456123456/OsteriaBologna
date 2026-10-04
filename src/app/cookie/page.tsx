import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Informativa sui cookie di Osteria Bologna.",
};

export default function Cookie() {
  return (
    <LegalPage lines={["Cookie", "policy"]}>
      <p>[TESTO COOKIE POLICY — da fornire]</p>
    </LegalPage>
  );
}
