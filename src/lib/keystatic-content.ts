import { getKeystaticReader } from "@/lib/keystatic";
import type { DocumentRendererProps } from "@keystatic/core/renderer";

type Reader = ReturnType<typeof getKeystaticReader>;

type RawProject = Awaited<
  ReturnType<Reader["collections"]["projects"]["all"]>
>[number];
type ExperienceItem = Awaited<
  ReturnType<Reader["collections"]["experiences"]["all"]>
>[number];

export type ProjectItem = Omit<RawProject, "entry"> & {
  entry: Omit<RawProject["entry"], "experience"> & {
    experience: {
      slug: string;
      entry: Pick<ExperienceItem["entry"], "title" | "company">;
    } | null;
  };
};

export type ThoughtPost = Awaited<
  ReturnType<Reader["collections"]["thoughts"]["all"]>
>[number];

export function getValidDocument(
  document: DocumentRendererProps["document"] | null | undefined,
): DocumentRendererProps["document"] {
  if (document && Array.isArray(document)) {
    return document;
  }
  return [{ type: "paragraph", children: [{ text: "" }] }];
}

export function resolveProjectExperiences(
  projects: RawProject[],
  experiences: ExperienceItem[],
): ProjectItem[] {
  const experiencesBySlug = new Map(
    experiences.map((experience) => [experience.slug, experience.entry] as const),
  );

  return projects.map((project) => {
    const experienceSlug = project.entry.experience;
    const experience = experienceSlug
      ? experiencesBySlug.get(experienceSlug)
      : undefined;

    return {
      ...project,
      entry: {
        ...project.entry,
        experience:
          experience && experienceSlug
            ? {
                slug: experienceSlug,
                entry: {
                  title: experience.title,
                  company: experience.company ?? null,
                },
              }
            : null,
      },
    };
  });
}

function getTimestamp(value: string | null | undefined): number {
  if (!value) return Number.NEGATIVE_INFINITY;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

export function sortProjectsByYear<T extends { entry: { year: string } }>(
  items: T[],
): T[] {
  return [...items].sort(
    (a, b) => (Number(b.entry.year) || 0) - (Number(a.entry.year) || 0),
  );
}

export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => string | null | undefined,
): T[] {
  return [...items].sort(
    (a, b) => getTimestamp(getDate(b)) - getTimestamp(getDate(a)),
  );
}
