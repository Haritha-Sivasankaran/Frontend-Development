import React, { useState, useMemo } from 'react';
import { Course, CourseCategory } from '../types';
import { CATEGORIES } from '../services/api';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  enrolledCourseIds: string[];
  favoriteCourseIds: string[];
  onSelectCourse: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEnroll: (id: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({
  courses,
  enrolledCourseIds,
  favoriteCourseIds,
  onSelectCourse,
  onToggleFavorite,
  onEnroll
}) => {
  // Controlled Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Filter and Sort Courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search Filter (Title, Description, or Instructor)
        const matchesSearch =
          searchTerm.trim() === '' ||
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // Category Filter
        const matchesCategory =
          selectedCategory === 'All' || course.category === selectedCategory;

        // Level Filter
        const matchesLevel =
          selectedLevel === 'All' || course.level === selectedLevel;

        // Favorites Filter
        const matchesFavorites =
          !onlyFavorites || favoriteCourseIds.includes(course.id);

        return matchesSearch && matchesCategory && matchesLevel && matchesFavorites;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'popular':
          default:
            return b.reviewCount - a.reviewCount;
        }
      });
  }, [courses, searchTerm, selectedCategory, selectedLevel, onlyFavorites, favoriteCourseIds, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('popular');
    setOnlyFavorites(false);
  };

  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    onlyFavorites;

  return (
    <div className="catalog-container">
      {/* Catalog Title */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Explore Academic &amp; Tech Programs</h2>
          <p className="section-subtitle">
            Accelerate your engineering abilities with real-world, industry-standard tracks.
          </p>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600 }}>
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="catalog-controls">
        {/* Top Row: Search & Dropdowns */}
        <div className="catalog-search-row">
          <div className="search-input-wrapper">
            <span>🔍</span>
            <input
              type="text"
              className="search-input-field"
              placeholder="Search by course title, topic, tag, or mentor..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              aria-label="Search courses"
            />
          </div>

          <div className="filter-dropdowns">
            {/* Level Dropdown */}
            <select
              className="select-box"
              value={selectedLevel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLevel(e.target.value)}
              aria-label="Filter by experience level"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Sort Dropdown */}
            <select
              className="select-box"
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as 'popular' | 'rating' | 'price-low' | 'price-high')
              }
              aria-label="Sort courses by"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Favorites Toggle Button */}
            <button
              className={`btn btn-sm ${onlyFavorites ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              title="Show only your favorite courses"
            >
              <span>{onlyFavorites ? '❤️ Favorites Only' : '🤍 Favorites'}</span>
              {favoriteCourseIds.length > 0 && (
                <span className="nav-counter" style={{ background: onlyFavorites ? 'white' : 'var(--primary)', color: onlyFavorites ? 'var(--primary)' : 'white' }}>
                  {favoriteCourseIds.length}
                </span>
              )}
            </button>

            {/* Clear Filters Button */}
            {isFiltered && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleResetFilters}
                title="Reset all filter options"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="category-pills-row" role="tablist" aria-label="Course Categories">
          <button
            className={`category-pill ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Tracks
          </button>
          {CATEGORIES.map((cat: CourseCategory) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              isFavorite={favoriteCourseIds.includes(course.id)}
              onSelectCourse={onSelectCourse}
              onToggleFavorite={onToggleFavorite}
              onEnroll={onEnroll}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-lg">🔎</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>
            No Matching Courses Found
          </h3>
          <p style={{ color: 'var(--gray-500)', maxWidth: '440px', margin: '0.5rem auto 1.5rem' }}>
            We couldn't find any courses matching your current search term or filter selection. Try adjusting your search query or reset filters.
          </p>
          <button className="btn btn-primary" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
