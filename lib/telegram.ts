/** Telegram: бот (запис), канал Івана, закрита група Forge (після вечора). */

export const TELEGRAM_BOT_USERNAME = "ivanpervoy_bot";

/** Відкритий вечір */
export const TELEGRAM_START_OPEN_EVENING = "ff_vechir";

/** 6-тижнева програма */
export const TELEGRAM_START_PROGRAM = "ff_program";

/** Закрите ком'юніті — пояснення в боті (без прямого інвайту в групу) */
export const TELEGRAM_START_COMMUNITY = "ff_spilnota";

/** Канал «Школа життя Івана Первого» — про бізнес і розвиток загалом */
export const TELEGRAM_IVAN_CHANNEL_URL = "https://t.me/+3ncH4ELmghwyNDUy";
export const TELEGRAM_IVAN_CHANNEL_LABEL = "Канал Івана";

/**
 * Закрита група «Відкритий Вечір by Forge Future» — доступ після відкритого вечора.
 * На сайті не публікуємо як кнопку; інвайт після зустрічі.
 */
export const TELEGRAM_FORGE_GROUP_URL = "https://t.me/+nJJZH9LxxfoxZTBi";

export const TELEGRAM_COMMUNITY_LABEL = "Закрите ком'юніті";

export function telegramBotUrl(start: string): string {
  return `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${start}`;
}

export const APPLY_OPEN_EVENING_URL = telegramBotUrl(TELEGRAM_START_OPEN_EVENING);
export const APPLY_PROGRAM_URL = telegramBotUrl(TELEGRAM_START_PROGRAM);
export const TELEGRAM_COMMUNITY_BOT_URL = telegramBotUrl(TELEGRAM_START_COMMUNITY);
