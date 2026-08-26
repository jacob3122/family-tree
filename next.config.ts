import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/family-tree",
  assetPrefix: "/family-tree/",
};

export default nextConfig;