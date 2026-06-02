import { PrismaClient } from '@prisma/client';
import MenuClient from './MenuClient';

const prisma = new PrismaClient();

// Revalidate this page every 1 hour (or use dynamic rendering)
export const revalidate = 3600;

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
