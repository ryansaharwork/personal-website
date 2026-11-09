import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The app was renamed from Valt to PolyValt: keep old links working.
  async redirects() {
    return [{ source: "/projects/valt", destination: "/projects/polyvalt", permanent: true }];
  },
};

export default nextConfig;
