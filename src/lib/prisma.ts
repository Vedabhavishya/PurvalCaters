import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import fs from 'fs';
import path from 'path';

// Force DATABASE_URL to a placeholder SQLite format to pass Prisma schema load validations
if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

const prismaClientSingleton = () => {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  console.log('DEBUG: TURSO_DATABASE_URL =', tursoUrl);
  console.log('DEBUG: TURSO_AUTH_TOKEN =', tursoToken ? 'FOUND (len: ' + tursoToken.length + ')' : 'UNDEFINED');

  if (tursoUrl && tursoToken) {
    console.log('Initializing Prisma Client with Turso LibSQL Adapter...');
    const adapter = new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoToken,
    });
    return new PrismaClient({ adapter });
  }

  console.log('Initializing Prisma Client with local SQLite file fallback...');
  // Ensure DATABASE_URL is set and resolved to an absolute path if it is file-based
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
  }

  if (process.env.DATABASE_URL.startsWith('file:')) {
    const rawPath = process.env.DATABASE_URL.replace('file:', '');
    if (!path.isAbsolute(rawPath)) {
      process.env.DATABASE_URL = `file:${path.resolve(process.cwd(), rawPath)}`;
    }
  }

  if (process.env.VERCEL && process.env.DATABASE_URL.startsWith('file:')) {
    const tempDbPath = '/tmp/dev.db';
    
    try {
      const sourceDbPath = process.env.DATABASE_URL.replace('file:', '');
      const possibleDbPaths = [
        sourceDbPath,
        path.join(/*turbopackIgnore: true*/ process.cwd(), 'prisma', 'dev.db'),
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
      // Force writable permissions in case the copied file inherited read-only state
      fs.chmodSync(tempDbPath, 0o666);
      
      // Override connection string to use the writable tmp copy
      process.env.DATABASE_URL = `file:${tempDbPath}`;
    } catch (err: any) {
      console.error('Failed to copy database to /tmp:', err);
      throw new Error(`SQLite fallback copy failed: ${err.message || err}`);
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
