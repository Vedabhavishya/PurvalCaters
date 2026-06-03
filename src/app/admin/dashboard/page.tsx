import prisma from '@/lib/prisma';
import { FaUtensils, FaBoxOpen, FaEnvelopeOpenText, FaUsers } from 'react-icons/fa';

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { backgroundColor: '#fef3c7', color: '#d97706' }; // Amber/Gold
    case 'DONE':
      return { backgroundColor: '#d1fae5', color: '#059669' }; // Emerald/Green
    default:
      return { backgroundColor: '#e2e8f0', color: '#475569' }; // Slate/Gray
  }
};

export default async function AdminDashboard() {
  const menuItemsCount = await prisma.menuItem.count();
  const packagesCount = await prisma.package.count();
  const inquiriesCount = await prisma.inquiry.count();
  const pendingInquiriesCount = await prisma.inquiry.count({ where: { status: 'PENDING' } });

  const stats = [
    { title: 'Total Menu Items', count: menuItemsCount, icon: <FaUtensils size={32} color="var(--primary)" /> },
    { title: 'Catering Packages', count: packagesCount, icon: <FaBoxOpen size={32} color="var(--accent-gold)" /> },
    { title: 'Total Inquiries', count: inquiriesCount, icon: <FaUsers size={32} color="#3b82f6" /> },
    { title: 'Pending Inquiries', count: pendingInquiriesCount, icon: <FaEnvelopeOpenText size={32} color="var(--accent-error)" /> },
  ];

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome to the Purval’s Caterers Admin Panel.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>{stat.count}</div>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#1e293b' }}>Recent Inquiries</h2>
        {recentInquiries.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Event Type</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map(inquiry => {
                const styles = getStatusStyles(inquiry.status);
                return (
                  <tr key={inquiry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem' }}>{inquiry.name}</td>
                    <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{inquiry.eventType || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{inquiry.createdAt.toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        backgroundColor: styles.backgroundColor,
                        color: styles.color
                      }}>
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No recent inquiries found.</p>
        )}
      </div>
    </div>
  );
}

