import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-title">
        
        <span style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "8px" }}>TicketMaster</span>
      </div>
      <div className="nav-links">
        <Link to="/">Find Event</Link>
        <Link to="/create">Create Event</Link>
      </div>
    </nav>
  );
}

export default Navbar;
