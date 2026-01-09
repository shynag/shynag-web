"use client";

import Image from "next/image";
import { Container } from "@presentation/components/layout/Container";
import { Card } from "@presentation/components/ui/card";
import {
  Container as ContainerIcon,
  LayoutTemplate,
  Database,
} from "lucide-react";
import { cn } from "@presentation/lib/utils"; // Pastikan import cn utility

// --- DATA ---
const header = {
  title: "Built around clarity and structure.",
  subtitle: "Areas of Focus",
};

const items = [
  {
    id: "1",
    name: "Web Systems",
    description:
      "Structured websites built to support business workflows and scalability.",
    icon: ContainerIcon,
    backgroundImage:
      "https://images.unsplash.com/photo-1697899001862-59699946ea29?q=80&w=1332&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Interface Design",
    description:
      "Clear, functional interfaces designed for usability and focus.",
    icon: LayoutTemplate,
    backgroundImage:
      "https://images.unsplash.com/photo-1697898783543-18651b0db28f?q=80&w=1332&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Content Architecture",
    description:
      "Well-organized content structures that make information easy to navigate and maintain.",
    icon: Database,
    backgroundImage:
      "https://images.unsplash.com/photo-1699343481899-b20bd561c64e?q=80&w=1332&auto=format&fit=crop",
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className=" py-24 md:py-32 border-b border-border"
    >
      <Container>
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-micro mb-4 block">{header.subtitle}</span>
          <h2 className="max-w-4xl">{header.title}</h2>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        {/* Grid Definition:
            - Mobile: 1 Kolom (grid-cols-1).
            - Desktop: 3 Kolom (grid-cols-3). 
            - auto-rows-fr: Agar tinggi baris otomatis menyesuaikan isi.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:auto-rows-[1fr]">
          {items.map((item, index) => {
            const IconComponent = item.icon;

            // LOGIC BENTO:
            // Item pertama (index 0) -> Ambil kolom 1, tapi Span 2 Baris ke bawah (Vertikal).
            // Item sisanya -> Ambil kolom 2 & 3 (Horizontal/Lebar).
            const isFirstItem = index === 0;

            return (
              <Card
                key={item.id}
                className={cn(
                  "group relative overflow-hidden flex flex-col justify-center",
                  // Tinggi minimal card agar tidak gepeng
                  "min-h-70",
                  // BENTO LOGIC:
                  isFirstItem
                    ? "lg:col-span-2 lg:row-span-2" // Kiri Vertikal
                    : "lg:col-span-3" // Kanan Horizontal
                )}
              >
                {/* 1. BACKGROUND IMAGE */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={item.backgroundImage}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* 2. DARK OVERLAY */}
                {/* Dibuat agak gelap (black/70) agar teks putih contrast */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />

                {/* 3. CONTENT WRAPPER (CENTERED) */}
                <div className="relative z-10 w-full p-8 md:p-12 flex flex-col items-center text-center h-full justify-center">
                  {/* ICON */}
                  {/* <div className="mb-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <IconComponent
                        strokeWidth={1.5}
                        className="w-6 h-6 md:w-8 md:h-8"
                      />
                    </div>
                  </div> */}

                  {/* JUDUL */}
                  <h3 className=" mb-3">{item.name}</h3>

                  {/* DESKRIPSI */}
                  <p className="mt-0 max-w-sm">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
