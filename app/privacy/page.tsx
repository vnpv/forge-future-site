import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";

export const metadata: Metadata = {
  title: "Політика конфіденційності | Forge Future",
  description: "Які дані Forge Future отримує під час запису на розмову і як ми їх використовуємо.",
  alternates: { canonical: "/privacy" },
};

/** Політика конфіденційності (26.11.2026). Потрібна для Google OAuth (запис на розбір через Google Calendar). */
export default function PrivacyPage() {
  return (
    <Section spacing="hero">
      <Container>
        <article className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed">
          <h1 className="ff-display text-[clamp(1.6rem,6vw,2.2rem)] font-extrabold leading-tight">Політика конфіденційності</h1>
          <p className="text-sm text-[var(--color-muted)]">Оновлено 26 листопада 2026 р.</p>

          <h2 className="text-lg font-bold">Хто ми</h2>
          <p>
            Forge Future — школа першої справи для підлітків. Засновник — Іван Первой. Зв&apos;язок: Instagram{" "}
            <a className="underline" href="https://instagram.com/ivanpervoy">@ivanpervoy</a> або Telegram{" "}
            <a className="underline" href="https://t.me/IvanPervoy">@IvanPervoy</a>.
          </p>

          <h2 className="text-lg font-bold">Які дані ми отримуємо</h2>
          <p>
            Коли ви записуєтесь на розмову (на сайті, в Instagram Direct або в Telegram), ми отримуємо: ім&apos;я, нік в
            Instagram або Telegram, обраний час і те, що ви самі нам написали. За вашим бажанням — email, телефон і вік дитини.
          </p>

          <h2 className="text-lg font-bold">Навіщо</h2>
          <p>
            Щоб призначити розмову, надіслати посилання на відеодзвінок і, якщо потрібно, нагадати про неї. Ми не продаємо ваші
            дані і не передаємо їх іншим для реклами.
          </p>

          <h2 className="text-lg font-bold">Google Calendar</h2>
          <p>
            Сайт підключений до Google Calendar засновника, щоб бачити зайнятий час і створювати подію розмови з посиланням на
            Google Meet. Інших даних з Google ми не беремо. Використання даних, отриманих через Google API, відповідає{" "}
            <a className="underline" href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , зокрема вимогам Limited Use.
          </p>

          <h2 className="text-lg font-bold">Де зберігаються дані</h2>
          <p>
            У Google Calendar засновника, у переписці Instagram (через сервіс ManyChat) і в Telegram. Для підрахунку відвідувань
            сайт використовує Google Analytics і Meta Pixel.
          </p>

          <h2 className="text-lg font-bold">Як видалити дані</h2>
          <p>Напишіть нам в Instagram або Telegram — видалимо ваші дані протягом 7 днів.</p>
        </article>
      </Container>
    </Section>
  );
}
