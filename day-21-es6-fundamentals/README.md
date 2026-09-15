# Day 21: ES6 Fundamentals

## Mini Project: ApexStore — Modern Shopping Cart

A full-fledged e-commerce cart architecture re-engineered from the ground up using **ECMAScript 2015 (ES6)** features: `const` and `let`, **Template Literals**, **Arrow Functions**, the **Spread Operator**, **Rest Parameters**, and deep **Object & Array Destructuring**.

---

### Learning Objectives
- Differentiate between **`const`** (immutable variable identifier) and **`let`** (reassignable block-scoped variable) to completely eliminate legacy `var`.
- Compose dynamic, multi-line HTML and receipt strings with **Template Literals** using backticks and `${expression}` interpolation.
- Write concise, expressive logic with **Arrow Functions** (`() => expression`), taking advantage of implicit returns and lexical `this`.
- Leverage the **Spread Operator (`...`)** to perform immutable object and array updates without modifying existing state.
- Gather variable function arguments into true JavaScript arrays using **Rest Parameters (`...args`)**.
- Unpack deeply nested values quickly with **Object Destructuring** (`const { title, price } = product;`).
- Dissect sequential lists using **Array Destructuring** (`const [firstItem, secondItem, ...tail] = cart;`).

---

### File Structure
```text
day-21-es6-fundamentals/
├── index.html       (Catalog grid, sticky shopping bag sidebar, and receipt dialog)
├── styles.css       (Modern indigo theme, responsive two-column grid, coupon badges)
├── app.js           (ES6 implementation: arrow functions, spread state, rest coupons, destructuring)
└── README.md        (Curriculum documentation, syntax mapping table, and challenge exercises)
```

---

### How to Run & Test
1. Open `day-21-es6-fundamentals/` in your code editor.
2. Launch `index.html` in any browser or with Live Server.
3. **Add Items to Bag**:
   - Click "Add to Cart" on the *Pro Wireless ANC Headphones* ($199.99).
   - Observe the bag update via array spread (`cart = [...cart, { ...product, quantity: 1 }]`).
   - Click "Add to Cart" a second time $\rightarrow$ notice quantity increments to 2 via object spread (`{ ...item, quantity: item.quantity + 1 }`).
4. **Inspect Array Destructuring Live**:
   - Look at the **ES6 Array Destructuring Analysis** box in the sidebar:
     - Shows Primary Item `[0]`: `"Pro Wireless ANC Headphones"`.
     - Shows Secondary Item `[1]`: `(None)`.
   - Add a *Tactile Mechanical Keyboard* $\rightarrow$ Secondary Item updates instantly to `"Tactile Mechanical Keyboard"`.
   - Add a 3rd item $\rightarrow$ Tail (`...otherItems`) shows `1 other product line(s)`.
5. **Test Rest Operator (`...coupons`)**:
   - Type `SAVE10` into the promo code box and click **Apply** $\rightarrow$ 10% discount subtracted.
   - Enter `APEX20` $\rightarrow$ both coupons are passed into `calculateDiscounts(subtotal, ...appliedCoupons)` using rest parameters.
6. **Checkout (Template Literals)**:
   - Click **Proceed to Checkout** $\rightarrow$ opens the modal with an ASCII formatted receipt generated entirely with a multi-line template literal.

---

### Student Challenges
1. **Default Function Parameters**: Refactor `calculateDiscounts` to include default parameters (e.g. `taxRate = 0.08`) so tax computation happens automatically if no tax rate is supplied.
2. **Dynamic Property Names in Object Literals**: Use computed property names `[fieldName]: value` when modifying cart item configurations.
3. **Swapping Cart Positions with Array Destructuring**: Add "Move Up" / "Move Down" buttons on cart rows that swap elements in-place using array destructuring: `[cart[i], cart[i+1]] = [cart[i+1], cart[i]]`.
