/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * File: src/App.jsx
 * ==========================================================================
 * Demonstrates:
 * - useState hook for managing dynamic collections and UI flags
 * - Lifting state up: centralizing state in parent and distributing via props
 * - Immutable state updates (spread syntax, filter, map)
 * - Derived state computation (filtering on the fly without state duplication)
 * - Conditional rendering of forms, error banners, and empty states
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import CourseStats from './components/CourseStats.jsx';
import CourseControls from './components/CourseControls.jsx';
import AddCourseForm from './components/AddCourseForm.jsx';
import CourseList from './components/CourseList.jsx';
import Footer from './components/Footer.jsx';

import { initialCourses, courseCategories } from './data/initialCourses.js';

export default function App() {
    // 1. Primary State Hooks (useState used extensively)
    const [courses, setCourses] = useState(initialCourses);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // 2. Derived State: Compute filtered courses on each render
    const filteredCourses = courses.filter((course) => {
        // Search query check
        const matchesSearch = searchTerm === '' ||
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter check
        const matchesCategory = selectedCategory === 'All' ||
            course.category.toLowerCase() === selectedCategory.toLowerCase();

        // Favorites filter check
        const matchesFavorite = !showFavoritesOnly || course.isFavorite;

        return matchesSearch && matchesCategory && matchesFavorite;
    });

    // 3. State Updaters (Functions passed down via Props — Lifting State Up)

    // Add Course (Immutable array prepend)
    const handleAddCourse = (newCourse) => {
        setCourses([newCourse, ...courses]);
        setIsFormOpen(false); // Close form upon addition
    };

    // Remove Course (Immutable array filter)
    const handleDeleteCourse = (courseId) => {
        const courseToDelete = courses.find((c) => c.id === courseId);
        const name = courseToDelete ? courseToDelete.title : 'this course';

        if (window.confirm(`Are you sure you want to remove "${name}" from the curriculum catalog?`)) {
            setCourses(courses.filter((c) => c.id !== courseId));
        }
    };

    // Toggle Favorite (Immutable array map with object spread)
    const handleToggleFavorite = (courseId) => {
        setCourses(
            courses.map((course) =>
                course.id === courseId
                    ? { ...course, isFavorite: !course.isFavorite }
                    : course
            )
        );
    };

    // Reset all filter controls
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setShowFavoritesOnly(false);
    };

    // Calculate favorites count
    const favoriteCount = courses.filter((c) => c.isFavorite).length;

    return (
        <div className="app-root">
            {/* 1. Header / Navbar with State Counters & Form Toggle */}
            <Navbar
                totalCourses={courses.length}
                favoriteCount={favoriteCount}
                isFormOpen={isFormOpen}
                onToggleForm={() => setIsFormOpen(!isFormOpen)}
            />

            {/* Hero Header */}
            <section className="dashboard-hero">
                <div className="container">
                    <h1>Enterprise Course Management Dashboard</h1>
                    <p>
                        Explore reactive user interfaces built with React 18 functional components, declarative props, lifting state up, and the <code>useState</code> hook.
                    </p>
                </div>
            </section>

            <main className="container">
                {/* 2. Derived Course Statistics Component */}
                <CourseStats courses={courses} />

                {/* 3. Conditional UI: Add Course Form */}
                {isFormOpen && (
                    <AddCourseForm
                        onAddCourse={handleAddCourse}
                        onCloseForm={() => setIsFormOpen(false)}
                    />
                )}

                {/* 4. Controls Toolbar (Search, Filter, Favorites Toggle) */}
                <CourseControls
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={courseCategories}
                    showFavoritesOnly={showFavoritesOnly}
                    onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    onResetFilters={handleResetFilters}
                />

                {/* 5. Dynamic Course Catalog with Empty State Handling */}
                <CourseList
                    courses={filteredCourses}
                    onToggleFavorite={handleToggleFavorite}
                    onDeleteCourse={handleDeleteCourse}
                    onResetFilters={handleResetFilters}
                />

                {/* 6. Educational Concepts Section */}
                <section className="state-architecture-section">
                    <div className="architecture-header">
                        <h2>React State & Component Architecture Explained</h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Core architectural patterns demonstrated in this Course Dashboard.
                        </p>
                    </div>

                    <div className="architecture-grid">
                        <div className="concept-card">
                            <h4><span>🔄</span> useState Hook</h4>
                            <p>
                                Preserves component state across re-renders. When <code>setCourses(...)</code> or <code>setSearchTerm(...)</code> is called, React schedules a re-render with updated values.
                            </p>
                        </div>

                        <div className="concept-card">
                            <h4><span>⬆️</span> Lifting State Up</h4>
                            <p>
                                State lives in the nearest common ancestor (<code>App</code>) and flows down via props. Child components trigger state updates by invoking parent callback functions.
                            </p>
                        </div>

                        <div className="concept-card">
                            <h4><span>✨</span> Immutable State Updates</h4>
                            <p>
                                State is never mutated directly (e.g. <code>courses.push()</code> is forbidden). Instead, we produce new array/object copies using <code>[...courses]</code>, <code>.filter()</code>, and <code>.map()</code>.
                            </p>
                        </div>

                        <div className="concept-card">
                            <h4><span>🧮</span> Derived State</h4>
                            <p>
                                Rather than keeping a redundant <code>filteredCourses</code> state variable, we calculate filtered items on the fly during render, avoiding state synchronization bugs.
                            </p>
                        </div>

                        <div className="concept-card">
                            <h4><span>🎭</span> Conditional Rendering</h4>
                            <p>
                                We employ inline logical operators (<code>{'{isFormOpen && <AddCourseForm />}'}</code>) and ternary operators to display form drawers and empty state notices dynamically.
                            </p>
                        </div>

                        <div className="concept-card">
                            <h4><span>🎮</span> Controlled Inputs</h4>
                            <p>
                                Form inputs bind their <code>value</code> directly to state and synchronize via <code>onChange</code>, keeping React as the single source of truth for all form data.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 7. Footer Component */}
            <Footer
                totalCourses={courses.length}
                favoriteCount={favoriteCount}
                year={2026}
            />
        </div>
    );
}
