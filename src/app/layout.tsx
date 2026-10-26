import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { FlameBorders } from "@/components/layout/flame-borders";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" as="image" href="/images/candles-study.webp" fetchPriority="high" />
      </head>
      <body className={manrope.variable}>
        <FlameBorders />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
