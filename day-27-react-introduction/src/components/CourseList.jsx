/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * Component: CourseList.jsx
 * ==========================================================================
 * Functional component demonstrating:
 * - Rendering lists of data using Array.prototype.map()
 * - The critical 'key' prop (using unique course.id)
 * - Passing props down through child component hierarchy
 * - Conditional rendering for empty collections
 */

import React from 'react';
import CourseCard from './CourseCard.jsx';

export default function CourseList({ courses, onEnroll, onPreview }) {
    if (!courses || courses.length === 0) {
        return (
            <div className="empty-courses-state">
                <span className="empty-icon">📂</span>
                <h3>No Tracks Available</h3>
                <p>There are currently no courses matching the selected criteria.</p>
            </div>
        );
    }

    return (
        <section className="course-list-section" aria-label="Course Catalog">
            <div className="section-header-box">
                <div>
                    <h2 className="section-heading">Curated Learning Tracks</h2>
                    <p className="section-subheading">
                        Showing {courses.length} specialized engineering courses.
                    </p>
                </div>
            </div>

            {/* List Rendering using .map() and unique 'key' prop */}
            <div className="courses-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onEnroll={onEnroll}
                        onPreview={onPreview}
                    />
                ))}
            </div>
        </section>
    );
}
