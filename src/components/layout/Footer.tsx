import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const socials = [
    { name: "GitHub", href: "https://github.com/shynag" },
    { name: "LinkedIn", href: "https://linkedin.com/in/shynag" },
  ];

  return (
    // REVISI: Hapus 'border-t' di sini. Hanya sisa margin-top.
    <footer className="w-full mt-24">
      <div className="mx-auto w-full max-w-2xl px-6 sm:px-0 py-12">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          {/* KOLOM 1: KONTAK */}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <h2 className="text-muted-foreground">Kontak</h2>
            <p className="text-foreground leading-relaxed">
              Sapa saya melalui{" "}
              <Link
                href="mailto:hi@shynag.dev"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground hover:text-muted-foreground transition-all"
              >
                hi@shynag.dev
              </Link>
              .
            </p>
          </div>

          {/* KOLOM 2: TAUTAN */}
          <div className="flex flex-col gap-4">
            <h2 className="text-muted-foreground">Tautan</h2>
            <div className="flex flex-row gap-3">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground w-fit"
                >
                  <span className="underline underline-offset-4 decoration-border group-hover:decoration-foreground transition-all">
                    {item.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: COPYRIGHT (Border ada di sini saja) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-border/40 pt-8 gap-2">
          <span className="text-muted-foreground/40 text-sm">
            © {new Date().getFullYear()} Shynag.
          </span>
          <span className="text-muted-foreground/40 text-sm">
            Yogyakarta, Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
