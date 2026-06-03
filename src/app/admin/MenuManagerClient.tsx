"use client";

import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaSpinner, FaFolderPlus } from 'react-icons/fa';

type Category = { id: string; name: string; slug: string };
type MenuItem = { 
  id: string; 
  name: string; 
  description: string | null; 
  price: number | null; 
  imageUrl: string | null; 
  categoryId: string;
  isFeatured: boolean;
  category: Category;
};

interface MenuManagerClientProps {
  initialItems: MenuItem[];
  initialCategories: Category[];
}

export default function MenuManagerClient({ initialItems, initialCategories }: MenuManagerClientProps) {
  // State
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    isFeatured: false,
  });
  const [newCategoryName, setNewCategoryName] = useState('');

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handlers
  const handleOpenAddModal = () => {
    setSelectedItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: categories[0]?.id || '',
      isFeatured: false,
    });
    setErrorMsg('');
    setItemModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price ? item.price.toString() : '',
      categoryId: item.categoryId,
      isFeatured: item.isFeatured,
    });
    setErrorMsg('');
    setItemModalOpen(true);
  };

  const handleOpenDeleteModal = (item: MenuItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Submit Menu Item (Add or Edit)
  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const url = selectedItem ? `/api/admin/menu/${selectedItem.id}` : '/api/admin/menu';
      const method = selectedItem ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save menu item');
      }

      if (selectedItem) {
        // Edit mode: update list
        setItems(prev => prev.map(i => i.id === selectedItem.id ? result : i));
      } else {
        // Add mode: append to list
        setItems(prev => [...prev, result]);
      }

      setItemModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Submit Category
  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create category');
      }

      setCategories(prev => [...prev, result]);
      setFormData(prev => ({ ...prev, categoryId: result.id })); // Auto-select new category
      setNewCategoryName('');
      setCategoryModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Delete Menu Item
  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/menu/${itemToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete menu item');
      }

      setItems(prev => prev.filter(i => i.id !== itemToDelete.id));
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete menu item');
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search query and category filter
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.categoryId === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Menu Management</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.95rem' }}>Create, modify, or delete items on the catering menu.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setCategoryModalOpen(true)}
            className="btn btn-outline" 
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', borderColor: '#eae6df', color: 'var(--text-main)' }}
          >
            <FaFolderPlus /> New Category
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="btn btn-primary" 
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'var(--primary)', borderColor: 'var(--primary)', color: 'white' }}
          >
            <FaPlus /> Add Menu Item
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '250px' }}>
          <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text"
            placeholder="Search dishes by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.75rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '10px', 
              outline: 'none', 
              fontSize: '0.95rem',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        {/* Category Dropdown Filter */}
        <div style={{ minWidth: '200px' }}>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              border: '1px solid #e2e8f0', 
              borderRadius: '10px', 
              outline: 'none', 
              fontSize: '0.95rem',
              background: '#ffffff'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Table */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f0ede8', overflowX: 'auto' }}>
        {filteredItems.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Name</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Category</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Price</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Featured</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1.1rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{item.name}</div>
                    {item.description && (
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1.1rem 1rem' }}>
                    <span style={{ 
                      background: '#f1f5f9', 
                      color: '#475569', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600 
                    }}>
                      {item.category?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ padding: '1.1rem 1rem', fontWeight: 600, color: '#0f172a' }}>
                    {item.price ? `₹${item.price}` : '—'}
                  </td>
                  <td style={{ padding: '1.1rem 1rem' }}>
                    <span style={{ 
                      color: item.isFeatured ? '#10b981' : '#cbd5e1', 
                      fontSize: '0.85rem', 
                      fontWeight: 600 
                    }}>
                      {item.isFeatured ? '★ Featured' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: '1.1rem 1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleOpenEditModal(item)}
                      style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.5rem', marginRight: '0.5rem' }}
                      title="Edit Item"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(item)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                      title="Delete Item"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>No menu items found</p>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.25rem' }}>Try refining your search or add a new menu item.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Menu Item Modal */}
      {itemModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '540px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button 
                onClick={() => setItemModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', padding: 0 }}
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitItem} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {errorMsg && (
                <div style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fee2e2', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Item Name *</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Garlic Naan, Veg Manchuria"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Price */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Price (₹)</label>
                  <input 
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 150 (Leave blank for N/A)"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem' }}
                  />
                </div>

                {/* Category Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Category *</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select 
                      name="categoryId"
                      required
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      style={{ flexGrow: 1, padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem', background: '#ffffff' }}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <button 
                      type="button"
                      onClick={() => setCategoryModalOpen(true)}
                      style={{ 
                        background: '#f1f5f9', 
                        border: '1px solid #cbd5e1', 
                        borderRadius: '8px', 
                        padding: '0.5rem 0.75rem', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#475569'
                      }}
                      title="Add New Category"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Description</label>
                <textarea 
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the dish ingredients or dietary indicators..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>

              {/* Featured Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleCheckboxChange}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="isFeatured" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  Feature this item on homepage
                </label>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => setItemModalOpen(false)} 
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)', color: 'white', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                  disabled={loading}
                >
                  {loading && <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite' }} />}
                  {selectedItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline Category Creation Modal */}
      {categoryModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Create New Category</h3>
              <button 
                onClick={() => setCategoryModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', padding: 0 }}
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitCategory} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Category Name *</label>
                <input 
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Soups, Chinese Starters"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => setCategoryModalOpen(false)} 
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)', color: 'white', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                  disabled={loading || !newCategoryName.trim()}
                >
                  {loading && <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite' }} />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Delete Menu Item</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>{itemToDelete?.name}</strong>? This action is permanent and cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setDeleteModalOpen(false)} 
                className="btn btn-outline"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleDeleteItem}
                className="btn" 
                style={{ backgroundColor: '#ef4444', color: 'white', border: '1px solid #ef4444', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                disabled={loading}
              >
                {loading && <FaSpinner className="spinner" style={{ animation: 'spin 1s linear infinite' }} />}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
