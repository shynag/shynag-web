import * as React from "react";
import { cn } from "@presentation/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto w-full px-6", className)}>
      {children}
    </div>
  );
}
