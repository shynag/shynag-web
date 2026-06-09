import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List, ProjectItem } from "./_components/List"; // Import ProjectItem
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const directory = await reader.singletons.directory.read();
  const projectLink = directory?.links.find((link) => link.href === "/projects");

  return {
    title: projectLink?.label || "Projects",
    description: "Selected projects and experiments.",
  };
}

export default async function ProjectsPage() {
  const reader = createReader(process.cwd(), config);
  const [allProjects, directory, allExperiences] = await Promise.all([
    reader.collections.projects.all(),
    reader.singletons.directory.read(),
    reader.collections.experiences.all(),
  ]);

  const experiencesMap = new Map(
    allExperiences.map((exp) => [exp.slug, exp.entry]),
  );

  type UnresolvedProjectItem = Omit<ProjectItem, 'entry'> & {
    entry: Omit<ProjectItem['entry'], 'experience'> & {
      experience?: string | null;
    };
  };

  const projectsWithResolvedExperience: ProjectItem[] = (allProjects as UnresolvedProjectItem[]).map((project) => {
    if (project.entry.experience) {
      const resolvedExperience = experiencesMap.get(project.entry.experience);
      // Ensure the resolved experience has the correct type for 'title'
      const typedResolvedExperience = resolvedExperience
        ? {
            ...resolvedExperience,
            title: resolvedExperience.title as { name: string; slug: string },
          }
        : null;

      return {
        ...project,
        entry: {
          ...project.entry,
          experience: typedResolvedExperience
            ? { slug: project.entry.experience, entry: typedResolvedExperience }
            : null,
        },
      };
    }
    return project as ProjectItem; // Cast to ProjectItem if no experience
  });

  // Sort berdasarkan tahun terbaru (Descending)
  const sortedProjects = projectsWithResolvedExperience.sort((a, b) => {
    return Number(b.entry.year) - Number(a.entry.year);
  });

  const projectLink = directory?.links.find((link) => link.href === "/projects");

  return (
    <div className="flex flex-col">
      <Header title={projectLink?.label || "Projects"} />
      <List items={sortedProjects} />
    </div>
  );
}

