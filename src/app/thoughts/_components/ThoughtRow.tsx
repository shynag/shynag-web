import Link from "next/link";
import type { ThoughtPost } from "@/lib/keystatic-content";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatDate(input: string | null | undefined): string {
  if (!input) return "";
  const date = new Date(input);
  if (!Number.isNaN(date.getTime())) {
    return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
  }
  return input.replace(/[-.]/g, "/");
}

export function ThoughtRow({ post }: { post: ThoughtPost }) {
  return (
    <Link
      href={`/thoughts/${post.slug}`}
      className="group grid grid-cols-[120px_1fr] items-center gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors"
    >
      <div className="text-sm text-muted-foreground/70">
        {formatDate(post.entry.publishedDate)}
      </div>
      <div className="text-foreground truncate">{post.entry.title}</div>
    </Link>
  );
}
