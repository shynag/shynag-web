import { getEnv } from "@/lib/env";
import type { Metadata } from "next";
import { getKeystaticReader } from "@/lib/keystatic";
import "@/styles/globals.css";
import { Inter, Newsreader } from "next/font/google";
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
  const reader = getKeystaticReader();
  const identity = await reader.singletons.identity.read();

  if (!identity) {
    return {
      title: "Vectris Studio",
    };
  }

  // getEnv may throw if required env vars are missing; catch so metadata
  // generation still yields reasonable defaults.
  let metadataBase: URL | undefined;
  try {
    const env = getEnv();
    metadataBase = new URL(env.NEXT_PUBLIC_SITE_URL);
  } catch (err) {
    // If env isn't set or invalid, we don't block rendering metadata.
    // Keep metadataBase undefined so Next uses defaults. Log a warning
    // to make debugging easier.
    console.warn("generateMetadata: failed to read env", err);
  }

  return {
    ...(metadataBase ? { metadataBase } : {}),
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
        className={`${fontSans.variable} ${fontHeading.variable} ${fontItalic.variable} ${fontSans.className} flex flex-col min-h-screen`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
