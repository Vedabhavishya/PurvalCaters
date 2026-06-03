import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST create a category
export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();
    // Generate a URL-friendly slug
    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if category name or slug already exists
    const existing = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { equals: trimmedName } },
          { slug: { equals: slug } }
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Category name or slug already exists' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        slug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
