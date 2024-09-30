import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Italiana } from "next/font/google";

import "./globals.css";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/navigation/HomeButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const space = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teaser Festival 2025",
  description: "Teaser Festival in New Orleans, January, 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space.className}>
        <div className="flex items-center justify-between m-4 z-50 ">
          <div className="flex items-center justify-between gap-2 m-4 z-50 ">
            <BackButton />
            <HomeButton />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
