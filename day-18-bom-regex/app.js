/* ==========================================================================
   DAY 18: BROWSER OBJECT MODEL (BOM) & REGULAR EXPRESSIONS
   Project: Smart Registration & Browser Info App (CyberPortal)
   ========================================================================== */

// ==========================================================================
// PART 1: REGULAR EXPRESSIONS & SMART FORM VALIDATION
// ==========================================================================

// Regular Expression Patterns
// 1. Username: Starts with a letter, followed by 3-15 word characters (alphanumeric & underscore) -> Total 4-16 chars
const REGEX_USERNAME = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;

// 2. Email: standard pattern using meta characters and character classes
// [a-zA-Z0-9._%+-]+ @ [a-zA-Z0-9.-]+ \. [a-zA-Z]{2,}
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 3. Phone: Supports international format with optional +country code, optional brackets, hyphens or spaces (e.g. +1-555-123-4567 or (555) 123-4567 or 9876543210)
const REGEX_PHONE = /^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

// 4. Password: At least 8 chars, containing at least 1 lowercase, 1 uppercase, 1 digit, and 1 special char
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

// Form DOM Elements
const form = document.getElementById("smart-register-form");
const usernameInput = document.getElementById("reg-username");
const emailInput = document.getElementById("reg-email");
const phoneInput = document.getElementById("reg-phone");
const passwordInput = document.getElementById("reg-password");
const formResultBox = document.getElementById("form-result-box");

// Validation Helper Function
function validateField(inputEl, regex, hintEl, successMsg, errorMsg) {
    const value = inputEl.value.trim();

    if (value === "") {
        inputEl.classList.remove("valid", "invalid");
        hintEl.textContent = "";
        hintEl.className = "validation-hint";
        return false;
    }

    // Concept: regex.test(string) -> Returns true or false
    const isValid = regex.test(value);

    if (isValid) {
        inputEl.classList.remove("invalid");
        inputEl.classList.add("valid");
        hintEl.textContent = successMsg;
        hintEl.className = "validation-hint success";
        return true;
    } else {
        inputEl.classList.remove("valid");
        inputEl.classList.add("invalid");
        hintEl.textContent = errorMsg;
        hintEl.className = "validation-hint error";
        return false;
    }
}

// Live Validation Listeners (input event)
usernameInput.addEventListener("input", function () {
    const hint = document.getElementById("hint-username");
    validateField(
        usernameInput,
        REGEX_USERNAME,
        hint,
        "✓ Valid username format",
        "Must start with a letter, 4-16 characters, letters/numbers/underscore only."
    );
});

emailInput.addEventListener("input", function () {
    const hint = document.getElementById("hint-email");
    validateField(
        emailInput,
        REGEX_EMAIL,
        hint,
        "✓ Valid email address format",
        "Please enter a valid email (e.g., user@domain.com)."
    );
});

phoneInput.addEventListener("input", function () {
    const hint = document.getElementById("hint-phone");
    validateField(
        phoneInput,
        REGEX_PHONE,
        hint,
        "✓ Valid phone number format",
        "Enter a valid 10-digit number (e.g., 555-123-4567 or +1 555 123 4567)."
    );
});

passwordInput.addEventListener("input", function () {
    const hint = document.getElementById("hint-password");
    validateField(
        passwordInput,
        REGEX_PASSWORD,
        hint,
        "✓ Strong password requirements met",
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character."
    );
});

// Form Submission Audit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isUserOk = REGEX_USERNAME.test(usernameInput.value.trim());
    const isEmailOk = REGEX_EMAIL.test(emailInput.value.trim());
    const isPhoneOk = REGEX_PHONE.test(phoneInput.value.trim());
    const isPassOk = REGEX_PASSWORD.test(passwordInput.value);

    if (isUserOk && isEmailOk && isPhoneOk && isPassOk) {
        formResultBox.className = "form-result-box success";
        formResultBox.innerHTML = `
            <strong>Registration Approved!</strong><br>
            All fields successfully verified via Regular Expression patterns.<br>
            User: <em>${usernameInput.value.trim()}</em> | Email: <em>${emailInput.value.trim()}</em>
        `;
    } else {
        formResultBox.className = "form-result-box error";
        formResultBox.innerHTML = `
            <strong>Validation Failed:</strong><br>
            Please correct the invalid fields highlighted above before submitting.
        `;
    }
});

// ==========================================================================
// PART 2: BROWSER OBJECT MODEL (BOM) DIAGNOSTICS
// ==========================================================================

// Function to populate BOM Navigator, Screen, Window, and Location properties
function refreshBOMDiagnostics() {
    // 1. NAVIGATOR OBJECT
    // Concept: navigator - Provides info about browser, language, network status
    document.getElementById("nav-browser").textContent = getBrowserName();
    document.getElementById("nav-language").textContent = navigator.language || "Unknown";
    document.getElementById("nav-platform").textContent = navigator.platform || "Standard Web";
    document.getElementById("nav-cookies").textContent = navigator.cookieEnabled ? "Enabled" : "Disabled";

    // Online Status Badge
    const onlineBadge = document.getElementById("online-badge-text");
    const statusDot = document.getElementById("status-dot");
    if (navigator.onLine) {
        onlineBadge.textContent = "Online";
        statusDot.className = "status-dot";
    } else {
        onlineBadge.textContent = "Offline";
        statusDot.className = "status-dot offline";
    }

    // 2. SCREEN OBJECT
    // Concept: screen - Physical monitor resolution and display depth
    document.getElementById("scr-resolution").textContent = `${screen.width} × ${screen.height} px`;
    document.getElementById("scr-available").textContent = `${screen.availWidth} × ${screen.availHeight} px`;
    document.getElementById("scr-colordepth").textContent = `${screen.colorDepth} bit`;
    document.getElementById("scr-orientation").textContent = screen.orientation ? screen.orientation.type : "Landscape / Standard";

    // 3. WINDOW OBJECT
    // Concept: window - Current browser viewport dimensions and scaling
    document.getElementById("win-viewport").textContent = `${window.innerWidth} × ${window.innerHeight} px`;
    document.getElementById("win-dpr").textContent = `${window.devicePixelRatio}x`;

    // 4. LOCATION OBJECT
    // Concept: location - Details about the current page URL
    document.getElementById("loc-protocol").textContent = location.protocol;
    document.getElementById("loc-host").textContent = location.host || "Local File";
    document.getElementById("loc-pathname").textContent = location.pathname;
    document.getElementById("loc-href").textContent = location.href;

    // 5. HISTORY OBJECT
    // Concept: history - Session navigation stack count
    document.getElementById("hist-count").textContent = `${history.length} session entries`;
}

// Helper to parse browser name from userAgent
function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Google Chrome";
    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
    return "Modern Web Browser";
}

// Real-time Viewport update on Window Resize
window.addEventListener("resize", function () {
    document.getElementById("win-viewport").textContent = `${window.innerWidth} × ${window.innerHeight} px`;
});

// Real-time Online / Offline status tracking
window.addEventListener("online", refreshBOMDiagnostics);
window.addEventListener("offline", refreshBOMDiagnostics);

// ==========================================================================
// PART 3: BOM NAVIGATION & WINDOW CONTROLS
// ==========================================================================

// Concept: history.back()
document.getElementById("btn-hist-back").addEventListener("click", function () {
    if (history.length > 1) {
        history.back();
    } else {
        alert("No previous page in current session history!");
    }
});

// Concept: history.forward()
document.getElementById("btn-hist-forward").addEventListener("click", function () {
    history.forward();
});

// Concept: location.reload()
document.getElementById("btn-loc-reload").addEventListener("click", function () {
    location.reload();
});

// Concept: location.assign() / hash navigation
document.getElementById("btn-loc-hash").addEventListener("click", function () {
    location.hash = "regex-audit";
    refreshBOMDiagnostics();
});

// Concept: window.open() - Opens a controlled pop-up window
document.getElementById("btn-win-popup").addEventListener("click", function () {
    window.open(
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
        "MDNRegex",
        "width=650,height=500,scrollbars=yes,resizable=yes"
    );
});

// Initial diagnostics run on page load
refreshBOMDiagnostics();
