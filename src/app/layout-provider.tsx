"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKeystatic = pathname ? pathname.startsWith("/keystatic") : false;

  return isKeystatic ? (
    <>{children}</>
  ) : (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-0 py-8 sm:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
