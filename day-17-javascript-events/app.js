/* ==========================================================================
   DAY 17: JAVASCRIPT EVENTS
   Project: Interactive Registration Form (EventCraft)
   ========================================================================== */

// 1. ELEMENT SELECTIONS
const form = document.getElementById("registration-form");
const formWrapper = document.getElementById("form-wrapper");
const formHeader = document.getElementById("form-header");

// Input Fields
const fullNameInput = document.getElementById("fullname");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("toggle-password");
const roleSelect = document.getElementById("role");
const bioTextarea = document.getElementById("bio");
const termsCheckbox = document.getElementById("terms");

// Feedback & Displays
const bioCounter = document.getElementById("bio-counter");
const strengthBarFill = document.getElementById("strength-bar-fill");
const strengthText = document.getElementById("strength-text");
const passwordRulesCard = document.getElementById("password-rules-card");
const passwordContainer = document.getElementById("password-container");
const submitBtn = document.getElementById("btn-submit");
const resetBtn = document.getElementById("btn-reset");

// Event Monitor Displays
const monitorMouse = document.getElementById("monitor-mouse");
const monitorKey = document.getElementById("monitor-key");
const monitorEvent = document.getElementById("monitor-event");

// Modal Elements
const successModal = document.getElementById("success-modal");
const summaryDetails = document.getElementById("summary-details");
const closeModalBtn = document.getElementById("btn-close-modal");

// Helper to log recent events to the top event monitor bar
function logEvent(eventName, detail = "") {
    if (monitorEvent) {
        monitorEvent.textContent = `${eventName} ${detail ? "(" + detail + ")" : ""}`;
    }
}

// Helper to update validation status classes
function setValidation(inputEl, feedbackEl, isValid, message) {
    if (isValid) {
        inputEl.classList.remove("is-invalid");
        inputEl.classList.add("is-valid");
        feedbackEl.textContent = message || "✓ Looks good!";
        feedbackEl.className = "feedback-text valid";
    } else {
        inputEl.classList.remove("is-valid");
        inputEl.classList.add("is-invalid");
        feedbackEl.textContent = message;
        feedbackEl.className = "feedback-text";
    }
}

// ==========================================================================
// 2. MOUSE EVENTS: mousemove, mouseenter, mouseleave, click, dblclick
// ==========================================================================

// Concept: mousemove - Tracks cursor coordinates inside the form container
formWrapper.addEventListener("mousemove", function (event) {
    const rect = formWrapper.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    monitorMouse.textContent = `X: ${x}px, Y: ${y}px`;
});

// Concept: mouseenter & mouseleave - Display tooltip/rules card on hover
passwordContainer.addEventListener("mouseenter", function () {
    passwordRulesCard.classList.add("visible");
    logEvent("mouseenter", "Password Field");
});

passwordContainer.addEventListener("mouseleave", function () {
    passwordRulesCard.classList.remove("visible");
    logEvent("mouseleave", "Password Field");
});

// Concept: click - Toggle password visibility between "password" and "text"
togglePasswordBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent accidental form triggers
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");
    togglePasswordBtn.textContent = isPassword ? "🙈 Hide" : "👁️ Show";
    logEvent("click", "Toggle Password");
});

// Concept: dblclick - Double clicking header auto-fills sample demo data
formHeader.addEventListener("dblclick", function () {
    fullNameInput.value = "Johnathan Doe";
    usernameInput.value = "johndoe_pro";
    emailInput.value = "john.doe@example.com";
    passwordInput.value = "SecretPass123!";
    roleSelect.value = "developer";
    bioTextarea.value = "Full-stack developer who loves JavaScript events and clean architecture.";
    termsCheckbox.checked = true;

    // Trigger input validation recalculation
    fullNameInput.dispatchEvent(new Event("input"));
    usernameInput.dispatchEvent(new Event("input"));
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    bioTextarea.dispatchEvent(new Event("input"));
    termsCheckbox.dispatchEvent(new Event("change"));

    logEvent("dblclick", "Auto-filled Demo Data");
});

// Double click username label to generate random handle
document.getElementById("username-label").addEventListener("dblclick", function () {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    usernameInput.value = `coder_${randomSuffix}`;
    usernameInput.dispatchEvent(new Event("input"));
    logEvent("dblclick", "Generated Random Handle");
});

// ==========================================================================
// 3. KEYBOARD EVENTS: keydown, keyup
// ==========================================================================

// Concept: keyup - Global listener to show the last key released in the monitor bar
window.addEventListener("keyup", function (event) {
    monitorKey.textContent = `${event.key} (Code: ${event.code})`;
    logEvent("keyup", event.key);
});

// Concept: keydown - Intercept disallowed characters in username (e.g. no spaces)
usernameInput.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        event.preventDefault(); // Stop space from being entered
        const feedback = document.getElementById("username-feedback");
        setValidation(usernameInput, feedback, false, "Spaces are not permitted in username.");
        logEvent("keydown", "Blocked Space Key");
    }
});

// ==========================================================================
// 4. FORM FOCUS & BLUR EVENTS
// ==========================================================================

// Concept: focus - Visual emphasis and hint when field gains focus
fullNameInput.addEventListener("focus", function () {
    logEvent("focus", "Full Name");
});

// Concept: blur - Formatting and validation check when user leaves the field
fullNameInput.addEventListener("blur", function () {
    fullNameInput.value = fullNameInput.value.trim();
    const feedback = document.getElementById("fullname-feedback");
    if (fullNameInput.value.length < 3) {
        setValidation(fullNameInput, feedback, false, "Name must be at least 3 characters.");
    } else {
        setValidation(fullNameInput, feedback, true);
    }
    logEvent("blur", "Full Name");
});

emailInput.addEventListener("blur", function () {
    emailInput.value = emailInput.value.trim().toLowerCase();
    const feedback = document.getElementById("email-feedback");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        setValidation(emailInput, feedback, false, "Please enter a valid email address.");
    } else {
        setValidation(emailInput, feedback, true);
    }
    logEvent("blur", "Email");
});

// ==========================================================================
// 5. INPUT EVENTS: Real-Time Typing & Validation
// ==========================================================================

// Username Real-time Validation
usernameInput.addEventListener("input", function () {
    const feedback = document.getElementById("username-feedback");
    const val = usernameInput.value.trim();

    if (val.length < 4) {
        setValidation(usernameInput, feedback, false, "Username must be at least 4 characters.");
    } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setValidation(usernameInput, feedback, false, "Only letters, numbers, and underscores allowed.");
    } else {
        setValidation(usernameInput, feedback, true, `✓ @${val} is available!`);
    }
    logEvent("input", "Username");
});

// Bio Textarea Character Counter via input event
const MAX_BIO_LENGTH = 150;
bioTextarea.addEventListener("input", function () {
    const currentLen = bioTextarea.value.length;
    bioCounter.textContent = `${currentLen} / ${MAX_BIO_LENGTH}`;

    if (currentLen >= MAX_BIO_LENGTH) {
        bioCounter.style.color = "#ef4444";
        bioCounter.style.fontWeight = "bold";
    } else {
        bioCounter.style.color = "#64748b";
        bioCounter.style.fontWeight = "normal";
    }
    logEvent("input", "Bio Counter");
});

// Password Strength Evaluation on input
passwordInput.addEventListener("input", function () {
    const pwd = passwordInput.value;
    const feedback = document.getElementById("password-feedback");

    // Evaluate strength criteria
    const hasMinLen = pwd.length >= 8;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    // Update rule checklist items
    updateRuleItem("rule-len", hasMinLen);
    updateRuleItem("rule-upper", hasUpper);
    updateRuleItem("rule-num", hasNumber);
    updateRuleItem("rule-special", hasSpecial);

    let score = 0;
    if (hasMinLen) score++;
    if (hasLower && hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Update meter appearance
    if (pwd.length === 0) {
        strengthBarFill.style.width = "0%";
        strengthBarFill.className = "strength-bar-fill";
        strengthText.textContent = "None";
        setValidation(passwordInput, feedback, false, "Password is required.");
    } else if (score <= 1) {
        strengthBarFill.style.width = "25%";
        strengthBarFill.className = "strength-bar-fill strength-weak";
        strengthText.textContent = "Weak";
        setValidation(passwordInput, feedback, false, "Too weak. Add uppercase, numbers or symbols.");
    } else if (score === 2 || score === 3) {
        strengthBarFill.style.width = "65%";
        strengthBarFill.className = "strength-bar-fill strength-medium";
        strengthText.textContent = "Moderate";
        setValidation(passwordInput, feedback, true, "Moderate password. Add special chars for max security.");
    } else {
        strengthBarFill.style.width = "100%";
        strengthBarFill.className = "strength-bar-fill strength-strong";
        strengthText.textContent = "Strong";
        setValidation(passwordInput, feedback, true, "✓ Strong & secure password!");
    }
    logEvent("input", "Password Strength");
});

function updateRuleItem(ruleId, isMet) {
    const el = document.getElementById(ruleId);
    if (el) {
        if (isMet) {
            el.classList.add("met");
            el.textContent = el.textContent.replace("⚪", "🟢");
        } else {
            el.classList.remove("met");
            el.textContent = el.textContent.replace("🟢", "⚪");
        }
    }
}

// ==========================================================================
// 6. CHANGE EVENTS: select dropdown & checkbox
// ==========================================================================

// Concept: change - Fires when user commits a selection change
roleSelect.addEventListener("change", function () {
    const selectedText = roleSelect.options[roleSelect.selectedIndex].text;
    logEvent("change", `Role: ${selectedText}`);
});

// Checkbox change toggles Submit button enable/disable state
termsCheckbox.addEventListener("change", function () {
    submitBtn.disabled = !termsCheckbox.checked;
    logEvent("change", `Terms: ${termsCheckbox.checked ? "Accepted" : "Declined"}`);
});

// ==========================================================================
// 7. SUBMIT & RESET EVENTS
// ==========================================================================

// Concept: submit - Intercept default page refresh with preventDefault()
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop browser reload!
    logEvent("submit", "Registration Attempt");

    // Run final validation check
    const isNameValid = fullNameInput.value.trim().length >= 3;
    const isUserValid = usernameInput.value.trim().length >= 4;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isPasswordValid = passwordInput.value.length >= 8;
    const isTermsAccepted = termsCheckbox.checked;

    if (!isNameValid || !isUserValid || !isEmailValid || !isPasswordValid || !isTermsAccepted) {
        alert("Please ensure all fields are properly completed and terms accepted.");
        return;
    }

    // Populate Success Summary Modal
    summaryDetails.innerHTML = `
        <p><strong>Full Name:</strong> ${fullNameInput.value.trim()}</p>
        <p><strong>Username:</strong> @${usernameInput.value.trim()}</p>
        <p><strong>Email Address:</strong> ${emailInput.value.trim()}</p>
        <p><strong>Account Role:</strong> ${roleSelect.options[roleSelect.selectedIndex].text}</p>
        <p><strong>Password Strength:</strong> ${strengthText.textContent}</p>
        <p><strong>Bio:</strong> ${bioTextarea.value.trim() || "No bio provided"}</p>
    `;

    successModal.classList.add("active");
});

// Close Modal button
closeModalBtn.addEventListener("click", function () {
    successModal.classList.remove("active");
    form.reset();
    resetValidationState();
    logEvent("click", "Closed Modal & Reset");
});

// Reset Button click
resetBtn.addEventListener("click", function () {
    resetValidationState();
    logEvent("click", "Form Cleared");
});

function resetValidationState() {
    const inputs = form.querySelectorAll(".form-input, .form-textarea");
    inputs.forEach(input => input.classList.remove("is-valid", "is-invalid"));

    const feedbacks = form.querySelectorAll(".feedback-text");
    feedbacks.forEach(f => {
        f.textContent = "";
        f.className = "feedback-text";
    });

    strengthBarFill.style.width = "0%";
    strengthText.textContent = "None";
    bioCounter.textContent = `0 / ${MAX_BIO_LENGTH}`;
    submitBtn.disabled = true;

    // Reset password checklist markers
    ["rule-len", "rule-upper", "rule-num", "rule-special"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove("met");
            el.textContent = el.textContent.replace("🟢", "⚪");
        }
    });
}
