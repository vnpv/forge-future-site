import { NOINDEX, currentUser, users } from "../../auth";
import { storageReady } from "../../storage";
import { EMAIL, ROLES, type Role, canManage, canManageUsers, makeInvite, readStore, saveStore } from "../../users";

/**
 * Керування користувачами дашборду MIDGARD. Власник керує всіма, сисадмін — директорами й супервізорами.
 * GET — користувачі (сховище + запасні з env MIDGARD_USERS, без паролів) і чинні запрошення.
 * POST {action:"invite", role, email?} — посилання для реєстрації з роллю (пошта за бажанням);
 *      {action:"reset", email} — посилання для нового пароля;
 *      {action:"role", email, role} — змінити роль;
 *      {action:"cancel", id} — скасувати запрошення.
 * DELETE ?email= — видалити користувача.
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });

async function actor(request: Request) {
  const me = await currentUser(request);
  if (!me) return { error: json({ error: "Потрібен вхід" }, 401) };
  if (!canManageUsers(me.role)) return { error: json({ error: "Керувати користувачами можуть лише власник і сисадмін" }, 403) };
  if (!storageReady()) return { error: json({ error: "Сховище не підключене" }, 503) };
  return { me };
}

type Store = Awaited<ReturnType<typeof readStore>>;
const link = (request: Request, token: string) => `${new URL(request.url).origin}/midgard?invite=${token}`;

function view(store: Store, me: { email: string; role: Role }) {
  const env = users();
  return {
    me,
    canInvite: [...ROLES].filter((r) => canManage(me.role, r)),
    users: [
      ...store.users.map((u) => ({ email: u.email, role: u.role, source: "site", createdBy: u.createdBy ?? null, createdAt: u.createdAt ?? null, editable: u.email !== me.email && canManage(me.role, u.role) })),
      ...env.filter((e) => !store.users.some((u) => u.email === e.email)).map((e) => ({ email: e.email, role: e.role, source: "vercel", editable: false })),
    ],
    invites: store.invites.map((i) => ({ id: i.id, role: i.role, email: i.email ?? null, reset: Boolean(i.reset), exp: new Date(i.exp).toISOString(), createdBy: i.createdBy, editable: canManage(me.role, i.role) })),
  };
}

export async function GET(request: Request) {
  const a = await actor(request);
  if (a.error) return a.error;
  return json(view(await readStore(true), a.me));
}

export async function POST(request: Request) {
  const a = await actor(request);
  if (a.error) return a.error;
  const me = a.me;
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "Невірні дані" }, 400);
  }
  const store = await readStore(true);
  const email = String(b.email ?? "").trim().toLowerCase();
  const role = String(b.role ?? "") as Role;
  const target = store.users.find((u) => u.email === email);
  const done = async (next: Store, extra: Record<string, unknown> = {}) => json({ ...view(await saveStore(next), me), ...extra });

  if (b.action === "invite") {
    if (!ROLES.has(role)) return json({ error: "Оберіть роль" }, 400);
    if (!canManage(me.role, role)) return json({ error: "Немає прав запрошувати з цією роллю" }, 403);
    if (email && !EMAIL.test(email)) return json({ error: "Перевірте адресу пошти" }, 400);
    if (email && target) return json({ error: "Користувач із такою поштою вже є" }, 409);
    const { token, invite } = await makeInvite({ role, ...(email ? { email } : {}), createdBy: me.email });
    return done({ ...store, invites: [...store.invites, invite] }, { link: link(request, token), invite: invite.id });
  }
  if (b.action === "reset") {
    if (!target) return json({ error: "Користувача немає" }, 404);
    if (!canManage(me.role, target.role) && target.email !== me.email) return json({ error: "Немає прав на цього користувача" }, 403);
    const { token, invite } = await makeInvite({ role: target.role, email: target.email, reset: true, createdBy: me.email });
    const invites = [...store.invites.filter((i) => !(i.reset && i.email === target.email)), invite];
    return done({ ...store, invites }, { link: link(request, token), invite: invite.id });
  }
  if (b.action === "role") {
    if (!target) return json({ error: "Користувача немає" }, 404);
    if (!ROLES.has(role)) return json({ error: "Оберіть роль" }, 400);
    if (target.email === me.email) return json({ error: "Свою роль змінити не можна" }, 400);
    if (!canManage(me.role, target.role) || !canManage(me.role, role)) return json({ error: "Немає прав на таку зміну" }, 403);
    return done({ ...store, users: store.users.map((u) => (u.email === email ? { ...u, role } : u)) });
  }
  if (b.action === "cancel") {
    const inv = store.invites.find((i) => i.id === b.id);
    if (!inv) return json({ error: "Запрошення не знайдено" }, 404);
    if (!canManage(me.role, inv.role)) return json({ error: "Немає прав на це запрошення" }, 403);
    return done({ ...store, invites: store.invites.filter((i) => i.id !== inv.id) });
  }
  return json({ error: "Невідома дія" }, 400);
}

export async function DELETE(request: Request) {
  const a = await actor(request);
  if (a.error) return a.error;
  const email = (new URL(request.url).searchParams.get("email") ?? "").trim().toLowerCase();
  if (email === a.me.email) return json({ error: "Не можна видалити себе" }, 400);
  const store = await readStore(true);
  const target = store.users.find((u) => u.email === email);
  if (!target) return json({ error: "Користувача немає у сховищі" }, 404);
  if (!canManage(a.me.role, target.role)) return json({ error: "Немає прав на цього користувача" }, 403);
  return json(view(await saveStore({ ...store, users: store.users.filter((u) => u.email !== email) }), a.me));
}
