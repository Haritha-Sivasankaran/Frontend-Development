/**
 * TypeScript Definitions for Ednue Learning Management System (LMS)
 * Central type registry providing compile-time type safety across components and services.
 */

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseCategory =
  | 'Web Development'
  | 'Cloud & DevOps'
  | 'Data Science & AI'
  | 'UI/UX Design'
  | 'Mobile Development'
  | 'Cyber Security';

export type EnrollmentStatus = 'In Progress' | 'Completed' | 'Dropped';

export type NavigationTab =
  | 'home'
  | 'courses'
  | 'details'
  | 'dashboard'
  | 'register'
  | 'profile';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/**
 * Represents a single lesson/module within a course syllabus
 */
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  order: number;
}

/**
 * Represents a course instructor
 */
export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

/**
 * Represents a full course offering
 */
export interface Course {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  learningOutcomes: string[];
  instructor: Instructor;
  syllabus: Lesson[];
  thumbnail: string;
  featured: boolean;
  tags: string[];
  totalHours: number;
}

/**
 * Represents a registered student user in the LMS
 */
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  registeredDate: string;
  interests: CourseCategory[];
  skills: string[];
  githubUsername?: string;
  linkedinUrl?: string;
}

/**
 * Represents a student's active enrollment in a specific course
 */
export interface Enrollment {
  courseId: string;
  enrolledAt: string;
  completedLessons: string[]; // List of Lesson IDs completed
  progress: number; // 0 to 100 percentage
  status: EnrollmentStatus;
  lastAccessedAt: string;
  certificateIssued?: boolean;
}

/**
 * Generic API response envelope
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Course filtering and sorting criteria
 */
export interface FilterOptions {
  search: string;
  category: string;
  level: string;
  sortBy: 'popular' | 'rating' | 'price-low' | 'price-high';
}

/**
 * Form validation error dictionary
 */
export type ValidationErrors = Record<string, string>;

/**
 * Student Registration Form Data
 */
export interface StudentRegistrationInput {
  name: string;
  email: string;
  phone: string;
  bio: string;
  interest: CourseCategory;
  githubUsername: string;
}

/**
 * Toast Notification payload
 */
export interface NotificationPayload {
  message: string;
  type: NotificationType;
}
