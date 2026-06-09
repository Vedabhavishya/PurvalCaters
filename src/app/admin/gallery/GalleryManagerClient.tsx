"use client";

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaImage, FaVideo } from 'react-icons/fa';
import styles from './page.module.css';

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  title: string | null;
  createdAt: string;
}

export default function GalleryManagerClient() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: 'PHOTO', // Default to photo
    url: ''
  });

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchItems();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim()) return;

    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setFormData({ title: '', type: 'PHOTO', url: '' });
      fetchItems();
    } else {
      const errorData = await res.json();
      alert(errorData.error || 'Failed to create gallery item');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Media Gallery Manager</h1>
        <button className={`btn btn-primary ${styles.addBtn}`} onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Photo/Video
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Type</th>
              <th>Source URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  Loading media...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No media items registered. Click "Add Photo/Video" to upload your first asset.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.thumbnailContainer}>
                      {item.type === 'PHOTO' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.url} 
                          alt={item.title || 'Gallery Image'} 
                          className={styles.thumbnail}
                          onError={(e) => {
                            // Render icon fallback if URL is broken
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <video src={item.url} className={styles.thumbnail} muted />
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{item.title || 'Untitled'}</td>
                  <td>
                    <span className={`${styles.typeBadge} ${item.type === 'PHOTO' ? styles.photo : styles.video}`}>
                      {item.type === 'PHOTO' ? 'Photo' : 'Video'}
                    </span>
                  </td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                      {item.url}
                    </a>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(item.id)}
                        title="Delete Media"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add New Gallery Media</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Media Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Wedding Setup, Live Dosa counter"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Media Type *</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="PHOTO">Photo</option>
                  <option value="VIDEO">Video</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Media Link / URL *</label>
                <input 
                  type="url" 
                  required
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                  placeholder="https://example.com/asset.jpg or .mp4"
                />
              </div>
              
              <div className={styles.modalActions}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
