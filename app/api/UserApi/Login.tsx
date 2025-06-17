import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const apiRes = await fetch('https://localhost:7117/api/User/SignIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!apiRes.ok) {
      const errorData = await apiRes.json();
      return NextResponse.json(
        { error: errorData.error || 'Sign in failed' },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    return NextResponse.json({ token: data.token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}