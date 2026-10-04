import { Contatti } from "@/components/Contatti";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { MenuSection } from "@/components/menu/MenuSection";
import { Sfoglia } from "@/components/Sfoglia";
import { Trattoria } from "@/components/Trattoria";
import { ViniSection } from "@/components/vini/ViniSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Trattoria />
      <Sfoglia />
      <MenuSection />
      <ViniSection />
      <Contatti />
    </>
  );
}
