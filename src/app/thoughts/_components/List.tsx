import Link from "next/link";
// (no icon used here)

// Format date input into DD/MM/YYYY. Handles ISO strings, timestamps,
// and falls back to simple dash -> slash replacement when parsing fails.
function pad(n: number) {
  return String(n).padStart(2, "0");
}

// (Removed unused full-date formatter; keep compact short-format for list view)

// (removed unused short formatter — List now uses formatMonthDay for display)
export type ThoughtPost = {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
  };
};

interface ListProps {
  posts: ThoughtPost[];
}

export function List({ posts }: ListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border-t border-border mt-12">
        Belum ada pemikiran yang dipublikasikan.
      </div>
    );
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

  // Minimalist layout: left = YYYY/MM/DD, right = title.
  function formatFullDate(input: string | null | undefined): string {
    if (!input) return "";
    const d = new Date(input);
    if (!isNaN(d.getTime())) {
      return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
    }
    // Fallback: normalize separators to '/'
    return input.replace(/[-.]/g, "/");
  }

  return (
    <div className="mt-6 border-t border-border">
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
  );
}
