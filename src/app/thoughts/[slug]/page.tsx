import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { notFound } from "next/navigation";
import { Header } from "./_components/detail/Header";
import { Content } from "./_components/detail/Content";

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), config);
  const thoughts = await reader.collections.thoughts.list();
  return thoughts.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const thought = await reader.collections.thoughts.read(slug);

  if (!thought) return { title: "Not Found" };

  return {
    title: thought.title,
    description: `Published on ${thought.publishedDate}`,
  };
}

export default async function ThoughtPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reader = createReader(process.cwd(), config);
  const thought = await reader.collections.thoughts.read(slug);

  if (!thought) {
    notFound();
  }

  // Hitung Read Time kasar (200 kata per menit)
  // Keystatic document berbentuk JSON tree, kita perlu traverse untuk akurat,
  // tapi untuk simplisitas kita hardcode atau hitung nanti.
  const readTime = "5 min read"; // Placeholder, bisa dikembangkan

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <Header
        title={thought.title}
        date={thought.publishedDate || ""}
        readTime={readTime}
      />
      {/* Passing document JSON ke komponen Content */}
      <Content document={await thought.content()} />
    </div>
  );
}
