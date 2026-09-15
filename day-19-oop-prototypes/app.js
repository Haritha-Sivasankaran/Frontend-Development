/* ==========================================================================
   DAY 19: JAVASCRIPT OBJECT-ORIENTED PROGRAMMING & PROTOTYPES
   Project: Employee Management System (DevCorp EMS)
   ========================================================================== */

// ==========================================================================
// 1. BASE CONSTRUCTOR FUNCTION: Employee
// ==========================================================================

/**
 * Concept: Constructor Function
 * Used as a blueprint for instantiating Employee objects using the 'new' keyword.
 * Concept: 'this' keyword binds to the newly allocated instance object.
 */
function Employee(name, salary, department) {
    this.id = "EMP-" + Math.floor(1000 + Math.random() * 9000);
    this.name = name;
    this.salary = Number(salary);
    this.department = department;
    this.createdAt = new Date().toLocaleDateString();
}

// Concept: Prototype Methods
// Methods attached to Employee.prototype are shared by all instances, conserving memory.
Employee.prototype.getDetails = function () {
    return `${this.name} works in ${this.department} with a salary of $${this.salary.toLocaleString()}.`;
};

Employee.prototype.calculateAnnualBonus = function () {
    // Standard baseline bonus: 10% of annual salary
    return this.salary * 0.10;
};

Employee.prototype.giveRaise = function (percent) {
    const raiseAmount = (this.salary * percent) / 100;
    this.salary += raiseAmount;
    return `${this.name} received a ${percent}% raise (+$${raiseAmount.toLocaleString()})! New Salary: $${this.salary.toLocaleString()}`;
};

// ==========================================================================
// 2. CHILD CONSTRUCTOR: Developer (Inherits from Employee)
// ==========================================================================

function Developer(name, salary, department, primaryLanguage, githubHandle) {
    // Concept: Constructor Stealing / Super Call
    // Employee.call(this, ...) initializes parent properties onto the new Developer instance
    Employee.call(this, name, salary, department);

    this.primaryLanguage = primaryLanguage;
    this.githubHandle = githubHandle;
}

// Concept: Prototypal Inheritance Setup
// Developer.prototype inherits from Employee.prototype via Object.create()
Developer.prototype = Object.create(Employee.prototype);

// Concept: Repair Constructor Pointer
Developer.prototype.constructor = Developer;

// Developer-specific prototype methods
Developer.prototype.code = function () {
    return `💻 ${this.name} is writing high-performance code in ${this.primaryLanguage}.`;
};

Developer.prototype.fixBug = function (bugTitle = "Critical Memory Leak") {
    return `🐛 ${this.name} squashed bug "${bugTitle}" and committed to GitHub (@${this.githubHandle})!`;
};

// Concept: Method Overriding (Polymorphism)
Developer.prototype.getDetails = function () {
    return `${this.name} [Developer] specializes in ${this.primaryLanguage}. GitHub: @${this.githubHandle}.`;
};

// ==========================================================================
// 3. CHILD CONSTRUCTOR: Designer (Inherits from Employee)
// ==========================================================================

function Designer(name, salary, department, designTool, portfolioUrl) {
    Employee.call(this, name, salary, department);
    this.designTool = designTool;
    this.portfolioUrl = portfolioUrl;
}

// Setup Prototypal Inheritance
Designer.prototype = Object.create(Employee.prototype);
Designer.prototype.constructor = Designer;

Designer.prototype.designPrototype = function () {
    return `🎨 ${this.name} crafted an interactive component prototype using ${this.designTool}.`;
};

Designer.prototype.reviewUX = function (flowName = "User Onboarding") {
    return `🔍 ${this.name} audited the "${flowName}" workflow for accessibility and visual hierarchy.`;
};

Designer.prototype.getDetails = function () {
    return `${this.name} [Designer] crafts UI systems in ${this.designTool}. Portfolio: ${this.portfolioUrl}.`;
};

// ==========================================================================
// 4. CHILD CONSTRUCTOR: Manager (Inherits from Employee)
// ==========================================================================

function Manager(name, salary, department, teamSize, budget) {
    Employee.call(this, name, salary, department);
    this.teamSize = Number(teamSize);
    this.budget = Number(budget);
}

// Setup Prototypal Inheritance
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.conductMeeting = function (topic = "Quarterly Sprint Goals") {
    return `📋 Manager ${this.name} is directing a sync on "${topic}" with a team of ${this.teamSize} engineers.`;
};

Manager.prototype.approveBudget = function (amount = 5000) {
    if (amount <= this.budget) {
        this.budget -= amount;
        return `✅ ${this.name} approved expense of $${amount.toLocaleString()}. Remaining budget: $${this.budget.toLocaleString()}.`;
    }
    return `❌ Budget request of $${amount.toLocaleString()} exceeds allocated department reserves!`;
};

// Manager overrides bonus: 20% + $500 per team member
Manager.prototype.calculateAnnualBonus = function () {
    return (this.salary * 0.20) + (this.teamSize * 500);
};

Manager.prototype.getDetails = function () {
    return `${this.name} [Manager] oversees ${this.teamSize} direct reports with an annual budget of $${this.budget.toLocaleString()}.`;
};

// ==========================================================================
// 5. APPLICATION STATE & SEED DATA
// ==========================================================================

const staffList = [
    new Developer("Alice Chen", 115000, "Engineering", "TypeScript & React", "alice_code"),
    new Designer("Marcus Rivera", 98000, "Product Design", "Figma & Framer", "marcus.design"),
    new Manager("Elena Rostova", 145000, "Operations", 8, 250000),
    new Employee("David Miller", 72000, "Customer Success")
];

// ==========================================================================
// 6. UI RENDERING & DOM UPDATES
// ==========================================================================

const directoryContainer = document.getElementById("emp-directory");
const toast = document.getElementById("action-toast");

function showToast(message) {
    toast.textContent = message;
    toast.className = "action-toast show";
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.className = "action-toast";
    }, 4000);
}

function renderDirectory() {
    directoryContainer.innerHTML = "";

    staffList.forEach((emp, index) => {
        const card = document.createElement("div");
        card.classList.add("emp-card");

        // Determine role styling pill
        let roleName = "Employee";
        let roleClass = "pill-employee";
        if (emp instanceof Developer) {
            roleName = "Developer";
            roleClass = "pill-developer";
        } else if (emp instanceof Designer) {
            roleName = "Designer";
            roleClass = "pill-designer";
        } else if (emp instanceof Manager) {
            roleName = "Manager";
            roleClass = "pill-manager";
        }

        // Custom details rows
        let roleSpecificInfo = "";
        if (emp instanceof Developer) {
            roleSpecificInfo = `<li><strong>Language:</strong> ${emp.primaryLanguage}</li><li><strong>GitHub:</strong> @${emp.githubHandle}</li>`;
        } else if (emp instanceof Designer) {
            roleSpecificInfo = `<li><strong>Tool:</strong> ${emp.designTool}</li><li><strong>Portfolio:</strong> ${emp.portfolioUrl}</li>`;
        } else if (emp instanceof Manager) {
            roleSpecificInfo = `<li><strong>Team Size:</strong> ${emp.teamSize} reports</li><li><strong>Budget:</strong> $${emp.budget.toLocaleString()}</li>`;
        }

        card.innerHTML = `
            <div class="emp-card-top">
                <div class="emp-header-row">
                    <span class="emp-name">${emp.name}</span>
                    <span class="role-pill ${roleClass}">${roleName}</span>
                </div>
                <div class="emp-meta">${emp.id} • ${emp.department}</div>
                <div class="emp-salary-badge">$${emp.salary.toLocaleString()} / year</div>

                <ul class="emp-details-list">
                    <li><strong>Details:</strong> ${emp.getDetails()}</li>
                    <li><strong>Annual Bonus:</strong> $${emp.calculateAnnualBonus().toLocaleString()}</li>
                    ${roleSpecificInfo}
                </ul>
            </div>

            <div class="emp-card-actions">
                <div class="action-btn-row">
                    <button class="btn-card-action btn-action-primary" onclick="triggerRoleAction(${index})">
                        Run Role Action
                    </button>
                    <button class="btn-card-action" onclick="giveRaiseAction(${index})">
                        Give 10% Raise
                    </button>
                </div>
                <button class="btn-card-action btn-inspect-proto" onclick="inspectProtoChain(${index})">
                    🔍 Inspect Prototype Chain
                </button>
            </div>
        `;

        directoryContainer.appendChild(card);
    });

    updateMetrics();
}

function updateMetrics() {
    const totalStaff = staffList.length;
    const totalPayroll = staffList.reduce((acc, curr) => acc + curr.salary, 0);
    const avgSalary = totalStaff > 0 ? Math.round(totalPayroll / totalStaff) : 0;
    const managersCount = staffList.filter(e => e instanceof Manager).length;

    document.getElementById("metric-headcount").textContent = totalStaff;
    document.getElementById("metric-payroll").textContent = `$${(totalPayroll / 1000).toFixed(1)}k`;
    document.getElementById("metric-avg").textContent = `$${(avgSalary / 1000).toFixed(1)}k`;
    document.getElementById("metric-managers").textContent = managersCount;
}

// Window actions bound to card clicks
window.triggerRoleAction = function (index) {
    const emp = staffList[index];
    if (emp instanceof Developer) {
        showToast(emp.code());
    } else if (emp instanceof Designer) {
        showToast(emp.designPrototype());
    } else if (emp instanceof Manager) {
        showToast(emp.conductMeeting());
    } else {
        showToast(emp.getDetails());
    }
};

window.giveRaiseAction = function (index) {
    const emp = staffList[index];
    // Concept: Method inheritance - Developer/Designer/Manager inherit .giveRaise from Employee.prototype
    const message = emp.giveRaise(10);
    showToast(message);
    renderDirectory();
};

// ==========================================================================
// 7. PROTOTYPE CHAIN INSPECTION MODAL
// ==========================================================================

const protoModal = document.getElementById("proto-modal");
const protoChainDetails = document.getElementById("proto-chain-details");

window.inspectProtoChain = function (index) {
    const emp = staffList[index];
    protoChainDetails.innerHTML = "";

    // Step 1: Instance Object (Level 0)
    const ownKeys = Object.keys(emp);
    const nodeInstance = document.createElement("div");
    nodeInstance.className = "proto-node highlight-inst";
    nodeInstance.innerHTML = `
        <div class="proto-node-title">
            <span>1. Instance Object [${emp.constructor.name}]</span>
            <span style="color:#2563eb; font-size:0.75rem;">Direct Own Properties</span>
        </div>
        <div class="proto-methods-tag">Own Properties: ${ownKeys.join(", ")}</div>
    `;

    // Step 2: Immediate Child Prototype (e.g. Developer.prototype)
    const childProto = Object.getPrototypeOf(emp);
    const childMethods = Object.getOwnPropertyNames(childProto).filter(k => typeof childProto[k] === "function");
    const nodeChild = document.createElement("div");
    nodeChild.className = "proto-node highlight-child";
    nodeChild.innerHTML = `
        <div class="proto-node-title">
            <span>2. ${emp.constructor.name}.prototype</span>
            <span style="color:#7e22ce; font-size:0.75rem;">Direct Prototype</span>
        </div>
        <div class="proto-methods-tag">Methods: ${childMethods.join("(), ")}()</div>
    `;

    // Step 3: Base Prototype (Employee.prototype)
    const parentProto = Object.getPrototypeOf(childProto);
    let nodeParent = null;
    if (parentProto && parentProto !== Object.prototype) {
        const parentMethods = Object.getOwnPropertyNames(parentProto).filter(k => typeof parentProto[k] === "function");
        nodeParent = document.createElement("div");
        nodeParent.className = "proto-node highlight-parent";
        nodeParent.innerHTML = `
            <div class="proto-node-title">
                <span>3. Employee.prototype</span>
                <span style="color:#047857; font-size:0.75rem;">Base Inherited Prototype</span>
            </div>
            <div class="proto-methods-tag">Inherited Methods: ${parentMethods.join("(), ")}()</div>
        `;
    }

    // Step 4: Root Object.prototype
    const rootProto = Object.prototype;
    const nodeObject = document.createElement("div");
    nodeObject.className = "proto-node highlight-object";
    nodeObject.innerHTML = `
        <div class="proto-node-title">
            <span>${nodeParent ? "4" : "3"}. Object.prototype</span>
            <span style="color:#475569; font-size:0.75rem;">Universal Root</span>
        </div>
        <div class="proto-methods-tag">Root Utilities: hasOwnProperty, toString, valueOf, isPrototypeOf...</div>
    `;

    // Step 5: null (End of Prototype Chain)
    const nodeNull = document.createElement("div");
    nodeNull.className = "proto-node";
    nodeNull.style.textAlign = "center";
    nodeNull.innerHTML = `<strong>5. null (End of Prototype Chain)</strong>`;

    // Construct Visual Stack
    protoChainDetails.appendChild(nodeInstance);
    protoChainDetails.appendChild(createArrow());
    protoChainDetails.appendChild(nodeChild);

    if (nodeParent) {
        protoChainDetails.appendChild(createArrow());
        protoChainDetails.appendChild(nodeParent);
    }

    protoChainDetails.appendChild(createArrow());
    protoChainDetails.appendChild(nodeObject);
    protoChainDetails.appendChild(createArrow());
    protoChainDetails.appendChild(nodeNull);

    protoModal.classList.add("open");
};

function createArrow() {
    const arrow = document.createElement("div");
    arrow.className = "proto-arrow";
    arrow.innerHTML = "↓ [[Prototype]] / __proto__";
    return arrow;
}

document.getElementById("btn-close-modal").addEventListener("click", function () {
    protoModal.classList.remove("open");
});

// ==========================================================================
// 8. ADD NEW EMPLOYEE FORM SUBMISSION
// ==========================================================================

const empRoleSelect = document.getElementById("emp-role");
const roleSpecificContainer = document.getElementById("role-specific-container");

// Dynamic Form Inputs based on role selection
empRoleSelect.addEventListener("change", function () {
    const role = empRoleSelect.value;
    if (role === "developer") {
        roleSpecificContainer.innerHTML = `
            <div class="form-field">
                <label>Primary Language / Tech</label>
                <input type="text" id="role-extra-1" class="input-ctrl" placeholder="e.g. Python & Django" required>
            </div>
            <div class="form-field">
                <label>GitHub Handle</label>
                <input type="text" id="role-extra-2" class="input-ctrl" placeholder="e.g. dev_guru" required>
            </div>
        `;
    } else if (role === "designer") {
        roleSpecificContainer.innerHTML = `
            <div class="form-field">
                <label>Primary Design Tool</label>
                <input type="text" id="role-extra-1" class="input-ctrl" placeholder="e.g. Figma" required>
            </div>
            <div class="form-field">
                <label>Portfolio Link</label>
                <input type="text" id="role-extra-2" class="input-ctrl" placeholder="e.g. dribbble.com/designer" required>
            </div>
        `;
    } else if (role === "manager") {
        roleSpecificContainer.innerHTML = `
            <div class="form-field">
                <label>Team Size (Direct Reports)</label>
                <input type="number" id="role-extra-1" class="input-ctrl" placeholder="e.g. 5" min="1" required>
            </div>
            <div class="form-field">
                <label>Annual Budget ($)</label>
                <input type="number" id="role-extra-2" class="input-ctrl" placeholder="e.g. 150000" min="1000" required>
            </div>
        `;
    } else {
        roleSpecificContainer.innerHTML = `<p style="font-size:0.8rem; color:#64748b;">Standard Employee properties only.</p>`;
    }
});

// Form Submit Handler
document.getElementById("add-emp-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("emp-name").value.trim();
    const salary = document.getElementById("emp-salary").value;
    const department = document.getElementById("emp-department").value.trim();
    const role = empRoleSelect.value;

    let newEmployee = null;

    if (role === "developer") {
        const lang = document.getElementById("role-extra-1").value.trim();
        const gh = document.getElementById("role-extra-2").value.trim();
        newEmployee = new Developer(name, salary, department, lang, gh);
    } else if (role === "designer") {
        const tool = document.getElementById("role-extra-1").value.trim();
        const portfolio = document.getElementById("role-extra-2").value.trim();
        newEmployee = new Designer(name, salary, department, tool, portfolio);
    } else if (role === "manager") {
        const team = document.getElementById("role-extra-1").value;
        const budget = document.getElementById("role-extra-2").value;
        newEmployee = new Manager(name, salary, department, team, budget);
    } else {
        newEmployee = new Employee(name, salary, department);
    }

    // Add to staff list and refresh UI
    staffList.push(newEmployee);
    renderDirectory();
    this.reset();
    empRoleSelect.dispatchEvent(new Event("change"));
    showToast(`Successfully recruited ${newEmployee.name} into ${newEmployee.department}!`);
});

// Initial Setup
empRoleSelect.dispatchEvent(new Event("change"));
renderDirectory();
