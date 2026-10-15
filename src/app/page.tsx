import { getKeystaticReader } from "@/lib/keystatic";
import { Hero } from "@/app/_components/home/Hero";
import { Contact } from "./_components/home/Contact";
import { ProjectsPreview } from "./_components/home/ProjectsPreview";
import { ThoughtsPreview } from "./_components/home/ThoughtsPreview";
import { ExperiencePreview } from "./_components/home/ExperiencePreview";
import {
  resolveProjectExperiences,
  sortByDate,
  sortProjectsByYear,
} from "@/lib/keystatic-content";

export default async function HomePage() {
  const reader = getKeystaticReader();

  const [profileData, identity, allProjects, allThoughts, allExperiences] =
    await Promise.all([
      reader.singletons.profile.read(),
      reader.singletons.identity.read(),
      reader.collections.projects.all(),
      reader.collections.thoughts.all(),
      reader.collections.experiences.all(),
    ]);

  const projectsWithResolvedExperience = resolveProjectExperiences(
    allProjects,
    allExperiences,
  );

  // Resolve the bio content if it's a function (lazy-loaded)
  const bioContent =
    profileData && typeof profileData.bio === "function"
      ? await profileData.bio()
      : profileData?.bio;

  // Ensure the profile passed to Hero matches the expected shape (displayName, bio, avatar)
  const profile = profileData
    ? {
        displayName: profileData.displayName,
        bio: bioContent as
          | readonly import("@keystatic/core").DocumentElement[]
          | undefined,
        avatar: profileData.avatar,
      }
    : null;

  // Sort projects by year (newest first) and get the first 3 for preview
  const sortedProjects = sortProjectsByYear(projectsWithResolvedExperience);
  const projectsForPreview = sortedProjects.slice(0, 3);
  const showAllProjectsCta = allProjects.length > 3;

  const sortedThoughts = sortByDate(
    allThoughts,
    (thought) => thought.entry.publishedDate,
  );
  const thoughtsForPreview = sortedThoughts.slice(0, 3);
  const showAllThoughtsCta = allThoughts.length > 3;

  const sortedExperiences = sortByDate(
    allExperiences,
    (experience) => experience.entry.startDate,
  );
  const experiencesForPreview = sortedExperiences.slice(0, 3);
  const showAllExperiencesCta = allExperiences.length > 3;

  // Resolve description promises for each experience in the preview
  const resolvedExperiencesForPreview = await Promise.all(
    experiencesForPreview.map(async (experience) => ({
      ...experience,
      entry: {
        ...experience.entry,
        description: await experience.entry.description(),
      },
    })),
  );

  return (
    <div className="flex flex-col gap-24">
      <Hero
        profile={
          profile
            ? { ...profile, bio: profile.bio ? [...profile.bio] : undefined }
            : null
        }
        identity={identity}
      />
      <ExperiencePreview
        items={resolvedExperiencesForPreview}
        showAllCta={showAllExperiencesCta}
      />
      <ProjectsPreview
        items={projectsForPreview}
        showAllCta={showAllProjectsCta}
      />
      <ThoughtsPreview
        posts={thoughtsForPreview}
        showAllCta={showAllThoughtsCta}
      />
      <Contact />
    </div>
  );
}
