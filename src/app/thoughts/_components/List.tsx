import { ThoughtRow } from "./ThoughtRow";
import type { ThoughtPost } from "@/lib/keystatic-content";

interface ListProps {
  posts: ThoughtPost[];
}

export function List({ posts }: ListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border-t border-border mt-12">
        No thoughts have been published yet.
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-border">
      {posts.map((post) => (
        <ThoughtRow key={post.slug} post={post} />
      ))}
    </div>
  );
}
