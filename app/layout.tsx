import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@/components/Analytics";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Angebote für Handwerksbetriebe`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: siteConfig.name,
    title: `${siteConfig.name} – Angebote für Handwerksbetriebe`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – Angebote für Handwerksbetriebe`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Reading the nonce here is required for Next.js to thread it into the
  // script tags it renders for RSC hydration — without this call, the
  // middleware-issued CSP nonce is never applied and every inline/bootstrap
  // script is blocked. See middleware.ts for where the nonce originates.
  await headers();

  return (
    <html lang="de" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Analytics />
        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
