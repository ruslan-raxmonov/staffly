import { NextRequest, NextResponse } from 'next/server';
import { getUserBySetPasswordToken } from '@/lib/store';
import { supabase } from '@/lib/db';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token va parol talab qilinadi' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak' },
        { status: 400 }
      );
    }

    const user = await getUserBySetPasswordToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Token noto\'g\'ri yoki muddati o\'tgan' },
        { status: 404 }
      );
    }

    // Hash password
    const passwordHash = createHash('sha256').update(password).digest('hex');

    // Update user in DB
    const { error } = await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        set_password_token: null,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Update user error:', error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Set password error:', error);
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    );
  }
}
