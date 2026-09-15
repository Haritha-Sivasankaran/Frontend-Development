# Day 17: JavaScript Events

## Mini Project: EventCraft — Interactive Registration Form

A dynamic web application demonstrating modern event-driven programming in JavaScript. Covers mouse events (`click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`), keyboard events (`keydown`, `keyup`), form events (`submit`, `input`, `change`, `focus`, `blur`), and dynamic validation using standard `addEventListener()` practices.

---

### Learning Objectives
- Attach and configure event listeners via `addEventListener()`.
- Distinguish between typing and data commit events: `input` (fires on every keystroke/change) vs. `change` (fires upon blur or option selection).
- Manage keyboard events: intercept disallowed keys with `keydown` and track released keys with `keyup`.
- Handle mouse interactions: track cursor motion with `mousemove`, build interactive hover cards with `mouseenter` and `mouseleave`, toggle UI elements on `click`, and trigger shortcuts with `dblclick`.
- Manage form submission flow: intercept page reloads using `event.preventDefault()` inside `submit` listeners.
- Build real-world reactive patterns: dynamic password strength meters, live character counters, and input validation feedback.

---

### File Structure
```text
day-17-javascript-events/
├── index.html       (Registration card with event monitor bar, interactive inputs, and modal)
├── styles.css       (Form styling, validation states, password strength bar, rules tooltip)
├── app.js           (Event listeners: mousemove, keyup, keydown, input, focus, blur, change, submit)
└── README.md        (Curriculum guide, event verification steps, and challenge exercises)
```

---

### How to Run & Test
1. Open `day-17-javascript-events/` in your code editor.
2. Launch `index.html` in a web browser.
3. **Mouse Tracking (`mousemove`)**:
   - Move your cursor across the form card.
   - Watch the **Event Monitor Bar** at the top update live X and Y cursor coordinates.
4. **Keyboard Inspection (`keyup` & `keydown`)**:
   - Press any key on your keyboard $\rightarrow$ watch the `Key` indicator update in real time (`Enter`, `Shift`, `ArrowUp`, etc.).
   - In the **Username** field, try pressing the **Spacebar** $\rightarrow$ notice the space is blocked via `event.preventDefault()` in the `keydown` listener and an error appears.
5. **Password Rules Card (`mouseenter` & `mouseleave`)**:
   - Hover your mouse over the Password input area $\rightarrow$ the **Password Requirements** checklist appears.
   - Move your mouse away $\rightarrow$ the checklist disappears cleanly.
6. **Password Strength Meter (`input`)**:
   - Type in the password field $\rightarrow$ watch the meter bar grow from 0% (Weak/Red) to 65% (Moderate/Orange) to 100% (Strong/Green) as criteria are satisfied.
   - Click **"👁️ Show"** (`click`) to toggle password visibility.
7. **Character Counter (`input`)**:
   - Type into the **Short Bio** textarea $\rightarrow$ watch the character counter increment (`0 / 150`).
8. **Selection & Agreement (`change`)**:
   - Change the **Account Role** dropdown $\rightarrow$ observe the `change` event logged.
   - Check the **Terms of Service** checkbox $\rightarrow$ the **Complete Registration** button unlocks (`submitBtn.disabled = false`).
9. **Autofill Shortcut (`dblclick`)**:
   - Double-click the purple **EventCraft Register** header banner $\rightarrow$ instantly auto-fills sample test data into every field!
   - Double-click the **Username** label $\rightarrow$ generates a random handle.
10. **Submission Handling (`submit`)**:
    - Click **Complete Registration** $\rightarrow$ default browser page refresh is intercepted with `event.preventDefault()`, and the dark summary modal displays all submitted details.

---

### Student Challenges
1. **Caps Lock Warning**: Attach a `keydown` / `keyup` listener to the password field using `event.getModifierState("CapsLock")` to display an amber "⚠️ Warning: Caps Lock is ON" indicator.
2. **Confirm Password Match**: Add a "Confirm Password" input field that validates whether its value strictly matches the primary password field on every `input` event.
3. **Esc Key to Close Modal**: Add a global `keydown` listener so pressing the `Escape` key immediately closes the success modal and resets the form.
