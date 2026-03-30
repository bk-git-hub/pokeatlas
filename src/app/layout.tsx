import type { Metadata } from "next";
import { TeamBuilderProvider } from "@/components/team-builder/team-builder-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokeAtlas",
  description:
    "PokeAtlas is a polished PokeAPI explorer for browsing, comparing, and planning stronger Pokemon teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full">
        <TeamBuilderProvider>{children}</TeamBuilderProvider>
      </body>
    </html>
  );
}
