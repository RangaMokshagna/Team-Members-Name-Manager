import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewMembersPage.css';

const BACKEND = 'http://localhost:5000';

function MemberCard({ member }) {
  const imageSrc = member.image
    ? `${BACKEND}/${member.image}`
    : null;

  return (
    <div className="member-card">
      <div className="member-card-img-wrap">
        {imageSrc ? (
          <img src={imageSrc} alt={member.name} className="member-card-img" />
        ) : (
          <div className="member-card-avatar">
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="member-card-overlay"></div>
      </div>

      <div className="member-card-body">
        <h3 className="member-card-name">{member.name}</h3>
        <div className="member-card-roll">Roll No: {member.rollNumber}</div>
        {member.role && <span className="badge badge-purple member-card-role">{member.role}</span>}

        <div className="member-card-meta">
          {member.degree && <span className="meta-item">🎓 {member.degree}</span>}
          {member.year && <span className="meta-item">📅 {member.year}</span>}
        </div>

        <Link to={`/members/${member._id}`} className="btn btn-primary view-details-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${BACKEND}/members`);
        setMembers(res.data);
      } catch (err) {
        setError('Could not fetch members. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">MEET THE TEAM</h1>
        <p className="page-subtitle">{members.length} member{members.length !== 1 ? 's' : ''} registered</p>
      </div>

      {/* Search bar */}
      <div className="search-bar-wrap">
        <input
          className="form-control search-bar"
          placeholder="🔍 Search by name or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Link to="/add" className="btn btn-primary">+ Add Member</Link>
      </div>

      {loading && (
        <div className="loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>{search ? 'No members match your search.' : 'No members yet.'}</h3>
          <p style={{ marginTop: 8, marginBottom: 24 }}>
            {search ? 'Try a different search term.' : 'Add your first team member to get started.'}
          </p>
          {!search && <Link to="/add" className="btn btn-primary">Add First Member</Link>}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="members-grid">
          {filtered.map(member => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembersPage;
