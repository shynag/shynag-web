import Link from "next/link";
// (no icon used here)

type DirectoryProps = {
  directory: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  } | null;
};

const defaultDirectory = {
  title: "Indeks",
  links: [
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Work",
      href: "/work",
    },
  ],
};

export function Directory({ directory }: DirectoryProps) {
  const data = directory?.links?.length ? directory : defaultDirectory;

  return (
    <section>
      {/* HEADER */}
      <h2 className="heading-style-muted">{data.title}</h2>

      {/* CONTAINER */}
      <div className="flex flex-col border-t border-border">
        {data.links.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between py-5 border-b border-border hover:bg-muted/30 transition-colors"
          >
            {/* KIRI: Nomor & Label */}
            <div className="flex gap-6">
              {/* Nomor */}
              <span className="text-muted-foreground/50 group-hover:text-foreground transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="text-foreground group-hover:underline underline-offset-4 decoration-border transition-all">
                {item.label || item.href}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
