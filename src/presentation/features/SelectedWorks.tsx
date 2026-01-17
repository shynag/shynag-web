"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@presentation/components/layout/Container";
import { Card } from "@presentation/components/ui/card";

// --- DUMMY DATA ---
const projects = [
  {
    id: 1,
    title: "An Exploration in F&B",
    category: "Internal Concept",
    imageUrl: "/1.png",
    href: "#",
  },
];

export function SelectedWorks() {
  return (
    <section id="work" className="py-24 md:py-32">
      <Container>
        {/* --- 1. HEADER (ATAS) --- */}
        <div className="flex flex-col items-start text-left gap-6 mb-16 md:mb-24 max-w-3xl">
          <span className="text-micro text-muted-foreground">
            Selected Works
          </span>
          <h2>Focused on structure, clarity, and use.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group block w-full"
            >
              {/* IMAGE */}
              <Card className="relative w-full aspect-4/5 overflow-hidden rounded-3xl md:rounded-4xl border-none bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Card>

              {/* TEXT */}
              <div className="mt-6 flex flex-col gap-1.5 pr-4">
                <span className="text-micro text-muted-foreground">
                  {project.category}
                </span>
                <h3>{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
