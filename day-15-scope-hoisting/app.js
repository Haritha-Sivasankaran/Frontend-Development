/* ==========================================================================
   DAY 15: JAVASCRIPT SCOPE AND HOISTING
   Project: JavaScript Concept Playground
   ========================================================================== */

// Helper to safely render outputs into the DOM
function displayResult(elementId, message, isError = false) {
    const outputEl = document.getElementById(elementId);
    if (!outputEl) return;

    outputEl.textContent = message;
    if (isError) {
        outputEl.className = "output-content output-error";
    } else {
        outputEl.className = "output-content output-success";
    }
}

// ==========================================================================
// EXPERIMENT 1: Global Scope vs. Function Scope
// ==========================================================================
document.getElementById("btn-run-scope-func").addEventListener("click", function () {
    const globalAppTitle = "Global System 1.0"; // Global Scope

    function authModule() {
        const localSecretToken = "TOKEN_XYZ_987"; // Function Scope
        return `Inside authModule() -> Can access global: "${globalAppTitle}" AND local: "${localSecretToken}"`;
    }

    const insideResult = authModule();
    let outsideResult = "";

    try {
        // Attempting to access localSecretToken from outside authModule()
        outsideResult = localSecretToken; 
    } catch (error) {
        outsideResult = `Caught ${error.name}: ${error.message}`;
    }

    displayResult(
        "output-scope-func",
        `${insideResult}\n\n[Outside authModule()]:\n${outsideResult}\n-> Explanation: Variables declared with 'const/let/var' inside a function are shielded by Function Scope.`
    );
});

// ==========================================================================
// EXPERIMENT 2: Block Scope: 'var' vs. 'let'
// ==========================================================================
document.getElementById("btn-run-scope-block").addEventListener("click", function () {
    let outputLog = [];

    if (true) {
        var leakedVar = "I am a 'var' (Function/Globally scoped)";
        let trappedLet = "I am a 'let' (Strictly Block scoped)";
        outputLog.push(`Inside block -> leakedVar: "${leakedVar}"`);
        outputLog.push(`Inside block -> trappedLet: "${trappedLet}"`);
    }

    // Checking leakedVar outside the { ... } block
    outputLog.push(`Outside block -> leakedVar: "${leakedVar}" (Leaked!)`);

    // Checking trappedLet outside the { ... } block
    try {
        outputLog.push(`Outside block -> trappedLet: ${trappedLet}`);
    } catch (error) {
        outputLog.push(`Outside block -> ${error.name}: ${error.message} (Protected!)`);
    }

    displayResult("output-scope-block", outputLog.join("\n"));
});

// ==========================================================================
// EXPERIMENT 3: Variable Hoisting with 'var'
// ==========================================================================
document.getElementById("btn-run-hoist-var").addEventListener("click", function () {
    // In actual JS execution:
    // var hoistedDemo; is hoisted to top of scope and initialized with 'undefined'
    
    const logs = [];
    logs.push("// Code executed:");
    logs.push("console.log(hoistedItem); // Accessing before declaration line");
    logs.push("var hoistedItem = 'Laptop Pro';");
    logs.push("");

    // Simulated evaluation of hoisting mechanics
    (function () {
        logs.push(`[Runtime Evaluation]: typeof hoistedItem is "${typeof hoistedItem}", value is: ${hoistedItem}`);
        var hoistedItem = "Laptop Pro";
        logs.push(`[After assignment line]: value is: "${hoistedItem}"`);
    })();

    logs.push("\n-> Explanation: 'var' is hoisted and initialized to 'undefined' during the engine creation phase.");
    displayResult("output-hoist-var", logs.join("\n"));
});

// ==========================================================================
// EXPERIMENT 4: Variable Hoisting with 'let' (Temporal Dead Zone - TDZ)
// ==========================================================================
document.getElementById("btn-run-hoist-tdz").addEventListener("click", function () {
    const logs = [];
    logs.push("// Code executed:");
    logs.push("console.log(tdzItem); // Attempt to access 'let' before line");
    logs.push("let tdzItem = 'Mechanical Keyboard';");
    logs.push("");

    try {
        // We use an isolated evaluation to trigger real browser TDZ ReferenceError
        // In ES6, accessing a let before its declaration triggers ReferenceError
        const testTDZ = new Function(`
            "use strict";
            return tdzItem;
            let tdzItem = "Mechanical Keyboard";
        `);
        testTDZ();
    } catch (error) {
        logs.push(`[Runtime Evaluation]: Caught ${error.name}!`);
        logs.push(`Error Message: "${error.message}"`);
        logs.push("\n-> Explanation: 'let' and 'const' ARE hoisted, but they remain uninitialized in the 'Temporal Dead Zone' (TDZ) until execution reaches their declaration line.");
        displayResult("output-hoist-tdz", logs.join("\n"), true);
    }
});

// ==========================================================================
// EXPERIMENT 5: Function Declaration Hoisting
// ==========================================================================
document.getElementById("btn-run-func-decl").addEventListener("click", function () {
    const logs = [];
    logs.push("// Invoking function BEFORE its declaration in source code:");
    logs.push("const result = getDiscount(150); // Line 1");
    logs.push("function getDiscount(price) { return price * 0.15; } // Line 2");
    logs.push("");

    // Call before definition
    const calculatedDiscount = getDiscount(150);

    function getDiscount(price) {
        return price * 0.15;
    }

    logs.push(`[Runtime Evaluation]: Successfully returned $${calculatedDiscount}!`);
    logs.push("\n-> Explanation: Function Declarations are hoisted in their ENTIRETY (both name and implementation body) into memory during the creation phase.");

    displayResult("output-func-decl", logs.join("\n"));
});

// ==========================================================================
// EXPERIMENT 6: Function Expression Hoisting
// ==========================================================================
document.getElementById("btn-run-func-expr").addEventListener("click", function () {
    const logs = [];
    logs.push("// Invoking function expression BEFORE assignment:");
    logs.push("const tax = calculateTax(100); // Calling before initialization");
    logs.push("const calculateTax = function(amt) { return amt * 0.08; };");
    logs.push("");

    try {
        const testExpr = new Function(`
            "use strict";
            return calculateTax(100);
            const calculateTax = function(amt) { return amt * 0.08; };
        `);
        testExpr();
    } catch (error) {
        logs.push(`[Runtime Evaluation]: Caught ${error.name}!`);
        logs.push(`Error Message: "${error.message}"`);
        logs.push("\n-> Explanation: Function Expressions assigned to 'const' or 'let' behave like variables: the variable binding sits in the TDZ, so calling it prior to assignment throws a fatal ReferenceError or TypeError.");
        displayResult("output-func-expr", logs.join("\n"), true);
    }
});
