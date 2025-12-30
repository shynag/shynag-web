"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react"; // Import Box sebagai contoh logo
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@presentation/components/ui/button";
import { Container } from "@presentation/components/layout/Container";

// --- DATA TECH STACK ---
const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Astro",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Figma",
];

const data = {
  headline: "We Build",
  headlineFlip: ["Clarity", "Future", "Scale"],
};

// --- FLIP TEXT LOGIC ---
function FlipText({ className }: { className?: string }) {
  const words = data.headlineFlip;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`relative inline-flex flex-col h-[0.9em] overflow-hidden align-top ${className}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// --- TECH MARQUEE COMPONENT ---
const TechMarquee = () => {
  return (
    <div className="w-full border-t border-zinc-100 bg-white/50 backdrop-blur-md overflow-hidden py-6 md:py-10">
      <div className="relative w-full flex flex-col gap-6">
        {/* Label Powered By */}
        {/* <div className="px-6 md:px-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Powered by modern stack
          </span>
        </div> */}

        <div className="relative flex items-center">
          {/* Gradient Shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex items-center gap-12 md:gap-20 whitespace-nowrap px-10"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              duration: 60, // Diperlambat menjadi 60 detik agar nyaman
              ease: "linear",
            }}
            style={{ width: "fit-content" }}
          >
            {[...technologies, ...technologies].map((tech, i) => (
              <div key={i} className="flex items-center gap-4 group">
                {/* Logo Placeholder (Gunakan Lucide atau SVG Logo) */}
                <Box className="w-5 h-5 text-zinc-300 group-hover:text-foreground transition-colors" />
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-zinc-300 group-hover:text-foreground transition-colors cursor-default">
                  {tech}
                </span>
                {/* DOT DIHAPUS SESUAI REQUEST */}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- BACKGROUND GRID COMPONENT ---
const DashedGridBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e7e5e4 1px, transparent 1px),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "center top",
        maskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        WebkitMaskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  </div>
);

// --- MAIN HERO ---
export function HeroSection() {
  return (
    <section className="h-[100svh] sticky top-0 -z-10 w-full overflow-hidden bg-background">
      {/* Background Grid */}
      <DashedGridBackground />

      {/* Content Wrapper */}
      <div className="w-full h-full flex flex-col justify-between pt-20 relative z-10">
        {/* MIDDLE CONTENT */}
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4">
          <Container className="flex flex-col items-center">
            <h1 className="font-heading font-black text-center text-foreground uppercase leading-[0.9] tracking-tighter mb-8 md:mb-12">
              <span className="block text-6xl sm:text-7xl md:text-[8vw]">
                {data.headline}
              </span>
              <span className="text-6xl sm:text-7xl md:text-[8vw] text-zinc-300 flex items-center justify-center gap-2 md:gap-4">
                <FlipText className="text-zinc-300" />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-foreground text-background hover:bg-zinc-800 transition-all hover:-translate-y-1 shadow-xl"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2"
                >
                  Get to Know Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </Container>
        </div>

        {/* BOTTOM MARQUEE */}
        <div className="flex-none w-full">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
