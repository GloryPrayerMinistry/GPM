import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: parseFloat(body.price),
        description: body.description,
        image: body.image || 'BookOpen',
        imageUrl: body.imageUrl || null,
        category: body.category || null,
        inStock: body.inStock ?? true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 400 });
  }
}
