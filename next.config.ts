import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>/, so the base path is injected
// at build time by the deploy workflow. Root sites (username.github.io) build
// with an empty base path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export → hostable on GitHub Pages (no Node runtime).
  output: "export",
  basePath,
  // Emit /route/index.html so GitHub Pages resolves directories reliably.
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
