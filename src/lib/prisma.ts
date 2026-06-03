import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prismaClientSingleton = () => {
  const isLocalFileDb = !process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:');
  
  if (process.env.VERCEL && isLocalFileDb) {
    const tempDbPath = '/tmp/dev.db';
    
    try {
      if (!fs.existsSync(tempDbPath)) {
        // Extract database path from existing DATABASE_URL if present
        let customSourcePath = '';
        if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
          const rawPath = process.env.DATABASE_URL.replace('file:', '');
          customSourcePath = path.isAbsolute(rawPath) ? rawPath : path.join(process.cwd(), rawPath);
        }

        const possibleDbPaths = [
          ...(customSourcePath ? [customSourcePath] : []),
          path.join(/*turbopackIgnore: true*/ process.cwd(), 'prisma', 'dev.db'),
          path.join(/*turbopackIgnore: true*/ process.cwd(), 'dev.db'),
          path.join(/*turbopackIgnore: true*/ __dirname, 'dev.db'),
          // Next.js serverless bundles routes in separate chunks. Check relative paths from chunk location:
          path.join(/*turbopackIgnore: true*/ __dirname, '..', '..', '..', 'prisma', 'dev.db'),
          path.join(/*turbopackIgnore: true*/ __dirname, '..', '..', '..', '..', 'prisma', 'dev.db'),
        ];
        
        let bundledDbPath = '';
        for (const p of possibleDbPaths) {
          if (fs.existsSync(p)) {
            bundledDbPath = p;
            break;
          }
        }
        
        if (!bundledDbPath) {
          throw new Error(`Bundled dev.db not found at any searched paths: ${possibleDbPaths.join(', ')}`);
        }

        const tempDir = path.dirname(tempDbPath);
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        fs.copyFileSync(bundledDbPath, tempDbPath);
        console.log(`Database successfully copied from ${bundledDbPath} to ${tempDbPath}`);
      }
      // Force writable permissions in case the copied file inherited read-only state
      fs.chmodSync(tempDbPath, 0o666);
      
      // Override connection string to use the writable tmp copy
      process.env.DATABASE_URL = `file:${tempDbPath}`;
    } catch (err: any) {
      console.error('Failed to copy database to /tmp:', err);
      throw new Error(`SQLite fallback copy failed: ${err.message || err}`);
    }
  } else if (!process.env.DATABASE_URL) {
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
