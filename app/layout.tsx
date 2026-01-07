// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Interalchemy Rewilding",
    template: "%s | Interalchemy Rewilding",
  },
  description:
    "Interalchemy Rewilding Specialists — nature-based retreats and rewilding experiences in the Peruvian High Amazon.",
  metadataBase: new URL("https://interalchemy.vercel.app"),
  openGraph: {
    title: "Interalchemy Rewilding",
    description:
      "Rewilding retreats in the Peruvian High Amazon — Jan 26–31, 2026. All prices in USD.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
