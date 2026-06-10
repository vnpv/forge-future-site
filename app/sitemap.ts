import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/for-parents",
    "/blog",
    ...blogPosts.map((p) => `/blog/${p.slug}`),
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
