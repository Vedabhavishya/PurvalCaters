import { PrismaClient } from '@prisma/client';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const prisma = new PrismaClient();

export default async function AdminMenu() {
  const menuItems = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: { category: { name: 'asc' } }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Menu Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Add, edit, or delete dishes from your menu.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
          <FaPlus /> Add Menu Item
        </button>
      </div>
      
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {menuItems.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Category</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Price</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Featured</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{item.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem' }}>
                      {item.category.name}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{item.price ? `₹${item.price}` : 'N/A'}</td>
                  <td style={{ padding: '1rem' }}>{item.isFeatured ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '1rem' }}>
                      <FaEdit size={18} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No menu items found. Add some to get started.</p>
        )}
      </div>
    </div>
  );
}
