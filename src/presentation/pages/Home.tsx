import { MainLayout } from "@presentation/layouts/MainLayout";
import { HeroSection } from "@presentation/components/HeroSection";
import { Capabilities } from "@/presentation/components/Capabilities"; // Import baru
import { SelectedWorks } from "../components/SelectedWorks";
import { Process } from "../components/Process";
import { Philosophy } from "../components/Philosophy";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <Philosophy />
      <Capabilities /> {/* Tambahkan di sini */}
      <SelectedWorks />
      <Process />
    </MainLayout>
  );
}
