import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "./_components/Header";
import { List } from "./_components/List";

export const metadata = {
  title: "Works",
  description: "Selected projects and experiments.",
};

export default async function WorkPage() {
  const reader = createReader(process.cwd(), config);
  const works = await reader.collections.works.all();

  // Sort berdasarkan tahun terbaru (Descending)
  const sortedWorks = works.sort((a, b) => {
    return Number(b.entry.year) - Number(a.entry.year);
  });

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <Header />
      <List items={sortedWorks} />
    </div>
  );
}
