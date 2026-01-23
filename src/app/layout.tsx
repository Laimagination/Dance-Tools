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
  title: "AI for Dance Studios | Automation That Saves You Time",
  description: "AI-powered automation for dance studios. Scheduling, student retention, revenue optimization, marketing, and parent communication - all automated so you can focus on teaching.",
  keywords: ["dance studio automation", "AI scheduling", "studio management", "MindBody integration", "student retention", "dance studio software"],
  openGraph: {
    title: "AI for Dance Studios",
    description: "Stop running your studio. Start growing it. AI automation that handles scheduling, retention, and operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
