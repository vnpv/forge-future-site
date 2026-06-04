"use client";

import type { ReactNode } from "react";
import {
  APPLY_OPEN_EVENING_URL,
  APPLY_PROGRAM_URL,
  TELEGRAM_COMMUNITY_BOT_URL,
  TELEGRAM_COMMUNITY_LABEL,
  TELEGRAM_IVAN_CHANNEL_LABEL,
  TELEGRAM_IVAN_CHANNEL_URL,
} from "@/lib/telegram";
import { trackEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "inline";

const base =
  "inline-flex items-center justify-center gap-2 transition-colors font-medium";

const variants: Record<Variant, string> = {
  primary:
    "rounded-lg bg-[#e8951a] px-6 py-3 text-sm font-semibold text-[#0c0c0c] hover:bg-[#f0a432]",
  secondary:
    "rounded-lg border border-[#e8951a]/40 px-6 py-3 text-sm text-[#e8951a] hover:bg-[#e8951a]/10",
  inline: "text-[#e8951a] hover:underline text-sm",
};

type Flow = "evening" | "program";

type Props = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  /** evening = вечір (default), program = 6-тижнева програма */
  flow?: Flow;
  location?: string;
};

export default function TelegramCta({
  variant = "primary",
  className = "",
  children,
  flow = "evening",
  location = "unknown",
}: Props) {
  const href =
    flow === "program" ? APPLY_PROGRAM_URL : APPLY_OPEN_EVENING_URL;
  const label =
    children ??
    (flow === "program" ? "Подати заявку на програму" : "Записатись на вечір");

  const onClick = () => {
    trackEvent(
      flow === "program" ? "cta_telegram_program" : "cta_telegram_bot",
      { link_url: href, cta_location: location },
    );
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <TelegramIcon />
      {label}
    </a>
  );
}

/** Закрите ком'юніті Forge — бот пояснює доступ після вечора */
export function TelegramCommunityLink({
  className = "",
  children,
  location = "unknown",
}: {
  className?: string;
  children?: ReactNode;
  location?: string;
}) {
  const onClick = () => {
    trackEvent("cta_telegram_community", {
      link_url: TELEGRAM_COMMUNITY_BOT_URL,
      cta_location: location,
    });
  };

  return (
    <a
      href={TELEGRAM_COMMUNITY_BOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-[#e8951a] hover:underline ${className}`}
      onClick={onClick}
    >
      {children ?? TELEGRAM_COMMUNITY_LABEL}
    </a>
  );
}

/** Канал Івана — бізнес, особистий розвиток, анонси */
export function TelegramIvanChannelLink({
  className = "",
  children,
  location = "unknown",
}: {
  className?: string;
  children?: ReactNode;
  location?: string;
}) {
  const onClick = () => {
    trackEvent("cta_telegram_ivan_channel", {
      link_url: TELEGRAM_IVAN_CHANNEL_URL,
      cta_location: location,
    });
  };

  return (
    <a
      href={TELEGRAM_IVAN_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-[#e8951a] hover:underline ${className}`}
      onClick={onClick}
    >
      {children ?? TELEGRAM_IVAN_CHANNEL_LABEL}
    </a>
  );
}

/** @deprecated використовуй TelegramCommunityLink */
export const TelegramChannelLink = TelegramCommunityLink;

function TelegramIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.18L6.32 14.98l-4.16-1.3c-.9-.28-.9-.9.18-1.34l16.2-6.24c.75-.29 1.4.18 1.15 1.3L18.1 20.1c-.24 1.02-.88 1.27-1.79.79l-4.95-3.65-2.42 2.32c-.27.27-.5.5-1.16.5z" />
    </svg>
  );
}
