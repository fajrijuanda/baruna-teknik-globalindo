import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
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
  title: "PT BARUNA TEKNIK GLOBALINDO",
  description: "Official Website & Product Catalog",
};

import { LanguageProvider } from "@/components/providers/language-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased font-sans`}
      >
        <LanguageProvider>
          {children}
          <WAFloating />
        </LanguageProvider>
      </body>
    </html>
  );
}
