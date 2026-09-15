/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * Component: Header.jsx
 * ==========================================================================
 * Functional component demonstrating:
 * - Functional component syntax
 * - Receiving and destructuring props (brandName, courseCount, onFilterCategory)
 * - JSX syntax & className attribute
 */

import React from 'react';

export default function Header({ brandName, courseCount, onFilterCategory }) {
    return (
        <header className="navbar">
            <div className="container nav-container">
                <div className="nav-brand">
                    <span className="react-logo-spin">⚛️</span>
                    <span className="brand-text">{brandName}</span>
                    <span className="react-badge">React 18</span>
                </div>

                <nav className="nav-controls">
                    <button 
                        type="button" 
                        className="nav-filter-btn active"
                        onClick={() => onFilterCategory('All')}
                    >
                        All Tracks ({courseCount})
                    </button>
                    <button 
                        type="button" 
                        className="nav-filter-btn"
                        onClick={() => onFilterCategory('Frontend')}
                    >
                        Frontend
                    </button>
                    <button 
                        type="button" 
                        className="nav-filter-btn"
                        onClick={() => onFilterCategory('Full-Stack')}
                    >
                        Full-Stack
                    </button>
                </nav>
            </div>
        </header>
    );
}
