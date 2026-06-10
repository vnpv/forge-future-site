import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "../../components/Section";
import Container from "../../components/Container";
import TelegramCta from "../../components/TelegramCta";
import { blogPosts, getPost } from "@/lib/blog";
import { pageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { articleBodies } from "./articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: pageAlternates(`/blog/${slug}`),
    openGraph: { title: post.title, description: post.description, url: `${SITE_URL}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const ArticleBody = articleBodies[slug];
  if (!post || !ArticleBody) notFound();

  return (
    <>
      <Section spacing="hero">
        <Container>
          <Link href="/blog" className="text-sm text-[#9CA3AF] hover:text-white">
            ← Блог
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[#9CA3AF]">
            {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readMinutes} хв читання
          </p>
        </Container>
      </Section>
      <Section spacing="end" className="bg-[#111111]">
        <Container>
          <ArticleBody />
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#e8951a]/30 bg-[#e8951a]/5 p-6">
            <p className="mb-4 text-sm text-[#9CA3AF]">
              Дати відкритих вечорів і набір потоку анонсуємо в Telegram.
              Залиши заявку — повідомимо першим.
            </p>
            <TelegramCta location="blog_article">Залишити заявку →</TelegramCta>
          </div>
        </Container>
      </Section>
    </>
  );
}
