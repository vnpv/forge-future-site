import { NOINDEX, currentUser } from "../auth";
import html from "./page-html";

/**
 * Електронний щоденник MIDGARD — перша версія (прототип з демо-даними, вигаданими іменами).
 * Той самий вхід, що й у дашборду якості уроків (cookie midgard_session); без входу — повернення на /midgard.
 * Весь інтерфейс — один самодостатній HTML (page-html.ts): розклад, щоденник і журнал зведені в один екран.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const me = await currentUser(request);
  if (!me) return new Response(null, { status: 303, headers: { ...NOINDEX, Location: "/midgard" } });
  return new Response(html, { headers: { ...NOINDEX, "Content-Type": "text/html; charset=utf-8" } });
}
