/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/models.ts
 * ==========================================================================
 * Demonstrates:
 * - Classes implementing interfaces
 * - Access modifiers (public, private, protected, readonly)
 * - Constructor parameter initialization
 * - Class inheritance (extends & super)
 * - Method overriding
 */
import { BaseUser, UserId, UserRole, UserStatus, Department, AdminPermissions } from './types.js';
/**
 * 1. Base User Class
 * Implements BaseUser contract with strict encapsulation.
 */
export declare class User implements BaseUser {
    readonly id: UserId;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    department: Department;
    avatarUrl?: string;
    phone?: string;
    readonly createdAt: Date;
    protected failedLoginAttempts: number;
    private _lastLoginAt;
    constructor(id: UserId, name: string, email: string, role: UserRole, status: UserStatus, department: Department, phone?: string, avatarUrl?: string, createdAt?: Date);
    get lastLogin(): string;
    recordLogin(): void;
    recordFailedAttempt(): void;
    updateStatus(newStatus: UserStatus): void;
    getProfileSummary(): string;
    toJSON(): Record<string, unknown>;
}
/**
 * 2. AdminUser Class (Inheritance)
 * Extends User, introduces AdminPermissions, and overrides methods.
 */
export declare class AdminUser extends User {
    permissions: AdminPermissions;
    constructor(id: UserId, name: string, email: string, status: UserStatus, department: Department, permissions?: Partial<AdminPermissions>, phone?: string, avatarUrl?: string, createdAt?: Date);
    getProfileSummary(): string;
    canPerformAction(action: keyof AdminPermissions): boolean;
    elevateAccess(newLevel: number): void;
    toJSON(): Record<string, unknown>;
}
