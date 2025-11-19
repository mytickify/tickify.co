import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApolloProviderWrapper } from "@/providers/apollo";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Tickify",
  description: "Tickify is a platform that helps you create and manage events and pages easily.",
  openGraph: {
    title: "Tickify",
    description: "Tickify is a platform that helps you create and manage events and pages easily.",
    images: [{ url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600", width: 1600, height: 900 }],
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
        <ApolloProviderWrapper>
          {children}
          <Toaster />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
