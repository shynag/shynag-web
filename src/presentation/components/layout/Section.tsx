import * as React from "react";
import { cn } from "@presentation/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: ContainerProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>{children}</section>
  );
}
