import React from 'react';
import { Course } from '../types';
import { Badge } from './common/Badge';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  isFavorite: boolean;
  onSelectCourse: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEnroll: (id: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  isFavorite,
  onSelectCourse,
  onToggleFavorite,
  onEnroll
}) => {
  const getLevelVariant = (level: Course['level']) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'primary';
      case 'Advanced': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <article className="course-card" aria-label={course.title}>
      {/* Thumbnail & Badges */}
      <div className="card-media-wrapper">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="card-media-img"
          loading="lazy"
        />
        <div className="card-badges-overlay">
          <Badge variant={getLevelVariant(course.level)}>{course.level}</Badge>
          <Badge variant="neutral">{course.duration}</Badge>
        </div>
        <button
          className="favorite-btn-overlay"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(course.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={`Favorite ${course.title}`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-meta-top">
          <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.8rem' }}>
            {course.category}
          </span>
          <div className="card-rating-stars">
            <span>⭐ {course.rating.toFixed(1)}</span>
            <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>
              ({course.reviewCount})
            </span>
          </div>
        </div>

        <h3 className="card-title" onClick={() => onSelectCourse(course.id)} style={{ cursor: 'pointer' }}>
          {course.title}
        </h3>

        <p className="card-description">{course.description}</p>

        {/* Instructor */}
        <div className="card-instructor-row">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="instructor-avatar-xs"
          />
          <div className="instructor-text">
            <h4>{course.instructor.name}</h4>
            <p>{course.instructor.role}</p>
          </div>
        </div>

        {/* Card Footer: Price & Actions */}
        <div className="card-footer">
          <div className="price-container">
            <span className="current-price">${course.price}</span>
            <span className="original-price">${course.originalPrice}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectCourse(course.id)}
            >
              Details
            </button>

            {isEnrolled ? (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onSelectCourse(course.id)}
              >
                ✅ Learning
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEnroll(course.id)}
              >
                Enroll
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
