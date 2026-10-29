import { NextResponse } from "next/server";
import { googleConfigured } from "@/lib/booking/google";
import { freeSlots } from "@/lib/booking/slots";

export const dynamic = "force-dynamic";

/** Вільні слоти для Mini App. Якщо Google не підключено або збій: configured=false, і застосунок падає на запис через чат. */
export async function GET() {
  if (!googleConfigured()) return NextResponse.json({ configured: false, days: {} });
  try {
    return NextResponse.json({ configured: true, days: await freeSlots() });
  } catch (e) {
    console.error("slots", e);
    return NextResponse.json({ configured: false, days: {} });
  }
}
