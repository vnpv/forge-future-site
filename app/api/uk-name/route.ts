import { NextRequest, NextResponse } from "next/server";
import { ukName } from "@/lib/uk-name";

export const dynamic = "force-dynamic";

/** Ім'я з Instagram → українське для привітання у ManyChat (External Request). GET ?n=Iryna або POST {"name":"Iryna"}. Нічого не зберігаємо. */
function respond(raw: string | null | undefined) {
  const name = ukName(raw);
  return NextResponse.json({ name_uk: name, greeting: name ? `${name}, вітаю 🙂` : "Вітаю 🙂" });
}

export async function GET(req: NextRequest) {
  return respond(req.nextUrl.searchParams.get("n"));
}

export async function POST(req: NextRequest) {
  let body: { name?: string; first_name?: string } = {};
  try {
    body = await req.json();
  } catch {}
  return respond(body.first_name ?? body.name ?? null);
}
