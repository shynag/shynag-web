import Link from "next/link";
import type { ExperienceItem } from "@/app/experience/_components/List";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getValidDocument } from "@/lib/keystatic-content";

interface ExperiencePreviewProps {
  items: ExperienceItem[];
  showAllCta: boolean;
}

export function ExperiencePreview({
  items,
  showAllCta,
}: ExperiencePreviewProps) {
  if (items.length === 0 && !showAllCta) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="heading-style">Work Experience</h2>
      <div className="flex flex-col border-t border-border">
        {items.map((experience) => (
          <div
            key={experience.slug}
            className="flex flex-col sm:flex-row sm:items-start justify-between py-8 border-b border-border gap-4 sm:gap-0"
          >
            <div className="flex flex-col gap-3 max-w-xl flex-1">
              <h3>
                {experience.entry.title} at{" "}
                {experience.entry.url ? (
                  <a
                    href={experience.entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
                  >
                    {experience.entry.company}
                  </a>
                ) : (
                  <span>{experience.entry.company}</span>
                )}
              </h3>

              <p className="text-muted-foreground text-sm">
                {experience.entry.location} •{" "}
                {formatDate(experience.entry.startDate)} -{" "}
                {experience.entry.endDate
                  ? formatDate(experience.entry.endDate)
                  : "Present"}
              </p>

              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                <DocumentRenderer
                  document={getValidDocument(experience.entry.description)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {showAllCta && (
        <div className="text-left mt-4">
          <Link
            href="/experience"
            className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
          >
            View All Experiences
          </Link>
        </div>
      )}
    </section>
  );
}
