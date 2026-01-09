"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import Logo from "@presentation/assets/logo.svg";
import { Button } from "@presentation/components/ui/button";
import { Container } from "@presentation/components/layout/Container";
import { BrandMarquee } from "@presentation/components/BrandMarquee";
import { TextAnimate } from "../components/ui/text-animate";

const data = {
  headline: `We build digital systems.`,
  microtext: "Web Design & Development",
  cta: { label: "Explore the studio", href: "#work" },
  brandName: "Vectris Studio.",
  heroImage:
    "https://images.unsplash.com/photo-1761998066468-011109c1df1f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

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

export function Hero() {
  const currentYear = new Date().getFullYear();

  const lenis = useLenis();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    lenis?.scrollTo("#work", {
      offset: 0,
      duration: 2, // Durasi 2 detik: Memberikan efek "Meluncur" yang lambat & elegan (Cinematic)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function agar start/stop-nya mulus
    });
  };

  return (
    <section className="h-svh py-4">
      <Container className="h-full flex flex-col justify-between gap-4">
        {/* --- 1. HEADER (Top) --- */}
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

        {/* --- 2. MAIN CONTENT CARD (Middle) --- */}
        <main className="flex-1 w-full relative flex flex-col items-center justify-center text-center rounded-4xl overflow-hidden border border-border/50">
          {/* A. Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={data.heroImage}
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* B. Dark Overlay */}
          <div className="absolute inset-0 z-0 bg-black/60" />

          {/* C. Content */}
          <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl mx-auto">
            <div className="text-white drop-shadow-sm mb-10">
              <FadeInAnimation>
                <span className="text-micro mb-4 block">{data.microtext}</span>
              </FadeInAnimation>

              <TextAnimate
                animation="fadeIn"
                by="word"
                as="h1"
                className="text-white"
                once
              >
                {data.headline}
              </TextAnimate>
            </div>

            <FadeInAnimation delay={0.6}>
              <Button asChild size="lg">
                {/* Pastikan onClick dipasang disini */}
                <Link href={data.cta.href} onClick={handleCtaClick}>
                  {data.cta.label}
                </Link>
              </Button>
            </FadeInAnimation>
          </div>
        </main>

        {/* --- 3. FOOTER MARQUEE (Bottom) --- */}
        <FadeInAnimation delay={0.9}>
          <div className="w-full py-6">
            <BrandMarquee />
          </div>
        </FadeInAnimation>
      </Container>
    </section>
  );
}
