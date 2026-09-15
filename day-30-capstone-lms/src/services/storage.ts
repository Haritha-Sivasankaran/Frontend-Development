import { Student, Enrollment } from '../types';

const STORAGE_KEYS = {
  STUDENT: 'ednue_lms_student',
  ENROLLMENTS: 'ednue_lms_enrollments',
  FAVORITES: 'ednue_lms_favorites'
};

// Default Demo Student to ensure rich out-of-the-box experience
export const DEFAULT_STUDENT: Student = {
  id: 'STU-42091',
  name: 'Haritha Sivasankaran',
  email: 'haritha@ednue.edu',
  phone: '+91 98401 55678',
  bio: 'Frontend enthusiast & software developer building high-impact web apps.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  registeredDate: '2025-11-10',
  interests: ['Web Development', 'Cloud & DevOps', 'UI/UX Design'],
  skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React 18', 'Git'],
  githubUsername: 'Haritha-Sivasankaran',
  linkedinUrl: 'https://linkedin.com'
};

// Initial Seed Enrollments
export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    courseId: 'course-101',
    enrolledAt: '2026-01-15',
    completedLessons: ['les-101-1', 'les-101-2'],
    progress: 40,
    status: 'In Progress',
    lastAccessedAt: '2026-03-10'
  },
  {
    courseId: 'course-104',
    enrolledAt: '2026-02-01',
    completedLessons: ['les-104-1', 'les-104-2', 'les-104-3', 'les-104-4'],
    progress: 100,
    status: 'Completed',
    lastAccessedAt: '2026-03-01',
    certificateIssued: true
  }
];

export const storage = {
  getStudent(): Student | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT);
      return data ? JSON.parse(data) : DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  },

  setStudent(student: Student): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  getEnrollments(): Enrollment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      return data ? JSON.parse(data) : INITIAL_ENROLLMENTS;
    } catch {
      return INITIAL_ENROLLMENTS;
    }
  },

  setEnrollments(enrollments: Enrollment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['course-101', 'course-103', 'course-105'];
    } catch {
      return ['course-101', 'course-103', 'course-105'];
    }
  },

  setFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }
};
