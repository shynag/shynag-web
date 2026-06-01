import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const directory = await reader.singletons.directory.read();
  const experienceLink = directory?.links.find((link) => link.href === "/experience");

  return {
    title: experienceLink?.label || "Experience",
    description: "My professional work experience.",
  };
}

export default async function ExperiencePage() {
  const reader = createReader(process.cwd(), config);
  const [experiences, directory] = await Promise.all([
    reader.collections.experiences.all(),
    reader.singletons.directory.read(),
  ]);

  // Sort by start date (newest first)
  const sortedExperiences = experiences.sort((a, b) => {
    const dateA = new Date(a.entry.startDate || 0).getTime();
    const dateB = new Date(b.entry.startDate || 0).getTime();
    return dateB - dateA;
  });

  const experienceLink = directory?.links.find((link) => link.href === "/experience");

  return (
    <div className="flex flex-col">
      <Header title={experienceLink?.label || "Experience"} />
      <List items={sortedExperiences} />
    </div>
  );
}
