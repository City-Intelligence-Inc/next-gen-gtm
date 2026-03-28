import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Stardrop — Next-Gen GTM Intelligence",
  description:
    "Tag @stardroplin on X and get actionable GTM intelligence powered by AI. Competitive analysis, ICP generation, signal detection, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} font-sans bg-white text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
