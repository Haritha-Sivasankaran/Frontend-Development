import React from 'react';
import { Course, Enrollment } from '../types';
import { Badge } from './common/Badge';
import { ProgressBar } from './common/ProgressBar';

interface CourseDetailsProps {
  course: Course;
  enrollment?: Enrollment;
  isFavorite: boolean;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  onUnenroll: (courseId: string) => void;
  onToggleFavorite: (courseId: string) => void;
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onGoToDashboard: () => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  enrollment,
  isFavorite,
  onBack,
  onEnroll,
  onUnenroll,
  onToggleFavorite,
  onToggleLesson,
  onGoToDashboard
}) => {
  const isEnrolled = Boolean(enrollment);
  const completedLessons = enrollment ? enrollment.completedLessons : [];
  const progress = enrollment ? enrollment.progress : 0;

  return (
    <div className="details-container">
      {/* Breadcrumb Navigation */}
      <div className="details-breadcrumb">
        <button className="breadcrumb-back" onClick={onBack}>
          ← Back to All Courses
        </button>
        <span style={{ color: 'var(--gray-300)' }}>/</span>
        <span style={{ color: 'var(--gray-500)' }}>{course.category}</span>
        <span style={{ color: 'var(--gray-300)' }}>/</span>
        <span style={{ color: 'var(--gray-700)', fontWeight: 600 }}>{course.title}</span>
      </div>

      <div className="details-layout">
        {/* Main Column */}
        <div className="details-main-col">
          <div className="details-hero">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Badge variant="primary">{course.category}</Badge>
              <Badge variant="neutral">{course.level}</Badge>
              <Badge variant="neutral">{course.duration}</Badge>
            </div>

            <h2>{course.title}</h2>
            <p className="details-lead">{course.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d97706', fontWeight: 700 }}>
                <span>⭐ {course.rating.toFixed(2)}</span>
                <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({course.reviewCount} reviews)</span>
              </div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                👥 {course.instructor.studentsCount.toLocaleString()} Students Enrolled
              </div>
              <div style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                ⏱️ {course.totalHours} Total Hours of Material
              </div>
            </div>
          </div>

          {/* Enrolled Progress Card (If Enrolled) */}
          {isEnrolled && (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                  🎯 Your Course Progress
                </h4>
                <Badge variant={progress === 100 ? 'success' : 'primary'}>
                  {progress === 100 ? 'Course Completed' : 'In Progress'}
                </Badge>
              </div>
              <ProgressBar progress={progress} size="lg" />
              <p style={{ fontSize: '0.825rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                You have completed {completedLessons.length} of {course.syllabus.length} lessons. Click the checkboxes in the syllabus below to track your lessons.
              </p>
            </div>
          )}

          {/* Learning Outcomes */}
          <section>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.75rem' }}>
              What You Will Master
            </h3>
            <ul className="outcomes-list">
              {course.learningOutcomes.map((outcome, idx) => (
                <li key={idx}>
                  <span>✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Interactive Syllabus */}
          <section className="syllabus-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3>Course Curriculum &amp; Modules</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                  {course.syllabus.length} Comprehensive Lessons &bull; {course.totalHours} Hours
                </p>
              </div>
            </div>

            <div className="syllabus-lessons-list">
              {course.syllabus.map((lesson) => {
                const isLessonDone = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    className={`lesson-card-item ${isLessonDone ? 'is-completed' : ''}`}
                  >
                    <div className="lesson-info-left">
                      {isEnrolled ? (
                        <input
                          type="checkbox"
                          className="lesson-checkbox"
                          checked={isLessonDone}
                          onChange={() => onToggleLesson(course.id, lesson.id)}
                          title="Mark lesson completed or incomplete"
                          aria-label={`Mark lesson ${lesson.title} as completed`}
                        />
                      ) : (
                        <span style={{ color: 'var(--gray-400)', fontSize: '0.9rem', fontWeight: 700 }}>
                          #{lesson.order}
                        </span>
                      )}
                      <div>
                        <h4 className="lesson-title-text" style={{ textDecoration: isLessonDone ? 'line-through' : 'none' }}>
                          {lesson.title}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.15rem' }}>
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    <span className="lesson-duration-badge">{lesson.duration}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Instructor Bio Card */}
          <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' }}>
              About the Instructor
            </h3>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-900)' }}>
                  {course.instructor.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {course.instructor.role}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                  {course.instructor.bio}
                </p>
                <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', fontSize: '0.825rem', color: 'var(--gray-500)' }}>
                  <span>⭐ {course.instructor.rating} Rating</span>
                  <span>🎓 {course.instructor.studentsCount.toLocaleString()} Students</span>
                  <span>📚 {course.instructor.coursesCount} Courses</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky Card */}
        <aside className="details-sidebar-card">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="details-sidebar-img"
          />

          <div className="price-container" style={{ marginBottom: '1.25rem' }}>
            <span className="current-price" style={{ fontSize: '2rem' }}>
              ${course.price}
            </span>
            <span className="original-price" style={{ fontSize: '1.1rem' }}>
              ${course.originalPrice}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 700 }}>
              Save {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {isEnrolled ? (
              <>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={onGoToDashboard}
                  style={{ width: '100%' }}
                >
                  🚀 Go to My Dashboard
                </button>
                <button
                  className="btn btn-danger-outline btn-sm"
                  onClick={() => onUnenroll(course.id)}
                  style={{ width: '100%' }}
                >
                  Unenroll from Course
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onEnroll(course.id)}
                style={{ width: '100%' }}
              >
                Enroll in Course Now
              </button>
            )}

            <button
              className="btn btn-secondary"
              onClick={() => onToggleFavorite(course.id)}
              style={{ width: '100%' }}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Save to Favorites'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1.25rem', fontSize: '0.85rem', color: 'var(--gray-600)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>⏱️ Total Duration</span>
              <strong>{course.duration}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>📖 Syllabus Modules</span>
              <strong>{course.syllabus.length} Lessons</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>📊 Experience Level</span>
              <strong>{course.level}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>🏆 Completion Credential</span>
              <strong>Verified Certificate</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
