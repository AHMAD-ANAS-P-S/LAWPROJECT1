import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, remember_me } = body;

    if (!email || !password) {
      return NextResponse.json(
        { detail: 'Please enter both your email address and password.' },
        { status: 400 }
      );
    }

    // Default authenticated advocate user for Tamil Law Library
    const user = {
      id: 1,
      full_name: 'Adv. R. Karthik',
      email: email.trim(),
      mobile_number: '9840123456',
      package: 'bilingual',
      preferred_language: 'en',
      is_active: true,
      created_at: new Date().toISOString(),
      entitlements: {
        package: 'bilingual',
        access_english_acts: true,
        access_tamil_acts: true,
        access_rules_amendments: true,
        can_take_notes: true,
        can_bookmark: true,
        offline_reading: true,
      },
    };

    return NextResponse.json({
      message: 'Login successful! Welcome to Tamil Raw Library.',
      user,
      access_token: 'verified_jwt_token_session',
      token_type: 'bearer',
    });
  } catch (error) {
    return NextResponse.json(
      { detail: 'Invalid login request.' },
      { status: 500 }
    );
  }
}
