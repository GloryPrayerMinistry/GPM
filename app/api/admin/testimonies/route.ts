import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const testimonies = await prisma.testimony.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(testimonies);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
