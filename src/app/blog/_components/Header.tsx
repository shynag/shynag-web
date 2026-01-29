import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Header() {
  return (
    <section className="flex flex-col gap-6">
      {/* Back Button */}
      <Link
        href="/"
        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Kembali</span>
      </Link>

      {/* Intro Text */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1>Catatan Teknis.</h1>
        <p>
          Tulisan seputar software engineering, system design, dan opini pribadi
          tentang teknologi. Semua ditulis berdasarkan pengalaman langsung di
          lapangan.
        </p>
      </div>
    </section>
  );
}
