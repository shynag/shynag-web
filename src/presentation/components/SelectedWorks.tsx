"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@presentation/components/layout/Container";
import { Section } from "@presentation/components/layout/Section";

const projects = [
  {
    id: "01",
    client: "Vanguard Corp",
    title: "Financial System Overhaul",
    services: "Fintech / Backend / Security",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    slug: "vanguard-finance",
  },
  {
    id: "02",
    client: "Lumina Gallery",
    title: "Immersive Digital Art Space",
    services: "UI/UX / WebGL / Frontend",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    slug: "lumina-gallery",
  },
  {
    id: "03",
    client: "Apex Gear",
    title: "High-Scale E-Commerce",
    services: "Shopify Plus / Growth / SEO",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    slug: "apex-gear",
  },
  {
    id: "04",
    client: "Urban Pulse",
    title: "Smart City Dashboard",
    services: "SaaS / Dashboard / Real-time",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop",
    slug: "urban-pulse",
  },
];

export function SelectedWorks() {
  return (
    <Section className="relative z-10 bg-background py-24 md:py-32 border-b border-zinc-100">
      <Container>
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-28">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 block">
              Case Studies
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.85]">
              Selected <br />
              <span className="text-zinc-300">Engineering.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors"
          >
            View All Works
            <div className="w-12 h-[1px] bg-zinc-200 group-hover:w-16 group-hover:bg-foreground transition-all duration-500" />
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <Link href={`/work/${project.slug}`} className="block w-full">
                {/* 1. IMAGE: Clean, no heavy overlays */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-50 mb-8">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                  {/* Subtle Corner Label */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    View Case
                  </div>
                </div>

                {/* 2. PROJECT INFO: Bold & Structured */}
                <div className="flex flex-col gap-4">
                  {/* Client & Year Row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {project.client}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-300">
                      {project.year}
                    </span>
                  </div>

                  {/* Title: Big & Black font */}
                  <div>
                    <h3 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight leading-none mb-3 group-hover:text-zinc-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-400 tracking-tight">
                      {project.services}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
