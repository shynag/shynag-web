import Image from "next/image";
import { DocumentRenderer } from "@keystatic/core/renderer";

type HeroProps = {
  profile: {
    displayName: string;
    bio: Document | string; // Allow bio to be a string for legacy data
    avatar: string | null;
  } | null;
  identity: {
    name: string;
    tagline: string;
  } | null;
};

export function Hero({ profile, identity }: HeroProps) {
  // Determine the data to display. Prioritize profile, fallback to identity.
  const displayData = {
    name: profile?.displayName || "John Doe", // Fallback name
    bio: profile?.bio || [
      {
        type: "paragraph",
        children: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
          },
        ],
      },
    ],
    avatar: profile?.avatar || null, // Fallback avatar is null
  };

  return (
    <section className="flex flex-col items-start gap-6 pt-8 md:pt-12">
      {/* 1. PROFILE PICTURE */}
      {displayData.avatar && (
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border bg-muted relative">
            <Image
              src={displayData.avatar}
              alt={displayData.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
        </div>
      )}

      {/* 2. TEXT CONTENT */}
      <div className="flex flex-col gap-4 max-w-2xl">
        {/* Identity: Langsung Nama */}
        <h1 className="heading-style">{displayData.name}</h1>

        {/* Bio */}
        <div className="space-y-4 pt-1">
          {Array.isArray(displayData.bio) ? (
            <DocumentRenderer document={displayData.bio} />
          ) : (
            <p>{String(displayData.bio)}</p>
          )}
        </div>
      </div>
    </section>
  );
}
