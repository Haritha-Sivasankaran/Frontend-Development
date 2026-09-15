/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: CourseStats.jsx
 * ==========================================================================
 * Demonstrates:
 * - Deriving presentation data from incoming props
 * - Pure rendering without internal state mutation
 */

import React from 'react';

export default function CourseStats({ courses }) {
    const totalCount = courses.length;
    const favoriteCount = courses.filter((c) => c.isFavorite).length;

    const totalPrice = courses.reduce((sum, c) => sum + Number(c.price || 0), 0);
    const avgPrice = totalCount > 0 ? Math.round(totalPrice / totalCount) : 0;

    // Find most common category
    const categoryCounts = {};
    courses.forEach((c) => {
        categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    let topCategory = "N/A";
    let maxCount = 0;
    Object.keys(categoryCounts).forEach((cat) => {
        if (categoryCounts[cat] > maxCount) {
            maxCount = categoryCounts[cat];
            topCategory = cat;
        }
    });

    return (
        <section className="stats-dashboard" aria-label="Catalog Overview">
            <div className="stat-card">
                <div className="stat-header">
                    <span>Total Courses</span>
                    <span>📚</span>
                </div>
                <div className="stat-value">{totalCount}</div>
                <div className="stat-subtext">Active curriculum tracks</div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <span>Favorited</span>
                    <span>❤️</span>
                </div>
                <div className="stat-value" style={{ color: '#e11d48' }}>
                    {favoriteCount}
                </div>
                <div className="stat-subtext">Saved by student interest</div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <span>Average Tuition</span>
                    <span>💵</span>
                </div>
                <div className="stat-value" style={{ color: '#0284c7' }}>
                    ${avgPrice}
                </div>
                <div className="stat-subtext">Across all specializations</div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <span>Top Domain</span>
                    <span>⭐</span>
                </div>
                <div className="stat-value" style={{ fontSize: '1.4rem' }}>
                    {topCategory}
                </div>
                <div className="stat-subtext">{maxCount} published programs</div>
            </div>
        </section>
    );
}
