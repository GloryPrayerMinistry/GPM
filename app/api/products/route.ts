import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}
