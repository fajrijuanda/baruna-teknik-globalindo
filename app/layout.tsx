import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { WAFloating } from "@/components/shared/wa-floating";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://barunateknik.com"),
  title: {
    default: "PT Baruna Teknik Globalindo - Industrial & Mechanical Solutions",
    template: "%s | PT Baruna Teknik Globalindo"
  },
  description: "Specializing in industrial pumps, mechanical seals, and engineering solutions. Trusted partner for high-quality industrial equipment and services in Indonesia.",
  keywords: ["Industrial Pumps", "Mechanical Seals", "Centrifugal Pumps", "Engineering Solutions", "Baruna Teknik", "Indonesia Industrial Supplier", "Pump Maintenance"],
  authors: [{ name: "PT Baruna Teknik Globalindo" }],
  creator: "PT Baruna Teknik Globalindo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://barunateknik.com",
    title: "PT Baruna Teknik Globalindo",
    description: "Leading provider of industrial pumps and mechanical engineering services.",
    siteName: "PT Baruna Teknik Globalindo",
    images: [
      {
        url: "/images/og-image.jpg", // We need to make sure this exists or use a default
        width: 1200,
        height: 630,
        alt: "PT Baruna Teknik Globalindo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Baruna Teknik Globalindo",
    description: "Industrial & Mechanical Solutions Provider",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

import { LanguageProvider } from "@/components/providers/language-provider";
import { RouteTransitionLoader } from "@/components/providers/route-transition-loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased font-sans overflow-x-hidden`}
      >
        <LanguageProvider>
          <Suspense fallback={null}>
            <RouteTransitionLoader />
          </Suspense>
          {children}
          <WAFloating />
        </LanguageProvider>
      </body>
    </html>
  );
}
