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
    "Tag @stardroplin on X and get competitive intel, ICP analysis, signal detection, and outbound copy in 60 seconds. Powered by AI + 60 pages of deep GTM research.",
  metadataBase: new URL("https://next-gen-gtm.vercel.app"),
  openGraph: {
    title: "Stardrop — Your GTM team just got smarter",
    description:
      "Tag @stardroplin on X with any GTM question. Get competitive intel, ICP analysis, and outbound copy in 60 seconds — free, no signup.",
    siteName: "Stardrop",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stardrop — Your GTM team just got smarter",
    description:
      "Tag @stardroplin on X with any GTM question. Get competitive intel, ICP analysis, and outbound copy in 60 seconds — free, no signup.",
    creator: "@arichoudhary",
  },
  icons: {
    icon: "/icon.svg",
  },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initScrollReveal(){
                document.documentElement.classList.add('scroll-animated');
                var obs = new IntersectionObserver(function(entries){
                  entries.forEach(function(e){
                    if(e.isIntersecting) {
                      e.target.classList.add('in-view');
                      obs.unobserve(e.target);
                    }
                  });
                }, {threshold: 0.08, rootMargin: '0px 0px 80px 0px'});
                document.querySelectorAll('.scroll-reveal,.scroll-reveal-left,.scroll-scale,.stagger-children').forEach(function(el){
                  obs.observe(el);
                });
              }
              if(document.readyState==='loading'){
                document.addEventListener('DOMContentLoaded',initScrollReveal);
              } else {
                initScrollReveal();
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
