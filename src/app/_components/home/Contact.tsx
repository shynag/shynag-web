import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  const socials = [
    { name: "GitHub", href: "https://github.com/shynag" },
    { name: "LinkedIn", href: "https://linkedin.com/in/shynag" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {/* KOLOM 1: KONTAK */}
      <div className="sm:col-span-2 flex flex-col gap-4">
        <h2 className="text-muted-foreground">Contact</h2>
        <p className="text-foreground leading-relaxed">
          Reach me at{" "}
          <Link
            href="mailto:iluviums@gmail.com"
            className="underline underline-offset-4 decoration-border hover:decoration-foreground hover:text-muted-foreground transition-all"
          >
            iluviums@gmail.com
          </Link>
          .
        </p>
      </div>

      {/* KOLOM 2: TAUTAN */}
      <div className="flex flex-col gap-4">
        <h2 className="text-muted-foreground">Connect</h2>
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
  );
}
