import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";
import { ScreenshotPreviewLayer } from "./ScreenshotPreviewLayer";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-eb-garamond",
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prahl.dev",
  ),
  title: "Prahl.dev | React Native Full Stack Mobile Developer",
  description:
    "Portfolio for Prahl.dev, a React Native full stack mobile developer building polished mobile apps, secure checkout flows, and production-ready Android pipelines.",
  openGraph: {
    title: "Prahl.dev | React Native Full Stack Mobile Developer",
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
      <body className={ebGaramond.variable}>
        {children}
        <ScreenshotPreviewLayer />
      </body>
    </html>
  );
}
