import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/store';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email va parol talab qilinadi' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Hisob topilmadi. So\'rov yuboring.' },
        { status: 404 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: 'Avval parol o\'rnating. Welcome email-dagi havolani bosing.' },
        { status: 400 }
      );
    }

    if (!user.active) {
      return NextResponse.json(
        { error: 'Hisobingiz faol emas' },
        { status: 403 }
      );
    }

    // Verify password
    const passwordHash = createHash('sha256').update(password).digest('hex');

    if (passwordHash !== user.passwordHash) {
      return NextResponse.json(
        { error: 'Parol noto\'g\'ri' },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('staffly_user_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    );
  }
}
