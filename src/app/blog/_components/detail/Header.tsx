import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  date: string;
  readTime: string;
}

export function Header({ title, date, readTime }: HeaderProps) {
  return (
    <section className="flex flex-col gap-8 border-b border-border pb-8">
      {/* Back Navigation */}
      <Link
        href="/blog"
        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Kembali ke Indeks</span>
      </Link>

      {/* Title Group */}
      <div className="flex flex-col gap-4">
        {/* Metadata (Mono styling) */}
        <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground/60">
          <time dateTime={date}>{date}</time>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        {/* H1 Title */}
        <h1 className="leading-tight">{title}</h1>
      </div>
    </section>
  );
}
