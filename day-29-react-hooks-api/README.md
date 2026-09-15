# Day 29: React Hooks and API Integration
## Mini Project: React Student Management App (EduSphere SIS)

A modern, production-grade React 18 single-page application built to master **`useState`**, **`useEffect`**, **Controlled Components**, **Multi-field Form Validation**, **RESTful `fetch()` API calls**, **Loading Spinners**, and **Error State Handling**.

---

## 📚 Core Theoretical Concepts

### 1. The `useEffect` Hook & React Component Lifecycle
In functional components, `useEffect` lets you synchronize a component with external systems (such as network APIs, browser DOM timers, subscriptions, or local storage).

```jsx
import React, { useState, useEffect } from 'react';

useEffect(() => {
    // 1. SETUP CODE: Executes after component mounts or when dependencies change
    let isMounted = true;
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            if (isMounted) {
                setStudents(data);
                setIsLoading(false);
            }
        })
        .catch(err => {
            if (isMounted) {
                setError(err.message);
                setIsLoading(false);
            }
        });

    // 2. CLEANUP FUNCTION: Executes before unmount or before re-running with new dependencies
    return () => {
        isMounted = false;
    };
}, [dependency1, dependency2]); // 3. DEPENDENCY ARRAY
```

#### The Dependency Array Matrix:
| Dependency Array | When the Effect Runs | Typical Use Case |
| :--- | :--- | :--- |
| **Omitted** (`useEffect(fn)`) | After **every single render** (mount + every state/prop change) | Logging or custom canvas redraws (rarely used for API calls) |
| **Empty Array** (`useEffect(fn, [])`) | **Once only**, after the initial mount | Initial data fetching, global event listeners, timer setup |
| **With Values** (`useEffect(fn, [id, filter])`) | On mount **and whenever any specified dependency value changes** | Re-fetching data when an ID or filter dropdown changes |

---

### 2. The Three States of Asynchronous API Calls
Whenever frontend applications interface with remote backend services over HTTP, you must represent three distinct states in component memory:

1. **Loading State (`isLoading = true`)**: The network request is currently inflight. Display a spinner or skeleton placeholder so the user knows work is in progress.
2. **Error State (`error = 'HTTP 503...'`)**: The network or server failed. Display an intuitive error message with a **Retry** button so the user can recover gracefully.
3. **Success State (`students = [...]`)**: Data arrived successfully. Display the records or an "Empty State" message if the dataset returned is empty.

```jsx
// Declarative Conditional UI Rendering
if (isLoading) {
    return <LoadingSpinner message="Fetching students..." />;
}

if (error) {
    return <ErrorBanner message={error} onRetry={fetchData} />;
}

if (students.length === 0) {
    return <EmptyPlaceholder message="No records found." />;
}

return <StudentTable students={students} />;
```

---

### 3. Controlled Components vs. Uncontrolled Components
In standard HTML, elements like `<input>`, `<select>`, and `<textarea>` maintain their own internal state in the browser DOM.

In a **Controlled Component**, React state is the **single source of truth**. The input’s display value is governed by a React state variable, and any user keystroke triggers an `onChange` handler that updates that state:

```jsx
const [formData, setFormData] = useState({ name: '', email: '' });

// Generic Change Handler for Controlled Inputs
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

<input
    name="name"
    value={formData.name}        // State drives the UI
    onChange={handleChange}     // UI notifies the State
/>
```

#### Benefits of Controlled Components:
- **Instant Validation**: Evaluate fields on every character or on blur.
- **Dynamic Disabling**: Disable the submit button until all required fields pass validation.
- **Format Enforcement**: Auto-format phone numbers, currencies, or uppercase codes as the user types.

---

### 4. Robust Client-Side Form Validation Architecture
High-quality web forms separate validation into three tiers:
1. **Field-level Validator**: A pure function returning an error string (or empty string if valid).
2. **`touched` State**: Keeps track of whether a user has visited or blurred an input, preventing annoying red error messages before the user even begins typing.
3. **Submit Guard**: Iterates over all fields upon form submission to prevent sending invalid data.

```jsx
const validateField = (name, value) => {
    switch (name) {
        case 'email':
            if (!value.trim()) return 'Email is required.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address.';
            return '';
        case 'gpa':
            const num = parseFloat(value);
            if (isNaN(num) || num < 0.0 || num > 4.0) return 'GPA must be between 0.0 and 4.0.';
            return '';
        default:
            return '';
    }
};
```

---

## 🏗️ System Architecture & Data Flow

```
                           ┌────────────────────────────────────────┐
                           │               <App />                  │
                           │ State: students, loading, error,       │
                           │        search, filter, modal, toast    │
                           │ Effects: API fetch on mount / reload   │
                           └───────────────────┬────────────────────┘
                                               │
        ┌───────────────────┬──────────────────┼───────────────────┬───────────────────┐
        ▼                   ▼                  ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  <Header />  │    │<StudentStats>│   │ <SearchBar />│    │<StudentTable>│    │   <Footer>   │
│ Brand, API   │    │ Total, Avg   │   │ Controlled   │    │ Loading spin,│    │ Hook stats,  │
│ status & test│    │ GPA, Active  │   │ text & select│    │ error retry, │    │ counts       │
│ error trigger│    │ metrics      │   │ filters      │    │ table rows   │    └──────────────┘
└──────────────┘    └──────────────┘   └──────────────┘    └──────┬───────┘
                                                                  │
                                                        ┌─────────┴─────────┐
                                                        ▼                   ▼
                                                [✏️ Edit Action]    [🗑️ Delete Action]
                                                        │
                                                        ▼
                                           ┌────────────────────────┐
                                           │  <StudentFormModal />  │
                                           │ Controlled Add / Edit  │
                                           │ Form + Live Validation │
                                           └────────────────────────┘
```

---

## 📂 Project Structure

```
day-29-react-hooks-api/
├── index.html                 # Dual-runnable single-page app (React 18 + Babel CDN)
├── package.json               # Modern Vite + React 18 configuration
├── vite.config.js             # Vite development server config
├── README.md                  # Comprehensive architectural guide & curriculum docs
└── src/
    ├── main.jsx               # React 18 createRoot entry point
    ├── App.jsx                # Central state, useEffect fetching, and CRUD actions
    ├── styles.css             # Production dashboard styles, spinner, modals, badges
    ├── services/
    │   └── studentApi.js      # REST fetch wrapper with fallback dataset & mock latency
    └── components/
        ├── Header.jsx         # Navigation, live status dot, error testing trigger
        ├── StudentStats.jsx   # Metrics: Total, Enrolled rate, Avg GPA, Programs
        ├── SearchBar.jsx      # Controlled search and dropdown filter bar
        ├── StudentTable.jsx   # Table with loading spinner, error retry, and row actions
        ├── StudentFormModal.jsx # Controlled modal for Add / Edit with validation
        └── Footer.jsx         # System metadata and hook summary
```

---

## 🚀 How to Run the Project

### Option A: Instant Browser Execution (Zero Setup)
Simply open `index.html` in any modern web browser or right-click and choose **"Open with Live Server"** in VS Code. React 18 and Babel compile JSX in the browser on the fly.

### Option B: Modern Vite Development Server
```bash
# 1. Navigate to directory
cd day-29-react-hooks-api

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

---

## 🎯 Student Practice Challenges

### Challenge 1: Multi-Column Sorting
Add sort toggles to the table headers in `StudentTable.jsx` so users can sort ascending/descending by:
- Student Name (Alphabetical)
- GPA (Highest to Lowest)
- Enrollment Date (Newest to Oldest)

### Challenge 2: Pagination or "Load More"
Add a pagination component to `App.jsx` showing 5 students per page with "Previous" and "Next" buttons and page numbers.

### Challenge 3: Persistent Local Storage Cache
Modify `studentApi.js` or `App.jsx` to cache the student list in `localStorage`. When the user refreshes the page, immediately show cached students while `useEffect` fetches fresh records in the background.

---

## ⚠️ Common Pitfalls & How to Avoid Them

1. **Infinite Render Loops with `useEffect`**:
   - *Bug*: Calling a state updater (`setStudents`) inside `useEffect` without providing a dependency array `[]`.
   - *Why*: State update triggers a re-render $\rightarrow$ re-render runs `useEffect` $\rightarrow$ `useEffect` updates state $\rightarrow$ infinite loop.
   - *Fix*: Always declare the correct dependency array (e.g. `useEffect(() => { ... }, [])`).

2. **Direct State Mutation**:
   - *Bug*: `students.push(newStudent); setStudents(students);`
   - *Why*: React checks object reference equality (`prev === next`). Since the array reference is identical, React skips re-rendering.
   - *Fix*: Always create new copies using array spread `setStudents([newStudent, ...students])` or `.filter()` / `.map()`.

3. **Memory Leaks on Unmounted Components**:
   - *Bug*: `fetch().then(data => setStudents(data))` when the user navigates away before the fetch completes.
   - *Fix*: Return a cleanup function inside `useEffect` that toggles an `isMounted` boolean or uses `AbortController.abort()`.

4. **Uncontrolled to Controlled Input Warning**:
   - *Bug*: `value={student.phone || undefined}` starts as `undefined` then switches to a string.
   - *Fix*: Always initialize controlled form state to empty strings (`''`), never `undefined` or `null`.

---

## 💬 Top 10 React Hooks & API Interview Questions

1. **What is the difference between `useState` and `useEffect`?**
   - `useState` manages local component memory and schedules re-renders when data changes. `useEffect` performs side effects (API calls, subscriptions, manual DOM manipulation) after the component renders.

2. **Why can't you call Hooks inside `if` statements or loops?**
   - React relies on the call order of Hooks across renders to maintain their state pointers in an internal linked list. Conditional hooks would break the order and corrupt component state.

3. **What happens if you omit the dependency array in `useEffect`?**
   - The effect executes after **every single render**. If that effect updates state, it causes an infinite rendering loop.

4. **What is the purpose of the cleanup function returned by `useEffect`?**
   - To clean up side effects before the component unmounts or before the effect re-executes (e.g., cancelling fetch requests, clearing `setInterval` timers, or removing window event listeners).

5. **What is the difference between a Controlled and an Uncontrolled component?**
   - In a controlled component, form input values are driven directly by React state via `value` and `onChange`. In an uncontrolled component, form data is handled by the DOM itself and read using `useRef`.

6. **How do you handle API errors gracefully in React?**
   - Store error state in component memory (`const [error, setError] = useState(null)`), wrap API calls in `try/catch` or `.catch()`, and conditionally render an error UI with retry capabilities.

7. **How does `AbortController` work with `fetch` and `useEffect`?**
   - An `AbortController` instance is passed to `fetch({ signal: controller.signal })`. The effect's cleanup function calls `controller.abort()`, cancelling any pending network request if the component unmounts.

8. **Why should you pass a function to `useState`'s updater (e.g., `setCount(prev => prev + 1)`)?**
   - Functional updates ensure you always work with the latest state value, preventing stale closure issues during batched or rapid asynchronous updates.

9. **Can `useEffect` callback function be `async`? (e.g. `useEffect(async () => { ... })`)?**
   - No. An `async` function returns a `Promise`. However, React expects `useEffect` to return either nothing or a **cleanup function**. Instead, define an async function inside the effect and call it:
   ```jsx
   useEffect(() => {
       async function load() {
           const res = await fetch(...);
       }
       load();
   }, []);
   ```

10. **What is the difference between `useEffect` and `useLayoutEffect`?**
    - `useEffect` runs asynchronously after the DOM paint is painted to screen (non-blocking). `useLayoutEffect` runs synchronously immediately after DOM mutations before the browser paints to the screen, useful for measuring DOM geometry to prevent visual flickering.
