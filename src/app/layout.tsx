import { env } from "@/lib/env";
import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "@config";
import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import { LayoutProvider } from "./layout-provider";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader(process.cwd(), config);
  const identity = await reader.singletons.identity.read();

  if (!identity) {
    return {
      title: "Vectris Studio",
    };
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: identity.name,
      template: `%s | ${identity.name}`,
    },
    description: identity.description,
    icons: {
      icon: identity.favicon || "/favicon.ico",
    },
    openGraph: {
      images: identity.coverImage ? [identity.coverImage] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
