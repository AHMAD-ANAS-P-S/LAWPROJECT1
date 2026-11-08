import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      order_id: `order_mock_${Date.now()}`,
      amount: body.amount || 499900,
      currency: 'INR',
      key: 'rzp_test_mock_trl_library',
    });
  } catch (e) {
    return NextResponse.json({ detail: 'Failed to create order.' }, { status: 500 });
  }
}
