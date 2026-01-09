"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@presentation/components/layout/Container";
import { Card } from "@presentation/components/ui/card";
import { Button } from "@presentation/components/ui/button";

// --- DUMMY DATA ---
const projects = [
  {
    id: 1,
    title: "An Exploration in F&B Web Design",
    category: "Internal Concept",
    imageUrl: "/1.png",
    href: "#",
  },
];

// --- Reusable Project Card Component ---
const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <Link href={project.href} className="group block w-full">
    <Card className="relative w-full aspect-4/5 overflow-hidden rounded-4xl transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 border-none">
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* 2. OVERLAY (Dark Gradient) */}

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent  transition-opacity duration-500" />

      {/* 3. CONTENT LAYOUT */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
        <div className="flex items-end justify-between gap-4">
          {/* LEFT: Text Content */}
          <div className="flex flex-col gap-2">
            <span className="text-micro text-white">{project.category}</span>
            <h3 className="text-pretty">{project.title}</h3>
          </div>
        </div>
      </div>
    </Card>
  </Link>
);

export function SelectedWorks() {
  return (
    <section id="work" className="relative z-10 bg-background py-24 md:py-32">
      <Container>
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-micro mb-4 block">Selected Works</span>
          <h2 className="max-w-4xl">Focused on structure, clarity, and use.</h2>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
