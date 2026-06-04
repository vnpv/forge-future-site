export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "yak-zarobyty-pidlitku-v-ukraini",
    title: "Як заробити підлітку в Україні у 2026",
    description:
      "Реальні способи заробітку без «чекай повноліття»: від контенту до першого клієнта. Без води, від практика.",
    publishedAt: "2026-05-22",
    readMinutes: 8,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
