import { getKeystaticReader } from "@/lib/keystatic";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import type { Metadata } from "next";
import { sortByDate } from "@/lib/keystatic-content";

export async function generateMetadata(): Promise<Metadata> {
  const reader = getKeystaticReader();
  const directory = await reader.singletons.directory.read();
  const experienceLink = directory?.links.find((link) => link.href === "/experience");

  return {
    title: experienceLink?.label || "Experience",
    description: "My professional work experience.",
  };
}

export default async function ExperiencePage() {
  const reader = getKeystaticReader();
  const [experiences, directory] = await Promise.all([
    reader.collections.experiences.all(),
    reader.singletons.directory.read(),
  ]);

  const sortedExperiences = sortByDate(
    experiences,
    (experience) => experience.entry.startDate,
  );

  // Resolve description promises for each experience
  const resolvedExperiences = await Promise.all(
    sortedExperiences.map(async (experience) => ({
      ...experience,
      entry: {
        ...experience.entry,
        description: await experience.entry.description(),
      },
    }))
  );

  const experienceLink = directory?.links.find((link) => link.href === "/experience");

  return (
    <div className="flex flex-col">
      <Header title={experienceLink?.label || "Experience"} />
      <List items={resolvedExperiences} />
    </div>
  );
}
