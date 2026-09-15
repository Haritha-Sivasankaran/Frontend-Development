import React, { useState, useEffect } from 'react';
import {
  Course,
  Enrollment,
  Student,
  NavigationTab,
  NotificationPayload,
  StudentRegistrationInput
} from './types';
import { api } from './services/api';
import { storage } from './services/storage';

// Components
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { CourseList } from './components/CourseList';
import { CourseDetails } from './components/CourseDetails';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentForm } from './components/StudentForm';
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AlertBanner } from './components/common/AlertBanner';

export const App: React.FC = () => {
  // =========================================================================
  // 1. Navigation & UI State
  // =========================================================================
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationPayload | null>(null);

  // =========================================================================
  // 2. Data & Domain State
  // =========================================================================
  const [courses, setCourses] = useState<Course[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // =========================================================================
  // 3. Network Lifecycle State
  // =========================================================================
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // =========================================================================
  // 4. Initial Ingestion & Storage Hydration (useEffect)
  // =========================================================================
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    // Hydrate local persistent storage
    setStudent(storage.getStudent());
    setEnrollments(storage.getEnrollments());
    setFavorites(storage.getFavorites());

    // Fetch Course Catalog from API
    api
      .fetchCourses()
      .then((res) => {
        if (isMounted) {
          setCourses(res.data);
          setIsLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch course catalog.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toast Auto-Dismiss Effect
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification]);

  const showToast = (message: string, type: NotificationPayload['type'] = 'success') => {
    setNotification({ message, type });
  };

  // =========================================================================
  // 5. Navigation Handlers
  // =========================================================================
  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // 6. Course Enrollment & Favorite Handlers
  // =========================================================================
  const handleEnroll = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments.some((e) => e.courseId === courseId)) {
      showToast(`You are already enrolled in "${course.title}".`, 'info');
      handleSelectCourse(courseId);
      return;
    }

    const newEnrollment: Enrollment = {
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      completedLessons: [],
      progress: 0,
      status: 'In Progress',
      lastAccessedAt: new Date().toISOString().split('T')[0]
    };

    const updatedEnrollments = [newEnrollment, ...enrollments];
    setEnrollments(updatedEnrollments);
    storage.setEnrollments(updatedEnrollments);
    showToast(`🎉 Enrolled successfully in "${course.title}"!`, 'success');
  };

  const handleUnenroll = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const confirmed = window.confirm(
      `Are you sure you want to unenroll from "${course ? course.title : 'this course'}"? Your progress will be saved if you rejoin later.`
    );
    if (!confirmed) return;

    const updated = enrollments.filter((e) => e.courseId !== courseId);
    setEnrollments(updated);
    storage.setEnrollments(updated);
    showToast(`Unenrolled from "${course ? course.title : 'course'}".`, 'info');
  };

  const handleToggleFavorite = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    let updatedFavorites: string[];

    if (favorites.includes(courseId)) {
      updatedFavorites = favorites.filter((id) => id !== courseId);
      showToast(`Removed "${course?.title || 'course'}" from favorites.`, 'info');
    } else {
      updatedFavorites = [...favorites, courseId];
      showToast(`Added "${course?.title || 'course'}" to favorites! ❤️`, 'success');
    }

    setFavorites(updatedFavorites);
    storage.setFavorites(updatedFavorites);
  };

  // =========================================================================
  // 7. Progress & Syllabus Interaction
  // =========================================================================
  const handleToggleLesson = (courseId: string, lessonId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const existingEnrollment = enrollments.find((e) => e.courseId === courseId);
    if (!existingEnrollment) {
      handleEnroll(courseId);
      return;
    }

    const isCompleted = existingEnrollment.completedLessons.includes(lessonId);
    let updatedLessons: string[];

    if (isCompleted) {
      updatedLessons = existingEnrollment.completedLessons.filter((id) => id !== lessonId);
    } else {
      updatedLessons = [...existingEnrollment.completedLessons, lessonId];
    }

    const newProgress = Math.round(
      (updatedLessons.length / course.syllabus.length) * 100
    );

    const updatedEnrollment: Enrollment = {
      ...existingEnrollment,
      completedLessons: updatedLessons,
      progress: newProgress,
      status: newProgress === 100 ? 'Completed' : 'In Progress',
      lastAccessedAt: new Date().toISOString().split('T')[0],
      certificateIssued: newProgress === 100 ? true : existingEnrollment.certificateIssued
    };

    const updatedAll = enrollments.map((e) =>
      e.courseId === courseId ? updatedEnrollment : e
    );

    setEnrollments(updatedAll);
    storage.setEnrollments(updatedAll);

    if (newProgress === 100 && !existingEnrollment.certificateIssued) {
      showToast(`🏆 Congratulations! You completed all lessons in "${course.title}". Verified Certificate issued!`, 'success');
    }
  };

  // =========================================================================
  // 8. Student Registration & Profile Management
  // =========================================================================
  const handleRegisterStudent = async (formData: StudentRegistrationInput) => {
    try {
      setIsLoading(true);
      const res = await api.registerStudent(formData);
      setStudent(res.data);
      storage.setStudent(res.data);
      setIsLoading(false);
      showToast(`Welcome to Ednue LMS, ${res.data.name}! Your account is active.`, 'success');
      setActiveTab('dashboard');
    } catch (err: any) {
      setIsLoading(false);
      showToast(`Registration failed: ${err.message}`, 'error');
    }
  };

  const handleUpdateProfile = (updatedStudent: Student) => {
    setStudent(updatedStudent);
    storage.setStudent(updatedStudent);
    showToast('Learner profile updated successfully!', 'success');
  };

  // =========================================================================
  // 9. Retry Catalog Fetch
  // =========================================================================
  const handleRetryFetch = () => {
    setIsLoading(true);
    setError(null);
    api
      .fetchCourses()
      .then((res) => {
        setCourses(res.data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || 'Failed to reconnect.');
        setIsLoading(false);
      });
  };

  // Selected Course for CourseDetails view
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const selectedEnrollment = enrollments.find((e) => e.courseId === selectedCourseId);

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        enrolledCount={enrollments.length}
        favoritesCount={favorites.length}
        student={student}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area */}
      <main className="main-wrapper">
        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner message="Connecting to Ednue LMS..." />}

        {/* Error Banner */}
        {error && !isLoading && (
          <AlertBanner
            title="Unable to Load Courses"
            message={error}
            onRetry={handleRetryFetch}
          />
        )}

        {/* View Routing Based on activeTab */}
        {!isLoading && !error && (
          <>
            {activeTab === 'home' && (
              <Home
                courses={courses}
                enrolledCourseIds={enrollments.map((e) => e.courseId)}
                favoriteCourseIds={favorites}
                onNavigate={handleNavigate}
                onSelectCourse={handleSelectCourse}
                onToggleFavorite={handleToggleFavorite}
                onEnroll={handleEnroll}
              />
            )}

            {activeTab === 'courses' && (
              <CourseList
                courses={courses}
                enrolledCourseIds={enrollments.map((e) => e.courseId)}
                favoriteCourseIds={favorites}
                onSelectCourse={handleSelectCourse}
                onToggleFavorite={handleToggleFavorite}
                onEnroll={handleEnroll}
              />
            )}

            {activeTab === 'details' && selectedCourse && (
              <CourseDetails
                course={selectedCourse}
                enrollment={selectedEnrollment}
                isFavorite={favorites.includes(selectedCourse.id)}
                onBack={() => setActiveTab('courses')}
                onEnroll={handleEnroll}
                onUnenroll={handleUnenroll}
                onToggleFavorite={handleToggleFavorite}
                onToggleLesson={handleToggleLesson}
                onGoToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'dashboard' && (
              <StudentDashboard
                student={student}
                courses={courses}
                enrollments={enrollments}
                onSelectCourse={handleSelectCourse}
                onUnenroll={handleUnenroll}
                onToggleLesson={handleToggleLesson}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === 'register' && (
              <StudentForm onRegister={handleRegisterStudent} />
            )}

            {activeTab === 'profile' && student && (
              <Profile
                student={student}
                courses={courses}
                enrollments={enrollments}
                onUpdateProfile={handleUpdateProfile}
                onSelectCourse={handleSelectCourse}
              />
            )}
          </>
        )}
      </main>

      {/* Toast Notification Container */}
      {notification && (
        <div className="toast-container" role="alert">
          <div className={`toast-item ${notification.type}`}>
            <span>{notification.message}</span>
            <button
              className="toast-close"
              onClick={() => setNotification(null)}
              aria-label="Dismiss message"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
