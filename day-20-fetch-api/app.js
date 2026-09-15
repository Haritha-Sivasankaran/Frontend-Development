/* ==========================================================================
   DAY 20: FRONTEND BACKEND COMMUNICATION (FETCH API & AJAX)
   Project: User Management Dashboard (CloudUser Portal)
   ========================================================================== */

// 1. API CONFIGURATION & STATE
// Using standard JSONPlaceholder public mock API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Application State
let usersState = [];
let isLoading = false;

// DOM Elements
const usersGrid = document.getElementById("users-grid");
const loadingWrapper = document.getElementById("loading-wrapper");
const errorCard = document.getElementById("error-card");
const errorMessageText = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const statusBanner = document.getElementById("status-banner");
const statusBannerText = document.getElementById("status-banner-text");
const httpInspectorLog = document.getElementById("http-inspector-log");

// Header & Modal Elements
const btnRefresh = document.getElementById("btn-refresh");
const btnOpenModal = document.getElementById("btn-open-create-modal");
const createUserModal = document.getElementById("create-user-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const createUserForm = document.getElementById("create-user-form");
const btnSubmitPost = document.getElementById("btn-submit-post");

// ==========================================================================
// 2. HELPER: HTTP INSPECTOR LOGGER
// ==========================================================================
function logHttpTransaction(method, url, status, data) {
    const timestamp = new Date().toLocaleTimeString();
    const formattedJson = JSON.stringify(data, null, 2);
    httpInspectorLog.textContent = `[${timestamp}] HTTP ${method} -> ${url}\nStatus: ${status}\nResponse Payload:\n${formattedJson}`;
}

// Banner feedback helper
function showBanner(message, type = "success") {
    statusBannerText.textContent = message;
    statusBanner.className = `status-banner show ${type}`;
    setTimeout(() => {
        statusBanner.className = "status-banner";
    }, 5000);
}

// ==========================================================================
// 3. GET REQUEST: FETCH USERS WITH LOADING & ERROR STATES
// ==========================================================================

/**
 * Concept: AJAX & fetch() GET Request
 * Fetches users asynchronously without page refresh.
 * Concept: Loading state toggling (spinner ON -> fetch -> spinner OFF).
 * Concept: Error handling (checking response.ok and try...catch).
 */
async function fetchUsers() {
    // 1. Enter Loading State
    isLoading = true;
    loadingWrapper.classList.add("active");
    usersGrid.style.display = "none";
    errorCard.classList.remove("active");
    btnRefresh.disabled = true;

    try {
        // Concept: fetch() defaults to GET method
        const response = await fetch(API_URL);

        // Concept: Status code inspection
        // response.ok is true if status code is in range 200-299
        if (!response.ok) {
            throw new Error(`Server returned HTTP status ${response.status}: ${response.statusText}`);
        }

        // Concept: response.json() parses incoming JSON stream to JS object
        const data = await response.json();

        // Update local state
        usersState = data;

        // Log transaction to HTTP inspector
        logHttpTransaction("GET", API_URL, `${response.status} ${response.statusText}`, {
            totalUsersReceived: data.length,
            sampleFirstUser: data[0]
        });

        // Render received users
        renderUsers(usersState);
        showBanner(`Successfully loaded ${data.length} users from server (HTTP 200 OK)!`);

    } catch (error) {
        // Concept: Network / Server error handling
        console.error("Fetch Users Failed:", error);

        // Fallback to local offline mock data if external API fails (firewall/offline)
        if (usersState.length === 0) {
            usersState = getOfflineMockUsers();
            renderUsers(usersState);
            showBanner("Network unreachable. Loaded offline demonstration users.", "error");
        } else {
            errorCard.classList.add("active");
            errorMessageText.textContent = error.message || "Failed to communicate with remote API.";
        }

        logHttpTransaction("GET", API_URL, "FAILED / NETWORK_ERROR", {
            errorName: error.name,
            errorMessage: error.message
        });

    } finally {
        // 2. Exit Loading State
        isLoading = false;
        loadingWrapper.classList.remove("active");
        usersGrid.style.display = "grid";
        btnRefresh.disabled = false;
    }
}

// ==========================================================================
// 4. POST REQUEST: CREATE USER VIA HTTP POST
// ==========================================================================

/**
 * Concept: HTTP POST Request using fetch()
 * Sends new user object serialized with JSON.stringify() in request body.
 * Expects HTTP 201 Created response from server.
 */
async function handleCreateUser(e) {
    e.preventDefault();

    const name = document.getElementById("post-name").value.trim();
    const email = document.getElementById("post-email").value.trim();
    const phone = document.getElementById("post-phone").value.trim();
    const company = document.getElementById("post-company").value.trim();

    // Prepare Payload
    const newUserData = {
        name: name,
        username: name.toLowerCase().replace(/\s+/g, "_"),
        email: email,
        phone: phone,
        company: {
            name: company || "Freelance / Independent"
        },
        website: "portfolio.dev"
    };

    // UI Loading state on button
    btnSubmitPost.disabled = true;
    btnSubmitPost.textContent = "Sending POST request...";

    try {
        // Concept: fetch with POST options
        const response = await fetch(API_URL, {
            method: "POST", // HTTP Method
            headers: {
                "Content-Type": "application/json; charset=UTF-8" // Informs backend payload format
            },
            // Concept: JSON.stringify converts JS object into JSON string
            body: JSON.stringify(newUserData)
        });

        if (!response.ok) {
            throw new Error(`HTTP POST error! Status: ${response.status}`);
        }

        // Parse 201 response JSON
        const createdUserResponse = await response.json();

        // Update local state without reload (Prepend to top of dashboard)
        usersState.unshift(createdUserResponse);
        renderUsers(usersState);

        // Log transaction to HTTP inspector
        logHttpTransaction("POST", API_URL, `${response.status} Created`, createdUserResponse);

        // Feedback & Modal close
        showBanner(`User "${createdUserResponse.name}" created successfully (HTTP ${response.status} Created)! Assigned ID: #${createdUserResponse.id}`);
        closeModal();
        createUserForm.reset();

    } catch (error) {
        console.error("POST Request Error:", error);
        alert(`Failed to create user: ${error.message}`);
        logHttpTransaction("POST", API_URL, "ERROR", { error: error.message });
    } finally {
        btnSubmitPost.disabled = false;
        btnSubmitPost.textContent = "Transmit POST Request";
    }
}

// ==========================================================================
// 5. DOM RENDERING & SEARCH FILTERING
// ==========================================================================

function renderUsers(usersToDisplay) {
    usersGrid.innerHTML = "";

    if (usersToDisplay.length === 0) {
        usersGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; color: #64748b;">
                <p style="font-size: 1.1rem; font-weight: 600;">No matching users found.</p>
                <p style="font-size: 0.85rem; margin-top: 0.35rem;">Try adjusting your search query.</p>
            </div>
        `;
        return;
    }

    usersToDisplay.forEach(user => {
        const card = document.createElement("article");
        card.className = "user-card";

        // Initials avatar
        const initials = user.name
            .split(" ")
            .map(n => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        const companyName = user.company && user.company.name ? user.company.name : "Enterprise Corp";
        const phone = user.phone || "N/A";
        const website = user.website || "example.com";

        card.innerHTML = `
            <div>
                <div class="user-card-header">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-primary-info">
                        <h3 class="user-name" title="${user.name}">${user.name}</h3>
                        <span class="user-handle">@${user.username || "user"} • ID: #${user.id}</span>
                    </div>
                </div>

                <ul class="user-details">
                    <li class="detail-row">
                        <span class="detail-label">Email:</span>
                        <a href="mailto:${user.email}" style="color: #0284c7; text-decoration: none;">${user.email}</a>
                    </li>
                    <li class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span>${phone}</span>
                    </li>
                    <li class="detail-row">
                        <span class="detail-label">Company:</span>
                        <span>${companyName}</span>
                    </li>
                    <li class="detail-row">
                        <span class="detail-label">Website:</span>
                        <span>${website}</span>
                    </li>
                </ul>
            </div>

            <div class="user-tag">Verified API Resource</div>
        `;

        usersGrid.appendChild(card);
    });
}

// Client-Side Search Filter (input event)
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = usersState.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(query);
        const emailMatch = user.email.toLowerCase().includes(query);
        const companyMatch = user.company && user.company.name && user.company.name.toLowerCase().includes(query);
        return nameMatch || emailMatch || companyMatch;
    });

    renderUsers(filtered);
});

// ==========================================================================
// 6. MODAL & EVENT CONTROLS
// ==========================================================================

function openModal() {
    createUserModal.classList.add("open");
}

function closeModal() {
    createUserModal.classList.remove("open");
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

// Close modal when clicking backdrop
createUserModal.addEventListener("click", function (e) {
    if (e.target === createUserModal) {
        closeModal();
    }
});

// Close modal on Escape key
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && createUserModal.classList.contains("open")) {
        closeModal();
    }
});

// Refresh button trigger
btnRefresh.addEventListener("click", fetchUsers);

// Retry button trigger on error card
document.getElementById("btn-retry").addEventListener("click", fetchUsers);

// Form submit trigger for POST
createUserForm.addEventListener("submit", handleCreateUser);

// Close banner trigger
document.getElementById("btn-close-banner").addEventListener("click", function () {
    statusBanner.className = "status-banner";
});

// ==========================================================================
// 7. OFFLINE FALLBACK SEED DATA
// ==========================================================================
function getOfflineMockUsers() {
    return [
        { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031", company: { name: "Romaguera-Crona" }, website: "hildegard.org" },
        { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593", company: { name: "Deckow-Crist" }, website: "anastasia.net" },
        { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", phone: "1-463-123-4447", company: { name: "Romaguera-Jacobson" }, website: "ramiro.info" },
        { id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org", phone: "493-170-9623", company: { name: "Robel-Corkery" }, website: "kale.biz" }
    ];
}

// Initial Fetch on startup
fetchUsers();
