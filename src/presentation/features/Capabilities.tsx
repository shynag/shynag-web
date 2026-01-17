"use client";

import { Container } from "@presentation/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@presentation/components/ui/accordion";
import { AppWindow, Frame, Image } from "lucide-react";

// --- DATA ---
const header = {
  subtitle: "Areas of Focus",
  title: "Built around clarity.",
  description:
    "Our approach is rooted in structure. We strip away the non-essential to build systems that scale.",
};

const items = [
  {
    id: "item-1", // ID string untuk value accordion
    name: "System Architecture",
    description:
      "Scalable front-end architectures designed to support complex business workflows. We treat code as a long-term asset, ensuring your platform remains maintainable as your business grows.",
    icon: AppWindow, // Icon Lucide
  },
  {
    id: "item-2",
    name: "Interface Design",
    description:
      "Functional aesthetics. We prioritize usability patterns that guide users naturally. We remove decorative fluff and focus purely on clarity, interaction, and conversion.",
    icon: Frame,
  },
  {
    id: "item-3",
    name: "Content Strategy",
    description:
      "Information architecture that makes sense. We structure your data logically so your audience finds exactly what they need, exactly when they need it, without dead ends.",
    icon: Image,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32">
      <Container>
        {/* --- 1. HEADER (ATAS) --- */}
        <div className="flex flex-col items-center text-center gap-6 mb-16 md:mb-24 max-w-3xl mx-auto">
          {/* Ganti text-micro dengan raw tailwind */}
          <span className="text-micro">{header.subtitle}</span>
          <h2>{header.title}</h2>
        </div>

        {/* --- 2. ACCORDION LIST (BAWAH) --- */}
        <div className="w-full max-w-4xl mx-auto">
          {/* defaultValue="item-1" -> Item pertama otomatis terbuka */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-border border-b last:border-b-0"
                >
                  {/* TRIGGER */}
                  <AccordionTrigger className="py-8 hover:no-underline group text-left">
                    <div className="flex items-center gap-6 md:gap-8">
                      {/* 1. ICON (Ganti Index Number) */}
                      <div className="text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>

                      {/* 2. JUDUL */}
                      <h3>{item.name}</h3>
                    </div>
                  </AccordionTrigger>

                  {/* CONTENT */}
                  <AccordionContent>
                    {/* Indentasi disesuaikan dengan lebar icon+gap agar lurus dengan judul */}
                    <div className="pl-0 md:pl-[3.5rem] pr-0 md:pr-12 pb-8">
                      <p>{item.description}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
