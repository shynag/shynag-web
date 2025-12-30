"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { Container } from "@presentation/components/layout/Container";
import { Section } from "@presentation/components/layout/Section";

// --- THE MANIFESTO TEXT ---
const content = `We design clear, purposeful digital systems. Stripped of excess, grounded in structure, and built to last.`;
export function Philosophy() {
  const container = useRef(null);

  // Mengukur progress scroll element terhadap viewport
  // "start 0.9": Mulai animasi saat bagian atas element menyentuh 90% viewport (bawah layar)
  // "end 0.5": Selesai animasi saat bagian bawah element menyentuh 50% viewport (tengah layar)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.5"],
  });

  const words = content.split(" ");

  return (
    <Section className="bg-background py-32 md:py-48 border-b border-zinc-100">
      <Container>
        <div ref={container} className="w-full">
          <p className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4">
            {words.map((word, i) => {
              // Kalkulasi range progress untuk setiap kata
              const start = i / words.length;
              const end = start + 1 / words.length;

              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </Container>
    </Section>
  );
}

// --- SUB-COMPONENT: WORD ---
// Mengatur opasitas kata individu berdasarkan progress scroll global
const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]); // 0.2 = Zinc-300 effect, 1 = Foreground

  return (
    <span className="relative inline-block">
      {/* Shadow Text (Untuk layout spacing) */}
      <span className="opacity-0 font-heading font-black text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9]">
        {children}
      </span>

      {/* Animated Text (Overlay) */}
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 font-heading font-black text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-foreground"
      >
        {children}
      </motion.span>
    </span>
  );
};
