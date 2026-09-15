/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/types.ts
 * ==========================================================================
 * Core type definitions, enums, interfaces, discriminated unions,
 * and generic contracts for the User Management Application.
 */

// 1. Enums (String Enums with explicit runtime values)
export enum UserRole {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    Developer = 'DEVELOPER',
    Guest = 'GUEST'
}

export enum UserStatus {
    Active = 'ACTIVE',
    Suspended = 'SUSPENDED',
    Pending = 'PENDING'
}

export enum SortDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

// 2. Type Aliases & Union Types
export type UserId = number | string;

export type Department = 'Engineering' | 'Design' | 'Product' | 'Operations' | 'Marketing';

export type UserFilterRole = UserRole | 'ALL';
export type UserFilterStatus = UserStatus | 'ALL';
export type UserFilterDepartment = Department | 'ALL';

// 3. Interfaces (Readonly & Optional Properties)
export interface BaseUser {
    readonly id: UserId;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    department: Department;
    avatarUrl?: string; // Optional property
    phone?: string;     // Optional property
    createdAt: Date;
}

export interface AdminPermissions {
    canManageUsers: boolean;
    canDeleteRecords: boolean;
    canAccessFinancials: boolean;
    accessLevel: number;
}

export interface CreateUserInput {
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    department: Department;
    phone?: string;
    adminAccessLevel?: number;
}

// 4. Generics & Typed API Responses
export interface ApiResponse<T> {
    success: true;
    data: T;
    message: string;
    timestamp: string;
}

export interface ApiError {
    success: false;
    errorCode: string;
    message: string;
    details?: unknown;
}

// Discriminated Union for Type Narrowing on API Results
export type ApiResult<T> = ApiResponse<T> | ApiError;

// Generic Paginated Container
export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

// Filter and Query Criteria
export interface UserFilterCriteria {
    role?: UserFilterRole;
    status?: UserFilterStatus;
    department?: UserFilterDepartment;
    searchQuery?: string;
}

// Aggregated Metrics
export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    adminUsers: number;
    departmentCounts: Record<Department, number>;
}
