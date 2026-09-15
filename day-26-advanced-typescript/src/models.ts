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

import {
    BaseUser,
    UserId,
    UserRole,
    UserStatus,
    Department,
    AdminPermissions
} from './types.js';

/**
 * 1. Base User Class
 * Implements BaseUser contract with strict encapsulation.
 */
export class User implements BaseUser {
    public readonly id: UserId;
    public name: string;
    public email: string;
    public role: UserRole;
    public status: UserStatus;
    public department: Department;
    public avatarUrl?: string;
    public phone?: string;
    public readonly createdAt: Date;

    // Protected: Accessible within this class and subclasses (e.g. AdminUser)
    protected failedLoginAttempts: number = 0;

    // Private: Encapsulated strictly within this class
    private _lastLoginAt: Date | null = null;

    constructor(
        id: UserId,
        name: string,
        email: string,
        role: UserRole,
        status: UserStatus,
        department: Department,
        phone?: string,
        avatarUrl?: string,
        createdAt: Date = new Date()
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.status = status;
        this.department = department;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
    }

    // Public Getters & Methods
    public get lastLogin(): string {
        return this._lastLoginAt ? this._lastLoginAt.toLocaleString() : 'Never logged in';
    }

    public recordLogin(): void {
        this._lastLoginAt = new Date();
        this.failedLoginAttempts = 0;
    }

    public recordFailedAttempt(): void {
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= 5) {
            this.status = UserStatus.Suspended;
        }
    }

    public updateStatus(newStatus: UserStatus): void {
        this.status = newStatus;
    }

    public getProfileSummary(): string {
        return `[#${this.id}] ${this.name} (${this.email}) | Role: ${this.role} | Status: ${this.status} | Dept: ${this.department}`;
    }

    public toJSON(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            status: this.status,
            department: this.department,
            phone: this.phone,
            avatarUrl: this.avatarUrl,
            createdAt: this.createdAt.toISOString(),
            lastLogin: this.lastLogin
        };
    }
}

/**
 * 2. AdminUser Class (Inheritance)
 * Extends User, introduces AdminPermissions, and overrides methods.
 */
export class AdminUser extends User {
    public permissions: AdminPermissions;

    constructor(
        id: UserId,
        name: string,
        email: string,
        status: UserStatus,
        department: Department,
        permissions: Partial<AdminPermissions> = {},
        phone?: string,
        avatarUrl?: string,
        createdAt: Date = new Date()
    ) {
        // Call superclass constructor with UserRole.Admin
        super(id, name, email, UserRole.Admin, status, department, phone, avatarUrl, createdAt);

        // Default admin permissions
        this.permissions = {
            canManageUsers: permissions.canManageUsers ?? true,
            canDeleteRecords: permissions.canDeleteRecords ?? true,
            canAccessFinancials: permissions.canAccessFinancials ?? false,
            accessLevel: permissions.accessLevel ?? 1
        };
    }

    // Method Override using super
    public override getProfileSummary(): string {
        const baseSummary = super.getProfileSummary();
        return `${baseSummary} | Admin Access Level: ${this.permissions.accessLevel} (Audit: ${this.permissions.canAccessFinancials ? 'Financial Access' : 'Standard Admin'})`;
    }

    public canPerformAction(action: keyof AdminPermissions): boolean {
        const permissionValue = this.permissions[action];
        return typeof permissionValue === 'boolean' ? permissionValue : false;
    }

    public elevateAccess(newLevel: number): void {
        if (newLevel > 0 && newLevel <= 5) {
            this.permissions.accessLevel = newLevel;
            if (newLevel >= 4) {
                this.permissions.canAccessFinancials = true;
            }
        }
    }

    public override toJSON(): Record<string, unknown> {
        const baseJson = super.toJSON();
        return {
            ...baseJson,
            permissions: this.permissions
        };
    }
}
