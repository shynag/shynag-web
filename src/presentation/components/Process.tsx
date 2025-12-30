"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@presentation/components/layout/Container";
import { Section } from "@presentation/components/layout/Section";

const steps = [
  {
    id: "01",
    phase: "Discovery",
    title: "Diagnostic Audit",
    statement:
      "Auditing technical debt and defining business logic parameters.",
  },
  {
    id: "02",
    phase: "Architecture",
    title: "System Blueprint",
    statement: "Architecting modular data flows and component structures.",
  },
  {
    id: "03",
    phase: "Engineering",
    title: "High-Performance Dev",
    statement: "Translating blueprints into clean, scalable, and tested code.",
  },
  {
    id: "04",
    phase: "Deployment",
    title: "Infrastructure Launch",
    statement: "Zero-downtime deployment with automated scale protocols.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <Section className="relative z-10 bg-background py-24 md:py-40 border-b border-zinc-100">
      <Container>
        {/* --- HEADER (Centered) --- */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6 block">
            The Methodology
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-none max-w-4xl">
            From Chaos <span className="text-zinc-300">to Architecture.</span>
          </h2>
        </div>

        {/* --- PIPELINE CONTAINER --- */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* STATIC BACKGROUND LINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 -translate-x-1/2" />

          {/* ANIMATED PROGRESS LINE */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black origin-top -translate-x-1/2 z-10"
          />

          {/* STEPS CONTAINER */}
          <div className="flex flex-col gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* NODE on the central line */}
                <div className="absolute left-1/2 top-2 w-3 h-3 rounded-full bg-background border border-zinc-200 -translate-x-1/2 z-20 group-hover:border-black group-hover:scale-125 transition-all" />

                {/* CONTENT positioned left or right */}
                <div
                  className={`w-full flex ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="pt-12 md:pt-0 md:w-1/2 md:px-8">
                    <div
                      className={`flex flex-col gap-4 items-center text-center ${
                        index % 2 === 0
                          ? "md:items-start md:text-left"
                          : "md:items-end md:text-right"
                      }`}
                    >
                      {/* ID & Phase */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-bold text-black border border-black px-2 py-0.5">
                          STEP {step.id}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {step.phase}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-foreground">
                        {step.title}
                      </h3>

                      {/* Statement */}
                      <p className="text-lg font-medium leading-snug text-zinc-500 group-hover:text-zinc-800 transition-colors">
                        {step.statement}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINAL INDICATOR */}
        <div className="flex flex-col items-center mt-24 md:mt-32">
          <div className="w-10 h-[1px] bg-black" />
          <span className="text-[10px] font-bold uppercase tracking-widest mt-4">
            Handover Complete
          </span>
        </div>
      </Container>
    </Section>
  );
}
