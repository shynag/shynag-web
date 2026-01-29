import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Directory() {
  const menuItems = [
    {
      num: "01",
      label: "Jurnal & Tulisan", // Fokus utama blog pribadi
      href: "/blog",
    },
    {
      num: "02",
      label: "Arsip Karya", // Showcase hasil kodingan
      href: "/work",
    },
  ];

  return (
    <section>
      {/* HEADER */}
      <h2 className="mb-4 text-muted-foreground">Indeks</h2>

      {/* CONTAINER */}
      <div className="flex flex-col border-t border-border">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between py-5 border-b border-border hover:bg-muted/30 transition-colors"
          >
            {/* KIRI: Nomor & Label */}
            <div className="flex gap-6">
              {/* Nomor */}
              <span className="text-muted-foreground/50 group-hover:text-foreground transition-colors">
                {item.num}
              </span>

              {/* Label */}
              <span className="text-foreground group-hover:underline underline-offset-4 decoration-border transition-all">
                {item.label}
              </span>
            </div>

            {/* KANAN: Icon Arrow */}
            <ArrowUpRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
