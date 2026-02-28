import { createReader } from "@keystatic/core/reader";
import config from "@config";
import { Hero } from "@/app/_components/home/Hero";
import { Directory } from "@/app/_components/home/Directory";
import { Contact } from "./_components/home/Contact";

export default async function HomePage() {
  const reader = createReader(process.cwd(), config);
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

  const profile = profileData ? { ...profileData, bio: bioContent } : null;

  return (
    <div className="flex flex-col gap-24">
      <Hero profile={profile} identity={identity} />
      <Directory directory={directory} />
      <Contact />
    </div>
  );
}
