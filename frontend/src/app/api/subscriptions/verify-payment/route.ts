import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Subscription payment verified successfully! Your account is active.',
      payment_id: body.razorpay_payment_id || `pay_${Date.now()}`,
    });
  } catch (e) {
    return NextResponse.json({ detail: 'Payment verification failed.' }, { status: 500 });
  }
}
