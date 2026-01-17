"use client";

import { Container } from "@presentation/components/layout/Container";

export function About() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          {/* --- LEFT COLUMN: HEADER (The Hook) --- */}
          <div className="w-full md:w-[35%] flex flex-col gap-6">
            <span className="text-micro">About</span>
            <h2>Clarity above all.</h2>
          </div>

          {/* --- RIGHT COLUMN: CONTENT (The Detail) --- */}
          <div className="w-full md:w-[65%] flex flex-col gap-6 md:pt-2">
            <p className="text-lead">
              Vectris Studio works with businesses to design and build digital
              systems that are clear, maintainable, and practical to use.
            </p>
            <p>
              Every project is approached with structure in mind — from content
              strategy and interface design down to the final implementation. We
              don&apos;t just launch websites; we build assets that last.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
