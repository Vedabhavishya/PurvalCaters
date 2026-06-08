import prisma from '@/lib/prisma';
import MenuClient from './MenuClient';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  });
  
  const items = await prisma.menuItem.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <MenuClient categories={categories} items={items} />
  );
}
