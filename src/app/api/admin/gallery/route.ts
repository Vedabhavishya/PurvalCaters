import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { url, type, title } = data;

    if (!url || url.trim() === '') {
      return NextResponse.json({ error: 'Media URL is required' }, { status: 400 });
    }

    if (!type || (type !== 'PHOTO' && type !== 'VIDEO')) {
      return NextResponse.json({ error: 'Type must be PHOTO or VIDEO' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        url: url.trim(),
        type,
        title: title ? title.trim() : null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
