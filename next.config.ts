import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  output: isStaticExport ? "export" : undefined,
  images: {
    unoptimized: isStaticExport,
  },
  trailingSlash: isStaticExport,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
