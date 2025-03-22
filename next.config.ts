import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "public.boxcloud.com",
        port: "", // Leave empty unless a specific port is required
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
