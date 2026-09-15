/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/types.ts
 * ==========================================================================
 * Core type definitions, enums, interfaces, discriminated unions,
 * and generic contracts for the User Management Application.
 */
export declare enum UserRole {
    Admin = "ADMIN",
    Manager = "MANAGER",
    Developer = "DEVELOPER",
    Guest = "GUEST"
}
export declare enum UserStatus {
    Active = "ACTIVE",
    Suspended = "SUSPENDED",
    Pending = "PENDING"
}
export declare enum SortDirection {
    Ascending = "asc",
    Descending = "desc"
}
export type UserId = number | string;
export type Department = 'Engineering' | 'Design' | 'Product' | 'Operations' | 'Marketing';
export type UserFilterRole = UserRole | 'ALL';
export type UserFilterStatus = UserStatus | 'ALL';
export type UserFilterDepartment = Department | 'ALL';
export interface BaseUser {
    readonly id: UserId;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    department: Department;
    avatarUrl?: string;
    phone?: string;
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
export type ApiResult<T> = ApiResponse<T> | ApiError;
export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
}
export interface UserFilterCriteria {
    role?: UserFilterRole;
    status?: UserFilterStatus;
    department?: UserFilterDepartment;
    searchQuery?: string;
}
export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    adminUsers: number;
    departmentCounts: Record<Department, number>;
}
