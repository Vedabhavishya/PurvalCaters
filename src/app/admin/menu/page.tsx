import prisma from '@/lib/prisma';
import MenuManagerClient from './MenuManagerClient';

export default async function AdminMenu() {
  // Fetch initial menu items and categories on server side
  const menuItems = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [
      { category: { name: 'asc' } },
      { name: 'asc' }
    ]
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  // Map to plain objects matching client-side types and avoiding Date serialization errors
  const serializedItems = menuItems.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
    isVeg: item.isVeg,
    subcategory: item.subcategory,
    course: item.course,
    categoryId: item.categoryId,
    isFeatured: item.isFeatured,
    category: {
      id: item.category.id,
      name: item.category.name,
      slug: item.category.slug
    }
  }));

  const serializedCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  }));

  return (
    <MenuManagerClient 
      initialItems={serializedItems} 
      initialCategories={serializedCategories} 
    />
  );
}

