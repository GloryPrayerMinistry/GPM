import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: body.name,
        price: parseFloat(body.price),
        description: body.description,
        image: body.image,
        imageUrl: body.imageUrl || null,
        category: body.category || null,
        inStock: body.inStock ?? true,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.product.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}
