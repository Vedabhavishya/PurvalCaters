import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
