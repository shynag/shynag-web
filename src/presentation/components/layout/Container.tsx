import { cn } from "@presentation/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType; // Bisa jadi div, section, header, dll
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", // Standar Responsive
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
