import { NextRequest, NextResponse } from "next/server";

/** Короткий звичайний лінк партнера: forge-future.com/s/<telegram id> → квіз з рефом. Пересилати його не соромно: це сайт, а не бот. */
export async function GET(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const clean = /^[a-z0-9]{1,16}$/.test(ref) ? ref : "";
  return NextResponse.redirect(new URL(clean ? `/start?ref=${clean}` : "/start", req.url), 307);
}
