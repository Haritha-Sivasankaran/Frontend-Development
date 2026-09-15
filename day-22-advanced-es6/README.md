# Day 22: Advanced ES6

## Mini Project: BiteStream — Food Order Management

An interactive full-lifecycle food delivery order system built with **Advanced ES6** concepts: higher-order array methods (`map()`, `filter()`, `reduce()`, `find()`, `findIndex()`), **ES6 Classes and Inheritance** (`MenuItem`, `FoodItem`, `BeverageItem`, `Order`), and asynchronous **Promises with Promise Chaining** simulating a real-world multi-stage delivery pipeline.

---

### Learning Objectives
- Master higher-order array iterators:
  - **`map()`**: Transform array elements into new arrays of data or DOM markup.
  - **`filter()`**: Prune arrays conditionally (e.g. filtering menu categories or deleting items).
  - **`reduce()`**: Accumulate collections into a single scalar value (such as calculating totals and item counts).
  - **`find()`** vs. **`findIndex()`**: Locate specific elements or their index positions by predicate condition.
- Model domain entities with modern **ES6 Classes** (`class`), constructors, method definitions, and subclass inheritance (`extends`, `super`).
- Understand asynchronous JavaScript: Callbacks vs. **Promises** (`new Promise((resolve, reject) => ...)`).
- Execute sequential asynchronous workflows using **Promise Chaining** (`.then().then().catch().finally()`).
- Visualize multi-step asynchronous state transitions in the DOM.

---

### File Structure
```text
day-22-advanced-es6/
├── index.html       (Menu grid, basket checkout sidebar, and live Promise timeline)
├── styles.css       (Warm culinary theme, status pulse animations, terminal logger)
├── app.js           (ES6 classes, array method routines, and multi-stage Promise chain)
└── README.md        (Curriculum guide, execution timeline, and challenges)
```

---

### How to Run & Test
1. Open `day-22-advanced-es6/` in your code editor.
2. Launch `index.html` in any web browser.
3. **Explore Menu with ES6 Array Methods**:
   - Click category filter tabs: **Burgers**, **Pizzas**, **Drinks** $\rightarrow$ tests `filter()` and `map()` rendering.
   - Notice the badges: *FoodItem* vs *BeverageItem* showcasing polymorphic class inheritance and overridden `getDetails()` descriptions.
4. **Add Items to Basket**:
   - Click "+ Add" on *Truffle Smash Burger* ($14.99) and *Fresh Mango Passion Smoothie* ($6.75).
   - `find()` retrieves the menu item; `findIndex()` checks if the item already exists in the cart; `reduce()` updates the subtotal, tax, and grand total.
5. **Place Food Order & Watch the Promise Chain Flow**:
   - Click the orange **"Place Food Order"** button.
   - Watch the live **Order Pipeline**:
     - **Stage 1 (1.5s)**: Yellow pulsing indicator $\rightarrow$ turns Green: `✓ Accepted by Head Chef`.
     - **Stage 2 (2.5s)**: Kitchen preparation begins $\rightarrow$ turns Green: `✓ Food Cooked & Packed`.
     - **Stage 3 (2.0s)**: Driver navigates $\rightarrow$ turns Green: `✓ Delivered to Doorstep`.
   - Inspect the **Promise Console** at the bottom of the sidebar to see live timestamped logs of every resolved Promise in the chain!
   - Notice the cart automatically clears and updates its totals upon fulfillment completion.

---

### Student Challenges
1. **Calorie Accumulator**: Use `reduce()` to sum and display the total calorie count of all food items currently sitting in the customer's cart.
2. **Cancellation with Promise.race()**: Add a "Cancel Order" button within the first 1.5 seconds that races against the restaurant acceptance Promise.
3. **Async / Await Refactoring**: Refactor the `.then()` chain in `placeOrderBtn` to use modern `async / await` and compare readability.
