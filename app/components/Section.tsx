import { HTMLAttributes } from "react";

/**
 * Відступи секцій. Не змішуй py-* з pt-0/pb-0 у className — Tailwind не перебиває.
 *
 * | spacing | Коли |
 * |---------|------|
 * | hero    | PageHeader + strip (перша секція внутрішньої сторінки) |
 * | content | Перший сірий блок після hero (без верхнього padding) |
 * | block   | Звичайна секція на темному фоні |
 * | alt     | Секція з класом ff-section-alt |
 * | flush   | Сірий/alt блок після чорної секції (менший верхній відступ) |
 * | tight   | Компактна секція, той самий фон що попередня |
 * | end     | Останній CTA-блок перед footer |
 * | none    | Свої відступи в className (головна hero) |
 */
const SECTION_SPACING = {
  block: "py-10 sm:py-14",
  /** @deprecated використовуй block */
  default: "py-10 sm:py-14",
  hero: "pt-10 pb-6 sm:pt-14 sm:pb-8",
  content: "pb-10 sm:pb-14",
  alt: "py-10 sm:py-14",
  flush: "pt-8 pb-10 sm:pt-10 sm:pb-14",
  tight: "py-6 sm:py-10",
  end: "pt-10 pb-12 sm:pt-12 sm:pb-16",
  none: "",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  spacing?: SectionSpacing;
}

export default function Section({
  as: Tag = "section",
  spacing = "block",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`${SECTION_SPACING[spacing]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
