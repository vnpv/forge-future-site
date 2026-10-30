import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { miniAppUrl } from "@/lib/telegram";
import { countClick } from "@/lib/track";
import { storageReady } from "@/app/focus/store";
import Redirect from "./Redirect";

export const metadata: Metadata = {
  title: "Що відбувається з вашим підлітком? 4 питання за хвилину",
  description: "Опитування для батьків підлітків 14-19 від Forge Future. Результат одразу, а далі можна записатися на безкоштовний розбір з Іваном Первой.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    title: "Що відбувається з вашим підлітком? 4 питання за хвилину",
    description: "Опитування для батьків підлітків 14-19 від Forge Future. Результат одразу, а далі можна записатися на безкоштовний розбір з Іваном Первой.",
  },
};

/**
 * Лінк партнера forge-future.com/s/<id>: у чаті виглядає як сторінка сайту (превʼю), а за кліком одразу відкриває Mini App
 * з рефом партнера. Якщо Telegram недоступний, лишається кнопка і запасний шлях через сайт.
 */
export default async function PartnerLink({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const clean = /^[a-z0-9]{1,16}$/.test(ref) ? ref : "";
  const tgUrl = miniAppUrl(clean || undefined);
  // Рахуємо справжні натискання: превʼю-боти месенджерів і пошукові роботи не рахуємо
  const ua = (await headers()).get("user-agent") ?? "";
  if (clean && storageReady() && ua && !/bot|crawl|spider|preview|facebookexternalhit|whatsapp|slack|embedly|vkshare|skype|curl|wget|python/i.test(ua)) {
    try {
      await countClick(clean);
    } catch {}
  }
  return (
    <main data-theme="practicum" className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[var(--color-background)] px-6 text-center text-[var(--color-foreground)]">
      <Redirect to={tgUrl} />
      <h1 className="ff-display text-2xl font-extrabold">Відкриваємо Telegram…</h1>
      <p className="max-w-sm text-[var(--color-muted)]">Опитування на 1 хвилину відкриється в застосунку Telegram.</p>
      <a className="ff-cta" href={tgUrl}>Відкрити в Telegram</a>
      <Link className="text-sm text-[var(--color-muted)] underline" href={clean ? `/start?ref=${clean}` : "/start"}>
        Немає Telegram? Пройти на сайті
      </Link>
    </main>
  );
}
