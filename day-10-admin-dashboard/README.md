# Day 10: CSS Flexbox and Grid

## Mini Project: Nexus Responsive Admin Dashboard

A SaaS-grade management portal demonstrating the architectural union of modern CSS layouts: **Flexbox** for 1-dimensional component alignments (navigation, topbars, footers, search bars) and **CSS Grid** for 2-dimensional page scaffolding (sidebar shell, 4-column KPI cards, and 2fr / 1fr analytics panels).

---

### Learning Objectives
- Master the fundamental difference: Flexbox is **1-Dimensional** (linear rows or columns); CSS Grid is **2-Dimensional** (simultaneous rows and columns).
- Master core Flexbox properties:
  - `display: flex`
  - `flex-direction` (`row`, `column`)
  - `justify-content` (`space-between`, `center`, `flex-start`)
  - `align-items` (`center`, `stretch`)
  - `gap` (clean gutter spacing without manual margins)
- Master core CSS Grid properties:
  - `grid-template-columns` (using `fr` fractional units, `repeat()`, and fixed measurements)
  - `grid-template-rows`
  - `gap`
  - Grid item placement and column spanning (`2fr` vs `1fr`).
- Build production layout scaffolding combining Flexbox and Grid seamlessly.

---

### File Structure
```text
day-10-admin-dashboard/
├── index.html       (Complete dashboard with sidebar, topbar, stats, chart, and orders)
├── styles.css       (Stylesheet demonstrating Flexbox for navigation and Grid for layout)
└── README.md        (Curriculum documentation and challenges)
```

---

### How to Run & Test
1. Open `day-10-admin-dashboard/` in your code editor.
2. Launch `index.html` via Live Server or double-click to view in any browser.
3. **Inspect the 2D Grid Shell**:
   - Notice the page container `.dashboard-app` is governed by `grid-template-columns: 250px 1fr;`.
   - The 4 statistics cards are governed by `grid-template-columns: repeat(4, 1fr);`.
   - The analytics area uses `grid-template-columns: 2fr 1fr;` to give the revenue chart exactly twice the width of the transaction table.
4. **Inspect the 1D Flexbox Components**:
   - The sidebar uses `flex-direction: column; justify-content: space-between;` to push the user profile card to the bottom.
   - The topbar uses `display: flex; justify-content: space-between; align-items: center;` to align search and actions.
5. **Test Responsive Reflow**:
   - Shrink the screen below 1024px: the 4-column stats grid reflows to 2x2, and the analytics section stacks vertically.
   - Shrink below 768px: the master grid collapses to a single column for mobile.

---

### Student Challenges
1. **Dynamic Grid Area Names**: Refactor `.dashboard-app` to use `grid-template-areas: "sidebar topbar" "sidebar main" "sidebar footer"` and assign child containers using `grid-area`.
2. **Minmax() Fluid Auto-Fit**: Update the `.stats-grid` to use `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));` and observe how cards wrap automatically without explicit media queries.
3. **Interactive Hover Bar Elevation**: Add a hover state to `.chart-bar` that turns the bar green and displays the tooltip value using CSS `::after`.
