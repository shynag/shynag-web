import Link from "next/link";
import { DocumentRenderer, type DocumentRendererProps } from "@keystatic/core/renderer"; // Correct import for Document type

// Helper function to ensure DocumentRenderer always receives a valid Document object
const getValidDocument = (doc: DocumentRendererProps['document'] | null | undefined): DocumentRendererProps['document'] => {
  // A Keystatic Document is typically an array of nodes.
  // If doc is null, undefined, or not an array, return an empty document.
  if (doc && Array.isArray(doc)) {
    return doc;
  }
  // Return a minimal valid empty document structure
  return [{ type: 'paragraph', children: [{ text: '' }] }];
};

// Tipe data dari Keystatic
export type ExperienceItem = {
  slug: string;
  entry: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: DocumentRendererProps['document']; // Keystatic document field
    url: string | null;
  };
};

interface ListProps {
  items: ExperienceItem[];
}

export function List({ items }: ListProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground mt-12">
        Belum ada pengalaman kerja yang ditambahkan.
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="flex flex-col border-t border-border mt-6">
      {items.map((experience) => (
        <div
          key={experience.slug}
          className="flex flex-col sm:flex-row sm:items-start justify-between py-8 border-b border-border gap-4 sm:gap-0"
        >
          {/* KIRI: Konten Utama */}
          <div className="flex flex-col gap-3 max-w-xl flex-1">
            {/* Title & Company */}
            <h3 className="text-lg font-semibold text-foreground">
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

            {/* Location & Dates */}
            <p className="text-muted-foreground text-sm">
              {experience.entry.location} • {formatDate(experience.entry.startDate)} -{" "}
              {experience.entry.endDate ? formatDate(experience.entry.endDate) : "Present"}
            </p>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
              <DocumentRenderer document={getValidDocument(experience.entry.description)} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
