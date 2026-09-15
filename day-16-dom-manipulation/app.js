/* ==========================================================================
   DAY 16: DOM MANIPULATION
   Project: Dynamic Todo Application (TaskMaster)
   ========================================================================== */

// 1. SELECTING DOM ELEMENTS USING DIFFERENT METHODS
// Concept: getElementById - Selecting unique elements by ID
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const totalCountSpan = document.getElementById("total-count");
const activeCountSpan = document.getElementById("active-count");
const completedCountSpan = document.getElementById("completed-count");
const inputErrorMsg = document.getElementById("input-error-msg");

// Concept: querySelector - Selecting using CSS selector syntax
const todoList = document.querySelector("#todo-list");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");

// Concept: querySelectorAll - Selecting all matching elements (returns static NodeList)
const filterButtons = document.querySelectorAll(".filter-btn");

// Current active filter state
let currentFilter = "all";

// ==========================================================================
// 2. HELPER: UPDATE TASK COUNTERS & EMPTY STATE
// ==========================================================================
function updateCountersAndVisibility() {
    // Concept: getElementsByClassName - Returns a live HTMLCollection of elements
    const allItems = document.getElementsByClassName("todo-item");
    const totalCount = allItems.length;

    // Concept: querySelectorAll - Finding all items matching completed class
    const completedItems = document.querySelectorAll(".todo-item.completed");
    const completedCount = completedItems.length;
    const activeCount = totalCount - completedCount;

    // Concept: Changing Text using textContent
    totalCountSpan.textContent = totalCount;
    activeCountSpan.textContent = activeCount;
    completedCountSpan.textContent = completedCount;

    // Handling Empty State Placeholder
    const emptyState = document.querySelector(".empty-placeholder");
    if (totalCount === 0) {
        if (!emptyState) {
            // Concept: createElement - Creating new DOM elements dynamically
            const placeholder = document.createElement("div");
            // Concept: classList.add - Adding CSS class
            placeholder.classList.add("empty-placeholder");
            // Concept: Changing HTML using innerHTML
            placeholder.innerHTML = `
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#94a3b8">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No tasks yet. Add one above to get started!</p>
            `;
            // Concept: append - Inserting node into the DOM tree
            todoList.parentElement.appendChild(placeholder);
        }
    } else {
        // Concept: remove - Deleting node from DOM
        if (emptyState) {
            emptyState.remove();
        }
    }

    // Concept: Changing Styles directly via style property
    if (completedCount > 0) {
        clearCompletedBtn.style.display = "inline-block";
    } else {
        clearCompletedBtn.style.display = "none";
    }
}

// ==========================================================================
// 3. CREATE TASK ELEMENT FUNCTION
// ==========================================================================
function createTodoElement(taskText) {
    // Concept: createElement - Creating <li> for the task item
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // Left Container (Checkbox + Label)
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("item-left");

    // Checkbox input
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    // Task text span
    const spanText = document.createElement("span");
    spanText.classList.add("task-text");
    // Concept: textContent - Setting safe text without HTML parsing
    spanText.textContent = taskText;

    // Append children to left container
    leftContainer.append(checkbox, spanText);

    // Right Actions Container (Edit + Delete Buttons)
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("item-actions");

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-action", "btn-edit");
    editBtn.textContent = "Edit";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-action", "btn-delete");
    deleteBtn.textContent = "Delete";

    // Append buttons to actions container
    actionsContainer.append(editBtn, deleteBtn);

    // Concept: append - Attaching left and actions to <li>
    li.append(leftContainer, actionsContainer);

    // ----------------------------------------------------------------------
    // EVENT: MARK COMPLETE / INCOMPLETE
    // ----------------------------------------------------------------------
    checkbox.addEventListener("change", function () {
        // Concept: classList.toggle - Toggle 'completed' class on or off
        li.classList.toggle("completed", checkbox.checked);
        applyCurrentFilter();
        updateCountersAndVisibility();
    });

    // ----------------------------------------------------------------------
    // EVENT: EDIT TASK (INLINE EDITING)
    // ----------------------------------------------------------------------
    editBtn.addEventListener("click", function () {
        const isEditing = li.classList.contains("editing");

        if (!isEditing) {
            // Enter Edit Mode
            li.classList.add("editing");
            const currentTitle = spanText.textContent;

            // Create inline edit input
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.classList.add("edit-input");
            editInput.value = currentTitle;

            // Replace span with input inside leftContainer
            leftContainer.replaceChild(editInput, spanText);
            editInput.focus();

            // Update edit button appearance
            editBtn.textContent = "Save";
            // Concept: Changing styles dynamically
            editBtn.classList.remove("btn-edit");
            editBtn.classList.add("btn-save");

            // Save function on Enter key
            editInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    editBtn.click();
                }
            });
        } else {
            // Save Changes
            const editInput = leftContainer.querySelector(".edit-input");
            const newText = editInput.value.trim();

            if (newText !== "") {
                spanText.textContent = newText;
            }

            // Restore span
            leftContainer.replaceChild(spanText, editInput);
            li.classList.remove("editing");

            // Restore button styling
            editBtn.textContent = "Edit";
            editBtn.classList.remove("btn-save");
            editBtn.classList.add("btn-edit");
        }
    });

    // ----------------------------------------------------------------------
    // EVENT: DELETE TASK
    // ----------------------------------------------------------------------
    deleteBtn.addEventListener("click", function () {
        // Concept: remove - Removing element directly from DOM
        li.remove();
        updateCountersAndVisibility();
    });

    return li;
}

// ==========================================================================
// 4. ADD TASK HANDLER
// ==========================================================================
function handleAddTask() {
    const rawText = taskInput.value.trim();

    // Input Validation
    if (rawText === "") {
        // Concept: Changing text & style to show error
        inputErrorMsg.textContent = "Please enter a task title before adding.";
        taskInput.style.borderColor = "#ef4444";
        taskInput.focus();
        return;
    }

    // Clear validation error
    inputErrorMsg.textContent = "";
    taskInput.style.borderColor = "#cbd5e1";

    // Create new DOM item
    const newTaskElement = createTodoElement(rawText);

    // Concept: append - Adding new task to list container
    todoList.appendChild(newTaskElement);

    // Reset input field
    taskInput.value = "";
    taskInput.focus();

    // Reapply filter and sync counters
    applyCurrentFilter();
    updateCountersAndVisibility();
}

// Event Listeners for adding tasks
addTaskBtn.addEventListener("click", handleAddTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleAddTask();
    }
});

// Clear input error on user typing
taskInput.addEventListener("input", function () {
    if (taskInput.value.trim() !== "") {
        inputErrorMsg.textContent = "";
        taskInput.style.borderColor = "#4f46e5";
    }
});

// ==========================================================================
// 5. FILTERING TASKS (ALL / ACTIVE / COMPLETED)
// ==========================================================================
function applyCurrentFilter() {
    const allItems = todoList.querySelectorAll(".todo-item");

    allItems.forEach(function (item) {
        // Concept: classList.contains - Checking state
        const isCompleted = item.classList.contains("completed");

        // Concept: Changing styles (display: flex vs none)
        if (currentFilter === "all") {
            item.style.display = "flex";
        } else if (currentFilter === "active") {
            item.style.display = isCompleted ? "none" : "flex";
        } else if (currentFilter === "completed") {
            item.style.display = isCompleted ? "flex" : "none";
        }
    });
}

// Concept: querySelectorAll with forEach for button tab events
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Concept: classList.remove / add across collection
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Read data-filter attribute
        currentFilter = button.getAttribute("data-filter");
        applyCurrentFilter();
    });
});

// ==========================================================================
// 6. CLEAR COMPLETED TASKS
// ==========================================================================
clearCompletedBtn.addEventListener("click", function () {
    // Concept: querySelectorAll to select all completed elements
    const completedItems = todoList.querySelectorAll(".todo-item.completed");

    // Concept: remove - Removing all matching items from DOM
    completedItems.forEach(function (item) {
        item.remove();
    });

    updateCountersAndVisibility();
});

// ==========================================================================
// 7. INITIAL SEEDING & SETUP
// ==========================================================================
// Seed initial tasks for demonstration
const initialTasks = [
    "Review DOM Tree concepts and node properties",
    "Practice querySelector vs getElementById",
    "Build a dynamic Todo list project"
];

initialTasks.forEach(function (task) {
    const el = createTodoElement(task);
    todoList.appendChild(el);
});

// Mark the first one completed to show styling immediately
const firstItem = todoList.querySelector(".todo-item");
if (firstItem) {
    firstItem.classList.add("completed");
    const firstCheckbox = firstItem.querySelector(".task-checkbox");
    if (firstCheckbox) firstCheckbox.checked = true;
}

// Initial counter update
updateCountersAndVisibility();
