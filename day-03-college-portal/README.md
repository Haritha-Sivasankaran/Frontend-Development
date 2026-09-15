# Day 3: HTML5 Semantic Elements and Tables

## Mini Project: College News & Timetable Website

A semantic web portal featuring accessible multi-span timetable scheduling, native accordions, article syndication, and sidebar notices.

---

### Learning Objectives
- Master semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Replace "div soup" with accessible, self-describing structural containers.
- Implement zero-JavaScript interactive accordions using `<details>` and `<summary>`.
- Structure accessible tabular data with `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, and `<th scope="col|row">`.
- Apply complex table cell merging using `rowspan` and `colspan`.

---

### File Structure
```text
day-03-college-portal/
├── index.html       (Semantic portal with articles, timetable, aside, and FAQs)
├── styles.css       (Minimal CSS for clean borders, spacing, and readability)
└── README.md        (Lesson guide, breakdown, and exercises)
```

---

### How to Run
1. Open the `day-03-college-portal/` folder in your code editor.
2. Launch `index.html` via Live Server or open directly in any browser.
3. Test the `<details>` dropdowns in the FAQ section by clicking the question headers.
4. Examine how `colspan="5"` stretches the Tea Break and Lunch Break across Monday through Friday.
5. Examine how `rowspan="2"` stretches the Lab sessions over two consecutive 1-hour time blocks on Wednesday and Thursday.

---

### Student Challenges
1. **Weekend Schedule Addition**: Add Saturday morning to the table columns, updating the `colspan` values from 5 to 6 so the break rows remain aligned.
2. **Open Attribute Experiment**: Add or remove the `open` boolean attribute on the `<details>` elements to control which FAQ items are expanded by default upon page load.
3. **Faculty Contact Sidebar**: Add another `<aside>` or expand the existing one to include a semantic list of departmental contact offices with phone numbers and email links.
