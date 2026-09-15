# Day 7: CSS Layout Fundamentals

## Mini Project: E-Commerce Product Listing Page

A real-world commercial product listing catalog engineered to demonstrate the Box Model, display models (`block`, `inline`, `inline-block`), positioning modes (`static`, `relative`, `absolute`, `fixed`, `sticky`), overflow clipping/scrolling, and historical `float` with clearfix.

---

### Learning Objectives
- Master the Box Model: `content`, `padding`, `border`, `margin`, and `box-sizing: border-box`.
- Compare display behaviors: `block` (full-width stack), `inline` (text flow), and `inline-block` (side-by-side with dimensions).
- Implement all 5 CSS positioning modes:
  - `static`: Browser default document flow.
  - `relative`: Offsets element from itself and establishes the containing block for absolute children.
  - `absolute`: Removed from normal flow and positioned relative to nearest positioned ancestor.
  - `fixed`: Glued to viewport coordinates regardless of scrolling.
  - `sticky`: Scrolls naturally with content until reaching an offset threshold, then sticks.
- Control container overflow using `overflow: hidden`, `overflow-x: auto`, and ellipsis text truncation (`text-overflow: ellipsis`).
- Understand `float` mechanics and how `.clearfix::after` prevents parent container collapse.

---

### File Structure
```text
day-07-product-listing/
├── index.html       (Fixed header, sticky filter, promo banner, and product cards)
├── styles.css       (Layout stylesheet showcasing box-model, display, position, and overflow)
└── README.md        (Curriculum documentation and challenges)
```

---

### How to Run & Test
1. Open `day-07-product-listing/` in your editor.
2. Launch `index.html` via Live Server or double-click to open in any browser.
3. **Scroll the page down**:
   - Notice that the top black header stays permanently **fixed** at `top: 0`.
   - Notice that the white category pill bar scrolls with the page until it touches `top: 70px`, where it **sticks** in place.
4. **Inspect the Category Bar**:
   - Shrink the browser width; observe how the category tags enable smooth horizontal touch scrolling without wrapping (`overflow-x: auto`).
5. **Inspect the Product Cards**:
   - Hover over a product card to observe image zoom smoothly clipped by `overflow: hidden`.
   - Observe the "SALE" and "HOT" badges positioned at `top: 12px; left: 12px` via `position: absolute`.

---

### Student Challenges
1. **Quick-View Hover Overlay**: Inside `.product-image-box`, add a "Quick View" button positioned with `position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);` that appears only when the card is hovered (`opacity: 0` to `opacity: 1`).
2. **Back-to-Top Floating Button**: Add a circular floating action button with `position: fixed; bottom: 24px; right: 24px; z-index: 999;` that stays anchored on screen.
3. **Rating Star Badge**: Position an absolute rating badge (e.g. "★ 4.8") on the bottom-right of each product image.
