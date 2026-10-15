import { ProjectRow } from "./ProjectRow";
import type { ProjectItem } from "@/lib/keystatic-content";

interface ListProps {
  items: ProjectItem[];
}

export function List({ items }: ListProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground mt-12">
        No projects have been added yet.
      </div>
    );
  }

  return (
    <section className="flex flex-col border-t border-border mt-6">
      {items.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </section>
  );
}
