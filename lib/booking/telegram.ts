import { createHmac, timingSafeEqual } from "node:crypto";

const BOT = () => process.env.FORGE_BOT_TOKEN ?? "";

/** Перевірка підпису initData Mini App: довіряємо id/username лише якщо підпис збігся з токеном бота. */
export function verifyInitData(initData: string): { id: number; username: string; first_name: string } | null {
  const token = BOT();
  if (!initData || !token) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const check = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort().join("\n");
  const secret = createHmac("sha256", "WebAppData").update(token).digest();
  const calc = createHmac("sha256", secret).update(check).digest("hex");
  const a = Buffer.from(calc, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const authDate = Number(params.get("auth_date") ?? 0);
  if (!authDate || Date.now() / 1000 - authDate > 86_400) return null;
  try {
    const u = JSON.parse(params.get("user") ?? "{}");
    return u.id ? { id: u.id, username: u.username ?? "", first_name: u.first_name ?? "" } : null;
  } catch {
    return null;
  }
}

export async function sendTelegram(chatId: string | number, text: string): Promise<boolean> {
  const token = BOT();
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const notifyIvan = (text: string) => sendTelegram(process.env.IVAN_CHAT_ID ?? "", text);
