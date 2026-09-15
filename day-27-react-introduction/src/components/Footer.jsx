/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * Component: Footer.jsx
 * ==========================================================================
 * Functional component demonstrating:
 * - Simple props rendering (brandName, year, studentCount)
 * - Semantic HTML inside JSX
 */

import React from 'react';

export default function Footer({ brandName, year = 2026, studentCount }) {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-left">
                    <div className="footer-brand">
                        <span>⚛️</span>
                        <strong>{brandName}</strong>
                    </div>
                    <p className="footer-tagline">
                        Empowering {studentCount} software engineers globally with component-driven architecture and production design patterns.
                    </p>
                </div>

                <div className="footer-right">
                    <div className="footer-meta">
                        <span>Built with Pure React 18 Functional Components & Props</span>
                        <p>© {year} {brandName}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
