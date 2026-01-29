import { Hero } from "@/app/_components/home/Hero";
import { Directory } from "@/app/_components/home/Directory";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Directory />
    </div>
  );
}
