import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/for-parents",
    "/blog",
    "/blog/yak-zarobyty-pidlitku-v-ukraini",
    "/events",
    "/program",
    "/about",
    "/faq",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/for-parents"
          ? 0.95
          : path === "/events"
            ? 0.9
            : 0.85,
  }));
}
