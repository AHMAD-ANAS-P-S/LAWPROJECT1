import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    message: `Toggled importance for bookmark #${id}`,
    id: Number(id),
    success: true,
  });
}
