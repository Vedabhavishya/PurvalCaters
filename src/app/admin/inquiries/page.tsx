import prisma from '@/lib/prisma';
import InquiriesClient from './InquiriesClient';

export const dynamic = 'force-dynamic';

export default async function AdminInquiries() {
  const inquiries = await prisma.inquiry.findMany({
    where: {
      status: {
        not: 'DONE'
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const serializedInquiries = inquiries.map(inquiry => ({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    eventType: inquiry.eventType,
    eventDate: inquiry.eventDate ? inquiry.eventDate.toISOString() : null,
    guests: inquiry.guests,
    message: inquiry.message,
    status: inquiry.status,
    createdAt: inquiry.createdAt.toISOString()
  }));

  return <InquiriesClient initialInquiries={serializedInquiries} />;
}

