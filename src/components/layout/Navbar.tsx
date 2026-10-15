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
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter((item) => item !== "");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label: segment,
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    // Keep the header as a regular block; avoid fixed height and flex alignment.
    <header className="w-full h-16 flex items-center border-b border-border/40">
      {/* Control the vertical spacing here with padding; let the height adjust naturally.
          Keep this div as a block element.
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
                      {/* Slightly reduce the slash size and weight for a cleaner look. */}
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
