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
    // Vercel bills a transformation on every cache miss *or* stale revalidation.
    // The 4-hour default meant each variant was re-billed up to six times a day.
    minimumCacheTTL: 2678400, // 31 days
    // Nothing on the site is displayed wider than the 900px hero, so the
    // 1920/2048/3840 defaults only ever bought us bigger bills.
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
};

export default nextConfig;
