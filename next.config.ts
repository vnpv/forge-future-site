import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  async headers() {
    // Дашборд MIDGARD (app/midgard/route.ts) — не індексувати
    return [
      { source: "/midgard", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // CV Івана — доступне за прямим посиланням, не індексувати
      { source: "/ivan-pervoi-cv.pdf", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
