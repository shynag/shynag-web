import Image from "next/image";

export function Hero() {
  const profile = {
    // Greeting dihapus
    name: "Sheptiyan Agung Rizmawan",
    bio: [
      "Saya membangun sistem web yang tidak hanya fungsional, tapi juga scalable dan mudah dikembangkan. Fokus utama saya adalah clean architecture dan performa aplikasi.",
      "Saat ini sedang fokus mendalami System Design dan Developer Experience.",
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1603786420263-ad59136a7409?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <section className="flex flex-col items-start gap-6 pt-8 md:pt-12">
      {/* 1. PROFILE PICTURE */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border bg-muted relative">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="flex flex-col gap-4 max-w-2xl">
        {/* Identity: Langsung Nama */}
        <h1>{profile.name}.</h1>

        {/* Bio */}
        <div className="space-y-4 pt-1">
          {profile.bio.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
