/**
 * ==========================================================================
 * DAY 27: REACT INTRODUCTION
 * File: src/App.jsx
 * ==========================================================================
 * Root Application Component demonstrating:
 * - Component-based tree architecture
 * - Composing Header, InstructorCard, CourseList, and Footer
 * - Passing data & event callbacks through props
 * - Unidirectional data flow (Parent -> Children)
 */

import React, { useState } from 'react';
import Header from './components/Header.jsx';
import InstructorCard from './components/InstructorCard.jsx';
import CourseList from './components/CourseList.jsx';
import Footer from './components/Footer.jsx';
import { instructorData, coursesData } from './data/coursesData.js';

export default function App() {
    // Simple category filter state for demonstrations
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter courses based on selected category (Unidirectional flow)
    const displayedCourses = selectedCategory === 'All'
        ? coursesData
        : coursesData.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

    // Event Handler 1: Handle Course Enrollment
    const handleEnroll = (course) => {
        alert(`🎓 Congratulations! You are enrolling in:\n"${course.title}"\nTuition: $${course.price}\nDuration: ${course.duration}`);
    };

    // Event Handler 2: Handle Syllabus Preview
    const handlePreview = (course) => {
        alert(`📖 Syllabus Preview for "${course.title}":\n${course.description}\nLevel: ${course.level}\nRating: ★ ${course.rating} (${course.reviews} reviews)`);
    };

    // Event Handler 3: Contact Instructor
    const handleContactInstructor = (instructorName) => {
        alert(`✉️ Messaging ${instructorName}:\nOur staff will route your question to the instructor's weekly office hours!`);
    };

    return (
        <div className="app-root">
            {/* 1. Header Component with Props */}
            <Header
                brandName="EduSphere Academy"
                courseCount={displayedCourses.length}
                onFilterCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="container">
                    <h1>Learn Modern Frontend Engineering with React 18</h1>
                    <p>
                        Discover component-driven architecture, declarative UI design, unidirectional props flow, and synthetic event systems taught by world-class software architects.
                    </p>
                </div>
            </section>

            {/* 2. Main Two-Column Layout */}
            <main className="container app-layout">
                {/* Left Column: Instructor Profile Component */}
                <InstructorCard
                    instructor={instructorData}
                    onContactInstructor={handleContactInstructor}
                />

                {/* Right Column: Course Catalog Component */}
                <CourseList
                    courses={displayedCourses}
                    onEnroll={handleEnroll}
                    onPreview={handlePreview}
                />
            </main>

            {/* 3. Educational Showcase Section */}
            <section className="container concepts-showcase">
                <div className="concepts-header">
                    <h2>Core React Architecture Concepts in this App</h2>
                    <p style="color: var(--text-muted);">How React's fundamental mental model differs from imperative DOM manipulation.</p>
                </div>

                <div className="concepts-grid">
                    <div className="concept-box">
                        <h4>🧩 Component-Based Design</h4>
                        <p>
                            UI is split into independent, reusable functional components (<code>Header</code>, <code>CourseCard</code>, <code>InstructorCard</code>, <code>Footer</code>), each responsible for rendering its slice of the DOM.
                        </p>
                    </div>

                    <div className="concept-box">
                        <h4>📥 Props (Properties)</h4>
                        <p>
                            Data flows strictly unidirectional from parent (<code>App</code>) to children. Props are read-only and immutable to the receiving component.
                        </p>
                    </div>

                    <div className="concept-box">
                        <h4>🔑 The 'key' Prop in Lists</h4>
                        <p>
                            React requires a unique <code>key</code> (e.g. <code>course.id</code>) on each array item to track DOM element identity efficiently during reconciliation.
                        </p>
                    </div>

                    <div className="concept-box">
                        <h4>⚡ Synthetic Event Handling</h4>
                        <p>
                            Events like <code>onClick</code> use camelCase syntax and pass function references instead of string handlers, providing a consistent cross-browser event wrapper.
                        </p>
                    </div>

                    <div className="concept-box">
                        <h4>✨ Declarative JSX</h4>
                        <p>
                            JSX combines JavaScript logic and HTML-like markup into a single syntax that compiles down to <code>React.createElement()</code> calls.
                        </p>
                    </div>

                    <div className="concept-box">
                        <h4>🌲 The Virtual DOM</h4>
                        <p>
                            React maintains an in-memory representation of the UI tree. When data changes, React diffs the Virtual DOM and updates only the altered browser DOM nodes.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. Footer Component with Props */}
            <Footer
                brandName="EduSphere Academy"
                studentCount={instructorData.totalStudents}
                year={2026}
            />
        </div>
    );
}
