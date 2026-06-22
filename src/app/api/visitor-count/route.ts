import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let counter = await prisma.visitorCount.findFirst();

    if (!counter) {
      counter = await prisma.visitorCount.create({
        data: {
          count: 1000,
        },
      });
    }

    return NextResponse.json({ count: counter.count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visitor count' }, { status: 500 });
  }
}

export async function POST() {
  try {
    let counter = await prisma.visitorCount.findFirst();

    if (!counter) {
      counter = await prisma.visitorCount.create({
        data: {
          count: 1001,
        },
      });
    } else {
      counter = await prisma.visitorCount.update({
        where: { id: counter.id },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({ count: counter.count });
  } catch (error) {
    console.error('Failed to increment visitor count:', error);
    return NextResponse.json({ error: 'Failed to increment visitor count' }, { status: 500 });
  }
}
