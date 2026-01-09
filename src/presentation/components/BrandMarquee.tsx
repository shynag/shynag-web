"use client";

import { Marquee } from "./ui/marquee";
import { Motion as MotionLogo } from "./ui/svgs/Motion";
import { Nextjs as NextLogo } from "./ui/svgs/Next";
import { TailwindCSS as TailwindLogo } from "./ui/svgs/Tailwind";
import { Vercel as VercelLogo } from "./ui/svgs/Vercel";

const logos = [
  { Component: TailwindLogo },
  { Component: NextLogo },
  { Component: VercelLogo },
  { Component: MotionLogo },
];

export function BrandMarquee() {
  return (
    <div className="relative overflow-hidden">
      <Marquee pauseOnHover>
        {logos.map(({ Component }, index) => (
          <div key={index} className="mx-4 md:mx-6">
            <Component className="h-4 md:h-6" />
          </div>
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
}
