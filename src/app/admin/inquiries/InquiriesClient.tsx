"use client";

import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaSpinner } from 'react-icons/fa';

type SerializedInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string | null;
  eventDate: string | null;
  guests: number | null;
  message: string;
  status: string;
  createdAt: string;
};

interface InquiriesClientProps {
  initialInquiries: SerializedInquiry[];
}

export default function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [inquiries, setInquiries] = useState<SerializedInquiry[]>(initialInquiries);
  const [actionId, setActionId] = useState<string | null>(null);

  const handleMarkComplete = async (id: string) => {
    setActionId(id);
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DONE' })
      });

      if (!response.ok) {
        throw new Error('Failed to update inquiry status');
      }

      // Vanish from that section (filter it out)
      setInquiries(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error marking inquiry as complete');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setActionId(id);
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete inquiry');
      }

      setInquiries(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting inquiry');
    } finally {
      setActionId(null);
    }
  };

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
                  {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div style={{ background: '#f8f7fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <div><strong>Event:</strong> <span style={{ textTransform: 'capitalize' }}>{inquiry.eventType || 'N/A'}</span></div>
                  <div><strong>Guests:</strong> {inquiry.guests || 'N/A'}</div>
                  {inquiry.eventDate && (
                    <div><strong>Date:</strong> {new Date(inquiry.eventDate).toLocaleDateString()}</div>
                  )}
                </div>
                <p style={{ color: '#1e293b', whiteSpace: 'pre-wrap' }}>{inquiry.message}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleMarkComplete(inquiry.id)}
                  disabled={actionId !== null}
                  className="btn" 
                  style={{ background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {actionId === inquiry.id ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaCheckCircle />}
                  Mark as Complete
                </button>
                <button 
                  onClick={() => handleDelete(inquiry.id)}
                  disabled={actionId !== null}
                  className="btn" 
                  style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FaTimesCircle /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ background: 'white', padding: '3rem', textAlign: 'center', borderRadius: '12px', color: 'var(--text-muted)' }}>
            No pending inquiries.
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
