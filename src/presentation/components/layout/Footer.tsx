"use client";

import Link from "next/link";
import { Button } from "@presentation/components/ui/button";
import { Container } from "./Container";
import { Instagram } from "lucide-react"; // Linkedin saya tambahkan karena ada di import awal
import { Marquee } from "../ui/marquee";

// --- 1. DATA CONFIGURATION (Ubah-ubah di sini) ---
const footerData = {
  marqueeText: "Vectris Studio —",
  cta: {
    // Gunakan array untuk baris baru (tiap item = 1 baris)
    headline: ["Plan the present.", "Build the future."],
    button: { label: "Start Project", href: "https://wa.me/6285117812864" },
  },
  columns: {
    location: {
      label: "Location",
      // Array baris alamat
      addressLines: ["Wedomartani, Sleman", "Daerah Istimewa Yogyakarta 55584"],
    },
    inquiries: {
      label: "Inquiries",
      email: "contact@vectris.web.id",
      phone: {
        display: "+62 851 1781 2864",
        href: "https://wa.me/6285117812864", // Link WhatsApp
      },
    },
    socials: {
      label: "Connect",
      items: [
        {
          label: "Instagram",
          href: "https://www.instagram.com/vectris.studio",
          icon: Instagram,
        },
      ],
    },
  },
  legal: {
    copyrightName: "Vectris Studio",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

// --- 2. COMPONENTS ---
const FooterCurve = () => (
  <div
    className="absolute bottom-full left-0 w-full h-[100px] md:h-[200px] pointer-events-none z-20"
    aria-hidden="true"
  >
    <svg
      className="w-full h-full fill-black"
      preserveAspectRatio="none"
      viewBox="0 0 1440 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M -360,200 Q 720,0 1800,200 Z" />
    </svg>
  </div>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-48 md:mt-80">
      {/* MARQUEE LAYER */}
      <div className="absolute bottom-full left-0 w-full mb-16 md:mb-32 z-0">
        <Marquee className="py-4">
          <span className="text-8xl md:text-[10rem] font-bold uppercase text-muted-foreground/10 whitespace-nowrap">
            {footerData.marqueeText}
          </span>
        </Marquee>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative z-10 bg-black min-h-screen flex flex-col">
        <FooterCurve />

        <Container className="flex-1 flex flex-col justify-between py-12 md:py-16">
          {/* --- TOP: CTA SECTION --- */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <h2 className="text-white">
              {footerData.cta.headline.map((line, index) => (
                <span key={index}>
                  {line}
                  {/* Tambahkan <br/> jika bukan baris terakhir */}
                  {index < footerData.cta.headline.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <Button asChild size="lg">
              <Link href={footerData.cta.button.href}>
                {footerData.cta.button.label}
              </Link>
            </Button>
          </div>

          {/* --- BOTTOM GROUP (Data Grid + Copyright) --- */}
          <div className="flex flex-col gap-12 mt-12 md:mt-0">
            {/* 1. DATA GRID (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
              {/* COL 1: OFFICE */}
              <div className="flex flex-col gap-6">
                <span className="text-micro">
                  {footerData.columns.location.label}
                </span>
                <address className="not-italic text-base text-white/80">
                  {footerData.columns.location.addressLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              {/* COL 2: INQUIRIES */}
              <div className="flex flex-col gap-6">
                <span className="text-micro">
                  {footerData.columns.inquiries.label}
                </span>
                <div className="flex flex-col gap-1">
                  <a
                    href={`mailto:${footerData.columns.inquiries.email}`}
                    className="text-base text-white/80 hover:text-white transition-colors w-fit"
                  >
                    {footerData.columns.inquiries.email}
                  </a>
                  <a
                    href={footerData.columns.inquiries.phone.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white/80 hover:text-white transition-colors w-fit"
                  >
                    {footerData.columns.inquiries.phone.display}
                  </a>
                </div>
              </div>

              {/* COL 3: SOCIALS */}
              <div className="flex flex-col gap-6 md:items-end">
                <span className="text-micro">
                  {footerData.columns.socials.label}
                </span>
                <div className="flex gap-3">
                  {footerData.columns.socials.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={i}
                        href={item.href}
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                        aria-label={item.label}
                      >
                        <Icon strokeWidth={1.5} className="w-5 h-5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. BOTTOM BAR (Copyright) */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 md:gap-0">
              <span className="text-white/30 text-xs">
                &copy; {currentYear} {footerData.legal.copyrightName}. All
                rights reserved.
              </span>
              <div className="flex gap-6">
                {footerData.legal.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
