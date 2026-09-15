/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/types.ts
 * ==========================================================================
 * Core type definitions, enums, interfaces, discriminated unions,
 * and generic contracts for the User Management Application.
 */
// 1. Enums (String Enums with explicit runtime values)
export var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["Manager"] = "MANAGER";
    UserRole["Developer"] = "DEVELOPER";
    UserRole["Guest"] = "GUEST";
})(UserRole || (UserRole = {}));
export var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "ACTIVE";
    UserStatus["Suspended"] = "SUSPENDED";
    UserStatus["Pending"] = "PENDING";
})(UserStatus || (UserStatus = {}));
export var SortDirection;
(function (SortDirection) {
    SortDirection["Ascending"] = "asc";
    SortDirection["Descending"] = "desc";
})(SortDirection || (SortDirection = {}));
