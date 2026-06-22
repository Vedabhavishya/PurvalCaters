"use client";

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './page.module.css';

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  imageUrl: string | null;
  rating: number;
  isVisible: boolean;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    imageUrl: '',
    rating: 5,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials');
    if (res.ok) {
      const data = await res.json();
      setTestimonials(data);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVisible: !currentVisibility }),
    });
    
    if (res.ok) {
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      fetchTestimonials();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let uploadedImageUrl = formData.imageUrl;

    if (selectedFile) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'supperclub';
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
      uploadData.append('upload_preset', uploadPreset);

      try {
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: uploadData,
        });

        if (uploadRes.ok) {
          const resData = await uploadRes.json();
          uploadedImageUrl = resData.secure_url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (err) {
        console.error('Cloudinary upload error:', err);
        alert('Failed to upload image to Cloudinary. Saving review without image.');
        uploadedImageUrl = '';
      }
    }

    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, imageUrl: uploadedImageUrl, isVisible: true }),
    });

    setIsUploading(false);

    if (res.ok) {
      setIsModalOpen(false);
      setFormData({ name: '', role: '', content: '', imageUrl: '', rating: 5 });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchTestimonials();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Reviews & Testimonials</h1>
        <button className={`btn btn-primary ${styles.addBtn}`} onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Review
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Review</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                  No reviews found. Click "Add Review" to create one.
                </td>
              </tr>
            ) : (
              testimonials.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.name}</td>
                  <td>{t.role || '-'}</td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.content}
                  </td>
                  <td>
                    <span className={`${styles.status} ${t.isVisible ? styles.active : styles.hidden}`}>
                      {t.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={`${styles.actionBtn} ${styles.toggle}`}
                        onClick={() => handleToggleVisibility(t.id, t.isVisible)}
                        title={t.isVisible ? 'Hide from public' : 'Show to public'}
                      >
                        {t.isVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(t.id)}
                        title="Delete Review"
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
            <h2>Add New Review</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Reviewer Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role / Company</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  placeholder="e.g. Wedding Host"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Reviewer Image (Upload or URL)</label>
                {previewUrl || formData.imageUrl ? (
                  <div className={styles.uploadPreview}>
                    <img src={previewUrl || formData.imageUrl} alt="Reviewer Preview" />
                    <div className={styles.uploadPreviewDetails}>
                      <span>{previewUrl ? 'Local file selected' : 'Image URL specified'}</span>
                      <button 
                        type="button" 
                        className={styles.removePhotoBtn} 
                        onClick={() => {
                          handleRemovePhoto();
                          setFormData(prev => ({ ...prev, imageUrl: '' }));
                        }}
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.uploadArea}>
                    <div className={styles.uploadContent}>
                      <FaPlus className={styles.uploadIcon} />
                      <span>Choose profile photo</span>
                      <span className={styles.helperText}>PNG, JPG or WebP (max. 5MB)</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                <div style={{ marginTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>Or paste image URL directly:</span>
                  <input 
                    type="url" 
                    value={formData.imageUrl}
                    onChange={e => {
                      setFormData({...formData, imageUrl: e.target.value});
                      handleRemovePhoto();
                    }}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Rating (1-5)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="5" 
                  required 
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Review Content *</label>
                <textarea 
                  required 
                  rows={4}
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>
              
              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="btn btn-primary">
                  {isUploading ? 'Uploading Image...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
