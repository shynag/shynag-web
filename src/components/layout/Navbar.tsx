"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label: segment,
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    // STEP 1: Hapus 'h-...', Hapus 'flex items-center'.
    // Biarkan header ini perilakunya block biasa.
    <header className="w-full h-16 flex items-center border-b border-border/40">
      {/* STEP 2: KONTROL PADDING DI SINI
          - py-8: Jarak atas bawah TEGAS (32px). Total tinggi akan otomatis menyesuaikan.
          - block: Pastikan div ini display block.
      */}
      <div className="mx-auto block w-full max-w-2xl px-6 sm:px-0">
        <Breadcrumb>
          <BreadcrumbList className="sm:gap-2">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <Fragment key={item.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-base text-foreground">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && (
                    <BreadcrumbSeparator>
                      {/* Slash kita kecilkan sedikit dan tipiskan agar elegan */}
                      <Slash className="h-3 w-3 text-muted-foreground/30 -rotate-12" />
                    </BreadcrumbSeparator>
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
