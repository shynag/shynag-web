import { getKeystaticReader } from "@/lib/keystatic";
import { Hero } from "@/app/_components/home/Hero";
import { Contact } from "./_components/home/Contact";
import { ProjectsPreview } from "./_components/home/ProjectsPreview";
import { ThoughtsPreview } from "./_components/home/ThoughtsPreview";
import { ExperiencePreview } from "./_components/home/ExperiencePreview"; // New import
import { createReader } from "@keystatic/core/reader";
import config from "@config";

export default async function HomePage() {
  const reader = getKeystaticReader();
  const keystaticReader = createReader(process.cwd(), config);

  const [profileData, identity, allProjects, allThoughts, allExperiences] =
    await Promise.all([
      reader.singletons.profile.read(),
      reader.singletons.identity.read(),
      keystaticReader.collections.projects.all(),
      keystaticReader.collections.thoughts.all(),
      keystaticReader.collections.experiences.all(), // New data fetch
    ]);

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
  const sortedProjects = allProjects.sort((a, b) => {
    return Number(b.entry.year) - Number(a.entry.year);
  });
  const projectsForPreview = sortedProjects.slice(0, 3);
  const showAllProjectsCta = allProjects.length > 3;

  // Sort thoughts by published date (newest first) and get the first 3 for preview
  const sortedThoughts = allThoughts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });
  const thoughtsForPreview = sortedThoughts.slice(0, 3);
  const showAllThoughtsCta = allThoughts.length > 3;

  // Sort experiences by start date (newest first) and get the first 3 for preview
  const sortedExperiences = allExperiences.sort((a, b) => {
    const dateA = new Date(a.entry.startDate || 0).getTime();
    const dateB = new Date(b.entry.startDate || 0).getTime();
    return dateB - dateA;
  });
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
    }))
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
      <ProjectsPreview items={projectsForPreview} showAllCta={showAllProjectsCta} />
      <ThoughtsPreview posts={thoughtsForPreview} showAllCta={showAllThoughtsCta} />
      <Contact />
    </div>
  );
}
