import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapgroove - Beautiful Image Editor & Screenshot Tool",
  description:
    "Unlock your creative potential with Snapgroove, a free, all-in-one image styling tool. Transform screenshots with gradients, patterns, and effects directly in your browser. No sign-up, no watermarks.",
  keywords: [
    "image editor",
    "screenshot tool",
    "snapgroove",
    "background generator",
    "gradient tool",
    "browser based",
    "free image editor",
    "privacy focused",
    "no watermark",
    "social media graphics",
    "open graph generator",
    "image beautifier",
  ],
    authors: [
    {
      name: "Md Taqui Imam",
      url: "https://github.com/taqui-786",
    },
  ],
  creator: "Md Taqui Imam",
  openGraph: {
    title: "Snapgroove - Beautiful Image Editor & Screenshot Tool",
    description:
      "Transform your screenshots into stunning visuals with Snapgroove. Free, private, and runs entirely in your browser.",
    siteName: "Snapgroove",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapgroove - Beautiful Image Editor & Screenshot Tool",
    description:
      "Transform your screenshots into stunning visuals with Snapgroove. Free, private, and runs entirely in your browser.",
    images: ["/og-image.png"],
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
        <Toaster />
      </body>
    </html>
  );
}
