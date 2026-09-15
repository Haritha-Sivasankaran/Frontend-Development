/* ==========================================================================
   DAY 22: ADVANCED ES6
   Project: Food Order Management System (BiteStream)
   ========================================================================== */

// ==========================================================================
// 1. ES6 CLASSES & INHERITANCE
// ==========================================================================

/**
 * Concept: ES6 Base Class
 */
class MenuItem {
    constructor(id, name, price, category, icon, prepTimeSeconds) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
        this.category = category;
        this.icon = icon;
        this.prepTimeSeconds = prepTimeSeconds;
    }

    getDetails() {
        return `${this.name} (${this.category}) - $${this.price.toFixed(2)}`;
    }
}

/**
 * Concept: ES6 Class Inheritance (extends and super)
 */
class FoodItem extends MenuItem {
    constructor(id, name, price, category, icon, prepTimeSeconds, calories, isVeg) {
        super(id, name, price, category, icon, prepTimeSeconds);
        this.calories = calories;
        this.isVeg = isVeg;
    }

    // Method overriding (Polymorphism)
    getDetails() {
        const dietTag = this.isVeg ? "🌱 Vegetarian" : "🥩 Non-Veg";
        return `${dietTag} • ${this.calories} kcal • Ready in ~${this.prepTimeSeconds}s`;
    }
}

class BeverageItem extends MenuItem {
    constructor(id, name, price, category, icon, prepTimeSeconds, volumeMl, isCold) {
        super(id, name, price, category, icon, prepTimeSeconds);
        this.volumeMl = volumeMl;
        this.isCold = isCold;
    }

    getDetails() {
        const tempTag = this.isCold ? "🧊 Chilled" : "☕ Warm";
        return `${tempTag} • ${this.volumeMl}ml Refreshment`;
    }
}

/**
 * Concept: Order Class utilizing Advanced Array Methods
 */
class Order {
    constructor(items) {
        this.id = "ORD-" + Math.floor(1000 + Math.random() * 9000);
        this.items = [...items]; // Array spread
        this.createdAt = new Date().toLocaleTimeString();
        this.status = "Created";
    }

    // Concept: reduce() to compute total order amount
    calculateTotal() {
        return this.items.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
    }

    // Concept: map() to format item summary descriptions
    getItemDescriptions() {
        return this.items.map(item => `${item.name} (x${item.quantity})`);
    }
}

// ==========================================================================
// 2. MASTER MENU INVENTORY (Instantiating Class Objects)
// ==========================================================================

const menuInventory = [
    new FoodItem("m1", "Truffle Smash Burger", 14.99, "burgers", "🍔", 4, 750, false),
    new FoodItem("m2", "Crispy Veggie Deluxe", 11.50, "burgers", "🥑", 3, 520, true),
    new FoodItem("m3", "Artisan Pepperoni Pizza", 18.00, "pizza", "🍕", 5, 920, false),
    new FoodItem("m4", "Classic Margherita Pizza", 15.50, "pizza", "🧀", 4, 680, true),
    new BeverageItem("m5", "Cold Brew Iced Coffee", 5.50, "drinks", "☕", 2, 400, true),
    new BeverageItem("m6", "Fresh Mango Passion Smoothie", 6.75, "drinks", "🥭", 2, 500, true)
];

// Application State
let cart = [];
let activeCategory = "all";
let isProcessingOrder = false;

// DOM Elements
const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const subtotalSpan = document.getElementById("subtotal-price");
const taxSpan = document.getElementById("tax-price");
const grandTotalSpan = document.getElementById("grand-total-price");
const placeOrderBtn = document.getElementById("btn-place-order");
const filterButtons = document.querySelectorAll(".tab-btn");
const promiseConsole = document.getElementById("promise-console");

// Step Flow Indicators
const stepAccept = document.getElementById("step-accept");
const stepPrep = document.getElementById("step-prep");
const stepDeliver = document.getElementById("step-deliver");

// Console Logger Helper
const logPromise = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    promiseConsole.textContent += `[${timestamp}] ${message}\n`;
    promiseConsole.scrollTop = promiseConsole.scrollHeight;
};

// ==========================================================================
// 3. ARRAY METHODS: map(), filter(), find(), findIndex()
// ==========================================================================

/**
 * Concept: filter() & map()
 * Filters menu by active category and maps objects into HTML markup.
 */
const renderMenu = () => {
    // Concept: filter()
    const filteredMenu = activeCategory === "all"
        ? menuInventory
        : menuInventory.filter(item => item.category === activeCategory);

    // Concept: map()
    menuGrid.innerHTML = filteredMenu.map(item => {
        const isFood = item instanceof FoodItem;
        return `
            <article class="menu-card" id="${item.id}">
                <div>
                    <div class="card-top-row">
                        <span class="item-icon">${item.icon}</span>
                        <span class="class-type-badge ${isFood ? 'type-food' : 'type-beverage'}">
                            ${isFood ? 'FoodItem' : 'BeverageItem'}
                        </span>
                    </div>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-spec">${item.getDetails()}</p>
                </div>
                <div class="card-bottom-row">
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button class="btn-add-food" onclick="handleAddToCart('${item.id}')">
                        + Add
                    </button>
                </div>
            </article>
        `;
    }).join("");
};

/**
 * Concept: find() & findIndex()
 */
window.handleAddToCart = (itemId) => {
    if (isProcessingOrder) return;

    // Concept: find() - Locates the item by id in menu inventory
    const menuItem = menuInventory.find(item => item.id === itemId);
    if (!menuItem) return;

    // Concept: findIndex() - Check if item already exists in cart array
    const existingIndex = cart.findIndex(cartItem => cartItem.id === itemId);

    if (existingIndex !== -1) {
        // Increment quantity of existing item
        cart[existingIndex].quantity += 1;
    } else {
        // Add new cart item object
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            prepTime: menuItem.prepTimeSeconds,
            quantity: 1
        });
    }

    updateCartUI();
};

window.handleRemoveCartItem = (itemId) => {
    if (isProcessingOrder) return;

    // Concept: filter() to remove item by ID
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
};

// ==========================================================================
// 4. CART & TOTAL CALCULATION (reduce)
// ==========================================================================

/**
 * Concept: reduce()
 * Accumulates subtotal and item quantities in a single pass.
 */
const updateCartUI = () => {
    if (cart.length === 0) {
        cartList.innerHTML = `<div class="empty-cart-text">Your basket is empty. Select items to begin.</div>`;
        subtotalSpan.textContent = "$0.00";
        taxSpan.textContent = "$0.00";
        grandTotalSpan.textContent = "$0.00";
        placeOrderBtn.disabled = true;
        return;
    }

    // Concept: map() to render cart line items
    cartList.innerHTML = cart.map(item => `
        <div class="cart-row">
            <div>
                <span class="cart-row-title">${item.name} (x${item.quantity})</span>
                <div class="cart-row-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="btn-remove-item" onclick="handleRemoveCartItem('${item.id}')" title="Remove">✕</button>
        </div>
    `).join("");

    // Concept: reduce() to sum item subtotals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.085; // 8.5% sales tax
    const grandTotal = subtotal + tax;

    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    taxSpan.textContent = `$${tax.toFixed(2)}`;
    grandTotalSpan.textContent = `$${grandTotal.toFixed(2)}`;

    placeOrderBtn.disabled = isProcessingOrder || cart.length === 0;
};

// Filter Tab Click Handlers
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
        renderMenu();
    });
});

// ==========================================================================
// 5. ASYNCHRONOUS PROMISES & PROMISE CHAINING
// ==========================================================================

/**
 * Stage 1: Restaurant Accepts Order (Promise)
 */
const acceptOrderPromise = (order) => {
    return new Promise((resolve, reject) => {
        stepAccept.className = "flow-step pending";
        logPromise(`[Stage 1] Transmitting ${order.id} to restaurant...`);

        setTimeout(() => {
            // 95% success simulation
            const isKitchenOpen = true;

            if (isKitchenOpen) {
                stepAccept.className = "flow-step resolved";
                stepAccept.querySelector(".step-time").textContent = "✓ Accepted by Head Chef";
                logPromise(`[Stage 1 Resolved] Restaurant accepted ${order.id}!`);
                resolve(order);
            } else {
                stepAccept.className = "flow-step rejected";
                reject(new Error("Kitchen is at maximum capacity. Order declined."));
            }
        }, 1500);
    });
};

/**
 * Stage 2: Kitchen Prepares Food (Promise)
 */
const prepareFoodPromise = (order) => {
    return new Promise((resolve, reject) => {
        stepPrep.className = "flow-step pending";
        logPromise(`[Stage 2] Kitchen is cooking: ${order.getItemDescriptions().join(", ")}...`);

        setTimeout(() => {
            stepPrep.className = "flow-step resolved";
            stepPrep.querySelector(".step-time").textContent = "✓ Food Cooked & Packed";
            logPromise(`[Stage 2 Resolved] Meal prepared and handed to courier!`);
            resolve(order);
        }, 2500);
    });
};

/**
 * Stage 3: Courier Delivers Meal (Promise)
 */
const deliverFoodPromise = (order) => {
    return new Promise((resolve, reject) => {
        stepDeliver.className = "flow-step pending";
        logPromise(`[Stage 3] Courier is navigating towards delivery address...`);

        setTimeout(() => {
            stepDeliver.className = "flow-step resolved";
            stepDeliver.querySelector(".step-time").textContent = "✓ Delivered to Doorstep";
            logPromise(`[Stage 3 Resolved] Order ${order.id} arrived! Bon Appetit! 🎉`);
            resolve(order);
        }, 2000);
    });
};

// ==========================================================================
// 6. PLACE ORDER TRIGGER: PROMISE CHAIN
// ==========================================================================

placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0 || isProcessingOrder) return;

    // 1. Create Order instance using Order class
    const currentOrder = new Order(cart);

    isProcessingOrder = true;
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Order in Progress...";

    // Reset Flow Indicators
    [stepAccept, stepPrep, stepDeliver].forEach(step => {
        step.className = "flow-step";
    });
    stepAccept.querySelector(".step-time").textContent = "Awaiting confirmation (~1.5s)";
    stepPrep.querySelector(".step-time").textContent = "Cooking fresh ingredients (~2.5s)";
    stepDeliver.querySelector(".step-time").textContent = "Driver en route (~2.0s)";

    promiseConsole.textContent = "";
    logPromise(`🛒 Customer placed Order ${currentOrder.id} ($${currentOrder.calculateTotal().toFixed(2)})`);

    /**
     * Concept: Promise Chaining with .then() and .catch()
     * Each .then() receives the resolved value of the preceding Promise.
     */
    acceptOrderPromise(currentOrder)
        .then((order) => {
            // Stage 1 Resolved -> Chain to Stage 2
            return prepareFoodPromise(order);
        })
        .then((order) => {
            // Stage 2 Resolved -> Chain to Stage 3
            return deliverFoodPromise(order);
        })
        .then((completedOrder) => {
            // Stage 3 Resolved -> All stages finished
            logPromise(`========================================`);
            logPromise(`🏆 PROMISE CHAIN COMPLETE for ${completedOrder.id}!`);
            logPromise(`========================================`);

            // Clear Cart after successful fulfillment
            cart = [];
            updateCartUI();
        })
        .catch((error) => {
            // Concept: .catch() handles any rejection in the entire chain
            logPromise(`❌ PROMISE CHAIN REJECTED: ${error.message}`);
            alert(`Order Failed: ${error.message}`);
        })
        .finally(() => {
            // Concept: .finally() executes regardless of success or failure
            isProcessingOrder = false;
            placeOrderBtn.textContent = "Place Food Order";
            placeOrderBtn.disabled = cart.length === 0;
        });
});

// Initial Render
renderMenu();
updateCartUI();
