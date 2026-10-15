import Link from "next/link";
import { ThoughtRow } from "@/app/thoughts/_components/ThoughtRow";
import type { ThoughtPost } from "@/lib/keystatic-content";

interface ThoughtsPreviewProps {
  posts: ThoughtPost[];
  showAllCta: boolean;
}

export function ThoughtsPreview({ posts, showAllCta }: ThoughtsPreviewProps) {
  if (posts.length === 0 && !showAllCta) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="heading-style">Latest Thoughts</h2>
      <div className="mt-0 border-t border-border">
        {posts.map((post) => (
          <ThoughtRow key={post.slug} post={post} />
        ))}
      </div>
      {showAllCta && (
        <div className="text-left mt-4">
          <Link
            href="/thoughts"
            className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
          >
            View All Thoughts
          </Link>
        </div>
      )}
    </section>
  );
}
