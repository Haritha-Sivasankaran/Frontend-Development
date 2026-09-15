# Day 19: JavaScript Object-Oriented Programming & Prototypes

## Mini Project: DevCorp EMS — Employee Management System

An enterprise-grade staff directory application demonstrating classic JavaScript **Object-Oriented Programming (OOP)**: Constructor Functions, the `this` binding keyword, prototypal method sharing, inheritance chains, and method overriding (polymorphism).

---

### Learning Objectives
- Model real-world hierarchies using JavaScript **Constructor Functions** (`function Employee(...)`).
- Understand the execution context of the **`this`** keyword inside constructors and prototype methods.
- Eliminate method duplication in memory by attaching shared functions to **`.prototype`**.
- Implement classical JavaScript inheritance using **`Parent.call(this, ...)`** (constructor borrowing) and **`Child.prototype = Object.create(Parent.prototype)`** (prototypal linking).
- Restore broken constructor references via `Child.prototype.constructor = Child`.
- Implement **Polymorphism** by overriding base prototype methods (e.g. `Developer.prototype.getDetails()` and `Manager.prototype.calculateAnnualBonus()`).
- Interrogate the live **Prototype Chain** (`Object.getPrototypeOf()`, `hasOwnProperty()`) with an interactive visual inspector.

---

### File Structure
```text
day-19-oop-prototypes/
├── index.html       (Recruiter form, interactive employee directory, and prototype chain modal)
├── styles.css       (Modern corporate theme, responsive cards, role badges, modal styling)
├── app.js           (Constructor functions: Employee, Developer, Designer, Manager, and prototypal links)
└── README.md        (Curriculum documentation, prototype chain diagram, and challenges)
```

---

### How to Run & Test
1. Open `day-19-oop-prototypes/` in your code editor.
2. Launch `index.html` in your browser.
3. **Inspect the Pre-seeded Directory**:
   - Notice the 4 initial employees: **Alice Chen** (*Developer*), **Marcus Rivera** (*Designer*), **Elena Rostova** (*Manager*), and **David Miller** (*Base Employee*).
   - Review how their salary badges, departments, and custom attributes differ according to their constructor.
4. **Execute Inherited & Subclass Methods**:
   - Click **"Run Role Action"** on Alice Chen $\rightarrow$ triggers `emp.code()`, showing a bottom toast: `💻 Alice Chen is writing high-performance code in TypeScript & React`.
   - Click **"Run Role Action"** on Marcus Rivera $\rightarrow$ triggers `emp.designPrototype()`.
   - Click **"Run Role Action"** on Elena Rostova $\rightarrow$ triggers `emp.conductMeeting()`.
5. **Test Inherited Methods**:
   - Click **"Give 10% Raise"** on any employee card $\rightarrow$ invokes `emp.giveRaise(10)`, which is defined on `Employee.prototype` and inherited by all subclasses.
   - Watch the salary badge and annual metrics recalculate live!
6. **Open the Prototype Chain Inspector**:
   - Click **"🔍 Inspect Prototype Chain"** on any card (e.g., Alice Chen, Developer).
   - Observe the step-by-step resolution stack:
     1. **Instance Object [Developer]**: Own properties (`id`, `name`, `salary`, `department`, `primaryLanguage`, `githubHandle`).
     2. **Developer.prototype**: Immediate prototype with methods (`code`, `fixBug`, `getDetails`).
     3. **Employee.prototype**: Base inherited prototype with methods (`calculateAnnualBonus`, `giveRaise`).
     4. **Object.prototype**: Universal root with methods (`hasOwnProperty`, `toString`, `valueOf`).
     5. **null**: The terminal boundary of the prototype chain.
7. **Recruit a New Staff Member**:
   - Select a role from the dropdown (notice role-specific inputs dynamically change).
   - Enter details and click **"+ Instantiate Employee"**.
   - Watch the new employee card mount into the directory with full prototypal functionality.

---

### Student Challenges
1. **QA Engineer Constructor**: Create a new constructor `QAEngineer(name, salary, department, testFramework)` that inherits from `Employee`, with prototype methods `writeAutomatedTests()` and `reportDefect()`.
2. **Dynamic Raise Percentage**: Replace the hardcoded 10% raise button with an interactive prompt or slider enabling customizable raise percentages.
3. **Contractor Subclass**: Implement a `Contractor` constructor inheriting from `Employee` that calculates bonuses as `$0` and has a `contractDurationMonths` property.
