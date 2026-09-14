import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  async rewrites() {
    return [
      { source: "/studio", destination: "/studio.html" },
      { source: "/studio/", destination: "/studio.html" },
    ];
  },
};

export default nextConfig;
