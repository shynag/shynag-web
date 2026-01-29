import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { notFound } from "next/navigation";
import { Header } from "@/app/blog/_components/detail/Header";
import { Content } from "@/app/blog/_components/detail/Content";

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), config);
  const posts = await reader.collections.posts.list();
  return posts.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.read(slug);

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: `Published on ${post.publishedDate}`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  // Hitung Read Time kasar (200 kata per menit)
  // Keystatic document berbentuk JSON tree, kita perlu traverse untuk akurat,
  // tapi untuk simplisitas kita hardcode atau hitung nanti.
  const readTime = "5 min read"; // Placeholder, bisa dikembangkan

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <Header
        title={post.title}
        date={post.publishedDate || ""}
        readTime={readTime}
      />
      {/* Passing document JSON ke komponen Content */}
      <Content document={await post.content()} />
    </div>
  );
}
