import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Talk images are arbitrary URLs admins paste in — allow any HTTPS host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
