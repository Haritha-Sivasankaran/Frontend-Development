/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * Component: CourseCard.jsx
 * ==========================================================================
 * Functional component demonstrating:
 * - Nested props destructuring
 * - Conditional rendering in JSX (featured badge)
 * - Array rendering with keys (tags list)
 * - Event handling via synthetic onClick events
 */

import React from 'react';

export default function CourseCard({ course, onEnroll, onPreview }) {
    const {
        title,
        category,
        level,
        duration,
        price,
        rating,
        reviews,
        description,
        tags,
        featured,
        icon
    } = course;

    return (
        <article className={`course-card ${featured ? 'card-featured' : ''}`}>
            <div className="card-top-bar">
                <span className="course-icon">{icon}</span>
                <div className="card-badges">
                    <span className="badge badge-category">{category}</span>
                    <span className="badge badge-level">{level}</span>
                    {featured && <span className="badge badge-featured">⭐ Featured</span>}
                </div>
            </div>

            <h3 className="course-title">{title}</h3>
            <p className="course-description">{description}</p>

            <div className="course-tags">
                {tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="course-metrics-row">
                <span className="metric-item">⏱️ {duration}</span>
                <span className="metric-item rating-text">
                    ★ {rating.toFixed(1)} <small>({reviews})</small>
                </span>
            </div>

            <div className="card-footer">
                <div className="price-tag">${price}</div>
                <div className="card-action-group">
                    <button 
                        type="button" 
                        className="btn-card-secondary"
                        onClick={() => onPreview(course)}
                    >
                        Syllabus
                    </button>
                    <button 
                        type="button" 
                        className="btn-card-primary"
                        onClick={() => onEnroll(course)}
                    >
                        Enroll Now →
                    </button>
                </div>
            </div>
        </article>
    );
}
