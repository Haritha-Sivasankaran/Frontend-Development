/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: Footer.jsx
 * ==========================================================================
 * Demonstrates:
 * - Simple presentation component driven by props
 */

import React from 'react';

export default function Footer({ totalCourses, favoriteCount, year = 2026 }) {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-left">
                    <div className="footer-brand">
                        <span>⚛️</span>
                        <strong>EduSphere Course Dashboard</strong>
                    </div>
                    <p className="footer-text">
                        Managing {totalCourses} technical training tracks with {favoriteCount} bookmarked courses using React functional components, props, and useState.
                    </p>
                </div>

                <div className="footer-right">
                    <p>© {year} EduSphere Institute. All rights reserved.</p>
                    <small style={{ color: '#64748b' }}>React 18 • Declarative Component Architecture</small>
                </div>
            </div>
        </footer>
    );
}
