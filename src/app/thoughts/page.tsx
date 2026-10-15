import { getKeystaticReader } from "@/lib/keystatic";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import type { Metadata } from "next";
import { sortByDate } from "@/lib/keystatic-content";

export async function generateMetadata(): Promise<Metadata> {
  const reader = getKeystaticReader();
  const directory = await reader.singletons.directory.read();
  const thoughtLink = directory?.links.find((link) => link.href === "/thoughts");

  return {
    title: thoughtLink?.label || "Thoughts",
    description: "A collection of thoughts on software engineering and more.",
  };
}

export default async function ThoughtsPage() {
  const reader = getKeystaticReader();

  const [thoughts, directory] = await Promise.all([
    reader.collections.thoughts.all(),
    reader.singletons.directory.read(),
  ]);

  const sortedThoughts = sortByDate(
    thoughts,
    (thought) => thought.entry.publishedDate,
  );

  const thoughtLink = directory?.links.find((link) => link.href === "/thoughts");

  return (
    <div className="flex flex-col pt-8">
      <Header title={thoughtLink?.label || "Thoughts"} />
      <List posts={sortedThoughts} />
    </div>
  );
}
