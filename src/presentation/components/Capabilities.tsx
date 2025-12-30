"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@presentation/components/layout/Container";
import { Section } from "@presentation/components/layout/Section";

const items = [
  {
    id: "01",
    title: "System-Oriented Website",
    statement: "Built for function, engineered for scale.",
    description:
      "Kami tidak sekadar membuat halaman web statis. Kami membangun arsitektur digital yang modular, terhubung dengan database, dan dirancang untuk menangani logika bisnis yang kompleks.",
    link: "/services#system",
  },
  {
    id: "02",
    title: "Content & Operational Interface",
    statement: "Total control without touching code.",
    description:
      "Implementasi Headless CMS dan Custom Dashboard. Memberikan tim operasional Anda kendali penuh untuk mengelola konten, produk, dan data secara real-time tanpa bantuan developer.",
    link: "/services#interface",
  },
  {
    id: "03",
    title: "Technical Growth Infrastructure",
    statement: "Visibility through precision engineering.",
    description:
      "Fondasi SEO Teknikal, Server-Side Rendering (SSR), dan integrasi Analytics mendalam. Memastikan sistem Anda tidak hanya berjalan lancar, tapi juga mudah ditemukan oleh mesin pencari.",
    link: "/services#infrastructure",
  },
];

export function Capabilities() {
  // State khusus Mobile: Melacak item mana yang dibuka
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  const toggleMobile = (id: string) => {
    setMobileOpenId(mobileOpenId === id ? null : id);
  };

  return (
    <Section className="relative z-10 bg-background py-20 md:py-32 border-b border-zinc-100">
      <Container>
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 block">
            What We Do
          </span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
            Core <br />
            <span className="text-zinc-300">Capabilities.</span>
          </h2>
        </div>

        {/* --- THE CONTENT LIST --- */}
        <div className="flex flex-col">
          {items.map((item) => {
            const isOpen = mobileOpenId === item.id;

            return (
              <div
                key={item.id}
                className="group border-t border-zinc-200 -mx-4 px-4 md:mx-0 md:px-0 transition-colors duration-500 hover:bg-zinc-50"
              >
                {/* WRAPPER UTAMA 
                   Di Mobile: Div biasa (karena ada tombol toggle terpisah).
                   Di Desktop: Link utuh (karena hover effect).
                */}
                <div className="py-8 md:py-16 flex flex-col md:flex-row md:items-start gap-6 md:gap-0 relative">
                  {/* --- MOBILE TOGGLE BUTTON (Overlay Click Area) --- */}
                  {/* Hanya muncul di mobile, transparan, menutupi area judul untuk trigger accordion */}
                  <button
                    onClick={() => toggleMobile(item.id)}
                    className="absolute inset-0 z-10 w-full h-full md:hidden text-left focus:outline-none"
                    aria-label="Toggle details"
                  />

                  {/* COL 1: ID (10%) */}
                  <div className="md:w-1/12 pt-1 flex justify-between items-center md:block">
                    <span className="font-mono text-xs font-bold text-zinc-400 md:group-hover:text-foreground transition-colors">
                      ({item.id})
                    </span>

                    {/* MOBILE ICON: Plus/Minus (Hanya muncul di Mobile) */}
                    <div className="md:hidden relative w-6 h-6 z-20 pointer-events-none">
                      <motion.div
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          opacity: isOpen ? 0 : 1,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5 text-zinc-400" />
                      </motion.div>
                      <motion.div
                        animate={{
                          rotate: isOpen ? 0 : -90,
                          opacity: isOpen ? 1 : 0,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5 text-foreground" />
                      </motion.div>
                    </div>
                  </div>

                  {/* COL 2: TITLE & STATEMENT (50%) */}
                  <div className="md:w-6/12 pr-4 md:pr-12 pointer-events-none md:pointer-events-auto">
                    {/* Judul Kecil */}
                    <span className="block font-bold text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 mb-2 md:group-hover:text-zinc-800 transition-colors">
                      {item.title}
                    </span>

                    {/* Statement Besar */}
                    <h3
                      className={`font-heading font-black text-2xl sm:text-4xl md:text-5xl uppercase leading-tight tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-foreground" : "text-foreground"
                      }`}
                    >
                      {item.statement}
                    </h3>
                  </div>

                  {/* COL 3: DETAILS (40%) - COLLAPSIBLE ON MOBILE */}
                  <div className="md:w-5/12 w-full pointer-events-none md:pointer-events-auto z-20">
                    {/* DESKTOP VIEW: Selalu Muncul */}
                    <div className="hidden md:flex flex-col justify-between gap-8 pt-1 h-full">
                      <p className="text-lg font-medium leading-relaxed text-zinc-700 max-w-md">
                        {item.description}
                      </p>
                      <Link
                        href={item.link}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-zinc-600 transition-colors w-fit"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </Link>
                    </div>

                    {/* MOBILE VIEW: Collapsible Animation */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="md:hidden overflow-hidden"
                        >
                          <div className="pt-4 pb-2 flex flex-col gap-6">
                            <p className="text-base font-medium leading-relaxed text-zinc-600">
                              {item.description}
                            </p>

                            {/* Tombol Explore di Mobile (Bisa diklik karena z-20) */}
                            <Link
                              href={item.link}
                              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground pointer-events-auto w-fit p-2 -ml-2"
                            >
                              Explore Details
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t border-zinc-200" />
        </div>
      </Container>
    </Section>
  );
}
