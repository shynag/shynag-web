import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const directory = await reader.singletons.directory.read();
  const thoughtLink = directory?.links.find((link) => link.href === "/thoughts");

  return {
    title: thoughtLink?.label || "Thoughts",
    description: "A collection of thoughts on software engineering and more.",
  };
}

export default async function ThoughtsPage() {
  const reader = createReader(process.cwd(), config);

  // 1. Fetch thoughts & directory
  const [thoughts, directory] = await Promise.all([
    reader.collections.thoughts.all(),
    reader.singletons.directory.read(),
  ]);

  // 2. Sort by Date (Newest first)
  const sortedThoughts = thoughts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  const thoughtLink = directory?.links.find((link) => link.href === "/thoughts");

  return (
    <div className="flex flex-col pt-8">
      <Header title={thoughtLink?.label || "Thoughts"} />
      <List posts={sortedThoughts} />
    </div>
  );
}
