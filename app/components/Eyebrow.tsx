/**
 * Єдиний «надпис над заголовком» для всіх продуктових сторінок.
 * Формат: «ШКОЛА ЖИТТЯ · Продукт · вік/формат». Бренд Forge Future лишається в шапці (логотип).
 */
export const SCHOOL = "Школа життя";

export default function Eyebrow({ product }: { product?: string }) {
  return (
    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
      {SCHOOL}
      {product ? ` · ${product}` : ""}
    </p>
  );
}
