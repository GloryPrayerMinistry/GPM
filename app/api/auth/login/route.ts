import { NextResponse } from 'next/server';
import { loginUser, createSession } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = await loginUser(email, password);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await createSession({
      id: user.id,
      role: user.role as 'USER' | 'ADMIN',
      email: user.email,
    });

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const { destroySession } = await import('@/app/lib/auth');
  await destroySession();
  return NextResponse.json({ success: true });
}
