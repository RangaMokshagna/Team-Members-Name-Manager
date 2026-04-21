import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';

const TEAM_NAME = 'TEAM x';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">{TEAM_NAME}</Link>
      <div className="navbar-links">
        <Link to="/">
          <button className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}>Home</button>
        </Link>
        <Link to="/add">
          <button className={`nav-btn ${location.pathname === '/add' ? 'active' : ''}`}>Add Member</button>
        </Link>
        <Link to="/view">
          <button className={`nav-btn ${location.pathname === '/view' ? 'active' : ''}`}>View Members</button>
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage teamName={TEAM_NAME} />} />
        <Route path="/add" element={<AddMemberPage />} />
        <Route path="/view" element={<ViewMembersPage />} />
        <Route path="/members/:id" element={<MemberDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
