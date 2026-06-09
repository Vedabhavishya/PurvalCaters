import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingItem = await prisma.galleryItem.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    await prisma.galleryItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
