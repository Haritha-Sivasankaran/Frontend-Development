# Day 24: HTML + CSS + JavaScript Integration
## Mini Project: Online Training Institute Website ("EduSphere Institute")

An integrated, production-grade capstone web application demonstrating the harmonious synthesis of **Semantic HTML5**, **Modern CSS3 (Flexbox, CSS Grid, Custom Variables, Transitions)**, and **Modern ES6+ JavaScript (DOM Manipulation, Fetch API, RegEx Validation, Modal State Management)**.

This project serves as the vital architectural bridge connecting client-side vanilla web development with modern component-driven libraries (React) and typed systems (TypeScript).

---

## 🌟 Key Application Features

1. **Responsive Header & Mobile Drawer**
   - Sticky navigation bar with backdrop blur.
   - Hamburger toggle button on viewports under 768px with full collapsible menu.
   - Real-time scroll spy highlighting active navigation sections as the user scrolls.

2. **Dynamic Course Catalog & Filtering Engine**
   - Decoupled data model reading from [`courses.json`](file:///e:/Work-Hari/FrontEnd-Ednue/Frontend-Development/day-24-full-integration/courses.json) via `fetch()`, with offline fallback.
   - Multi-category pill filtering (`All Tracks`, `Frontend`, `Backend`, `Cloud & DevOps`, `Data & AI`).
   - Real-time search filter matching course title, description, or instructor names.
   - Empty state UI when no matching results are found.

3. **Interactive Course Details Modal**
   - Modal backdrop and dialog with smooth CSS fade transitions.
   - Dynamic curriculum syllabus module generation.
   - Accessible keyboard dismissal (`Escape` key) and backdrop click dismissal.
   - Direct CTA "Enroll Now in this Course" that pre-selects the course in the registration form and smoothly scrolls to it.

4. **Robust Registration Form with Live Validation**
   - Instant visual feedback on `input`, `change`, and `blur` events.
   - Strict RegEx pattern matching:
     - **Full Name**: Alphabetic validation (`/^[a-zA-Z\s]{3,40}$/`).
     - **Email Address**: Standard RFC-compliant pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
     - **Phone Number**: International/domestic telephone pattern (`/^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/`).
     - **Dropdown & Checkbox validations**: Course selection and terms agreement.
   - Loading indicator on submission button simulating async backend registration.
   - Success confirmation modal displaying applicant details and enrollment status.

5. **Remote API Ingestion (Multi-Source Data)**
   - Asynchronously fetches real-time alumni testimonials from public endpoint (`https://jsonplaceholder.typicode.com/comments?_limit=3`).
   - Dynamic avatar generator using student initials and simulated company roles.
   - Graceful fallback with pre-configured alumni reviews if offline.

6. **Interactive FAQ & Accessibility**
   - Native HTML5 `<details>` and `<summary>` accordion for zero-JS accessible collapsible FAQ items.

---

## 📂 Project Structure

```
day-24-full-integration/
├── index.html        # Complete semantic HTML5 structure for all 6 sections
├── styles.css        # Responsive CSS styling, CSS Grid, Flexbox, & animations
├── app.js            # Modular ES6 application logic, DOM & Fetch API controllers
├── courses.json      # Structured local catalog data for training courses
└── README.md         # Architecture documentation and student guide
```

---

## 🚀 How to Run & Verify

1. **Option A: Direct Browser Execution**
   - Double-click [`index.html`](file:///e:/Work-Hari/FrontEnd-Ednue/Frontend-Development/day-24-full-integration/index.html) to open in your default browser.
   - Note: If your browser blocks local `fetch()` under the `file://` protocol, `app.js` will automatically use the built-in offline fallback data so all features work seamlessly.

2. **Option B: Local Development Server (Recommended)**
   - Using VS Code Live Server extension: Right click `index.html` $\rightarrow$ **Open with Live Server**.
   - Using Node.js:
     ```bash
     npx serve day-24-full-integration
     ```
     Then open `http://localhost:3000` in your web browser.

---

## 🎯 Student Challenges & Exercises

1. **Add a Course Bookmarking / Wishlist Feature**:
   - Add a heart icon (🤍 / ❤️) to each course card.
   - Save bookmarked course IDs in browser `localStorage`.
   - Add a "Saved Courses" chip filter that displays only favorited courses.

2. **Implement Pricing Currency Switcher**:
   - Add a dropdown in the navbar allowing users to switch between USD ($), EUR (€), and INR (₹).
   - Dynamically multiply and format course prices across the cards and modal.

3. **Add Dark / Light Mode Toggle**:
   - Define dark theme CSS custom properties on `body.dark-mode`.
   - Add a toggle button in the navbar to switch themes and persist the choice in `localStorage`.
