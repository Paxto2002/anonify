import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import NavbarWrapper from "@/components/NavbarWrapper"; // NEW: handles session logic

export const metadata: Metadata = {
  title: "Anonify",
  description: "Anonymous feedback and communication platform",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-900 to-black text-gray-200 min-h-screen flex flex-col">
        <SessionProviderWrapper>
          <NavbarWrapper />
          {children}
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
