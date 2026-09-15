# Day 13: JavaScript Conditions and Loops

## Mini Project: Springfield Student Result Management Portal

An academic grading and scorecard engine demonstrating control flow in JavaScript: `if`, `else if`, `else`, `switch`, `for` loop, `while` loop, and multi-variable logical condition evaluations (`&&`, `||`, `!`).

---

### Learning Objectives
- Direct program logic using binary and multi-way conditionals: `if`, `else if`, and `else`.
- Handle discrete categorical evaluations efficiently using `switch (expression)` with `case`, `break`, and `default`.
- Execute repetitive tasks using the `for` loop (`initialization; condition; increment`).
- Process condition-dependent sequences using the `while` loop.
- Apply composite logical conditions with `&&` (AND), `||` (OR), and `!` (NOT) to enforce complex validation constraints.
- Dynamically build and inject DOM elements (table rows and status badges) using looped iterations.

---

### File Structure
```text
day-13-student-results/
├── index.html       (Student metadata inputs, subject marks form, and results card)
├── styles.css       (Form styling, pass/fail status banners, and scorecard table)
├── app.js           (Score summation via for-loop, grading with if/else, remarks via switch, stars via while-loop)
└── README.md        (Curriculum notes and exercises)
```

---

### How to Run & Test
1. Open `day-13-student-results/` in your code editor.
2. Launch `index.html` via Live Server or open in any web browser.
3. **Test Passing Flow**:
   - Default scores (`88, 92, 76, 84, 79`) produce an Aggregate of `83.80%`, Grade `A`, Green `PASSED` banner, and 4 Gold Stars (`⭐⭐⭐⭐`).
   - The switch statement prints the distinction counselor remark.
4. **Test Failing / Arrear Edge Case**:
   - Change "Database Systems" to `32` (below the 40 passing threshold), but set the other four subjects to `98`.
   - Even though the average percentage is high (> 75%), the system detects `hasFailedAnySubject === true` via logical `&&`.
   - The banner flips to red `FAILED / ARREAR`, the grade displays `F (Arrear)`, and the subject table marks Database Systems with a red `FAIL` badge.
5. **Test Validation Boundary**:
   - Enter `120` or `-5` in any field and click generate to observe the input validation condition.

---

### Student Challenges
1. **Highest & Lowest Subject Detector**: In the `for` loop, track the highest and lowest scoring subjects and display them in the report card (e.g. *"Strongest: JavaScript (92) | Weakest: Database (76)"*).
2. **Grade Point Average (GPA) Converter**: Add a function using a `switch` statement that converts the letter grade into a 4.0 or 10.0 GPA scale.
3. **Reset and Re-evaluate**: Add a "Clear Scores" reset button that clears inputs, removes the `.visible` class, and resets the student form.
