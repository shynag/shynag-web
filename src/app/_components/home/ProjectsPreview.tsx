import Link from "next/link";
import { ProjectRow } from "@/app/projects/_components/ProjectRow";
import type { ProjectItem } from "@/lib/keystatic-content";

interface ProjectsPreviewProps {
  items: ProjectItem[];
  showAllCta: boolean;
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
          <ProjectRow key={project.slug} project={project} />
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
