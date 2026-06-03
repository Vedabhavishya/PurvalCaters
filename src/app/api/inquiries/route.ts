import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          eventType: data.eventType || null,
          eventDate: data.eventDate ? new Date(data.eventDate) : null,
          guests: data.guests || null,
          message: data.message,
        },
      });
      
      return NextResponse.json(inquiry, { status: 201 });
    } catch (dbError) {
      console.warn('Database write failed (likely read-only SQLite on serverless like Vercel). Proceeding to bypass DB write for WhatsApp redirect.', dbError);
      return NextResponse.json({ 
        warning: 'Inquiry not saved in read-only database',
        name: data.name,
        email: data.email,
        phone: data.phone
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
