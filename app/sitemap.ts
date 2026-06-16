import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

// Стабільна дата останнього змістового оновлення статичних сторінок.
// Бампати вручну лише коли реально змінюється контент сторінки —
// інакше lastmod = час білда, і Google перестає довіряти сигналу свіжості.
const STATIC_LAST_MODIFIED = new Date("2026-06-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/for-parents",
    "/blog",
    "/events",
    "/program",
    "/about",
    "/faq",
  ];

  const priorityFor = (path: string) =>
    path === ""
      ? 1
      : path === "/for-parents"
        ? 0.95
        : path === "/events"
          ? 0.9
          : 0.85;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));

  const postEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticEntries, ...postEntries];
}
