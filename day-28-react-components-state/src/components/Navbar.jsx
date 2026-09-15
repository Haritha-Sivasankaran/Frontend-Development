/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: Navbar.jsx
 * ==========================================================================
 * Demonstrates:
 * - Functional component receiving props
 * - Event handling (calling parent callback onToggleForm)
 * - Conditional button text/icon based on boolean prop (isFormOpen)
 */

import React from 'react';

export default function Navbar({ totalCourses, favoriteCount, onToggleForm, isFormOpen }) {
    return (
        <header className="navbar">
            <div className="container nav-container">
                <div className="nav-brand">
                    <span className="react-logo-spin">⚛️</span>
                    <div>
                        <span className="brand-text">EduSphere</span>
                        <span className="brand-sub">Course Dashboard</span>
                    </div>
                </div>

                <div className="nav-actions">
                    <div className="nav-stats-badges">
                        <span className="stat-pill">
                            📦 <strong>{totalCourses}</strong> Total
                        </span>
                        <span className="stat-pill favorite-pill">
                            ❤️ <strong>{favoriteCount}</strong> Saved
                        </span>
                    </div>

                    <button 
                        type="button" 
                        className={`btn-toggle-form ${isFormOpen ? 'btn-active' : ''}`}
                        onClick={onToggleForm}
                    >
                        {isFormOpen ? '✕ Close Form' : '➕ Add Course'}
                    </button>
                </div>
            </div>
        </header>
    );
}
