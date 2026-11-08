import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { detail: 'Please enter your registered email address.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `Password reset instructions have been sent to ${email}. Please check your inbox.`,
    });
  } catch (error) {
    return NextResponse.json(
      { detail: 'Failed to process password reset request.' },
      { status: 500 }
    );
  }
}
