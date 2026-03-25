import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PokeAtlas",
    template: "%s | PokeAtlas",
  },
  description:
    "PokeAtlas is a polished Pokemon home base for browsing the roster, comparing contenders, and planning better teams.",
  openGraph: {
    title: "PokeAtlas",
    description:
      "Browse, compare, and plan Pokemon teams from a single focused home experience.",
    siteName: "PokeAtlas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeAtlas",
    description:
      "Browse, compare, and plan Pokemon teams from a single focused home experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
