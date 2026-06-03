import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    if (process.env.VERCEL) {
      const tempDbPath = '/tmp/dev.db';
      const bundledDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
      
      try {
        if (!fs.existsSync(tempDbPath)) {
          // Ensure temp directory exists (in some serverless environments)
          const tempDir = path.dirname(tempDbPath);
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
          }
          fs.copyFileSync(bundledDbPath, tempDbPath);
          console.log('Database successfully copied to /tmp/dev.db');
        }
      } catch (err) {
        console.error('Failed to copy database to /tmp:', err);
      }
      process.env.DATABASE_URL = `file:${tempDbPath}`;
    } else {
      process.env.DATABASE_URL = 'file:./prisma/dev.db';
    }
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
