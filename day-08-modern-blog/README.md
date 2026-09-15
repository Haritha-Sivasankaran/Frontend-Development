# Day 8: Advanced CSS Styling

## Mini Project: Modern Engineering Blog

An editorial web application engineering deep multi-layer `box-shadow` depth, neon `text-shadow`, CSS combinators (`>`, `+`, `~`), pseudo-classes (`:nth-child`, `:focus`, `:first-child`), pseudo-elements (`::before`, `::after`, `::first-letter`), and single/multi-line text ellipsis clamping.

---

### Learning Objectives
- Master multi-stop `box-shadow` layering for realistic ambient light and recessed inset shadows (`box-shadow: inset ...`).
- Apply `text-shadow` for neon typography and atmospheric glow effects.
- Leverage CSS Combinators:
  - Child combinator (`A > B`)
  - Adjacent sibling combinator (`A + B`)
  - General sibling combinator (`A ~ B`)
  - Descendant combinator (`A B`)
- Implement structural pseudo-classes: `:first-child`, `:last-child`, `:nth-child(even/odd)`, and `:not()`.
- Construct decorative UI elements without extra HTML markup using pseudo-elements (`::before` and `::after`).
- Enforce single-line text ellipsis (`white-space: nowrap; text-overflow: ellipsis; overflow: hidden`) and multi-line line clamping (`-webkit-line-clamp: 3`).

---

### File Structure
```text
day-08-modern-blog/
├── index.html       (Semantic blog cards, search input, and metadata)
├── styles.css       (Advanced styling with shadows, pseudo-elements, and clamping)
└── README.md        (Curriculum notes and exercises)
```

---

### How to Run & Test
1. Open `day-08-modern-blog/` in your editor.
2. Launch `index.html` via Live Server or double-click to view in any browser.
3. **Hover over a Blog Card**:
   - Notice the card lifts upward (`translateY(-6px)`) while its `box-shadow` expands into a soft purple ambient halo.
   - Observe the sister cards subtly dim their opacity (`blog-grid:hover > .blog-card:not(:hover)`).
   - Notice the article title grows an animated gradient underline from 0% to 100% width via `::after`.
4. **Inspect Text Truncation**:
   - Notice the author's title truncates cleanly with `...` on a single line.
   - Notice the blog body excerpt is cleanly clamped to exactly 3 lines regardless of how much text is written.
5. **Inspect the Search Input**:
   - Focus the input to see the inset shadow combined with an indigo focus ring glow.

---

### Student Challenges
1. **Glassmorphism Backdrop Filter**: Add `backdrop-filter: blur(10px);` and a semi-transparent `background: rgba(30, 41, 59, 0.7);` to `.blog-card` to create an iOS-style frosted glass effect.
2. **Reading Progress Bar**: Add an animated gradient line at the very top of the page using `body::before` with `position: fixed; top: 0; left: 0; width: 100%; height: 3px;`.
3. **Featured Card Span**: Using the `:first-child` pseudo-class, make the first blog card span across 2 columns on wide screens (`grid-column: span 2;`).
