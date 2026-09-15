import React from 'react';
import { NavigationTab, Student } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  enrolledCount: number;
  favoritesCount: number;
  student: Student | null;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  enrolledCount,
  favoritesCount,
  student,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    if (mobileMenuOpen) {
      onToggleMobileMenu();
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon" aria-hidden="true">🎓</div>
          <div className="brand-info">
            <h1>Ednue LMS</h1>
            <span>React + TypeScript</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <span>🏠</span> Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => handleNavClick('courses')}
            >
              <span>📚</span> Courses
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <span>📊</span> Dashboard
              {enrolledCount > 0 && (
                <span className="nav-counter" title={`${enrolledCount} enrolled courses`}>
                  {enrolledCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleNavClick('register')}
            >
              <span>📝</span> Register
            </button>
          </li>
        </ul>

        {/* Desktop Actions & Student Profile Badge */}
        <div className="nav-actions">
          {student ? (
            <div
              className="user-profile-badge"
              onClick={() => handleNavClick('profile')}
              title="View your student profile"
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="user-avatar-mini"
              />
              <span className="user-name-mini">{student.name}</span>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleNavClick('register')}
            >
              Join LMS
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-toggle-btn"
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => handleNavClick('courses')}
            >
              📚 Course Catalog ({favoritesCount} Favorites)
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              📊 Student Dashboard ({enrolledCount} Enrolled)
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleNavClick('register')}
            >
              📝 Student Registration
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
            >
              👤 Student Profile
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
