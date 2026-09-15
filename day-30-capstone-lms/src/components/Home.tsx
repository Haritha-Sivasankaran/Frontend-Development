import React from 'react';
import { Course, NavigationTab } from '../types';
import { CourseCard } from './CourseCard';

interface HomeProps {
  courses: Course[];
  enrolledCourseIds: string[];
  favoriteCourseIds: string[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectCourse: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEnroll: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  courses,
  enrolledCourseIds,
  favoriteCourseIds,
  onNavigate,
  onSelectCourse,
  onToggleFavorite,
  onEnroll
}) => {
  const featuredCourses = courses.filter((c) => c.featured);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" aria-label="Hero Overview">
        <div className="hero-content">
          <div className="hero-tag">
            <span>✨</span> 30-Day Frontend Capstone Project
          </div>
          <h2 className="hero-title">
            Master High-Impact Tech Skills with <span>Ednue LMS</span>
          </h2>
          <p className="hero-subtitle">
            An enterprise-grade Single-Page Application engineered with React 18,
            TypeScript, RESTful Fetch API, and responsive modern CSS. Learn, build, and level up.
          </p>
          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('courses')}
            >
              <span>📚</span> Browse All Courses
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('dashboard')}
            >
              <span>📊</span> Student Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Platform Metric Counters */}
      <section className="stats-bar-grid" aria-label="Platform Metrics">
        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>
            👥
          </div>
          <div>
            <div className="stats-card-val">120,000+</div>
            <div className="stats-card-lbl">Global Tech Learners</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
            🎓
          </div>
          <div>
            <div className="stats-card-val">94.8%</div>
            <div className="stats-card-lbl">Course Completion Rate</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            ⭐
          </div>
          <div>
            <div className="stats-card-val">4.92 / 5.0</div>
            <div className="stats-card-lbl">Average Student Rating</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-icon" style={{ background: '#f0f9ff', color: '#0ea5e9' }}>
            💼
          </div>
          <div>
            <div className="stats-card-val">8 Tracks</div>
            <div className="stats-card-lbl">Production Ready Curricula</div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="features-grid" aria-label="Why Choose Ednue">
        <div className="feature-box">
          <div className="feature-icon-circle">🏗️</div>
          <h3>Modern Architecture</h3>
          <p>
            Engineered with strict TypeScript interfaces, functional components, controlled state,
            and modular domain services.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-icon-circle">⚡</div>
          <h3>Real-Time Progress Engine</h3>
          <p>
            Interactive syllabus checklists allow students to mark lessons complete, automatically
            recalculating course progress percentages.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-icon-circle">🔒</div>
          <h3>Strict Type Safety</h3>
          <p>
            100% typed props, states, events, and API envelopes eliminate runtime undefined bugs
            before code ever reaches production.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-icon-circle">📱</div>
          <h3>Responsive Mobile UX</h3>
          <p>
            Fluid CSS Grid and Flexbox layouts with an adaptive mobile drawer navigation tailored
            for all device viewports.
          </p>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="featured-courses-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Industry Tracks</h2>
            <p className="section-subtitle">
              Hand-picked cohorts led by principal engineers and tech leads.
            </p>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('courses')}
          >
            View All ({courses.length}) Courses →
          </button>
        </div>

        <div className="courses-grid">
          {featuredCourses.map((course) => (
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
      </section>
    </div>
  );
};
