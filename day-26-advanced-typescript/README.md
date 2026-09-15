# Day 26: Advanced TypeScript
## Mini Project: TypeScript User Management Application

A production-grade web application and command-line system demonstrating enterprise TypeScript patterns: **String Enums**, **Classes with Access Modifiers**, **Class Inheritance**, **Generics with Constraints**, **Type Narrowing with Custom Predicates**, **Discriminated Unions**, and **Typed Asynchronous API Pipelines**.

---

## 📚 Core Theoretical Concepts

### 1. Interfaces vs. Type Aliases
Both define custom data structures, but they have distinct use cases:
- **Interfaces**: Best suited for object shapes and class contracts (`implements BaseUser`). They support declaration merging and class extension.
- **Type Aliases**: Can represent any type including primitives, union types, intersection types, and tuples (`type UserId = number | string;`).

```typescript
// Interface for object contract
export interface BaseUser {
    readonly id: UserId; // Immutable
    name: string;
    email: string;
    avatarUrl?: string;  // Optional property
}

// Type alias for union
export type Department = 'Engineering' | 'Design' | 'Product' | 'Operations' | 'Marketing';
```

---

### 2. Optional & Readonly Properties
- `readonly`: Prevents reassignment after initialization. Enforces immutability for critical identifiers (e.g. database IDs, creation timestamps).
- `?` (Optional): Marks a property as optional, permitting values of type `T | undefined`.

```typescript
interface UserProfile {
    readonly id: number;      // Cannot be modified: user.id = 5 triggers a compile error
    name: string;
    phone?: string;           // string | undefined
}
```

---

### 3. Enums (String vs. Numeric)
Enums allow developers to define a set of named constants. **String Enums** provide readable values during runtime debugging and JSON serialization:

```typescript
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
```

---

### 4. Classes & Access Modifiers
TypeScript introduces four access modifiers to control visibility:
- `public` (default): Accessible anywhere.
- `readonly`: Property cannot be written to outside the constructor.
- `protected`: Accessible only within the declaring class and its subclasses (`AdminUser`).
- `private`: Accessible strictly within the declaring class (`User`).

```typescript
export class User implements BaseUser {
    public readonly id: UserId;
    public name: string;
    public role: UserRole;
    protected failedLoginAttempts: number = 0; // Accessible in AdminUser
    private _lastLoginAt: Date | null = null;   // Fully encapsulated in User

    constructor(id: UserId, name: string, role: UserRole) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public get lastLogin(): string {
        return this._lastLoginAt ? this._lastLoginAt.toISOString() : 'Never';
    }
}
```

---

### 5. Class Inheritance (`extends` & `super`)
Derived classes inherit properties and methods from their base class, can introduce specialized state, and can override methods using `super`:

```typescript
export class AdminUser extends User {
    public permissions: AdminPermissions;

    constructor(id: UserId, name: string, permissions: AdminPermissions) {
        super(id, name, UserRole.Admin); // Invoke base constructor
        this.permissions = permissions;
    }

    public override getProfileSummary(): string {
        return `${super.getProfileSummary()} | Admin Clearance: Level ${this.permissions.accessLevel}`;
    }
}
```

---

### 6. Type Narrowing & Custom Type Predicates
Type narrowing refines a broad type into a more specific subtype using conditional checks:
- `typeof x === 'string'`
- `instanceof AdminUser`
- `'permissions' in user`
- **Custom Type Predicate (`user is AdminUser`)**:

```typescript
// Custom Type Guard
export function isAdminUser(user: User): user is AdminUser {
    return user instanceof AdminUser || ('permissions' in user && user.role === UserRole.Admin);
}

// Usage in business logic:
if (isAdminUser(currentUser)) {
    // TypeScript automatically knows currentUser has .permissions!
    console.log(currentUser.permissions.canAccessFinancials);
}
```

---

### 7. Generics & Key Constraints (`<T, K extends keyof T>`)
Generics allow functions and interfaces to work with any type while preserving type safety and relationship constraints:

```typescript
// Generic Filter
export function filterCollection<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
}

// Generic Sorter constrained by keys of T
export function sortByProperty<T, K extends keyof T>(
    items: T[],
    key: K,
    direction: SortDirection
): T[] {
    return items.sort((a, b) => {
        return a[key] > b[key] ? 1 : -1;
    });
}
```

---

### 8. Typed Asynchronous API Responses (`Promise<ApiResponse<T>>`)
Generic response containers and discriminated unions provide end-to-end type safety for network operations:

```typescript
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
}

// Discriminated Union
export type ApiResult<T> = ApiResponse<T> | ApiError;

// Async function signature:
export async function fetchUsersFromApi(): Promise<ApiResponse<User[]>> {
    // ...
}
```

---

## 📂 Project Structure

```
day-26-advanced-typescript/
├── tsconfig.json            # Strict TypeScript compiler configuration (ES2022/NodeNext)
├── package.json             # Node scripts ("build", "start")
├── index.html               # Interactive browser user management application
├── styles.css               # Responsive design, role/status badges & modals
├── src/
│   ├── types.ts             # Enums, interfaces, union types & generic containers
│   ├── models.ts            # User and AdminUser classes with access modifiers
│   ├── services/
│   │   └── apiService.ts    # Generic utilities, type narrowing & async API calls
│   └── app.ts               # DOM orchestrator and Node CLI verification test runner
└── dist/                    # Transpiled JavaScript and .d.ts type declaration files
```

---

## 🚀 How to Run & Verify

### Option A: Build and Run via Node.js
```bash
# 1. Navigate to directory
cd day-26-advanced-typescript

# 2. Compile TypeScript
npx -p typescript tsc

# 3. Execute automated test runner
node dist/app.js
```

### Option B: Interactive Web Application
1. Compile the code: `npx -p typescript tsc`.
2. Open [`index.html`](file:///e:/Work-Hari/FrontEnd-Ednue/Frontend-Development/day-26-advanced-typescript/index.html) in any browser.
3. Test filtering across Enums, real-time search, adding a new User or Admin, inspecting elevated Admin clearance via Type Narrowing, and toggling account statuses.

---

## 🎯 Student Challenges & Exercises

1. **Implement Role-Based Filtering in the Generic Sorter**:
   - Enhance `sortByProperty()` to support nested object properties (e.g. `permissions.accessLevel` for AdminUser).
2. **Add a Batch Status Update API**:
   - Write an async function `batchUpdateStatusApi(ids: UserId[], status: UserStatus): Promise<ApiResponse<User[]>>`.
   - Ensure the return type confirms all updated instances.
3. **Build an Audit Log Generic Storage**:
   - Create a generic class `class AuditLogger<T>` with a `private logEntries: { timestamp: Date; entry: T }[]`.
   - Add methods `record(entry: T): void` and `getLogs(): { timestamp: Date; entry: T }[]`.
