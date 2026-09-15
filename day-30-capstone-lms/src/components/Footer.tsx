import React from 'react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Col 1: Brand & Overview */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎓</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              Ednue LMS
            </span>
          </div>
          <p>
            The capstone single-page application concluding the 30-Day Professional Frontend Development Curriculum.
            Combining HTML5, modern CSS3, ES6+, TypeScript, and React 18.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
            <li><a href="#courses" onClick={(e) => { e.preventDefault(); onNavigate('courses'); }}>Course Catalog</a></li>
            <li><a href="#dashboard" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>Student Dashboard</a></li>
            <li><a href="#register" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Register Account</a></li>
            <li><a href="#profile" onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}>Learner Profile</a></li>
          </ul>
        </div>

        {/* Col 3: Curriculum Pillars */}
        <div className="footer-col">
          <h4>30-Day Curriculum</h4>
          <ul>
            <li><a href="#html-css">HTML5 &amp; Modern CSS3</a></li>
            <li><a href="#responsive">Flexbox &amp; CSS Grid</a></li>
            <li><a href="#js-es6">JavaScript ES6+ &amp; DOM</a></li>
            <li><a href="#typescript">TypeScript 5.x Types</a></li>
            <li><a href="#react">React 18 Architecture</a></li>
          </ul>
        </div>

        {/* Col 4: Tech Stack */}
        <div className="footer-col">
          <h4>Technology Stack</h4>
          <ul>
            <li><span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>React 18 Functional Hooks</span></li>
            <li><span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>TypeScript Compile-Time Safety</span></li>
            <li><span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>Vite 5 Build Infrastructure</span></li>
            <li><span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>RESTful Fetch API Service</span></li>
            <li><span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>LocalStorage Persistence</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} Ednue Technologies. All rights reserved. 30-Day Frontend Development Curriculum Capstone.
        </div>
        <div>
          Crafted with React &bull; TypeScript &bull; Clean Architecture
        </div>
      </div>
    </footer>
  );
};
