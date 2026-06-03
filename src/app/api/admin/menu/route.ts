import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all menu items
export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: [
        { category: { name: 'asc' } },
        { name: 'asc' }
      ]
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

// POST create a menu item
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, price, imageUrl, categoryId, isFeatured, isVeg, subcategory, course } = data;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Item name is required' }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!categoryExists) {
      return NextResponse.json({ error: 'Category does not exist' }, { status: 400 });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description ? description.trim() : null,
        price: price ? parseFloat(price) : null,
        imageUrl: imageUrl ? imageUrl.trim() : null,
        isVeg: isVeg === undefined ? true : !!isVeg,
        subcategory: subcategory ? subcategory.trim() : null,
        course: course ? course.trim() : null,
        categoryId,
        isFeatured: !!isFeatured,
      },
      include: { category: true }
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
