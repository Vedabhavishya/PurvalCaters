import { PrismaClient } from '@prisma/client';
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';

const prisma = new PrismaClient();

export default async function AdminInquiries() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Customer Inquiries</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage booking requests and messages from customers.</p>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {inquiries.length > 0 ? (
          inquiries.map(inquiry => (
            <div key={inquiry.id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {inquiry.name}
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: inquiry.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                      color: inquiry.status === 'PENDING' ? '#d97706' : '#059669'
                    }}>
                      {inquiry.status}
                    </span>
                  </h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <span><FaEnvelope /> {inquiry.email}</span>
                    <span>📞 {inquiry.phone}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {inquiry.createdAt.toLocaleString()}
                </div>
              </div>
              
              <div style={{ background: '#f8f7fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <div><strong>Event:</strong> <span style={{ textTransform: 'capitalize' }}>{inquiry.eventType || 'N/A'}</span></div>
                  <div><strong>Guests:</strong> {inquiry.guests || 'N/A'}</div>
                </div>
                <p style={{ color: '#1e293b', whiteSpace: 'pre-wrap' }}>{inquiry.message}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                {inquiry.status === 'PENDING' && (
                  <button className="btn" style={{ background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaCheckCircle /> Mark as Contacted
                  </button>
                )}
                <button className="btn" style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaTimesCircle /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ background: 'white', padding: '3rem', textAlign: 'center', borderRadius: '12px', color: 'var(--text-muted)' }}>
            No inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
