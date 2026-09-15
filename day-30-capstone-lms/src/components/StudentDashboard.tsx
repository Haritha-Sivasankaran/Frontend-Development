import React from 'react';
import { Course, Enrollment, Student, NavigationTab } from '../types';
import { ProgressBar } from './common/ProgressBar';
import { Badge } from './common/Badge';

interface StudentDashboardProps {
  student: Student | null;
  courses: Course[];
  enrollments: Enrollment[];
  onSelectCourse: (id: string) => void;
  onUnenroll: (courseId: string) => void;
  onToggleLesson: (courseId: string, lessonId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  courses,
  enrollments,
  onSelectCourse,
  onUnenroll,
  onToggleLesson,
  onNavigate
}) => {
  // Aggregate Metrics
  const totalEnrolled = enrollments.length;
  const completedCount = enrollments.filter((e) => e.progress === 100).length;
  const inProgressCount = totalEnrolled - completedCount;

  const avgProgress = totalEnrolled > 0
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / totalEnrolled)
    : 0;

  return (
    <div className="dashboard-container">
      {/* Greeting Header */}
      <div className="dashboard-header">
        <div className="dashboard-user-greeting">
          <img
            src={student?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={student?.name || 'Student'}
            className="student-avatar-lg"
          />
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              Welcome back, {student ? student.name.split(' ')[0] : 'Student'}! 👋
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Track your coursework, practice lessons, and view your verified course certificates.
            </p>
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('courses')}
          >
            <span>➕</span> Explore More Courses
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="dashboard-metrics-grid">
        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>
            📚
          </div>
          <div>
            <div className="stats-card-val">{totalEnrolled}</div>
            <div className="stats-card-lbl">Enrolled Courses</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
            🏆
          </div>
          <div>
            <div className="stats-card-val">{completedCount}</div>
            <div className="stats-card-lbl">Completed Courses</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            ⏳
          </div>
          <div>
            <div className="stats-card-val">{inProgressCount}</div>
            <div className="stats-card-lbl">Courses In Progress</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#f0f9ff', color: '#0ea5e9' }}>
            📈
          </div>
          <div>
            <div className="stats-card-val">{avgProgress}%</div>
            <div className="stats-card-lbl">Average Completion</div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="section-header">
        <div>
          <h3 className="section-title">My Enrolled Programs</h3>
          <p className="section-subtitle">
            Continue where you left off or check off completed modules.
          </p>
        </div>
      </div>

      {enrollments.length > 0 ? (
        <div className="enrolled-courses-list">
          {enrollments.map((enrollment) => {
            const course = courses.find((c) => c.id === enrollment.courseId);
            if (!course) return null;

            const isDone = enrollment.progress === 100;

            return (
              <div key={enrollment.courseId} className="enrolled-course-row">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="enrolled-course-img"
                />

                <div className="enrolled-course-details">
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <Badge variant={isDone ? 'success' : 'primary'}>
                      {isDone ? 'Completed 🎉' : 'In Progress'}
                    </Badge>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                      Enrolled: {enrollment.enrolledAt}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectCourse(course.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                    Instructor: {course.instructor.name} &bull; {enrollment.completedLessons.length} of {course.syllabus.length} lessons completed
                  </p>

                  <div className="progress-track-wrapper">
                    <ProgressBar progress={enrollment.progress} size="md" />
                  </div>

                  {/* Inline quick-checklist */}
                  <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {course.syllabus.map((lesson) => {
                      const isLessonComplete = enrollment.completedLessons.includes(lesson.id);
                      return (
                        <label
                          key={lesson.id}
                          style={{
                            fontSize: '0.775rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            background: isLessonComplete ? '#ecfdf5' : '#f8fafc',
                            border: `1px solid ${isLessonComplete ? '#a7f3d0' : '#e2e8f0'}`,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          title={`Click to toggle completion for: ${lesson.title}`}
                        >
                          <input
                            type="checkbox"
                            checked={isLessonComplete}
                            onChange={() => onToggleLesson(course.id, lesson.id)}
                            style={{ accentColor: 'var(--primary)' }}
                          />
                          <span style={{ textDecoration: isLessonComplete ? 'line-through' : 'none' }}>
                            {lesson.title.split(':')[0]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="enrolled-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectCourse(course.id)}
                  >
                    {isDone ? 'Review Course' : 'Continue Learning'}
                  </button>

                  <button
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => onUnenroll(course.id)}
                  >
                    Unenroll
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-lg">🎓</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>
            No Active Enrollments Yet
          </h3>
          <p style={{ color: 'var(--gray-500)', maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
            You haven't enrolled in any courses yet. Browse our professional catalog and kickstart your learning journey!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('courses')}
          >
            Browse Course Catalog
          </button>
        </div>
      )}
    </div>
  );
};
