import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { notFound } from "next/navigation";
import { Header } from "../_components/detail/Header";
import { Content } from "../_components/detail/Content";

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

  // Approximate reading time (200 words per minute). The Keystatic document
  // is a JSON tree, so accurate word counting requires traversing its nodes.
  const readTime = "5 min read";

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <Header
        title={thought.title}
        date={thought.publishedDate || ""}
        readTime={readTime}
      />
      <Content document={await thought.content()} />
    </div>
  );
}
