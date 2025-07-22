import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="content">
        <h1>Discover and Book Events</h1>
        <p>Manage, book, and explore events seamlessly.</p>
        <Link to="/">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
