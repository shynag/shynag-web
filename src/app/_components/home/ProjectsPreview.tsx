import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/app/projects/_components/List"; // Re-use the type definition
// Removed import { Button } from "@/components/ui/button";

interface ProjectsPreviewProps {
  items: ProjectItem[];
  showAllCta: boolean;
}

function getAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

export function ProjectsPreview({ items, showAllCta }: ProjectsPreviewProps) {
  if (items.length === 0 && !showAllCta) {
    return null; // Don't render anything if no items and no CTA needed
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="heading-style">Selected Projects</h2>
      <div className="flex flex-col border-t border-border">
        {items.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col sm:flex-row sm:items-start justify-between py-8 border-b border-border gap-4 sm:gap-0"
          >
            {/* KIRI: Konten Utama */}
            <div className="flex flex-col gap-3 max-w-xl flex-1">
              {/* Title */}
              <span className="text-foreground">{project.entry.title}</span>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {project.entry.description}
              </p>

              {/* Links */}
              <div className="flex flex-row gap-3 mt-2">
                {project.entry.href ? (
                  <a
                    href={getAbsoluteUrl(project.entry.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 text-foreground w-fit"
                  >
                    <span className="underline underline-offset-4 decoration-border group-hover/link:decoration-foreground transition-all text-sm">
                      Live
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-foreground transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 w-fit">
                    <span className="underline underline-offset-4 decoration-border text-sm text-muted-foreground/40">
                      Live
                    </span>
                  </div>
                )}

                {project.entry.sourceCodeUrl ? (
                  <a
                    href={getAbsoluteUrl(project.entry.sourceCodeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 text-foreground w-fit"
                  >
                    <span className="underline underline-offset-4 decoration-border group-hover/link:decoration-foreground transition-all text-sm">
                      Source Code
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover/link:text-foreground transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 w-fit">
                    <span className="underline underline-offset-4 decoration-border text-sm text-muted-foreground/40">
                      Source Code
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* KANAN: Tahun (Metadata) */}
            <div className="shrink-0">
              <span className="text-muted-foreground/40 text-sm">
                {project.entry.year}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showAllCta && (
        <div className="text-left mt-4">
          <Link
            href="/projects"
            className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
          >
            View All Projects
          </Link>
        </div>
      )}
    </section>
  );
}
