import { cn } from "@/presentation/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  container?: boolean; // Opsi: apakah konten mau dibungkus container otomatis?
  background?: "default" | "muted" | "primary" | "none";
}

export function Section({
  children,
  className,
  container = true,
  background = "default",
  ...props
}: SectionProps) {
  // Logic Background Color
  const bgStyles = {
    default: "bg-background text-foreground",
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary text-primary-foreground",
    none: "",
  };

  const Content = container ? <Container>{children}</Container> : children;

  return (
    <section
      className={cn(
        "py-16 md:py-24 h-full", // Standar Spacing Vectris
        bgStyles[background],
        className
      )}
      {...props}
    >
      {Content}
    </section>
  );
}
