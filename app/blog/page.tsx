import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import { blogPosts } from "@/lib/blog";
import { pageContext, schoolOfFutureDiamonds } from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
  alternates: pageAlternates("/blog"),
};

export default function BlogPage() {
  return (
    <>
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.blog.h1}
          subtitle={pageSeo.blog.subtitle}
        />
        <Container className="mt-4">
          <SchoolConceptStrip pageHint={pageContext.blog} />
        </Container>
      </Section>
      <Section spacing="content" className="bg-[#111111]">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Card bordered className="flex h-full flex-col gap-3">
                  <p className="text-xs text-[#9CA3AF]">
                    {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {post.readMinutes} хв
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#e8951a]"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="flex-1 text-sm text-[#9CA3AF]">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-[#e8951a] hover:underline"
                  >
                    Читати →
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
