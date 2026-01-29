import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogPost = {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
  };
};

interface ListProps {
  posts: BlogPost[];
}

export function List({ posts }: ListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border-t border-border mt-12">
        Belum ada tulisan yang dipublikasikan.
      </div>
    );
  }

  return (
    <section className="flex flex-col border-t border-border mt-12">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-12 py-6 border-b border-border hover:bg-muted/30 transition-colors"
        >
          {/* KIRI: Tanggal */}
          <span className="shrink-0 text-sm text-muted-foreground/50 group-hover:text-foreground transition-colors font-mono">
            {post.entry.publishedDate}
          </span>

          {/* KANAN: Judul & Arrow */}
          <div className="flex items-center justify-between w-full">
            <span className="text-foreground text-lg tracking-tight group-hover:underline underline-offset-4 decoration-border transition-all">
              {post.entry.title}
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-foreground transition-colors" />
          </div>
        </Link>
      ))}
    </section>
  );
}
