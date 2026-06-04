import type { Metadata } from "next";
import { SITE_URL } from "./site";

/** canonical + hreflang uk / x-default для кожної сторінки */
export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url =
    normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
  return {
    canonical: normalized === "/" ? "/" : normalized,
    languages: {
      uk: url,
      "x-default": url,
    },
  };
}
