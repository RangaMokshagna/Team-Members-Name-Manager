import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ teamName }) {
  return (
    <div className="home-page">
      {/* Animated background */}
      <div className="home-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="home-content">
        {/* Header */}
        <div className="home-header">
          <div className="home-tag">
            <span className="tag-dot"></span>
            SRM Institute of Science and Technology
          </div>
          <h1 className="home-title">{teamName}</h1>
          <p className="home-subtitle">
            Welcome to the {teamName} Management Portal
          </p>
          <p className="home-desc">
            Full Stack Development · 21CSS301T · III Year / VI Sem
          </p>
        </div>

        {/* Manage Team box */}
        <div className="home-card">
          <div className="home-card-label">Manage Team</div>
          <div className="home-actions">
            <Link to="/add" className="home-action-btn primary">
              <span className="action-icon">＋</span>
              <div>
                <div className="action-title">Add Member</div>
                <div className="action-desc">Register a new team member</div>
              </div>
            </Link>
            <Link to="/view" className="home-action-btn secondary">
              <span className="action-icon">◉</span>
              <div>
                <div className="action-title">View Members</div>
                <div className="action-desc">Browse all team members</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="home-stats">
          <div className="stat-item">
            <span className="stat-label">Course</span>
            <span className="stat-value">Full Stack Dev</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Stack</span>
            <span className="stat-value">React + Node + MongoDB</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label">Team Name</span>
            <span className="stat-value">Team X</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
