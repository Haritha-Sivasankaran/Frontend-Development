# Day 23: jQuery

## Mini Project: NexusAdmin — jQuery Admin Dashboard

A responsive administrative portal built using **jQuery v3.7.1**. Features a collapsible sidebar, live client-side row filtering, asynchronous AJAX data ingestion (`$.ajax()`), inline and modal DOM mutation, event delegation, and dynamic row addition/deletion with smooth animation effects.

---

### Learning Objectives
- Understand the core philosophy of jQuery ("*Write Less, Do More*") and the universal `$` wrapper function.
- Query DOM nodes effortlessly with concise CSS-based selectors (`$('#id')`, `$('.class')`, `$('tr:not(...)')`).
- Filter existing matched sets using jQuery filter methods and pseudo-selectors (`.filter()`, `:visible`, `:contains`).
- Read and update DOM properties, values, and HTML content with `.text()`, `.html()`, and `.val()`.
- Mutate styles and classes dynamically with `.css()`, `.addClass()`, `.removeClass()`, and `.toggleClass()`.
- Implement robust **Event Delegation** via `$(parent).on('click', '.child', ...)` to handle dynamically created rows.
- Execute asynchronous background network requests using `$.ajax({ url, method, success, error })`.
- Compare jQuery syntax and performance directly against modern Vanilla JavaScript (ES6+).

---

### jQuery vs. Vanilla JavaScript Comparison

| Feature / Task | Modern Vanilla JavaScript (ES6+) | jQuery (`$`) |
| :--- | :--- | :--- |
| **DOM Ready** | `document.addEventListener('DOMContentLoaded', () => {})` | `$(document).ready(() => {})` or `$(() => {})` |
| **Select Element by ID** | `document.getElementById('sidebar')` | `$('#sidebar')` |
| **Select Elements by Class**| `document.querySelectorAll('.btn-delete')` | `$('.btn-delete')` |
| **Toggle CSS Class** | `el.classList.toggle('collapsed')` | `$('#sidebar').toggleClass('collapsed')` |
| **Read / Set Input Value** | `input.value` / `input.value = "Alex"` | `$input.val()` / `$input.val("Alex")` |
| **Update HTML Content** | `el.innerHTML = "<span>New</span>"` | `$el.html("<span>New</span>")` |
| **Event Delegation** | Manual traversal using `e.target.closest('.child')` | `$(parent).on('click', '.child', fn)` |
| **AJAX Request** | `const res = await fetch(url); const data = await res.json();` | `$.ajax({ url, success: fn })` or `$.getJSON(url, fn)` |
| **Fade Animation** | CSS transitions or Web Animations API | `$el.fadeIn(300)` / `$el.fadeOut(300)` |

---

### File Structure
```text
day-23-jquery/
├── index.html       (Collapsible sidebar, topbar with counter, table card, add/edit modals)
├── styles.css       (Modern dark slate dashboard styling, smooth transitions, role badges)
├── app.js           (jQuery implementation: $(document).ready, selectors, AJAX, event delegation)
└── README.md        (Curriculum guide, jQuery vs Vanilla JS comparison, and challenges)
```

---

### How to Run & Test
1. Open `day-23-jquery/` in your code editor.
2. Launch `index.html` in your browser.
3. **Verify Initial AJAX Load**:
   - On page load, `$.ajax()` fetches 10 users from `https://jsonplaceholder.typicode.com/users`.
   - A loading spinner displays in the table body while the request is in flight.
   - 10 rows populate the table, and the top badge updates to `10 Registered Users`.
4. **Test Sidebar Toggle**:
   - Click **"Collapse"** on the top bar $\rightarrow$ the sidebar animates to an icon-only strip (width 72px) and the button text updates to "Expand".
   - Click "Expand" $\rightarrow$ restores standard 260px sidebar width.
5. **Live Search Filtering (`.filter()`)**:
   - Type `Leanne` or `Admin` into the search box.
   - Rows automatically hide or show in real time matching your query.
6. **Add New Row (`.prepend()` & `.fadeIn()`)**:
   - Click **"+ Add User Row"** $\rightarrow$ opens the modal dialog with `.fadeIn()`.
   - Fill in Name, Email, Role, and submit $\rightarrow$ the new row is prepended at the top with a smooth fade-in animation, and the total counter increments.
7. **Edit User Row**:
   - Click **"Edit"** on any row $\rightarrow$ the edit modal appears pre-populated with that row's data.
   - Change the role to "Admin" and save $\rightarrow$ the row badge updates and briefly flashes green via `.css()`.
8. **Delete Row (Event Delegation)**:
   - Click **"Delete"** on any row $\rightarrow$ the row fades out smoothly via `.fadeOut(300)` and is removed from the DOM with `.remove()`.

---

### Student Challenges
1. **Export Table to CSV**: Add an "Export to CSV" button that iterates through `$('#user-table tbody tr')` using `$.each()`, gathers text content, and triggers a file download.
2. **Column Sorting with jQuery**: Add click event listeners on table headers (`th`) that sort rows alphabetically by name or email.
3. **Batch Selection & Deletion**: Add checkboxes to each table row and an "Apply to Selected" bulk action bar allowing users to delete multiple selected rows simultaneously.
