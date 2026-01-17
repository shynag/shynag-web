"use client";

import { Marquee } from "@presentation/components/ui/marquee";
import { Motion as MotionLogo } from "@presentation/components/ui/svgs/Motion";
import { Nextjs as NextLogo } from "@presentation/components/ui/svgs/Next";
import { TailwindCSS as TailwindLogo } from "@presentation/components/ui/svgs/Tailwind";
import { Vercel as VercelLogo } from "@presentation/components/ui/svgs/Vercel";
import { Container } from "@presentation/components/layout/Container";

const logos = [
  { Component: TailwindLogo },
  { Component: NextLogo },
  { Component: VercelLogo },
  { Component: MotionLogo },
];

export function BrandMarquee() {
  return (
    // Padding dikurangi sedikit (py-16 atau py-20) biar ga terlalu boros tempat
    // karena isinya cuma logo baris.
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8 md:gap-10">
          {/* --- HEADER: MICRO LABEL --- */}
          {/* Penempatan di tengah, uppercase, letter-spacing luas. 
              Ini menegaskan bahwa ini adalah "Stack" atau "Foundation". */}
          <div className="flex justify-center">
            <span className="text-micro">Powered by modern infrastructure</span>
          </div>

          {/* --- CONTENT: MARQUEE --- */}
          <div className="relative overflow-hidden w-full mx-auto">
            <Marquee className="[--gap:3rem]">
              {logos.map(({ Component }, index) => (
                <div
                  key={index}
                  className="mx-2 md:mx-4 flex items-center justify-center"
                >
                  {/* Logo dibuat grayscale dulu biar ga 'teriak', pas hover baru berwarna (opsional) */}
                  <Component className="h-6 md:h-8 w-auto text-foreground fill-current" />
                </div>
              ))}
            </Marquee>

            {/* Gradient Fade - Overlay pinggir biar mulus */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
