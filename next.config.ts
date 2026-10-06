import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Демо-дашборд якості уроків (MIDGARD): статична сторінка з public/midgard
  async rewrites() {
    return [{ source: "/midgard", destination: "/midgard/index.html" }];
  },
  async headers() {
    return [{ source: "/midgard/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
            { source: "/midgard", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
