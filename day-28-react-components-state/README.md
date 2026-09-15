# Day 28: React Components, Props and State
## Mini Project: React Course Dashboard

A comprehensive, interactive React 18 application designed to master **Reusable Components**, **Props Passing**, the **`useState` Hook**, **Immutable State Updates**, **Event Handling**, **Conditional Rendering**, and **Lifting State Up**.

---

## 📚 Core Theoretical Concepts

### 1. Reusable Components & Props
In React, components act like pure JavaScript functions that accept an arbitrary input object (`props`) and return JSX describing what should appear on the screen.

```jsx
// Reusable Component receiving props
function CourseCard({ title, instructor, price }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>By {instructor}</p>
            <span>${price}</span>
        </div>
    );
}

// Reused across different datasets
<CourseCard title="React Core" instructor="Elena" price={349} />
<CourseCard title="Node.js APIs" instructor="Marcus" price={399} />
```

**Key Props Rule**: Props are **read-only and immutable**. A component must never modify its own props.

---

### 2. The `useState` Hook & Component Memory
Regular variables disappear between function calls. In functional components, the `useState` hook provides a persistent memory cell that survives re-renders:

```jsx
import React, { useState } from 'react';

// Syntax: [currentStateValue, stateUpdaterFunction] = useState(initialValue);
const [searchTerm, setSearchTerm] = useState('');
const [courses, setCourses] = useState(initialCourses);
const [isFormOpen, setIsFormOpen] = useState(false);
```

**How `useState` works**:
1. When your component initially mounts, `useState` initializes the value with the argument provided.
2. When you call the updater function (e.g. `setSearchTerm("React")`), React captures the new value and **schedules a re-render** of that component and its children.
3. During the subsequent render, `useState` returns the latest updated value.

---

### 3. State Immutability Rules
In React, **never mutate state directly**:

```jsx
// ❌ WRONG (Direct Mutation - React will NOT re-render):
courses.push(newCourse);
setCourses(courses);

// ❌ WRONG (Mutating object properties directly):
course.isFavorite = true;
setCourses(courses);

// ✅ CORRECT: Adding an item (Array Spread):
setCourses([newCourse, ...courses]);

// ✅ CORRECT: Removing an item (Array Filter):
setCourses(courses.filter((course) => course.id !== targetId));

// ✅ CORRECT: Updating an item (Array Map with Object Spread):
setCourses(courses.map((course) => 
    course.id === targetId 
        ? { ...course, isFavorite: !course.isFavorite } 
        : course
));
```

---

### 4. Lifting State Up
When multiple sibling components need access to the same data or need to modify the same list, that state must be **lifted up** to their nearest common ancestor:

```
                          ┌────────────────────────┐
                          │       <App />          │
                          │ State: courses, search │
                          └───────────┬────────────┘
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌──────────────┐             ┌─────────────────┐           ┌─────────────────┐
│ <CourseStats │             │ <CourseControls │           │  <CourseList /> │
│  (reads stats)│             │ (triggers search)│          │ (reads courses, │
└──────────────┘             └─────────────────┘           │  toggles favs)  │
                                                           └─────────────────┘
```

**Mechanics of Lifting State Up**:
1. State is declared in `App.jsx` (`const [courses, setCourses] = useState(...)`).
2. `App.jsx` writes helper functions that call `setCourses(...)`.
3. `App.jsx` passes those functions down to child components as **event handler props** (e.g. `onToggleFavorite={handleToggleFavorite}`, `onAddCourse={handleAddCourse}`).
4. When a child component triggers an action (e.g., clicking a button), it invokes the passed function, updating the state in `App.jsx`.

---

### 5. Conditional Rendering Patterns
React supports several declarative ways to conditionally render elements:

1. **Inline Logical `&&` Operator** (Render when truthy):
   ```jsx
   {isFormOpen && <AddCourseForm onAddCourse={handleAddCourse} />}
   ```
2. **Ternary Operator `? :`** (Pick one of two views):
   ```jsx
   <button onClick={() => onToggleFavorite(id)}>
       {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
   </button>
   ```
3. **Early Guard Returns**:
   ```jsx
   if (courses.length === 0) {
       return <div className="empty-state">No matching courses found.</div>;
   }
   ```

---

### 6. Controlled Components
An HTML input element whose value is controlled by React state is called a **controlled component**:

```jsx
function SearchBox({ searchTerm, onSearchChange }) {
    return (
        <input 
            type="text"
            value={searchTerm}                         // Controlled value
            onChange={(e) => onSearchChange(e.target.value)} // State update
        />
    );
}
```

---

## 📂 Project Structure

```
day-28-react-components-state/
├── package.json               # Project manifest with React 18 & Vite scripts
├── vite.config.js             # Vite development server configuration
├── index.html                 # Standalone runnable React 18 application with CDN
├── src/
│   ├── main.jsx               # Vite mounting entry point
│   ├── App.jsx                # State orchestrator & lifting state up logic
│   ├── styles.css             # Responsive styling, cards, and modal forms
│   ├── data/
│   │   └── initialCourses.js  # Initial dataset & categories
│   └── components/
│       ├── Navbar.jsx         # Header with live stats and form drawer toggle
│       ├── CourseStats.jsx    # Derived metric cards (Total, Saved, Avg Tuition)
│       ├── CourseControls.jsx # Controlled search, chips, and favorite toggle
│       ├── AddCourseForm.jsx  # Controlled form for creating new courses
│       ├── CourseCard.jsx     # Card component with favorite & delete actions
│       ├── CourseList.jsx     # Array iteration with keys & empty state UI
│       └── Footer.jsx         # Live course counter footer
└── README.md                  # Comprehensive lecture guide & exercises
```

---

## 🚀 How to Run & Verify

### Option A: Instant Zero-Setup Browser Execution
1. Double-click [`index.html`](file:///e:/Work-Hari/FrontEnd-Ednue/Frontend-Development/day-28-react-components-state/index.html) or open it with Live Server.
2. The application runs immediately in any browser using the embedded React 18 CDN and Babel Standalone compiler with zero npm installations needed!

### Option B: Local Vite Development Server
```bash
# 1. Navigate to directory
cd day-28-react-components-state

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

---

## 🎯 Student Challenges & Exercises

1. **Course Sorting Dropdown (Derived State)**:
   - Add a `sortBy` state in `App.jsx` (`'price-asc'`, `'price-desc'`, `'title'`).
   - Add a `<select>` in `CourseControls.jsx` to trigger `setSortBy`.
   - Sort `filteredCourses` before passing them down to `CourseList`.
2. **Clear All Favorites Action**:
   - Add a button in `Navbar.jsx` labeled "Clear Favorites".
   - Pass an `onClearFavorites` handler from `App.jsx` that maps over `courses` and sets `isFavorite: false` for all items.
3. **Course Duplicate Warning**:
   - In `AddCourseForm.jsx`, check if `courses.some(c => c.title.toLowerCase() === title.toLowerCase())`.
   - If a duplicate title exists, display an error banner preventing creation.
