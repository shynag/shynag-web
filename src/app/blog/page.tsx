import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Header } from "@/app/blog/_components/Header";
import { List } from "@/app/blog/_components/List";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const directory = await reader.singletons.directory.read();
  const blogLink = directory?.links.find((link) => link.href === "/blog");

  return {
    title: blogLink?.label || "Catatan Teknis",
    description: "Arsip tulisan seputar software engineering.",
  };
}

export default async function BlogPage() {
  const reader = createReader(process.cwd(), config);

  // 1. Fetch posts & directory
  const [posts, directory] = await Promise.all([
    reader.collections.posts.all(),
    reader.singletons.directory.read(),
  ]);

  // 2. Sort by Date (Newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  const blogLink = directory?.links.find((link) => link.href === "/blog");

  return (
    <div className="flex flex-col pb-20 pt-8">
      <Header title={blogLink?.label || "Catatan Teknis"} />
      <List posts={sortedPosts} />
    </div>
  );
}
