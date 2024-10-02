import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Italiana } from "next/font/google";

import "./globals.css";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/navigation/HomeButton";
// import Header from "@/components/shared/Header";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { LuMail } from "react-icons/lu";
import Header from "@/components/navigation/Header";

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
    <ClerkProvider>
      <html lang="en">
        <body className={space.className}>
          <div className="sticky top-0 border-b border-b-black bg-[#FFF0F0] mb-4 z-50">
            <Header />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
