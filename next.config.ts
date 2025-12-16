import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static export for deployment to S3
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
