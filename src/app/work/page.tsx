import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List } from "./_components/List";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const directory = await reader.singletons.directory.read();
  const workLink = directory?.links.find((link) => link.href === "/work");

  return {
    title: workLink?.label || "Works",
    description: "Selected projects and experiments.",
  };
}

export default async function WorkPage() {
  const reader = createReader(process.cwd(), config);
  const [works, directory] = await Promise.all([
    reader.collections.works.all(),
    reader.singletons.directory.read(),
  ]);

  // Sort berdasarkan tahun terbaru (Descending)
  const sortedWorks = works.sort((a, b) => {
    return Number(b.entry.year) - Number(a.entry.year);
  });

  const workLink = directory?.links.find((link) => link.href === "/work");

  return (
    <div className="flex flex-col">
      <Header title={workLink?.label || "Work"} />
      <List items={sortedWorks} />
    </div>
  );
}
