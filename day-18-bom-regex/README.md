# Day 18: Browser Object Model (BOM) & Regular Expressions

## Mini Project: CyberPortal — Smart Registration & Browser Info App

A dual-panel application combining client-side **Regular Expression (RegEx)** input validation with comprehensive **Browser Object Model (BOM)** system diagnostics (`window`, `screen`, `navigator`, `location`, and `history`).

---

### Learning Objectives
- Demystify the **Browser Object Model (BOM)**: understand the role of `window` as the root global object, `screen` for monitor physics, `navigator` for client environment data, `location` for URL manipulation, and `history` for session navigation.
- Master Regular Expression syntax: literals `/pattern/`, character classes (`[a-z]`, `[A-Z]`, `[0-9]`), and meta-characters (`\d`, `\w`, `\s`).
- Control repetitions using quantifiers (`+`, `*`, `?`, `{min,max}`).
- Ensure exact full-string matching using start (`^`) and end (`$`) anchors.
- Use `regex.test(str)` to provide live, reactive form validation feedback.
- Manipulate navigation without external routing using `location.reload()`, `location.hash`, `history.back()`, and controlled popups via `window.open()`.

---

### File Structure
```text
day-18-bom-regex/
├── index.html       (Dual-panel layout: Regex Registration Form and BOM System Diagnostics)
├── styles.css       (Dark theme styling, responsive 2-column grid, regex input feedback)
├── app.js           (Regex pattern matching, live input validation, and BOM property interrogation)
└── README.md        (Curriculum documentation, regex explanation table, and challenges)
```

---

### How to Run & Test
1. Open `day-18-bom-regex/` in your code editor.
2. Launch `index.html` in any modern web browser or via Live Server.
3. **Panel 1: Smart Regex Registration**:
   - **Username**: Type `alex` $\rightarrow$ valid. Type `9alex` (starts with digit) or `alex dev` (contains space) $\rightarrow$ instantly triggers red outline and error hint.
   - **Email**: Type `alex@domain` $\rightarrow$ invalid. Add `.com` $\rightarrow$ validates immediately.
   - **Phone Number**: Test multiple formats: `(555) 123-4567`, `+1 555 123 4567`, or `9876543210` $\rightarrow$ all recognized as valid.
   - **Password**: Enter a weak string like `password` $\rightarrow$ invalid. Enter `Secret99!` $\rightarrow$ validates as meeting uppercase, lowercase, digit, and special symbol criteria.
   - Click **"Audit & Register Account"** $\rightarrow$ verifies all four regex patterns simultaneously and renders a confirmation summary box.
4. **Panel 2: BOM Environment Diagnostics**:
   - **Navigator**: Inspect your detected browser engine, primary language, operating system platform, and cookie capability.
   - **Online Status**: Toggle your Wi-Fi or go offline in DevTools Network tab $\rightarrow$ watch the status badge flip between **Online (Green)** and **Offline (Red)** in real time.
   - **Screen vs. Window**: Compare your physical monitor resolution (`screen.width × screen.height`) with your active browser viewport (`window.innerWidth × window.innerHeight`).
   - Resize your browser window $\rightarrow$ observe the live viewport dimensions updating instantly via `window.onresize`.
   - **Location**: Inspect current protocol (`http:`, `https:`, or `file:`), host, pathname, and full `href`.
   - **Navigation Controls**: Click `history.back()`, `history.forward()`, `location.reload()`, `Append #Hash`, and `window.open()`.

---

### Student Challenges
1. **Postal/Zip Code Validator**: Add an Address / Postal Code input field that validates US ZIP codes (`/^\d{5}(-\d{4})?$/`) or UK Postcodes using Regular Expressions.
2. **Battery Status API Integration**: Leverage `navigator.getBattery()` (if supported by your browser) to display live battery percentage and charging status in the BOM panel.
3. **Regex Search & Replace Tool**: Add an interactive scratchpad where students type a sample sentence, enter a search regex and replacement string, and view `string.replace(regex, replacement)` results live on screen.
