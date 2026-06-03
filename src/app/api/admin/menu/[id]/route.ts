import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH update a menu item
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { name, description, price, imageUrl, categoryId, isFeatured, isVeg, subcategory } = data;

    // Check if menu item exists
    const existingItem = await prisma.menuItem.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : null;
    if (price !== undefined) updateData.price = price ? parseFloat(price) : null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl ? imageUrl.trim() : null;
    if (isFeatured !== undefined) updateData.isFeatured = !!isFeatured;
    if (isVeg !== undefined) updateData.isVeg = !!isVeg;
    if (subcategory !== undefined) updateData.subcategory = subcategory ? subcategory.trim() : null;

    if (categoryId !== undefined) {
      // Check if category exists
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId }
      });
      if (!categoryExists) {
        return NextResponse.json({ error: 'Category does not exist' }, { status: 400 });
      }
      updateData.categoryId = categoryId;
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

// DELETE a menu item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if menu item exists
    const existingItem = await prisma.menuItem.findUnique({
      where: { id }
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    await prisma.menuItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
