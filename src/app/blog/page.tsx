import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "@/app/blog/_components/Header";
import { List } from "@/app/blog/_components/List";

export const metadata = {
  title: "Catatan Teknis",
  description: "Arsip tulisan seputar software engineering.",
};

export default async function BlogPage() {
  const reader = createReader(process.cwd(), config);

  // 1. Fetch posts
  const posts = await reader.collections.posts.all();

  // 2. Sort by Date (Newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col pb-20 pt-8">
      <Header />
      <List posts={sortedPosts} />
    </div>
  );
}
