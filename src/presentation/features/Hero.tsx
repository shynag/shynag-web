"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import Logo from "@presentation/assets/logo.svg";
import { Button } from "@presentation/components/ui/button";
import { Container } from "@presentation/components/layout/Container";
import { TextAnimate } from "../components/ui/text-animate";
import { Marquee } from "@presentation/components/ui/marquee";
import { cn } from "@presentation/lib/utils";

const data = {
  headline: `We give brands the momentum to grow`,
  cta: { label: "Explore the studio", href: "#work" },
  brandName: "Vectris Studio.",
};

const artworks = [
  "/1.png",
  "https://images.unsplash.com/photo-1697292859724-0d2501966448?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511140973288-19bf21d7e771?q=80&w=1074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1702479744181-2d6b58941583?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?q=80&w=1148&auto=format&fit=crop",
];

// --- COMPONENT: IMAGE CARD ---
const ReviewCard = ({ img }: { img: string }) => {
  return (
    <div
      className={cn(
        "relative w-40 md:w-56 aspect-4/5 cursor-pointer overflow-hidden rounded-4xl"
      )}
    >
      <Image
        src={img}
        alt="Work"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 160px, 224px"
      />
      {/* UPDATE 1: Overlay 50% (bg-black/50). 
          Pas. Gak gelap mati, gak terang silau. */}
      <div className="absolute inset-0 bg-black/50 hover:bg-black/20 transition-colors duration-500" />
    </div>
  );
};

// --- COMPONENT: PERSPECTIVE WALL BACKGROUND ---
const PerspectiveWall = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-background">
      <div className="relative h-full w-full flex items-center justify-center perspective-[600px]">
        {/* UPDATE 2: Opacity 40%. 
            Cukup samar untuk jadi background, tapi warna-warni gambarnya masih kerasa dikit.
        */}
        <div
          className="flex h-[150vh] w-full max-w-[120vw] flex-row items-center justify-center gap-6 opacity-40"
          style={{ transform: "rotateX(20deg) scale(1.2)" }}
        >
          {/* KOLOM 1 */}
          <Marquee vertical pauseOnHover className="[--duration:90s]">
            {artworks.map((img, i) => (
              <ReviewCard key={i} img={img} />
            ))}
          </Marquee>

          {/* KOLOM 2 (Reverse) */}
          <Marquee vertical reverse pauseOnHover className="[--duration:70s]">
            {artworks.map((img, i) => (
              <ReviewCard key={i} img={img} />
            ))}
          </Marquee>

          {/* KOLOM 3 (Desktop) */}
          <Marquee
            vertical
            pauseOnHover
            className="hidden md:flex [--duration:100s]"
          >
            {artworks.map((img, i) => (
              <ReviewCard key={i} img={img} />
            ))}
          </Marquee>

          {/* KOLOM 4 (Reverse - Desktop) */}
          <Marquee
            vertical
            reverse
            pauseOnHover
            className="hidden lg:flex [--duration:80s]"
          >
            {artworks.map((img, i) => (
              <ReviewCard key={i} img={img} />
            ))}
          </Marquee>

          {/* KOLOM 5 (Extra Wide Screen) */}
          <Marquee
            vertical
            pauseOnHover
            className="hidden xl:flex [--duration:110s]"
          >
            {artworks.map((img, i) => (
              <ReviewCard key={i} img={img} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* --- OVERLAYS & MASKING --- */}

      {/* 1. Top Fade */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />

      {/* UPDATE 3: Spotlight Balance.
          - from-background/95: Tengah Hampir Solid (Biar teks Headline aman).
          - via-background/40: Transisi halus ke transparan.
      */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-background/95 via-background/40 to-transparent z-10" />

      {/* 3. Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
    </div>
  );
};

// --- UTILS ---
function FadeInAnimation({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// --- HERO ---
export function Hero() {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lenis?.scrollTo("#work", {
      offset: 0,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <section className="h-svh py-4 relative bg-background overflow-hidden flex flex-col">
      <PerspectiveWall />

      <Container className="h-full flex flex-col justify-between gap-4 relative z-20">
        <FadeInAnimation>
          <div className="w-full py-4 flex justify-between items-center font-medium px-2">
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="Vectris Studio"
                width={16}
                height={16}
                className="text-white"
              />
              <span className="text-base uppercase font-bold tracking-wide">
                {data.brandName}
              </span>
            </div>
            <span className="text-base text-muted-foreground">
              &copy; {currentYear}
            </span>
          </div>
        </FadeInAnimation>

        <main className="flex-1 w-full relative flex flex-col items-center justify-center text-center">
          <div className="relative z-10 p-4 flex flex-col items-center max-w-3xl mx-auto">
            <div className="text-white drop-shadow-sm mb-10">
              <TextAnimate
                animation="fadeIn"
                by="word"
                as="h1"
                className="text-white drop-shadow-2xl"
                once
              >
                {data.headline}
              </TextAnimate>
            </div>

            <FadeInAnimation delay={0.8}>
              <Button asChild size="lg" className="shadow-2xl shadow-black/50">
                <Link href={data.cta.href} onClick={handleCtaClick}>
                  {data.cta.label}
                </Link>
              </Button>
            </FadeInAnimation>
          </div>
        </main>

        <div className="h-10"></div>
      </Container>
    </section>
  );
}
