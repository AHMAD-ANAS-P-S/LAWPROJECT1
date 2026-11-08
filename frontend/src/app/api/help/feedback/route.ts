import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guideId = searchParams.get('guide_id');
  const helpful = searchParams.get('helpful');

  return NextResponse.json({
    message: 'Thank you for your feedback!',
    guide_id: guideId,
    helpful: helpful === 'true',
  });
}

export async function POST(request: Request) {
  return NextResponse.json({
    message: 'Thank you for your feedback!',
  });
}
