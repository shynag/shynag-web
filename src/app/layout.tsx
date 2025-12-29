import { env } from "@core/env";
import type { Metadata } from "next";
import { getGlobalSiteData } from "@modules/site/service";
import "@presentation/styles/globals.css";
import { fontSans } from "@presentation/themes/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const { identity } = await getGlobalSiteData();

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
      <body className={fontSans.className}>{children}</body>
    </html>
  );
}
