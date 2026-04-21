import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MemberDetailsPage.css';

const BACKEND = 'http://localhost:5000';

function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`${BACKEND}/members/${id}`);
        setMember(res.data);
      } catch (err) {
        setError('Member not found or server is unreachable.');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return (
    <div className="page-container">
      <div className="loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="page-container">
      <div className="alert alert-error">{error}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/view')}>← Back to Members</button>
    </div>
  );

  const imageSrc = member.image ? `${BACKEND}/${member.image}` : null;

  return (
    <div className="page-container details-page">
      <button className="btn btn-secondary back-btn" onClick={() => navigate('/view')}>
        ← Back to Members
      </button>

      <div className="details-layout">
        {/* Left: Image + quick info */}
        <div className="details-left">
          <div className="details-img-wrap">
            {imageSrc ? (
              <img src={imageSrc} alt={member.name} className="details-img" />
            ) : (
              <div className="details-avatar">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="details-name-block">
            <h1 className="details-name">{member.name}</h1>
            <p className="details-degree-year">{member.degree} · {member.year}</p>
            {member.role && <span className="badge badge-purple">{member.role}</span>}
          </div>

          <div className="details-quick-info">
            {member.rollNumber && (
              <div className="quick-info-item">
                <span className="qi-icon">🎫</span>
                <div>
                  <span className="qi-label">Roll Number</span>
                  <span className="qi-value">{member.rollNumber}</span>
                </div>
              </div>
            )}
            {member.email && (
              <div className="quick-info-item">
                <span className="qi-icon">📧</span>
                <div>
                  <span className="qi-label">Email</span>
                  <span className="qi-value">{member.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed info */}
        <div className="details-right">
          {member.project && (
            <div className="detail-section">
              <h3 className="detail-section-title">
                <span className="ds-icon">💡</span> Project
              </h3>
              <p className="detail-text">{member.project}</p>
            </div>
          )}

          {member.certificate && (
            <div className="detail-section">
              <h3 className="detail-section-title">
                <span className="ds-icon">🏆</span> Certificate
              </h3>
              <p className="detail-text">{member.certificate}</p>
            </div>
          )}

          {member.internship && (
            <div className="detail-section">
              <h3 className="detail-section-title">
                <span className="ds-icon">💼</span> Internship
              </h3>
              <p className="detail-text">{member.internship}</p>
            </div>
          )}

          {member.aboutYourAim && (
            <div className="detail-section">
              <h3 className="detail-section-title">
                <span className="ds-icon">🎯</span> About Your Aim
              </h3>
              <p className="detail-text">{member.aboutYourAim}</p>
            </div>
          )}

          {member.hobbies && member.hobbies.length > 0 && (
            <div className="detail-section">
              <h3 className="detail-section-title">
                <span className="ds-icon">🎨</span> Hobbies
              </h3>
              <div className="hobbies-list">
                {member.hobbies.map((hobby, i) => (
                  <span key={i} className={`badge ${i % 3 === 0 ? 'badge-purple' : i % 3 === 1 ? 'badge-green' : 'badge-pink'}`}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Member ID section for API reference */}
          <div className="detail-section detail-id-section">
            <h3 className="detail-section-title">
              <span className="ds-icon">🔗</span> API Reference
            </h3>
            <div className="api-endpoint">
              <span className="api-method">GET</span>
              <code className="api-url">/members/{member._id}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsPage;
