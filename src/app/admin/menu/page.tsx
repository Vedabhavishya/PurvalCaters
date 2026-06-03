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

  return (
    <MenuManagerClient 
      initialItems={menuItems} 
      initialCategories={categories} 
    />
  );
}
