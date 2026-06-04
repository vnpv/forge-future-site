import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "../../components/Section";
import Container from "../../components/Container";
import TelegramCta from "../../components/TelegramCta";
import { blogPosts, getPost } from "@/lib/blog";
import { nextOpenEvening, venue } from "@/lib/content";
import { pageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

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

function ArticleBody() {
  return (
    <div className="prose-ff mx-auto max-w-2xl space-y-6 text-[#9CA3AF] leading-relaxed">
      <p className="text-lg text-[#d1d5db]">
        Я заробив перший мільйон у 36. Хочу, щоб ти зробив свій перший крок
        раніше. Не «коли виростеш», а з того, що вже можеш сьогодні.
      </p>

      <h2 className="text-xl font-bold text-white">Чому це реально зараз</h2>
      <p>
        Ринок змінився. Тобі не потрібен офіс і диплом, щоб продати послугу,
        змонтувати відео, написати текст або допомогти бізнесу в районі.
        Клієнти часто в твоєму Telegram, школі, дворі. Перший заробіток це не
        про масштаб, а про досвід: ти зробив, отримав гроші, зрозумів цикл.
      </p>

      <h2 className="text-xl font-bold text-white">5 способів, які працюють</h2>

      <h3 className="text-lg font-semibold text-[#e8951a]">1. Контент і соцмережі</h3>
      <p>
        Монтаж, обкладинки, короткі відео, ведення сторінки для малого бізнесу.
        Почни з одного клієнта з оточення: «зроблю 3 reels за тиждень». Покажи
        приклад, навіть якщо це твій акаунт.
      </p>

      <h3 className="text-lg font-semibold text-[#e8951a]">2. Фріланс</h3>
      <p>
        Дизайн, тексти, простий код, переклад. Шукай у Telegram-каналах з
        вакансіями, пиши 5 людям напряму, не чекай ідеального портфоліо. Перше
        замовлення часто від знайомого знайомого.
      </p>

      <h3 className="text-lg font-semibold text-[#e8951a]">3. Навчання молодших</h3>
      <p>
        Предмет, у якому ти сильний: математика, англійська, гітара. Формат:
        2–3 учні, фіксований час, чесна ціна. Це вже бізнес: ти відповідаєш за
        результат.
      </p>

      <h3 className="text-lg font-semibold text-[#e8951a]">4. Свій маленький продукт</h3>
      <p>
        Наліпки, мерч, цифровий шаблон, послуга «налаштую телефон». Головне:
        хтось заплатив, не лише сказав «круто».
      </p>

      <h3 className="text-lg font-semibold text-[#e8951a]">5. Допомога бізнесу поруч</h3>
      <p>
        Кав&apos;ярня, салон, батьківський знайомий. Запропонуй конкретику:
        вести Instagram, збирати відгуки, тестувати ідею. Один кейс у 15 років
        важить більше, ніж десять сертифікатів.
      </p>

      <h2 className="text-xl font-bold text-white">Що заважає (і відповіді)</h2>
      <ul className="list-inside list-disc space-y-2">
        <li>
          <strong className="text-white">«Мені не дозволять»</strong> — почни з
          малого, покажи результат батькам цифрами.
        </li>
        <li>
          <strong className="text-white">«Ще рано»</strong> — рано лише не робити
          нічого.
        </li>
        <li>
          <strong className="text-white">«Немає часу»</strong> — 3 години на
          тиждень на один проєкт достатньо для старту.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white">Перший крок сьогодні</h2>
      <p>
        Запиши одну послугу, яку можеш дати завтра. Одне ім&apos;я, кому напишеш.
        Одну ціну. Не чекай ідеальної ідеї.
      </p>
      <p>
        Якщо хочеш середовище, де це роблять разом з однолітками і без формату
        «уроку» — приходь на відкритий вечір Forge Future:{" "}
        {nextOpenEvening.scheduleLine}, {venue.label}.
      </p>

      <h2 className="text-xl font-bold text-white">Часті питання</h2>
      <dl className="space-y-4">
        <div>
          <dt className="font-semibold text-white">З якого віку можна заробляти?</dt>
          <dd className="mt-1">Формально з 14 багато сервісів дозволяють; практично з 10–12 можна вже продавати послуги в оточенні з согласом батьків.</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Скільки можна заробити підлітку?</dt>
          <dd className="mt-1">Перші 500–3000 грн на місяць реальні при 3–5 годинах на тиждень. Далі залежить від навички і постійності.</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Чи потрібен ФОП?</dt>
          <dd className="mt-1">На старті часто достатньо домовленості з батьками; коли зростає оборот — обговоріть з дорослим.</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Де розвивати свій проєкт?</dt>
          <dd className="mt-1">
            На практиці: відкриті вечори Forge Future, потім 6-тижнева програма від
            ідеї до демо-дня.
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
              Наступний відкритий вечір: {nextOpenEvening.scheduleLine},{" "}
              {nextOpenEvening.location}.
            </p>
            <TelegramCta location="blog_article">Записатись на вечір →</TelegramCta>
          </div>
        </Container>
      </Section>
    </>
  );
}
