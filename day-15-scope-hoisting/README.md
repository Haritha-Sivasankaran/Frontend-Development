# Day 15: JavaScript Scope and Hoisting

## Mini Project: JavaScript Concept Playground

An interactive educational workbench where students run safe live experiments to observe JavaScript **Global Scope**, **Function Scope**, **Block Scope (`var` vs `let`)**, **Variable Hoisting**, the **Temporal Dead Zone (TDZ)**, and **Function Declarations vs Expressions** directly on the webpage.

---

### Learning Objectives
- Differentiate between **Global Scope**, **Function Scope**, and **Block Scope**.
- Compare `var` (function/globally scoped) vs `let` and `const` (block scoped `{ ... }`).
- Understand JavaScript Execution Context: the **Creation Phase** vs **Execution Phase**.
- Demystify **Variable Hoisting** and observe how `var` initializes to `undefined` while `let`/`const` enter the **Temporal Dead Zone (TDZ)**.
- Distinguish between **Function Declarations** (hoisted with implementation body) and **Function Expressions** (behave as variables in TDZ).
- Catch and display runtime `ReferenceError`s gracefully in the UI without crashing browser execution.

---

### File Structure
```text
day-15-scope-hoisting/
├── index.html       (Interactive 3-section layout featuring 6 concept experiment cards)
├── styles.css       (Dark theme developer UI with code snippet boxes, live terminal screens)
├── app.js           (Safe execution handlers, try-catch isolation, and DOM display functions)
└── README.md        (Documentation, experiment walkthroughs, and challenge exercises)
```

---

### How to Run & Test
1. Open `day-15-scope-hoisting/` in your code editor.
2. Launch `index.html` in any modern web browser or via VS Code Live Server.
3. **Experiment 1 (Global vs Function Scope)**:
   - Click "Run Experiment".
   - Notice that outer scope variables (`globalAppTitle`) are accessible inside `authModule()`, but attempting to access `localSecretToken` outside throws a `ReferenceError`.
4. **Experiment 2 (Block Scope: var vs let)**:
   - Click "Run Experiment".
   - Observe how `var leakedVar` declared inside `if (true) { ... }` leaks to the outer scope, while `let trappedLet` is strictly contained and throws an error if accessed outside.
5. **Experiment 3 (Hoisting with var)**:
   - Click "Run Experiment".
   - See how accessing `hoistedItem` before its declaration line returns `undefined` (engine hoisted declaration and initialized it).
6. **Experiment 4 (Hoisting with let & TDZ)**:
   - Click "Run Experiment".
   - See the caught `ReferenceError: Cannot access 'tdzItem' before initialization`, proving `let` is in the Temporal Dead Zone.
7. **Experiment 5 & 6 (Function Declaration vs Expression)**:
   - Click both experiment buttons.
   - Observe that `getDiscount(150)` runs before its line because declarations are hoisted completely.
   - Observe that `calculateTax(100)` throws an error because function expressions bound to `const` remain uninitialized in the TDZ.

---

### Student Challenges
1. **Const Re-assignment vs Mutation**: Add an experiment card comparing `const x = 10; x = 20;` (TypeError) versus `const user = { name: 'Alex' }; user.name = 'Sam';` (Allowed mutation).
2. **Nested Lexical Scope (Scope Chain)**: Add a 3-tier function nest (`grandParent()` -> `parent()` -> `child()`) showing how variable lookup traverses upwards toward global scope.
3. **Loop Closure Dilemma**: Create a demonstration comparing `for (var i = 0; i < 3; i++)` vs `for (let i = 0; i < 3; i++)` inside `setTimeout()` showing how block scope solves the classic loop closure pitfall.
