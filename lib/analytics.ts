/** GA4: NEXT_PUBLIC_GA_MEASUREMENT_ID у Vercel / .env.local */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export type AnalyticsEvent =
  | "cta_telegram_bot"
  | "cta_telegram_program"
  | "cta_telegram_community"
  | "cta_telegram_ivan_channel"
  | "cta_telegram_channel"
  | "cta_events_page"
  | "cta_for_parents";

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string>
): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
