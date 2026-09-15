/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/services/apiService.ts
 * ==========================================================================
 * Demonstrates:
 * - Generic utility functions (<T>, <T, K extends keyof T>)
 * - Type Narrowing & Custom Type Predicates (`is`)
 * - Async/Promise typed responses (`Promise<ApiResponse<T>>`)
 * - Discriminated unions and strict error handling with `unknown`
 */

import {
    UserId,
    UserRole,
    UserStatus,
    CreateUserInput,
    ApiResponse,
    ApiError,
    ApiResult,
    PaginatedResponse,
    SortDirection
} from '../types.js';

import { User, AdminUser } from '../models.js';

// ==========================================================================
// 1. Generic Utility Functions
// ==========================================================================

/**
 * Generic Filter: Filters any array of type T using a typed predicate function.
 */
export function filterCollection<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
}

/**
 * Generic Sorter: Sorts any array of type T by any valid property key K of T.
 * Constrained by `K extends keyof T` ensuring invalid properties cause compile errors.
 */
export function sortByProperty<T, K extends keyof T>(
    items: T[],
    key: K,
    direction: SortDirection = SortDirection.Ascending
): T[] {
    const copy = [...items];
    return copy.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        let comparison = 0;
        if (typeof valA === 'string' && typeof valB === 'string') {
            comparison = valA.localeCompare(valB);
        } else if (valA instanceof Date && valB instanceof Date) {
            comparison = valA.getTime() - valB.getTime();
        } else {
            comparison = (valA as any) > (valB as any) ? 1 : -1;
        }

        return direction === SortDirection.Ascending ? comparison : -comparison;
    });
}

/**
 * Generic Pagination: Paginates any dataset of type T into a standard PaginatedResponse<T>.
 */
export function paginateCollection<T>(
    items: T[],
    page: number = 1,
    pageSize: number = 6
): PaginatedResponse<T> {
    const validPage = Math.max(1, page);
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const startIndex = (validPage - 1) * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    return {
        items: paginatedItems,
        totalItems,
        currentPage: validPage,
        totalPages,
        pageSize
    };
}

// ==========================================================================
// 2. Type Narrowing & Custom Type Predicates
// ==========================================================================

/**
 * Custom Type Predicate: Narrows ApiResult<T> to ApiError.
 */
export function isApiError(result: ApiResult<unknown>): result is ApiError {
    return result.success === false;
}

/**
 * Custom Type Predicate: Narrows a User instance to AdminUser.
 */
export function isAdminUser(user: User): user is AdminUser {
    return user instanceof AdminUser || ('permissions' in user && user.role === UserRole.Admin);
}

/**
 * Safe Error Message Extractor:
 * Narrowing 'unknown' error types using typeof, instanceof, and 'in' guards.
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else if (error && typeof error === 'object' && 'message' in error) {
        return String((error as { message: unknown }).message);
    }
    return 'An unexpected error occurred during execution.';
}

// ==========================================================================
// 3. Simulated & Remote Typed API Service
// ==========================================================================

// Seed Users for local or offline execution
const seedUsers: User[] = [
    new AdminUser(
        1,
        "Dr. Eleanor Vance",
        "e.vance@edusphere.io",
        UserStatus.Active,
        "Engineering",
        { canManageUsers: true, canDeleteRecords: true, canAccessFinancials: true, accessLevel: 5 },
        "+1 (555) 019-2834",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        new Date("2025-01-15")
    ),
    new User(
        2,
        "Marcus Sterling",
        "m.sterling@edusphere.io",
        UserRole.Manager,
        UserStatus.Active,
        "Product",
        "+1 (555) 014-9921",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        new Date("2025-02-10")
    ),
    new User(
        3,
        "Sophia Laurent",
        "s.laurent@edusphere.io",
        UserRole.Developer,
        UserStatus.Active,
        "Design",
        "+1 (555) 018-4412",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        new Date("2025-02-28")
    ),
    new User(
        4,
        "David Kalu",
        "d.kalu@edusphere.io",
        UserRole.Developer,
        UserStatus.Pending,
        "Engineering",
        "+1 (555) 017-7723",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        new Date("2025-03-01")
    ),
    new AdminUser(
        5,
        "Kavita Rao",
        "k.rao@edusphere.io",
        UserStatus.Active,
        "Operations",
        { canManageUsers: true, canDeleteRecords: false, canAccessFinancials: false, accessLevel: 2 },
        "+1 (555) 012-3345",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
        new Date("2025-03-05")
    ),
    new User(
        6,
        "Lucas Chen",
        "l.chen@edusphere.io",
        UserRole.Guest,
        UserStatus.Suspended,
        "Marketing",
        "+1 (555) 019-8831",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
        new Date("2025-03-10")
    )
];

let inMemoryUsers: User[] = [...seedUsers];
let nextUserIdCounter = 7;

/**
 * Asynchronous Typed API: Fetches users from remote endpoint or seed store.
 * Returns Promise<ApiResponse<User[]>>.
 */
export async function fetchUsersFromApi(): Promise<ApiResponse<User[]>> {
    try {
        // Simulate network latency (250ms)
        await new Promise((resolve) => setTimeout(resolve, 250));

        return {
            success: true,
            data: [...inMemoryUsers],
            message: `Successfully loaded ${inMemoryUsers.length} user records.`,
            timestamp: new Date().toISOString()
        };
    } catch (err: unknown) {
        throw new Error(`API fetch error: ${getErrorMessage(err)}`);
    }
}

/**
 * Asynchronous Typed API: Creates a new User or AdminUser.
 */
export async function createUserApi(input: CreateUserInput): Promise<ApiResponse<User>> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!input.name || !input.email) {
        throw new Error("Validation Error: Name and email are required fields.");
    }

    const newId: UserId = nextUserIdCounter++;
    let createdUser: User;

    if (input.role === UserRole.Admin) {
        createdUser = new AdminUser(
            newId,
            input.name.trim(),
            input.email.trim().toLowerCase(),
            input.status,
            input.department,
            {
                canManageUsers: true,
                canDeleteRecords: true,
                canAccessFinancials: (input.adminAccessLevel ?? 1) >= 4,
                accessLevel: input.adminAccessLevel ?? 1
            },
            input.phone?.trim()
        );
    } else {
        createdUser = new User(
            newId,
            input.name.trim(),
            input.email.trim().toLowerCase(),
            input.role,
            input.status,
            input.department,
            input.phone?.trim()
        );
    }

    inMemoryUsers.unshift(createdUser);

    return {
        success: true,
        data: createdUser,
        message: `User #${createdUser.id} created successfully.`,
        timestamp: new Date().toISOString()
    };
}

/**
 * Asynchronous Typed API: Deletes a user by ID.
 */
export async function deleteUserApi(id: UserId): Promise<ApiResponse<{ deletedId: UserId }>> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const initialCount = inMemoryUsers.length;
    inMemoryUsers = inMemoryUsers.filter((u) => u.id !== id);

    if (inMemoryUsers.length === initialCount) {
        throw new Error(`User with ID #${id} not found.`);
    }

    return {
        success: true,
        data: { deletedId: id },
        message: `User #${id} successfully removed.`,
        timestamp: new Date().toISOString()
    };
}

/**
 * Asynchronous Typed API: Updates a user's status.
 */
export async function updateUserStatusApi(id: UserId, newStatus: UserStatus): Promise<ApiResponse<User>> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const user = inMemoryUsers.find((u) => u.id === id);
    if (!user) {
        throw new Error(`User with ID #${id} was not found.`);
    }

    user.updateStatus(newStatus);

    return {
        success: true,
        data: user,
        message: `User #${id} status updated to ${newStatus}.`,
        timestamp: new Date().toISOString()
    };
}
