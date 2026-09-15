/* ==========================================================================
   DAY 13: JAVASCRIPT CONDITIONS AND LOOPS
   Project: Student Result Management Portal
   ========================================================================== */

// 1. Subject Definitions (Array of metadata for loop processing)
const subjects = [
    { id: "sub-html", name: "Web Fundamentals (HTML5/CSS3)" },
    { id: "sub-js", name: "JavaScript Core & Algorithms" },
    { id: "sub-db", name: "Database Management Systems" },
    { id: "sub-net", name: "Computer Networks & HTTP" },
    { id: "sub-os", name: "Operating Systems Architecture" }
];

const PASSING_THRESHOLD = 40; // Minimum marks per subject to pass
const TOTAL_MAX_MARKS = subjects.length * 100; // 500 max marks

// 2. DOM Elements
const studentNameInput = document.getElementById("student-name");
const rollNumberInput = document.getElementById("roll-number");
const generateBtn = document.getElementById("generate-btn");
const reportCard = document.getElementById("report-card");
const statusBanner = document.getElementById("status-banner");
const statusText = document.getElementById("status-text");
const ratingStars = document.getElementById("rating-stars");
const totalMarksEl = document.getElementById("total-marks");
const percentageEl = document.getElementById("percentage");
const gradeEl = document.getElementById("grade");
const remarksEl = document.getElementById("remarks");
const studentSummaryEl = document.getElementById("student-summary");
const resultsTableBody = document.getElementById("results-tbody");

// 3. Main Result Processing Function
generateBtn.addEventListener("click", function () {
    const studentName = studentNameInput.value.trim();
    const rollNumber = rollNumberInput.value.trim();

    // Logical condition (||, !): Validate student identification
    if (!studentName || !rollNumber) {
        alert("Please enter both Student Name and Roll Number before generating the result.");
        return;
    }

    let totalMarks = 0;
    let hasFailedAnySubject = false;
    const subjectResults = [];

    // ==========================================================================
    // FOR LOOP: Iterating over subjects to validate marks & calculate total
    // ==========================================================================
    for (let i = 0; i < subjects.length; i = i + 1) {
        const inputEl = document.getElementById(subjects[i].id);
        const score = parseFloat(inputEl.value);

        // Nested IF / ELSE: Boundary validation check (0 - 100)
        if (isNaN(score) || score < 0 || score > 100) {
            alert(`Invalid score for ${subjects[i].name}. Marks must be between 0 and 100.`);
            return;
        }

        // Arithmetic accumulator
        totalMarks = totalMarks + score;

        // Condition: Check individual subject passing criteria
        let subjectPassed = true;
        if (score < PASSING_THRESHOLD) {
            subjectPassed = false;
            hasFailedAnySubject = true; // Flag for overall result
        }

        // Store structured record for table generation
        subjectResults.push({
            name: subjects[i].name,
            score: score,
            passed: subjectPassed
        });
    }

    // Calculate percentage
    const percentage = (totalMarks / TOTAL_MAX_MARKS) * 100;

    // ==========================================================================
    // IF / ELSE IF / ELSE: Multi-tier Grade Calculation
    // ==========================================================================
    let grade = "";
    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // ==========================================================================
    // LOGICAL CONDITIONS (&&, !): Determine Final Overall Pass/Fail
    // Student must maintain >= 40% overall AND must NOT have failed any subject
    // ==========================================================================
    const isOverallPassed = percentage >= 40 && !hasFailedAnySubject;

    // Override grade to 'F' if student failed a subject despite high aggregate
    if (!isOverallPassed && grade !== "F") {
        grade = "F (Arrear)";
    }

    // ==========================================================================
    // SWITCH STATEMENT: Counseling / Advisory Remarks based on Grade
    // ==========================================================================
    let counselorRemarks = "";
    switch (grade) {
        case "A+":
            counselorRemarks = "Outstanding Academic Distinction! Eligible for honors fellowship and direct research lab placement.";
            break;
        case "A":
            counselorRemarks = "Excellent performance! Demonstrates strong conceptual and practical proficiency across disciplines.";
            break;
        case "B":
            counselorRemarks = "Very good result. Solid foundation with potential to achieve top-tier distinction with targeted revision.";
            break;
        case "C":
            counselorRemarks = "Satisfactory standing. Recommended to spend additional lab hours strengthening system architecture.";
            break;
        case "D":
            counselorRemarks = "Conditional Pass. Academic probation warning; attendance in remedial tutorial sessions is mandatory.";
            break;
        case "F":
        case "F (Arrear)":
            counselorRemarks = "Academic Deficiency: The candidate must repeat the failed modular subject examinations in the next cycle.";
            break;
        default:
            counselorRemarks = "Evaluation pending official board validation.";
            break;
    }

    // ==========================================================================
    // WHILE LOOP: Generate Visual Performance Rating Stars
    // Calculates 1 star for every 20% achieved (max 5 stars)
    // ==========================================================================
    let starString = "";
    const totalStars = Math.floor(percentage / 20);
    let currentStarIndex = 0;

    while (currentStarIndex < totalStars) {
        starString = starString + "⭐";
        currentStarIndex = currentStarIndex + 1;
    }

    if (starString === "") {
        starString = "Needs Improvement";
    }

    // ==========================================================================
    // DOM Rendering: Populate Results Table & Summary UI
    // ==========================================================================
    studentSummaryEl.textContent = `Candidate: ${studentName} | Roll No: ${rollNumber}`;
    totalMarksEl.textContent = `${totalMarks} / ${TOTAL_MAX_MARKS}`;
    percentageEl.textContent = `${percentage.toFixed(2)}%`;
    gradeEl.textContent = grade;
    remarksEl.textContent = counselorRemarks;
    ratingStars.textContent = starString;

    // Apply Pass / Fail Banner Styles
    if (isOverallPassed) {
        statusBanner.className = "status-banner banner-pass";
        statusText.textContent = "RESULT: PASSED";
    } else {
        statusBanner.className = "status-banner banner-fail";
        statusText.textContent = "RESULT: FAILED / ARREAR";
    }

    // Clear and build Table Rows using a FOR LOOP
    resultsTableBody.innerHTML = "";
    for (let j = 0; j < subjectResults.length; j = j + 1) {
        const item = subjectResults[j];
        const tr = document.createElement("tr");

        const statusLabel = item.passed 
            ? '<span class="tag-pass">PASS</span>' 
            : '<span class="tag-fail">FAIL (Below 40)</span>';

        tr.innerHTML = `
            <td>${j + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.score} / 100</td>
            <td>${statusLabel}</td>
        `;

        resultsTableBody.appendChild(tr);
    }

    // Make report card visible
    reportCard.classList.add("visible");
    reportCard.scrollIntoView({ behavior: "smooth" });
});
