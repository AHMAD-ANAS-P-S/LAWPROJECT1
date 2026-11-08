import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, mobile_number, package: pkg, password } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { detail: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const selectedPkg = pkg || 'bilingual';

    const user = {
      id: Math.floor(Math.random() * 9000) + 1000,
      full_name: full_name.trim(),
      email: email.trim(),
      mobile_number: mobile_number || '9840123456',
      package: selectedPkg,
      preferred_language: selectedPkg === 'tamil' ? 'ta' : 'en',
      is_active: true,
      created_at: new Date().toISOString(),
      entitlements: {
        package: selectedPkg,
        access_english_acts: selectedPkg === 'english' || selectedPkg === 'bilingual',
        access_tamil_acts: selectedPkg === 'tamil' || selectedPkg === 'bilingual',
        access_rules_amendments: true,
        can_take_notes: true,
        can_bookmark: true,
        offline_reading: true,
      },
    };

    return NextResponse.json({
      message: `Registration successful! Welcome to Tamil Law Library (${selectedPkg.toUpperCase()} Package).`,
      user,
      access_token: 'new_registered_jwt_token',
      token_type: 'bearer',
    });
  } catch (error) {
    return NextResponse.json(
      { detail: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
