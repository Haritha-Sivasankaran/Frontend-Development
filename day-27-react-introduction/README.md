# Day 27: React Introduction
## Mini Project: React Course Profile App

A functional React 18 application built from the ground up to master **Component-Based Architecture**, **JSX Syntax**, **Unidirectional Props Flow**, **List Rendering with Keys**, and **Synthetic Event Handling** without complex state management libraries.

---

## 📚 Core Theoretical Concepts

### 1. Why React?
Prior to React, developers built user interfaces using **imperative DOM manipulation** (Vanilla JS or jQuery). For every state change, developers manually queried DOM elements and altered attributes (`document.getElementById()`, `element.classList.add()`). As applications grew, tracking synchronization between JavaScript data and browser DOM nodes became notoriously error-prone.

**React** revolutionized frontend development by introducing:
1. **Declarative Programming**: You declare what the UI should look like for any given data state (`UI = f(data)`), and React handles DOM updates automatically.
2. **Component-Based Architecture**: UIs are composed of small, isolated, reusable building blocks.
3. **Virtual DOM (VDOM) & Reconciliation**: React keeps an lightweight representation of the UI tree in memory. When data changes, React diffs the old VDOM against the new VDOM and updates *only* the specific browser DOM nodes that changed, maximizing rendering efficiency.

---

### 2. Component-Based Architecture
A React application is a **tree of components**. Data flows **unidirectionally** downward from parent components to child components via **props**:

```
                     ┌──────────────────┐
                     │     <App />      │
                     └────────┬─────────┘
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
 ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
 │  <Header />  │      │ <Instructor> │      │ <CourseList> │
 └──────────────┘      └──────────────┘      └──────┬───────┘
                                                    │
                                   ┌────────────────┴────────────────┐
                                   ▼                                 ▼
                            ┌──────────────┐                  ┌──────────────┐
                            │ <CourseCard> │                  │ <CourseCard> │
                            └──────────────┘                  └──────────────┘
```

---

### 3. JSX (JavaScript XML)
JSX is an XML-like syntax extension for JavaScript. It allows developers to write HTML-like markup directly within JavaScript files:

```jsx
// JSX Code:
const element = <h1 className="title">Hello, {studentName}!</h1>;

// What Babel compiles it to behind the scenes:
const element = React.createElement(
    'h1',
    { className: 'title' },
    'Hello, ',
    studentName,
    '!'
);
```

**Key JSX Rules**:
1. **Return a single root element** (or use a React Fragment: `<> ... </>`).
2. **Use camelCase attributes**: `class` becomes `className`, `for` becomes `htmlFor`.
3. **Embed JavaScript expressions in curly braces `{}`**: Any valid JS expression (variables, function calls, ternary operators) can be embedded.
4. **Close all tags**: Elements must self-close if they have no children (`<img />`, `<input />`, `<br />`).

---

### 4. Functional Components & Props
A **functional component** is a plain JavaScript function that receives an input object called `props` (properties) and returns JSX describing what should appear on screen:

```jsx
// Defining a Functional Component with Props Destructuring:
function CourseCard({ title, price, duration }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>Duration: {duration}</p>
            <span>${price}</span>
        </div>
    );
}

// Rendering with Props:
<CourseCard 
    title="React 18 Foundations" 
    price={349} 
    duration="6 Weeks" 
/>
```

**Rules of Props**:
- **Props are Read-Only (Immutable)**: A component must never modify its own props.
- **Unidirectional Data Flow**: Data always flows from parent to child.

---

### 5. Lists & The Critical 'key' Prop
When rendering arrays of items using JavaScript's `.map()`, React requires each rendered element to have a unique `key` prop:

```jsx
const courses = [
    { id: 'c1', title: 'React 18' },
    { id: 'c2', title: 'TypeScript' }
];

function CourseList({ courses }) {
    return (
        <div>
            {courses.map((course) => (
                <CourseCard key={course.id} title={course.title} />
            ))}
        </div>
    );
}
```

**Why is `key` essential?**
Keys provide a stable identity to array elements. When an item is added, removed, or reordered, React uses the `key` to match elements between render passes. Without keys, React is forced to re-render the entire list, resulting in poor performance and lost UI state. Never use array index as a key if items can be reordered or filtered.

---

### 6. Event Handling in React
React events are named using camelCase (`onClick`, `onSubmit`, `onChange`) rather than lowercase HTML conventions (`onclick`). You pass a **function reference**, not a function call:

```jsx
// Correct: Passing an inline arrow function reference
<button onClick={() => onEnroll(course)}>
    Enroll Now
</button>

// Correct: Passing an existing function reference
<button onClick={handleClick}>
    Click Me
</button>

// WRONG: Calling the function immediately during render!
<button onClick={handleClick()}> 
    Click Me
</button>
```

---

## 📂 Project Structure

```
day-27-react-introduction/
├── package.json               # Project manifest with React 18 & Vite scripts
├── vite.config.js             # Vite configuration
├── index.html                 # Standalone runnable React 18 application with CDN
├── src/
│   ├── main.jsx               # Vite mounting entry point
│   ├── App.jsx                # Root component coordinating tree and props
│   ├── styles.css             # Responsive styling, layout, cards, and badges
│   ├── data/
│   │   └── coursesData.js     # Structured dataset for instructor & courses
│   └── components/
│       ├── Header.jsx         # Navigation bar & filter controls
│       ├── CourseCard.jsx     # Individual course profile component
│       ├── InstructorCard.jsx # Instructor bio, stats, and badge component
│       ├── CourseList.jsx     # Array iteration & key prop management
│       └── Footer.jsx         # Semantic footer component
└── README.md                  # Comprehensive lecture guide & exercises
```

---

## 🚀 How to Run & Verify

### Option A: Instant Zero-Setup Browser Execution
1. Double-click [`index.html`](file:///e:/Work-Hari/FrontEnd-Ednue/Frontend-Development/day-27-react-introduction/index.html) or open it using VS Code Live Server.
2. The page runs immediately in any browser using the embedded React 18 CDN and Babel Standalone compiler with zero npm installations needed!

### Option B: Local Vite Development Server
```bash
# 1. Navigate to directory
cd day-27-react-introduction

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

---

## 🎯 Student Challenges & Exercises

1. **Course Level Filter Badge**:
   - Add a prop `selectedLevel` to `CourseList`.
   - Add buttons in `Header` to filter by level: `Beginner`, `Intermediate`, `Advanced`.
2. **Wishlist / Bookmark Counter**:
   - Add a `handleBookmark(course)` function in `App.jsx`.
   - Pass it down through `CourseList` to `CourseCard` to render a bookmark icon (🤍 / ❤️).
   - Display a total bookmark counter badge in `Header`.
3. **Discount Calculator Prop**:
   - Add a boolean prop `hasSeasonalDiscount` to `CourseCard`.
   - If `true`, render the discounted price (e.g. 20% off) next to the original price with a strikethrough.
