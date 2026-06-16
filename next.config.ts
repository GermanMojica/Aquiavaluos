import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // keep edge runtime and modern builds enabled where supported; safe opt-ins
    // Note: check Next.js docs for your exact version if flags differ
    optimizeCss: true,
  }
};

export default nextConfig;
