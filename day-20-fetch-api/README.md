# Day 20: Frontend Backend Communication (Fetch API & AJAX)

## Mini Project: CloudUser Directory — User Management Dashboard

An asynchronous, single-page client dashboard interacting with a RESTful mock backend (`JSONPlaceholder`). Demonstrates the modern JavaScript **Fetch API**, **HTTP GET & POST** requests, JSON serialization/parsing, response status validation, live search filtering, and state management (loading spinners and error handlers) without full-page reloads.

---

### Learning Objectives
- Differentiate between **Frontend** (client-side DOM rendering, event handling) and **Backend** (server databases, business logic, REST APIs).
- Master the **HTTP Request-Response Lifecycle**: HTTP methods (`GET`, `POST`), Headers (`Content-Type: application/json`), Request Bodies, and Status Codes (`200 OK`, `201 Created`, `400`, `404`, `500`).
- Use **AJAX** to exchange data in the background without refreshing the browser.
- Leverage the modern Promise-based **`fetch()` API** with `async / await`.
- Parse asynchronous JSON byte streams using **`response.json()`**.
- Implement production-grade **Loading States** (animated CSS spinners and disabled buttons) to enhance UX during network latency.
- Handle communication failures gracefully using **`try...catch`**, `response.ok` checks, user-friendly error banners, and offline mock fallbacks.

---

### File Structure
```text
day-20-fetch-api/
├── index.html       (Header actions, search bar, loading spinner, error card, user grid, and POST modal)
├── styles.css       (Modern indigo/sky gradient theme, responsive grid, card badges, inspector console)
├── app.js           (Async fetch functions: GET users, POST user, client search, and HTTP logger)
└── README.md        (Curriculum documentation, HTTP status table, and challenge exercises)
```

---

### How to Run & Test
1. Open `day-20-fetch-api/` in your code editor.
2. Launch `index.html` in your browser or via Live Server.
3. **Inspect the Initial GET Request**:
   - Notice the loading spinner appear briefly while `fetch('https://jsonplaceholder.typicode.com/users')` executes.
   - 10 user cards populate the dashboard with initials avatars, company tags, and email links.
   - Inspect the **Live HTTP Network Inspector** at the bottom of the page to review the raw JSON payload and HTTP status (`200 OK`).
4. **Test Real-Time Client Search**:
   - Type `Leanne` or `Romaguera` into the search bar $\rightarrow$ the cards filter in real time without triggering network requests or page reloads.
5. **Create a User via HTTP POST**:
   - Click the **"Create User (POST)"** button in the top right.
   - Complete the form: Full Name, Email, Phone Number, Company.
   - Click **"Transmit POST Request (JSON)"**.
   - Observe the button enter a loading state (`Sending POST request...`).
   - The server acknowledges with `HTTP 201 Created` and assigns ID `#11`.
   - The new user card immediately mounts at the very top of your dashboard directory, and the HTTP Inspector displays the returned JSON.
6. **Test Error Handling**:
   - Disconnect your internet connection or simulate an offline profile in Chrome DevTools Network tab.
   - Click **"Fetch (GET)"** $\rightarrow$ observe the red alert banner or error state card with a working "Retry" button.

---

### Student Challenges
1. **HTTP DELETE Request**: Add a "Delete User" button on each card that sends a `fetch(API_URL + '/' + id, { method: 'DELETE' })` request and removes the element from the DOM upon receiving a 200/204 status.
2. **HTTP PUT / PATCH (Edit User)**: Add an "Edit User" button opening a modal that sends a `PATCH` request to update an existing user's phone or company.
3. **Simulated Server Latency**: Wrap the fetch function or use a delayed mock URL (`https://httpstat.us/200?sleep=2000`) to observe and fine-tune loading skeleton cards.
