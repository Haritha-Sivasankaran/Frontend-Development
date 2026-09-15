import React from 'react';

/**
 * SearchBar Component
 * Controlled inputs for searching student name/email and filtering by course and status.
 */
export default function SearchBar({
    searchTerm,
    onSearchChange,
    selectedCourse,
    onCourseChange,
    selectedStatus,
    onStatusChange,
    courses,
    statuses,
    onResetFilters
}) {
    const isFiltered = searchTerm !== '' || selectedCourse !== 'All' || selectedStatus !== 'All';

    return (
        <div className="controls-card">
            <div className="search-box-wrapper">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by student name or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search students by name or email"
                />
            </div>

            <div className="filters-group">
                <select
                    className="select-filter"
                    value={selectedCourse}
                    onChange={(e) => onCourseChange(e.target.value)}
                    aria-label="Filter by course"
                >
                    <option value="All">All Courses</option>
                    {courses.map((course) => (
                        <option key={course} value={course}>
                            {course}
                        </option>
                    ))}
                </select>

                <select
                    className="select-filter"
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    aria-label="Filter by status"
                >
                    <option value="All">All Statuses</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                {isFiltered && (
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={onResetFilters}
                        title="Clear search and filters"
                    >
                        ✕ Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
}
