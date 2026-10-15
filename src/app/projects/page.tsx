import { getKeystaticReader } from "@/lib/keystatic";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import type { Metadata } from "next";
import {
  resolveProjectExperiences,
  sortProjectsByYear,
} from "@/lib/keystatic-content";

export async function generateMetadata(): Promise<Metadata> {
  const reader = getKeystaticReader();
  const directory = await reader.singletons.directory.read();
  const projectLink = directory?.links.find((link) => link.href === "/projects");

  return {
    title: projectLink?.label || "Projects",
    description: "Selected projects and experiments.",
  };
}

export default async function ProjectsPage() {
  const reader = getKeystaticReader();
  const [allProjects, directory, allExperiences] = await Promise.all([
    reader.collections.projects.all(),
    reader.singletons.directory.read(),
    reader.collections.experiences.all(),
  ]);

  const projectsWithResolvedExperience = resolveProjectExperiences(
    allProjects,
    allExperiences,
  );
  const sortedProjects = sortProjectsByYear(projectsWithResolvedExperience);

  const projectLink = directory?.links.find((link) => link.href === "/projects");

  return (
    <div className="flex flex-col">
      <Header title={projectLink?.label || "Projects"} />
      <List items={sortedProjects} />
    </div>
  );
}
