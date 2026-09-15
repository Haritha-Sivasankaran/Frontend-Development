# Day 12: JavaScript Introduction

## Mini Project: Smart Calculator & Type Inspector

An interactive calculator engineered to demonstrate JavaScript primitive types (`number`, `string`, `null`, `undefined`), variable declarations (`let` vs. `const`), arithmetic and logical operators, type coercion vs. explicit type conversion (`parseFloat`, `Number`), and native `Math` functions (`Math.round`, `Math.floor`, `Math.ceil`).

---

### Learning Objectives
- Understand JavaScript as the behavioral engine of web applications.
- Master variable declarations: immutable bindings (`const`) vs. mutable state (`let`).
- Work with JavaScript primitive data types: `number`, `string`, `null`, `undefined`, and `NaN`.
- Apply arithmetic operators (`+`, `-`, `*`, `/`, `%`) and assignment operators.
- Differentiate between strict equality (`===`) and loose equality (`==`).
- Understand JavaScript Type Coercion and why explicit conversion (`parseFloat()`, `Number()`) is mandatory when handling HTML form inputs.
- Execute native JavaScript `Math` utility functions: `Math.round()`, `Math.floor()`, and `Math.ceil()`.

---

### File Structure
```text
day-12-smart-calculator/
├── index.html       (Calculator UI and diagnostic console display)
├── styles.css       (Calculator card layout and digital output styling)
├── app.js           (Core JavaScript logic, type conversion, and math operations)
└── README.md        (Curriculum documentation and exercises)
```

---

### How to Run & Test
1. Open `day-12-smart-calculator/` in your code editor.
2. Launch `index.html` via Live Server or double-click to open in any web browser.
3. Open the **Browser Developer Console** (`F12` -> Console tab).
4. **Test Calculations & Inspect Coercion**:
   - Enter `25` in Operand A, `10` in Operand B, and hit **Compute Result**.
   - Notice the green display shows `35`.
   - Read the diagnostic console at the bottom: observe how HTML input values are natively strings (`"25"` and `"10"`), and see why without `parseFloat()`, `"25" + "10"` would have resulted in the string `"2510"`.
   - Test division by 0: Enter `50` and `0` to observe JavaScript's division-by-zero handling.
   - Switch rounding methods to `Math.floor()` or `Math.ceil()` with decimal inputs like `7.8`.

---

### Student Challenges
1. **Power Function (Exponentiation)**: Add an exponentiation operator button (`**` or `^`) using either the `**` operator or `Math.pow(num1, num2)`.
2. **Square Root Quick Button**: Add a quick-action button that immediately calculates `Math.sqrt(num1)` and updates the screen.
3. **Random Number Generator**: Add a button that populates Operand A and B with random numbers between 1 and 100 using `Math.floor(Math.random() * 100) + 1`.
