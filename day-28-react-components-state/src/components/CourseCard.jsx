/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: CourseCard.jsx
 * ==========================================================================
 * Demonstrates:
 * - Reusable UI component driven purely by props
 * - Conditional CSS classes and conditional rendering based on course.isFavorite
 * - Synthetic event handling passing identifiers back to parent callbacks
 */

import React from 'react';

export default function CourseCard({ course, onToggleFavorite, onDeleteCourse }) {
    const {
        id,
        title,
        instructor,
        category,
        level,
        price,
        duration,
        description,
        isFavorite,
        icon
    } = course;

    return (
        <article className={`course-card ${isFavorite ? 'card-favorited' : ''}`}>
            {/* Conditional Favorite Highlight Banner */}
            {isFavorite && (
                <div className="favorite-banner">
                    <span>❤️ Bookmarked Track</span>
                </div>
            )}

            <div className="card-top-row">
                <span className="card-icon">{icon}</span>
                <div className="badge-group">
                    <span className="badge badge-category">{category}</span>
                    <span className="badge badge-level">{level}</span>
                </div>
            </div>

            <h3 className="card-title">{title}</h3>
            <p className="card-instructor">By {instructor}</p>
            <p className="card-description">{description}</p>

            <div className="card-meta-row">
                <span className="meta-item">⏱️ {duration}</span>
                <span className="meta-item price-badge">${price}</span>
            </div>

            <div className="card-footer">
                <button
                    type="button"
                    className={`btn-favorite-toggle ${isFavorite ? 'is-favorited' : ''}`}
                    onClick={() => onToggleFavorite(id)}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                </button>

                <button
                    type="button"
                    className="btn-delete-course"
                    onClick={() => onDeleteCourse(id)}
                    title="Remove course from catalog"
                >
                    🗑️ Remove
                </button>
            </div>
        </article>
    );
}
