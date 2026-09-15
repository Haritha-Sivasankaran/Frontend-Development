# Day 9: Responsive Web Design

## Mini Project: FastBite Responsive Food Delivery Portal

A fully responsive e-commerce web application featuring fluid scaling units (`%`, `vw`, `vh`, `rem`, `em`), layout constraints (`min-width`, `max-width`), adaptive media queries for desktop, tablet, and mobile, and a zero-JavaScript responsive navigation hamburger drawer.

---

### Learning Objectives
- Understand Responsive Web Design (RWD) principles and why the `<meta name="viewport">` tag is mandatory.
- Master dynamic units:
  - `%`: Relative to the parent element's dimensions.
  - `vw` & `vh`: 1% of viewport width and height respectively.
  - `rem`: Relative to root font size (`<html>`).
  - `em`: Relative to current or parent element font size.
- Constrain layout sprawl using `min-width` and `max-width`.
- Architect responsive multi-breakpoint layouts using `@media screen and (max-width: ...)`:
  - **Desktop** (> 1024px): 6-col categories, 4-col food cards, 4-col footer, horizontal nav.
  - **Tablet** (641px - 1024px): 3-col categories, 2-col food cards, 2-col footer, scaled typography.
  - **Mobile** (<= 640px): 2-col categories, 1-col food cards, 1-col stacked footer, vertical hero, hamburger toggle drawer.
- Implement a pure CSS mobile hamburger navigation drawer using the CSS checkbox toggle hack.

---

### File Structure
```text
day-09-food-delivery/
├── index.html       (Semantic food delivery portal structure)
├── styles.css       (Full responsive stylesheet with tablet and mobile media queries)
└── README.md        (Curriculum guide and exercises)
```

---

### How to Run & Test
1. Open `day-09-food-delivery/` in your code editor.
2. Launch `index.html` with Live Server or open in any browser.
3. Open **Chrome/Edge DevTools** (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
4. Click the **Toggle Device Toolbar** icon (`Ctrl + Shift + M`) to simulate various devices:
   - **iPhone / Mobile (375px - 414px)**: Notice the navigation collapses to a hamburger icon `☰`. Click the icon to expand/collapse the mobile drawer. Food cards stack into a single column.
   - **iPad / Tablet (768px - 820px)**: Notice the navigation displays full links, categories reconfigure into 3 columns, and food cards display in a 2x2 grid.
   - **MacBook / Desktop (> 1024px)**: Full widescreen experience with 6-column category pills and 4-column food catalog.

---

### Student Challenges
1. **Clamp() Fluid Typography**: Replace static font sizes with CSS `clamp()`, such as `font-size: clamp(1.75rem, 4vw + 1rem, 2.75rem);` on `.hero-title` to demonstrate seamless continuous scaling without sudden media query jumps.
2. **Delivery Filter Bar**: Add a responsive filter toggle bar for "Dietary Options" (Vegetarian, Vegan, Gluten-Free) using flex wrapping.
3. **Cart Badge Responsive Adjustment**: Reposition the cart button to be pinned to the bottom of mobile screens as a sticky floating action bar (`position: fixed; bottom: 0;`).
