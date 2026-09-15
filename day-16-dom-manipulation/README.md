# Day 16: DOM Manipulation

## Mini Project: TaskMaster — Dynamic Todo Application

A modern, production-grade task manager built entirely with native **JavaScript DOM Manipulation** methods. Zero external libraries, frameworks, or dependencies—just pure DOM tree traversal, creation, modification, and deletion.

---

### Learning Objectives
- Master DOM selection APIs: `getElementById`, `getElementsByClassName`, `querySelector`, and `querySelectorAll`.
- Understand the difference between a **live `HTMLCollection`** and a **static `NodeList`**.
- Safely update node text using `textContent` and inject formatted markup using `innerHTML`.
- Dynamically alter element styling directly through `element.style`.
- Add, remove, and toggle CSS classes with the powerful `classList` API (`add`, `remove`, `toggle`, `contains`).
- Construct and mount new DOM subtrees with `document.createElement()` and `element.append()` / `appendChild()`.
- Destroy and remove nodes from the DOM tree with `element.remove()`.
- Implement practical features: task creation, inline editing, toggle completion, live task statistics counters, filter views, and bulk completed cleanup.

---

### File Structure
```text
day-16-dom-manipulation/
├── index.html       (Semantic task manager card layout with input, filter tabs, stats bar)
├── styles.css       (Modern indigo gradient backdrop, card shadows, action buttons, strike-through)
├── app.js           (DOM element selectors, event listeners, dynamic creation, inline editor, counter sync)
└── README.md        (Curriculum documentation, method mapping, and challenge exercises)
```

---

### How to Run & Test
1. Open `day-16-dom-manipulation/` in your code editor.
2. Launch `index.html` in any browser or with Live Server.
3. **Add a Task**:
   - Type a new task into the input box and click **"+ Add Task"** or press the **Enter** key.
   - Observe the new task item injected into `#todo-list`, and watch the Total and Active counters increment instantly.
4. **Validation Test**:
   - Try clicking "+ Add Task" with an empty input; observe the red border and error message rendered dynamically into the DOM.
5. **Mark Task Complete**:
   - Click any task checkbox. Notice the text line-through styling applied via `classList.toggle('completed')` and the live counters updating automatically.
6. **Edit Task**:
   - Click the **"Edit"** button on any task item.
   - The text span transforms into an inline `<input type="text">` and the button changes to a green **"Save"** button.
   - Update the text and click **"Save"** (or hit Enter) to persist changes.
7. **Filter Tasks**:
   - Click **"Active"** tab to hide completed items (`display: none`).
   - Click **"Completed"** tab to view only finished tasks.
   - Click **"All"** tab to restore full list visibility.
8. **Delete & Clear Completed**:
   - Click **"Delete"** on any single item to invoke `li.remove()`.
   - Click **"Clear Completed"** to batch-delete all completed items from the DOM tree.

---

### Student Challenges
1. **Task Priority Badges**: Add a priority selector (`<select id="priority">` with options: *Low*, *Medium*, *High*) and inject a styled priority pill into each created task item.
2. **Local Storage Persistence**: Enhance `app.js` to serialize tasks to `localStorage.setItem('tasks', ...)` so tasks persist after browser reload.
3. **Due Date Display**: Add an `<input type="date">` to each task and render a due date badge, highlighting overdue tasks in red with a custom `.overdue` class.
