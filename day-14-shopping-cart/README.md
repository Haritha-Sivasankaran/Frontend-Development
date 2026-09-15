# Day 14: JavaScript Arrays, Objects, and Functions

## Mini Project: TechVault Interactive Shopping Cart

A full-fledged e-commerce cart architecture powered by JavaScript data structures: **Objects** for product and cart modeling, **Arrays** for inventory collections, and pure reusable **Functions** with parameters, arguments, and return values.

---

### Learning Objectives
- Model real-world entities using JavaScript **Object literals** (`{ key: value }`).
- Manage collections of data using **Arrays** (`[]`) and arrays of objects.
- Write modular **Functions** with defined parameters and explicit `return` values.
- Differentiate between function *parameters* (placeholders in definitions) and *arguments* (actual values passed at invocation).
- Perform Array manipulation: `push()` to add items and `splice(index, 1)` to delete items.
- Calculate business metrics (subtotal, percentage discounts, final invoice amounts) using modular functions.

---

### File Structure
```text
day-14-shopping-cart/
├── index.html       (Two-column layout: product catalog and dynamic cart summary)
├── styles.css       (Shopping cart styling, quantity badges, and financial rows)
├── app.js           (Catalog array, cart state, addToCart, removeFromCart, and discount calculators)
└── README.md        (Curriculum documentation and challenges)
```

---

### How to Run & Test
1. Open `day-14-shopping-cart/` in your code editor.
2. Launch `index.html` via Live Server or open in any browser.
3. **Add Products**:
   - Click "Add to Cart" on the Mechanical Keyboard ($129.99).
   - Notice the cart updates immediately: the item appears on the right, the cart badge increments to "1 item", and the subtotal reflects `$129.99`.
4. **Increment Quantity**:
   - Click the `+` button in the cart. The quantity updates to 2, and the subtotal recalculates to `$259.98`.
   - Click the `−` button twice; observe the item being completely removed when its quantity reaches 0 via `cart.splice()`.
5. **Apply Promotional Discount**:
   - Add multiple items to the cart.
   - Enter `SAVE10` in the promo input and click **Apply**; observe a 10% discount subtracted from the final total.
   - Test `TECH20` for a 20% discount.
6. **Checkout**:
   - Click "Proceed to Secure Checkout" to trigger the order summary alert.

---

### Student Challenges
1. **Sales Tax Calculator**: Add a function `calculateTax(subtotal, taxRate)` that computes an 8.5% state sales tax row into the order breakdown.
2. **Clear Cart Button**: Add a "Empty Cart" button that resets `cart = []` and updates the display.
3. **Item Stock Limit**: Add a `stock` property to each catalog object (e.g. `stock: 3`) and prevent users from incrementing the cart quantity beyond available inventory.
