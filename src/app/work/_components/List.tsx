import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Tipe data dari Keystatic
export type WorkItem = {
  slug: string;
  entry: {
    title: string;
    year: string;
    description: string;
    stack: readonly string[];
    href: string | null;
  };
};

interface ListProps {
  items: WorkItem[];
}

export function List({ items }: ListProps) {
  // Fallback jika belum ada data
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground mt-12">
        Belum ada project yang ditambahkan.
      </div>
    );
  }

  return (
    <section className="flex flex-col border-t border-border mt-12">
      {items.map((project) => (
        <Link
          key={project.slug}
          href={project.entry.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-start justify-between py-8 border-b border-border hover:bg-muted/30 transition-colors gap-4 sm:gap-0"
        >
          {/* KIRI: Konten Utama */}
          <div className="flex flex-col gap-3 max-w-xl">
            {/* Title & Arrow */}
            <div className="flex items-center gap-2">
              <span className="text-foreground text-lg tracking-tight group-hover:underline underline-offset-4 decoration-border transition-all">
                {project.entry.title}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {project.entry.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-1 text-sm text-muted-foreground/60">
              {/* Join array stack dengan separator dot sesuai desain asli */}
              {project.entry.stack.join("  ·  ")}
            </div>
          </div>

          {/* KANAN: Tahun (Metadata) */}
          <div className="shrink-0">
            <span className="text-muted-foreground/40 text-sm">
              {project.entry.year}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
