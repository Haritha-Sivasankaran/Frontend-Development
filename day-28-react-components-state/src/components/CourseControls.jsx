/**
 * ==========================================================================
 * DAY 28: REACT COMPONENTS, PROPS AND STATE
 * Component: CourseControls.jsx
 * ==========================================================================
 * Demonstrates:
 * - Controlled input components (value & onChange)
 * - Lifting state up (sending input changes to parent App component)
 * - Dynamic category chips rendering with key prop
 */

import React from 'react';

export default function CourseControls({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    showFavoritesOnly,
    onToggleFavoritesOnly,
    onResetFilters
}) {
    return (
        <section className="controls-panel" aria-label="Search and Filter Controls">
            {/* 1. Controlled Search Input */}
            <div className="search-box">
                <span className="search-icon">🔎</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by course title or instructor..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchTerm && (
                    <button 
                        type="button" 
                        className="btn-clear-search"
                        onClick={() => onSearchChange('')}
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* 2. Category Filter Chips */}
            <div className="category-chips-group">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => onCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 3. Favorites Toggle & Reset Actions */}
            <div className="actions-group">
                <button
                    type="button"
                    className={`btn-filter-favorite ${showFavoritesOnly ? 'active' : ''}`}
                    onClick={onToggleFavoritesOnly}
                >
                    {showFavoritesOnly ? '❤️ Showing Favorites' : '🤍 Favorites Only'}
                </button>

                <button
                    type="button"
                    className="btn-reset-filters"
                    onClick={onResetFilters}
                    title="Reset all search and category filters"
                >
                    🔄 Reset
                </button>
            </div>
        </section>
    );
}
