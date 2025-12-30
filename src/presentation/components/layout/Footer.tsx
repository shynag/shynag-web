"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@presentation/components/layout/Container";
import { Button } from "@presentation/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 text-zinc-50">
      {/* --- SECTION 1: THE CTA (High Impact) --- */}
      {/* Border bawah samar untuk memisahkan CTA dengan Info */}
      <div className="border-b border-zinc-800">
        <Container>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between py-20 md:py-32 gap-10">
            {/* Copywriting yang Kuat & Besar */}
            <div className="max-w-3xl">
              <span className="block text-zinc-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-6">
                What's Next?
              </span>
              <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.9]">
                Let's build <br />
                <span className="text-zinc-600">something scalable.</span>
              </h2>
            </div>

            {/* Action Button */}
            <div className="w-full lg:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full h-16 sm:h-20 px-10 sm:px-12 text-lg sm:text-xl font-bold bg-white text-black hover:bg-zinc-200 transition-all hover:-translate-y-1"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3"
                >
                  Start a Project
                  <ArrowUpRight className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* --- SECTION 2: THE ESSENTIALS (Minimalist Strip) --- */}
      <div className="py-8 md:py-10 text-sm font-medium text-zinc-400">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
            {/* 1. Copyright & Brand */}
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-white tracking-tighter uppercase">
                Vectris Studio.
              </span>
              <span>&copy; {currentYear}</span>
            </div>

            {/* 2. Location (Center-ish on Desktop) */}
            <div className="hidden md:block">Yogyakarta, Indonesia</div>

            {/* 3. Contact Links */}
            <div className="flex flex-wrap gap-6 text-white font-bold">
              <a
                href="#"
                target="_blank"
                className="hover:text-zinc-400 transition-colors"
              >
                Instagram
              </a>

              {/* WhatsApp Display Number */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                className="hover:text-zinc-400 transition-colors"
              >
                +62 812 3456 7890
              </a>

              <a
                href="mailto:hello@vectris.studio"
                className="hover:text-zinc-400 transition-colors"
              >
                Email
              </a>
            </div>

            {/* Location (Mobile Only - Move to bottom) */}
            <div className="md:hidden text-zinc-500 text-xs uppercase tracking-widest">
              Yogyakarta, ID
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
