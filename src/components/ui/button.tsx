import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // BASE STYLES:
  // 1. Hapus 'text-sm' dari sini.
  // 2. Tambahkan 'tracking-tight' agar sesuai dengan font Satoshi.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm", // Tambah shadow-sm
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // SM: Kecil, padat. Cocok untuk tabel/filter.
        sm: "h-8 px-3 text-xs",

        // DEFAULT: Standar Industri.
        // h-9 (36px) atau h-10 (40px) dengan text-sm (14px).
        // Ini ukuran paling 'aman' dan tidak mendominasi.
        default: "h-10 px-5 py-2 text-sm",

        // LG: Untuk Hero Section.
        // Tinggi h-12 (48px) sudah cukup besar untuk jari jempol (mobile friendly).
        // Font CUKUP text-sm (14px) atau text-base (16px).
        // Jangan 18px, nanti norak.
        lg: "h-12 px-8 text-sm md:text-base font-medium",

        // ICON SIZES
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
