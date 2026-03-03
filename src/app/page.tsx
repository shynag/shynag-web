import { getKeystaticReader } from "@/lib/keystatic";
import { Hero } from "@/app/_components/home/Hero";
import { Directory } from "@/app/_components/home/Directory";
import { Contact } from "./_components/home/Contact";

export default async function HomePage() {
  const reader = getKeystaticReader();
  const [profileData, identity, directory] = await Promise.all([
    reader.singletons.profile.read(),
    reader.singletons.identity.read(),
    reader.singletons.directory.read(),
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
      <Directory
        directory={
          directory
            ? {
                title: directory.title,
                links: directory.links.map((l) => ({
                  label: l.label,
                  href: l.href,
                })),
              }
            : null
        }
      />
      <Contact />
    </div>
  );
}
