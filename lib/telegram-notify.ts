/**
 * Best-effort сповіщення в Telegram-бот про нову заявку. Ніколи не має валити
 * основний запит: якщо токен/chat id не налаштовані у Vercel або Telegram API
 * впав, просто логуємо і йдемо далі - заявка вже збережена в БД.
 *
 * Потрібні env-змінні (Vercel → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN     - токен бота @ivanpervoy_bot від @BotFather
 *   TELEGRAM_ADMIN_CHAT_ID - chat_id, куди слати сповіщення (можна дізнатись
 *                            через @userinfobot або getUpdates після /start)
 */
export async function notifyTelegramNewApplication(fields: {
  participant_name: string;
  participant_age: number;
  parent_contact: string;
  direction: string;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "🆕 Нова заявка на практикум Forge Future",
    `Ім'я: ${fields.participant_name}`,
    `Вік: ${fields.participant_age}`,
    `Контакт батьків: ${fields.parent_contact}`,
    `Напрямок: ${fields.direction}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("telegram sendMessage failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("telegram sendMessage error", err);
  }
}
