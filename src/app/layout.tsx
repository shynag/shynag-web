import { env } from "@/lib/env";
import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "@config";
import "@/styles/globals.css";
import { Montserrat, Inter, Newsreader } from "next/font/google";
import { LayoutProvider } from "./layout-provider";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontHeading = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const fontItalic = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-italic",
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
      <body
        className={`${fontSans.variable} ${fontHeading.variable} ${fontItalic.variable} ${fontSans.className}`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
