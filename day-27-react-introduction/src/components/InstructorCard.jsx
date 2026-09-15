/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * Component: InstructorCard.jsx
 * ==========================================================================
 * Functional component demonstrating:
 * - Complex props passing
 * - JSX composition
 * - List rendering with keys for badge chips
 */

import React from 'react';

export default function InstructorCard({ instructor, onContactInstructor }) {
    const {
        name,
        role,
        organization,
        avatar,
        bio,
        totalStudents,
        coursesCount,
        averageRating,
        badges
    } = instructor;

    return (
        <aside className="instructor-card">
            <div className="instructor-header">
                <img 
                    src={avatar} 
                    alt={name} 
                    className="instructor-avatar"
                />
                <div className="instructor-title-group">
                    <span className="badge badge-lead">Course Author</span>
                    <h2 className="instructor-name">{name}</h2>
                    <p className="instructor-role">{role}</p>
                    <p className="instructor-org">{organization}</p>
                </div>
            </div>

            <div className="instructor-badges">
                {badges.map((badge) => (
                    <span key={badge} className="badge badge-author-pill">
                        ✓ {badge}
                    </span>
                ))}
            </div>

            <p className="instructor-bio">{bio}</p>

            <div className="instructor-stats-grid">
                <div className="stat-box">
                    <span className="stat-number">{totalStudents}</span>
                    <span className="stat-label">Students Taught</span>
                </div>
                <div className="stat-box">
                    <span className="stat-number">{coursesCount}</span>
                    <span className="stat-label">Specializations</span>
                </div>
                <div className="stat-box">
                    <span className="stat-number">★ {averageRating}</span>
                    <span className="stat-label">Instructor Rating</span>
                </div>
            </div>

            <button 
                type="button" 
                className="btn-instructor-contact"
                onClick={() => onContactInstructor(name)}
            >
                💬 Ask Instructor a Question
            </button>
        </aside>
    );
}
