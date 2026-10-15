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
  as?: ElementType; // Accepts elements such as "h1", "h2", "p", or "div".
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  as: Tag = "p", // Defaults to "p".
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
    // The outer scroll-track wrapper only needs layout styles.
    <div ref={targetRef} className="relative z-0 h-[300vh]">
      <div
        className={
          "sticky top-0 mx-auto flex h-screen items-center bg-transparent"
        }
      >
        {/* Use the dynamic tag and apply the provided typography classes to the text element. */}
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
