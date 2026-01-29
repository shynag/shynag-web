"use client";

import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  ReactNode,
  useRef,
} from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. Tambahkan prop 'as' ke interface
export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  as?: ElementType; // Bisa diisi "h1", "h2", "p", "div", dll.
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  as: Tag = "p", // Default-nya adalah 'p' jika tidak diisi
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    // Wrapper luar (Track Scroll) tidak perlu className typography
    // Cukup logic layout (h-[300vh]) saja.
    <div ref={targetRef} className="relative z-0 h-[300vh]">
      <div
        className={
          "sticky top-0 mx-auto flex h-screen items-center bg-transparent"
        }
      >
        {/* Hapus wrapper 'max-w-2xl' agar width-nya diatur lewat className dari luar */}

        {/* 2. Gunakan 'Tag' dinamis di sini */}
        {/* className dari props ditempel di sini agar typography masuk ke element text */}
        <Tag className={cn("flex flex-wrap text-foreground", className)}>
          {words.map((word, i) => {
            const gradientLength = 5;
            const step = 1 / (words.length + gradientLength - 1);
            const start = i * step;
            const end = start + step * gradientLength;

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </Tag>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-[0.3em] inline-block">
      <span className="absolute opacity-0">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-foreground inline-block"}
      >
        {children}
      </motion.span>
    </span>
  );
};
