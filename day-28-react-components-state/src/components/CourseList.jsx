/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: CourseList.jsx
 * ==========================================================================
 * Demonstrates:
 * - Dynamic list rendering using Array.prototype.map()
 * - Crucial key prop using unique course.id
 * - Conditional UI rendering for zero-result states
 * - Passing event handler props down to child CourseCard components
 */

import React from 'react';
import CourseCard from './CourseCard.jsx';

export default function CourseList({ courses, onToggleFavorite, onDeleteCourse, onResetFilters }) {
    // 1. Conditional UI: Empty State
    if (!courses || courses.length === 0) {
        return (
            <div className="empty-results-box">
                <span className="empty-icon">🔍</span>
                <h3>No Matching Courses Found</h3>
                <p>
                    We couldn't find any courses matching your active search keywords or category filters.
                </p>
                <button 
                    type="button" 
                    className="btn-reset-empty" 
                    onClick={onResetFilters}
                >
                    Reset Filters & View All
                </button>
            </div>
        );
    }

    // 2. List Rendering with Keys
    return (
        <section className="course-list-container" aria-label="Available Courses">
            <div className="list-meta-header">
                <span className="results-count">
                    Showing <strong>{courses.length}</strong> curriculum programs
                </span>
            </div>

            <div className="courses-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onToggleFavorite={onToggleFavorite}
                        onDeleteCourse={onDeleteCourse}
                    />
                ))}
            </div>
        </section>
    );
}
