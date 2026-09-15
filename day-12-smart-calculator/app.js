/* ==========================================================================
   DAY 12: JAVASCRIPT INTRODUCTION
   Project: Smart Calculator & Type Inspector
   ========================================================================== */

// 1. Immutable DOM Element References using 'const'
const num1Input = document.getElementById("first-number");
const num2Input = document.getElementById("second-number");
const operatorButtons = document.querySelectorAll(".op-btn");
const roundingSelect = document.getElementById("rounding-mode");
const calculateButton = document.getElementById("calculate-btn");
const resultDisplay = document.getElementById("result-display");
const expressionPreview = document.getElementById("expression-preview");
const inspectorOutput = document.getElementById("inspector-output");

// 2. Mutable Application State using 'let'
let selectedOperator = "+"; // Default operation

// 3. Attach Event Listeners to Operator Selection Buttons
operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Remove 'active' class from all buttons
        operatorButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add 'active' class to clicked button
        this.classList.add("active");

        // Update mutable operator state
        selectedOperator = this.getAttribute("data-operator");
        
        // Update expression preview
        updatePreview();
    });
});

// Update expression preview as user types
num1Input.addEventListener("input", updatePreview);
num2Input.addEventListener("input", updatePreview);

function updatePreview() {
    const val1 = num1Input.value.trim();
    const val2 = num2Input.value.trim();

    // String Concatenation & Template Literals
    if (val1 !== "" || val2 !== "") {
        expressionPreview.textContent = `${val1 || "0"} ${selectedOperator} ${val2 || "0"}`;
    } else {
        expressionPreview.textContent = "";
    }
}

// 4. Core Calculation Logic
calculateButton.addEventListener("click", function () {
    // Reading input values (HTML input values are ALWAYS returned as strings!)
    const rawVal1 = num1Input.value;
    const rawVal2 = num2Input.value;

    // A. Logical Operators (&&, ||, !) & Null / Empty String checks
    if (rawVal1.trim() === "" || rawVal2.trim() === "") {
        resultDisplay.textContent = "Error: Input required";
        inspectorOutput.textContent = "// Logical check: rawVal1.trim() === '' || rawVal2.trim() === '' -> TRUE";
        return;
    }

    // B. Explicit Type Conversion (Number() / parseFloat())
    // Demonstrating the difference between string concatenation and numerical arithmetic
    const num1 = parseFloat(rawVal1);
    const num2 = parseFloat(rawVal2);

    // Check for NaN (Not a Number)
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = "NaN";
        inspectorOutput.textContent = "// Type Error: Value failed numeric conversion to Number";
        return;
    }

    // C. Arithmetic Operators & Mutable result variable
    let rawResult = 0;

    // Comparison Operators (Strict equality ===)
    if (selectedOperator === "+") {
        // Arithmetic Addition
        rawResult = num1 + num2;
    } else if (selectedOperator === "-") {
        // Arithmetic Subtraction
        rawResult = num1 - num2;
    } else if (selectedOperator === "*") {
        // Arithmetic Multiplication
        rawResult = num1 * num2;
    } else if (selectedOperator === "/") {
        // Arithmetic Division with zero-division check
        if (num2 === 0) {
            resultDisplay.textContent = "Cannot divide by 0";
            inspectorOutput.textContent = `// Division by zero evaluated: ${num1} / 0 = Infinity`;
            return;
        }
        rawResult = num1 / num2;
    } else if (selectedOperator === "%") {
        // Arithmetic Modulo (Remainder) / Percentage of base
        rawResult = (num1 * num2) / 100;
    }

    // D. Math Functions & Rounding
    const roundingMode = roundingSelect.value;
    let finalResult = rawResult;
    let mathExplanation = "";

    if (roundingMode === "round") {
        finalResult = Math.round(rawResult);
        mathExplanation = `Math.round(${rawResult}) => ${finalResult}`;
    } else if (roundingMode === "floor") {
        finalResult = Math.floor(rawResult);
        mathExplanation = `Math.floor(${rawResult}) => ${finalResult}`;
    } else if (roundingMode === "ceil") {
        finalResult = Math.ceil(rawResult);
        mathExplanation = `Math.ceil(${rawResult}) => ${finalResult}`;
    } else if (roundingMode === "none") {
        // Number precision formatting
        finalResult = Math.round(rawResult * 10000) / 10000;
        mathExplanation = `Raw floating-point precision preserved: ${finalResult}`;
    }

    // E. Display Final Results
    resultDisplay.textContent = String(finalResult);
    expressionPreview.textContent = `${num1} ${selectedOperator} ${num2} =`;

    // F. Type Coercion & Type Inspector Log
    // Comparing implicit coercion ('5' + 2 = '52') with explicit math
    const implicitCoercion = rawVal1 + rawVal2; // String concatenation!
    
    // Demonstrating undefined and null checks
    let unassignedVariable; // type is undefined
    let emptyValue = null;   // intentional null

    inspectorOutput.textContent = [
        `// 1. Explicit Conversion: parseFloat("${rawVal1}") = ${num1} (Type: ${typeof num1})`,
        `// 2. Implicit Coercion Trap: "${rawVal1}" + "${rawVal2}" = "${implicitCoercion}" (Type: string)`,
        `// 3. Mathematical Operation: ${mathExplanation}`,
        `// 4. Primitive Types Demo: unassignedVariable is [${typeof unassignedVariable}], emptyValue is [${emptyValue}]`
    ].join("\n");
});
