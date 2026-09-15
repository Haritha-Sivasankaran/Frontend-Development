# Day 6: CSS Introduction and Basic Styling

## Mini Project: Professional Profile Card

Transforming the Day 1 raw HTML personal profile into a sleek, production-grade profile card using external CSS.

---

### Learning Objectives
- Master the three ways to apply CSS: Inline (`style=""`), Internal (`<style>`), and External (`<link rel="stylesheet">`).
- Understand CSS selector mechanics: Universal (`*`), Type (`p`), Class (`.class`), ID (`#id`), and Pseudo-classes (`:hover`).
- Apply CSS text typography: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, and `text-transform`.
- Style colors using HEX, RGB/RGBA, and linear gradients.
- Build clean component geometries with `margin`, `padding`, `border`, and `border-radius: 50%` (circular avatar).
- Style lists into badge pills (`list-style: none`, `border-radius: 9999px`).
- Style interactive buttons and hover states with smooth transitions (`transition: all 0.2s ease`).

---

### File Structure
```text
day-06-profile-card/
├── index.html       (Semantic profile structure with SVG icons)
├── styles.css       (Complete external stylesheet with reset, typography, and card rules)
└── README.md        (Curriculum notes and exercises)
```

---

### How to Run & Test
1. Open `day-06-profile-card/` in your code editor.
2. Launch `index.html` via Live Server or double-click to view in any browser.
3. Compare this with `day-01-profile-page/index.html`: observe how semantic HTML combined with external CSS creates an entirely transformed modern UI card.
4. Hover over the profile card, skill pills, action buttons, and social icons to verify CSS `:hover` states and smooth transitions.

---

### Student Challenges
1. **Dark Theme Variant**: Modify `styles.css` to invert the card colors: `#1f2937` card background, `#ffffff` text, and a glowing neon border.
2. **Followers Stat Counter**: Add a 3-column stats bar between the bio and skills list showing "Projects (12)", "Followers (1.4k)", and "Rating (4.9)".
3. **Status Indicator Animation**: Add a simple CSS pulse animation to `.online-status` to make it flash subtly.
