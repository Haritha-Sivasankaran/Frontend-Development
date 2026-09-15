/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: AddCourseForm.jsx
 * ==========================================================================
 * Demonstrates:
 * - Local component state using useState hook
 * - Controlled input handling
 * - Form validation and conditional error display
 * - Lifting state up: passes new course object to parent onAddCourse callback
 */

import React, { useState } from 'react';

export default function AddCourseForm({ onAddCourse, onCloseForm }) {
    // Local state variables for controlled form inputs
    const [title, setTitle] = useState('');
    const [instructor, setInstructor] = useState('');
    const [category, setCategory] = useState('Frontend');
    const [level, setLevel] = useState('Beginner');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!title.trim() || !instructor.trim() || !price || !duration.trim() || !description.trim()) {
            setErrorMessage('Please fill out all required fields with valid details.');
            return;
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setErrorMessage('Tuition price must be a positive number.');
            return;
        }

        // Icon mapper based on category
        const iconMap = {
            Frontend: '⚛️',
            Backend: '🟢',
            Cloud: '☁️',
            Data: '🐍',
            Design: '🎨'
        };

        const newCourse = {
            id: `course-${Date.now()}`,
            title: title.trim(),
            instructor: instructor.trim(),
            category,
            level,
            price: Math.round(numericPrice),
            duration: duration.trim(),
            description: description.trim(),
            isFavorite: false,
            icon: iconMap[category] || '📘'
        };

        // Lift state up to parent App component
        onAddCourse(newCourse);

        // Reset form inputs
        setTitle('');
        setInstructor('');
        setCategory('Frontend');
        setLevel('Beginner');
        setPrice('');
        setDuration('');
        setDescription('');
        setErrorMessage('');
    };

    return (
        <section className="form-modal-panel">
            <div className="form-card">
                <div className="form-header">
                    <h3>➕ Add New Curriculum Program</h3>
                    <button 
                        type="button" 
                        className="btn-close-form" 
                        onClick={onCloseForm}
                        aria-label="Close form"
                    >
                        ✕
                    </button>
                </div>

                {/* Conditional Error Rendering */}
                {errorMessage && (
                    <div className="form-error-banner">
                        ⚠️ {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="course-title">Course Title *</label>
                            <input
                                id="course-title"
                                type="text"
                                className="form-control"
                                placeholder="e.g. Full-Stack GraphQL Architecture"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course-instructor">Lead Instructor *</label>
                            <input
                                id="course-instructor"
                                type="text"
                                className="form-control"
                                placeholder="e.g. Dr. Alex Mercer"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-grid-4">
                        <div className="form-group">
                            <label htmlFor="course-category">Domain Category *</label>
                            <select
                                id="course-category"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Data">Data</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="course-level">Skill Level *</label>
                            <select
                                id="course-level"
                                className="form-control"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="All Levels">All Levels</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="course-price">Tuition ($) *</label>
                            <input
                                id="course-price"
                                type="number"
                                min="1"
                                className="form-control"
                                placeholder="399"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course-duration">Duration *</label>
                            <input
                                id="course-duration"
                                type="text"
                                className="form-control"
                                placeholder="e.g. 8 Weeks"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="course-desc">Syllabus Overview *</label>
                        <textarea
                            id="course-desc"
                            className="form-control"
                            rows="3"
                            placeholder="Describe core technologies, projects, and learning outcomes..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-actions-row">
                        <button type="button" className="btn-cancel" onClick={onCloseForm}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Save Course to Catalog →
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
