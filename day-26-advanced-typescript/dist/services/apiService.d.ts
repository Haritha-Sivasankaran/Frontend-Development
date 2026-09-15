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
import { UserId, UserStatus, CreateUserInput, ApiResponse, ApiError, ApiResult, PaginatedResponse, SortDirection } from '../types.js';
import { User, AdminUser } from '../models.js';
/**
 * Generic Filter: Filters any array of type T using a typed predicate function.
 */
export declare function filterCollection<T>(items: T[], predicate: (item: T) => boolean): T[];
/**
 * Generic Sorter: Sorts any array of type T by any valid property key K of T.
 * Constrained by `K extends keyof T` ensuring invalid properties cause compile errors.
 */
export declare function sortByProperty<T, K extends keyof T>(items: T[], key: K, direction?: SortDirection): T[];
/**
 * Generic Pagination: Paginates any dataset of type T into a standard PaginatedResponse<T>.
 */
export declare function paginateCollection<T>(items: T[], page?: number, pageSize?: number): PaginatedResponse<T>;
/**
 * Custom Type Predicate: Narrows ApiResult<T> to ApiError.
 */
export declare function isApiError(result: ApiResult<unknown>): result is ApiError;
/**
 * Custom Type Predicate: Narrows a User instance to AdminUser.
 */
export declare function isAdminUser(user: User): user is AdminUser;
/**
 * Safe Error Message Extractor:
 * Narrowing 'unknown' error types using typeof, instanceof, and 'in' guards.
 */
export declare function getErrorMessage(error: unknown): string;
/**
 * Asynchronous Typed API: Fetches users from remote endpoint or seed store.
 * Returns Promise<ApiResponse<User[]>>.
 */
export declare function fetchUsersFromApi(): Promise<ApiResponse<User[]>>;
/**
 * Asynchronous Typed API: Creates a new User or AdminUser.
 */
export declare function createUserApi(input: CreateUserInput): Promise<ApiResponse<User>>;
/**
 * Asynchronous Typed API: Deletes a user by ID.
 */
export declare function deleteUserApi(id: UserId): Promise<ApiResponse<{
    deletedId: UserId;
}>>;
/**
 * Asynchronous Typed API: Updates a user's status.
 */
export declare function updateUserStatusApi(id: UserId, newStatus: UserStatus): Promise<ApiResponse<User>>;
