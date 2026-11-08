import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: 'Support ticket submitted successfully! Our legal tech team will respond within 24 hours.',
      ticket_id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'Open',
    });
  } catch (e) {
    return NextResponse.json({ detail: 'Failed to submit support ticket.' }, { status: 500 });
  }
}
