import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
  metadataBase: new URL("https://taqui-imam.vercel.app"),
  title: {
    default:
      "Snapgroove - Beautiful Image Editor & Screenshot Tool | by Taqui Imam",
    template: "%s | Snapgroove by Taqui Imam",
  },
  description:
    "Create stunning screenshots and images with Snapgroove - a free, privacy-focused image editor by Taqui Imam. Transform your visuals with gradients, patterns, frames, and effects, all in your browser. No sign-up, no watermarks, no downloads required.",
  keywords: [
    "image editor",
    "screenshot tool",
    "snapgroove",
    "taqui imam",
    "md taqui imam",
    "background generator",
    "gradient tool",
    "browser based editor",
    "free image editor",
    "privacy focused",
    "no watermark",
    "social media graphics",
    "open graph generator",
    "image beautifier",
    "screenshot beautifier",
    "online image editor",
    "web-based image tool",
    "frame generator",
    "pattern overlay",
    "image effects",
  ],
  authors: [
    {
      name: "Md Taqui Imam",
      url: "https://taqui-imam.vercel.app",
    },
    {
      name: "Md Taqui Imam",
      url: "https://github.com/taqui-786",
    },
  ],
  creator: "Md Taqui Imam",
  publisher: "Md Taqui Imam",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Snapgroove - Beautiful Image Editor & Screenshot Tool | by Taqui Imam",
    description:
      "Transform your screenshots into stunning visuals with Snapgroove. Free, privacy-focused, and runs entirely in your browser. Created by Taqui Imam.",
    url: "https://taqui-imam.vercel.app",
    siteName: "Snapgroove by Taqui Imam",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snapgroove - Beautiful Image Editor & Screenshot Tool by Taqui Imam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Snapgroove - Beautiful Image Editor & Screenshot Tool | by Taqui Imam",
    description:
      "Transform your screenshots into stunning visuals with Snapgroove. Free, privacy-focused, and runs entirely in your browser. Created by Taqui Imam.",
    creator: "@taqui_786",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://taqui-imam.vercel.app",
  },
  category: "technology",
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
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
