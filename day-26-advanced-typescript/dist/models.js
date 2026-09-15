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
import { UserRole, UserStatus } from './types.js';
/**
 * 1. Base User Class
 * Implements BaseUser contract with strict encapsulation.
 */
export class User {
    id;
    name;
    email;
    role;
    status;
    department;
    avatarUrl;
    phone;
    createdAt;
    // Protected: Accessible within this class and subclasses (e.g. AdminUser)
    failedLoginAttempts = 0;
    // Private: Encapsulated strictly within this class
    _lastLoginAt = null;
    constructor(id, name, email, role, status, department, phone, avatarUrl, createdAt = new Date()) {
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
    get lastLogin() {
        return this._lastLoginAt ? this._lastLoginAt.toLocaleString() : 'Never logged in';
    }
    recordLogin() {
        this._lastLoginAt = new Date();
        this.failedLoginAttempts = 0;
    }
    recordFailedAttempt() {
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= 5) {
            this.status = UserStatus.Suspended;
        }
    }
    updateStatus(newStatus) {
        this.status = newStatus;
    }
    getProfileSummary() {
        return `[#${this.id}] ${this.name} (${this.email}) | Role: ${this.role} | Status: ${this.status} | Dept: ${this.department}`;
    }
    toJSON() {
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
    permissions;
    constructor(id, name, email, status, department, permissions = {}, phone, avatarUrl, createdAt = new Date()) {
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
    getProfileSummary() {
        const baseSummary = super.getProfileSummary();
        return `${baseSummary} | Admin Access Level: ${this.permissions.accessLevel} (Audit: ${this.permissions.canAccessFinancials ? 'Financial Access' : 'Standard Admin'})`;
    }
    canPerformAction(action) {
        const permissionValue = this.permissions[action];
        return typeof permissionValue === 'boolean' ? permissionValue : false;
    }
    elevateAccess(newLevel) {
        if (newLevel > 0 && newLevel <= 5) {
            this.permissions.accessLevel = newLevel;
            if (newLevel >= 4) {
                this.permissions.canAccessFinancials = true;
            }
        }
    }
    toJSON() {
        const baseJson = super.toJSON();
        return {
            ...baseJson,
            permissions: this.permissions
        };
    }
}
