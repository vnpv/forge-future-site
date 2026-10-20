import { NOINDEX, currentUser, users } from "../../auth";
import { storageReady } from "../../storage";
import { EMAIL, ROLES, type Role, type StoredUser, hashPassword, newInvite, saveUsers, storedUsers } from "../../users";

/**
 * Керування користувачами дашборду MIDGARD — лише роль admin.
 * GET — усі користувачі (сховище + запасні з env MIDGARD_USERS, без паролів).
 * POST {action:"add", email, role} — додати й отримати посилання-запрошення;
 *      {action:"reset", email} — нове посилання для зміни пароля;
 *      {action:"role", email, role} — змінити роль;
 *      {action:"import"} — скопіювати користувачів з env у сховище (з хешем їхнього поточного пароля).
 * DELETE ?email= — прибрати користувача зі сховища.
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });

async function admin(request: Request) {
  const me = await currentUser(request);
  if (!me) return { error: json({ error: "Потрібен вхід" }, 401) };
  if (me.role !== "admin") return { error: json({ error: "Керувати користувачами може лише адміністратор" }, 403) };
  if (!storageReady()) return { error: json({ error: "Сховище не підключене" }, 503) };
  return { me };
}

const status = (u: StoredUser) => (u.hash ? "active" : u.invite && u.invite.exp > Date.now() ? "invited" : "expired");
const inviteLink = (request: Request, token: string) => `${new URL(request.url).origin}/midgard?invite=${token}`;

function view(stored: StoredUser[]) {
  const env = users();
  return [
    ...stored.map((u) => ({
      email: u.email,
      role: u.role,
      source: "site",
      status: status(u),
      inviteExp: u.invite ? new Date(u.invite.exp).toISOString() : null,
      createdAt: u.createdAt ?? null,
      createdBy: u.createdBy ?? null,
      inEnv: env.some((e) => e.email === u.email),
    })),
    ...env.filter((e) => !stored.some((u) => u.email === e.email)).map((e) => ({ email: e.email, role: e.role, source: "vercel", status: "active" })),
  ];
}

export async function GET(request: Request) {
  const a = await admin(request);
  if (a.error) return a.error;
  return json({ users: view(await storedUsers(true)) });
}

export async function POST(request: Request) {
  const a = await admin(request);
  if (a.error) return a.error;
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "Невірні дані" }, 400);
  }
  const all = await storedUsers(true);
  const email = String(b.email ?? "").trim().toLowerCase();
  const role = String(b.role ?? "") as Role;
  const found = all.find((u) => u.email === email);

  if (b.action === "add") {
    if (!EMAIL.test(email)) return json({ error: "Перевірте адресу пошти" }, 400);
    if (!ROLES.has(role)) return json({ error: "Оберіть роль" }, 400);
    if (found || users().some((u) => u.email === email)) return json({ error: "Такий користувач уже є" }, 409);
    const { token, invite } = await newInvite();
    const next = [...all, { email, role, invite, createdBy: a.me.email, createdAt: new Date().toISOString() }];
    await saveUsers(next);
    return json({ users: view(next), link: inviteLink(request, token) });
  }
  if (b.action === "reset") {
    if (!found) return json({ error: "Користувача немає у сховищі" }, 404);
    const { token, invite } = await newInvite();
    const next = all.map((u) => (u.email === email ? { ...u, invite } : u));
    await saveUsers(next);
    return json({ users: view(next), link: inviteLink(request, token) });
  }
  if (b.action === "role") {
    if (!found) return json({ error: "Користувача немає у сховищі" }, 404);
    if (!ROLES.has(role)) return json({ error: "Оберіть роль" }, 400);
    if (email === a.me.email && role !== "admin") return json({ error: "Не можна зняти роль адміністратора із себе" }, 400);
    const next = all.map((u) => (u.email === email ? { ...u, role } : u));
    await saveUsers(next);
    return json({ users: view(next) });
  }
  if (b.action === "import") {
    const add: StoredUser[] = [];
    for (const e of users()) {
      if (all.some((u) => u.email === e.email)) continue;
      add.push({ email: e.email, role: e.role, ...(await hashPassword(e.pass)), createdBy: a.me.email, createdAt: new Date().toISOString() });
    }
    const next = [...all, ...add];
    if (add.length) await saveUsers(next);
    return json({ users: view(next), imported: add.length });
  }
  return json({ error: "Невідома дія" }, 400);
}

export async function DELETE(request: Request) {
  const a = await admin(request);
  if (a.error) return a.error;
  const email = (new URL(request.url).searchParams.get("email") ?? "").trim().toLowerCase();
  if (email === a.me.email) return json({ error: "Не можна видалити себе" }, 400);
  const all = await storedUsers(true);
  if (!all.some((u) => u.email === email)) return json({ error: "Користувача немає у сховищі" }, 404);
  const next = all.filter((u) => u.email !== email);
  await saveUsers(next);
  return json({ users: view(next) });
}
