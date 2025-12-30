"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Container } from "@presentation/components/layout/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock Scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* --- 1. NAVBAR FIXED (REVISI: Fixed Position) --- */}
      {/* fixed top-0: Memaksa navbar menempel di layar atas */}
      {/* backdrop-blur: Efek buram saat konten lewat di belakangnya */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-background/95 backdrop-blur-sm border-b border-zinc-100 h-20">
        <div className="w-full h-full flex items-center justify-between px-6 md:px-10 relative z-[100]">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-black text-2xl tracking-tighter uppercase"
            onClick={() => setIsOpen(false)}
          >
            Vectris Studio<span className="text-zinc-400">.</span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative h-12 w-12 flex flex-col items-center justify-center gap-[6px] focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
              <motion.span
                className="w-8 h-[2px] bg-foreground origin-center"
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-8 h-[2px] bg-foreground origin-center"
                animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </MotionConfig>
          </button>
        </div>
      </header>

      {/* --- 2. MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-20 left-0 right-0 bottom-0 z-[90] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full bg-background flex flex-col justify-between"
            >
              {/* --- NAVIGASI UTAMA --- */}
              <div className="flex-1 flex flex-col justify-center overflow-y-auto lg:overflow-visible">
                <Container>
                  <div
                    className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center items-start lg:items-center w-full
                        gap-4 md:gap-8 lg:gap-x-20 lg:gap-y-8"
                  >
                    {navItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group relative inline-block py-1"
                      >
                        <span className="block text-[10px] font-mono text-zinc-400 mb-0 lg:mb-1 lg:absolute lg:-top-6 lg:left-0">
                          0{index + 1}
                        </span>
                        <span className="font-heading font-black text-4xl sm:text-6xl xl:text-7xl tracking-tighter text-foreground transition-colors group-hover:text-zinc-400 whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Container>
              </div>

              {/* --- FOOTER INFO (REVISI: WhatsApp Added, LinkedIn Removed) --- */}
              <div className="border-t border-zinc-100 bg-zinc-50/50 py-6 md:py-8 shrink-0">
                <Container>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="text-sm font-medium text-zinc-500">
                      <span className="block text-xs font-bold uppercase text-zinc-400 mb-1 tracking-widest">
                        Office
                      </span>
                      Yogyakarta, Indonesia
                    </div>

                    <div className="flex gap-6 md:gap-8 text-sm font-bold text-foreground">
                      {/* Instagram */}
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Instagram
                      </a>

                      {/* WhatsApp (Baru) */}
                      {/* Ganti nomor di bawah dengan nomor asli (format internasional tanpa +) */}
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        WhatsApp
                      </a>

                      {/* Email */}
                      <a
                        href="mailto:hello@vectris.studio"
                        className="hover:underline text-zinc-500"
                      >
                        hello@vectris.web.id
                      </a>
                    </div>
                  </div>
                </Container>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
