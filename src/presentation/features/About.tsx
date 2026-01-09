"use client";

import { Container } from "@presentation/components/layout/Container";
import { TextReveal } from "@presentation/components/ui/text-reveal";

const content = `Vectris Studio works with businesses to design and build digital systems that are clear, maintainable, and practical to use. Every project is approached with structure in mind — from content to interface to implementation.`;

export function About() {
  return (
    <section id="about" className="min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <TextReveal className="text-left font-normal text-balance" as="h2">
            {content}
          </TextReveal>
        </div>
      </Container>
    </section>
  );
}
