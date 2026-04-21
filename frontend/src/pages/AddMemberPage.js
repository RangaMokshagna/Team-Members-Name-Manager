import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMemberPage.css';

const BACKEND = 'http://localhost:5000';

function AddMemberPage() {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [form, setForm] = useState({
    name: '', rollNumber: '', year: '', degree: '',
    email: '', role: '', project: '', hobbies: '',
    certificate: '', internship: '', aboutYourAim: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!form.year.trim()) newErrors.year = 'Year is required';
    if (!form.degree.trim()) newErrors.degree = 'Degree is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (image) formData.append('image', image);

      await axios.post(`${BACKEND}/members`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: '✅ Member added successfully!' });
      setForm({ name: '', rollNumber: '', year: '', degree: '', email: '', role: '', project: '', hobbies: '', certificate: '', internship: '', aboutYourAim: '' });
      setImage(null);
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = '';

      setTimeout(() => navigate('/view'), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add member. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ADD MEMBER</h1>
        <p className="page-subtitle">Register a new team member to the database</p>
      </div>

      <div className="add-form-wrapper">
        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="add-form" noValidate>
          {/* Left column */}
          <div className="form-left">
            {/* Image Upload */}
            <div className="image-upload-section">
              <div
                className="image-drop-zone"
                onClick={() => fileRef.current.click()}
                style={imagePreview ? { backgroundImage: `url(${imagePreview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {!imagePreview && (
                  <div className="image-drop-inner">
                    <span className="upload-icon">📸</span>
                    <span className="upload-text">Click to upload photo</span>
                    <span className="upload-hint">JPG, PNG, GIF up to 10MB</span>
                  </div>
                )}
                {imagePreview && <div className="image-overlay">Change Photo</div>}
              </div>
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                onChange={handleImage}
                style={{ display: 'none' }}
              />
            </div>

            {/* Basic info */}
            <div className="form-group">
              <label>Full Name *</label>
              <input className={`form-control ${errors.name ? 'error' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Roll Number *</label>
                <input className={`form-control ${errors.rollNumber ? 'error' : ''}`} name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="RA21..." />
                {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}
              </div>
              <div className="form-group">
                <label>Year *</label>
                <select className={`form-control ${errors.year ? 'error' : ''}`} name="year" value={form.year} onChange={handleChange}>
                  <option value="">Select year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                {errors.year && <span className="field-error">{errors.year}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Degree *</label>
              <input className={`form-control ${errors.degree ? 'error' : ''}`} name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
              {errors.degree && <span className="field-error">{errors.degree}</span>}
            </div>
          </div>

          {/* Right column */}
          <div className="form-right">
            <div className="form-grid-2">
              <div className="form-group">
                <label>Email</label>
                <input className={`form-control ${errors.email ? 'error' : ''}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Role</label>
                <input className="form-control" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Dev" />
              </div>
            </div>

            <div className="form-group">
              <label>About Project</label>
              <textarea className="form-control" name="project" value={form.project} onChange={handleChange} placeholder="Describe your project..." rows={3} />
            </div>

            <div className="form-group">
              <label>Hobbies (comma separated)</label>
              <input className="form-control" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="reading, gaming, coding..." />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Certificate</label>
                <input className="form-control" name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. AWS, Fullstack" />
              </div>
              <div className="form-group">
                <label>Internship</label>
                <input className="form-control" name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. Cloud computing" />
              </div>
            </div>

            <div className="form-group">
              <label>About Your Aim</label>
              <textarea className="form-control" name="aboutYourAim" value={form.aboutYourAim} onChange={handleChange} placeholder="What do you aspire to achieve?" rows={3} />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Submitting...' : '🚀 Submit Member'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberPage;
