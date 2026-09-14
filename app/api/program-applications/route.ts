import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const DIRECTIONS = ["site", "game", "service", "unsure"] as const;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { participant_name, participant_age, parent_contact, direction } = body;

  if (
    typeof participant_name !== "string" ||
    participant_name.trim().length < 2
  ) {
    return NextResponse.json({ error: "participant_name is required" }, { status: 400 });
  }
  const age = Number(participant_age);
  if (!Number.isFinite(age) || age < 5 || age > 25) {
    return NextResponse.json({ error: "participant_age is invalid" }, { status: 400 });
  }
  if (
    typeof parent_contact !== "string" ||
    parent_contact.trim().length < 5
  ) {
    return NextResponse.json({ error: "parent_contact is required" }, { status: 400 });
  }
  if (!DIRECTIONS.includes(direction)) {
    return NextResponse.json({ error: "direction is invalid" }, { status: 400 });
  }

  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO program_applications (participant_name, participant_age, parent_contact, direction)
       VALUES (?, ?, ?, ?)`
    )
    .run(participant_name.trim(), age, parent_contact.trim(), direction);

  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
