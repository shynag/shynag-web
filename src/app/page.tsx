import { Footer } from "@/presentation/components/layout/Footer";
import { Hero } from "@/presentation/features/Hero";
import { Capabilities } from "@/presentation/features/Capabilities";
import { SelectedWorks } from "@/presentation/features/SelectedWorks";
import { About } from "@/presentation/features/About";
import { BrandMarquee } from "@/presentation/components/BrandMarquee";

export default function page() {
  return (
    <div>
      <main>
        <Hero />

        <SelectedWorks />

        <About />
        <Capabilities />
      </main>
      <Footer />
    </div>
  );
}
