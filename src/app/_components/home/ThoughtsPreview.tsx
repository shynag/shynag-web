import Link from "next/link";
import { BlogPost } from "@/app/thoughts/_components/List"; // Re-use the type definition
// Removed import { Button } from "@/components/ui/button";

// Format date input into DD/MM/YYYY. Handles ISO strings, timestamps,
// and falls back to simple dash -> slash replacement when parsing fails.
function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatFullDate(input: string | null | undefined): string {
  if (!input) return "";
  const d = new Date(input);
  if (!isNaN(d.getTime())) {
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  }
  // Fallback: normalize separators to '/'
  return input.replace(/[-.]/g, "/");
}

interface ThoughtsPreviewProps {
  posts: BlogPost[];
  showAllCta: boolean;
}

export function ThoughtsPreview({ posts, showAllCta }: ThoughtsPreviewProps) {
  if (posts.length === 0 && !showAllCta) {
    return null; // Don't render anything if no posts and no CTA needed
  }

  // Prepare posts: parse dates and sort descending (newest first).
  const prepared = posts
    .map((p) => ({
      ...p,
      _date: p.entry.publishedDate ? new Date(p.entry.publishedDate) : null,
    }))
    .sort((a, b) => {
      if (a._date && b._date) return b._date.getTime() - a._date.getTime();
      if (a._date) return -1;
      if (b._date) return 1;
      return 0;
    });

  return (
    <section className="flex flex-col gap-6">
      <h2 className="heading-style">Latest Thoughts</h2>
      <div className="mt-0 border-t border-border">
        {prepared.map((post) => {
          const dateText = formatFullDate(post.entry.publishedDate);
          return (
            <Link
              key={post.slug}
              href={`/thoughts/${post.slug}`}
              className="group grid grid-cols-[120px_1fr] items-center gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors"
            >
              <div className="text-sm text-muted-foreground/70">{dateText}</div>
              <div className="text-foreground truncate">{post.entry.title}</div>
            </Link>
          );
        })}
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
