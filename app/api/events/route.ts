import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  const events = db.prepare(`
    SELECT e.*, COUNT(r.participant_id) as rsvp_count
    FROM events e
    LEFT JOIN rsvp r ON e.id = r.event_id AND r.status = 'going'
    GROUP BY e.id
    ORDER BY e.date ASC
  `).all();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, date, location, max_participants, status } = body;

  if (!title || !date || !location) {
    return NextResponse.json(
      { error: 'title, date, location are required' },
      { status: 400 }
    );
  }

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO events (title, date, location, max_participants, status)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, date, location, max_participants ?? 0, status ?? 'active');

  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(event, { status: 201 });
}
