import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
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
  const [projects, directory] = await Promise.all([
    reader.collections.projects.all(),
    reader.singletons.directory.read(),
  ]);

  // Sort berdasarkan tahun terbaru (Descending)
  const sortedProjects = projects.sort((a, b) => {
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
