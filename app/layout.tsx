import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiavv-Inuzuka",
  description: "Découvrez l'histoire de Raiga Inuzuka, ninja de Konoha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
        <AudioPlayer />
        <Analytics />
      </body>
    </html>
  );
}
