import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://d2ibu2ug0mt5qp.cloudfront.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:", // Already correct for images
              "font-src 'self'",
              `connect-src 'self' data: https://liff.line.me ${
                isDev ? "ws://localhost:3000" : ""
              }`, // Allow data: URLs and LIFF domains
            ].join("; "),
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
