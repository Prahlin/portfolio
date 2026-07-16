import type { Metadata, Viewport } from "next";
import { ScreenshotPreviewLayer } from "./ScreenshotPreviewLayer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prahlin.dev",
  ),
  title: "Prahlin | React Native Full-Stack Mobile Developer",
  description:
    "Portfolio for Prahlin, a React Native full-stack mobile developer building polished mobile apps, secure checkout flows, and production-ready Android pipelines.",
  openGraph: {
    title: "Prahlin | React Native Full-Stack Mobile Developer",
    description:
      "React Native, Next.js, Tailwind CSS, Node.js, and Kotlin mobile portfolio.",
    images: ["/images/start-page-mockup-reference.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScreenshotPreviewLayer />
      </body>
    </html>
  );
}
