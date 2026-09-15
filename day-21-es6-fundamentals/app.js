/* ==========================================================================
   DAY 21: ES6 FUNDAMENTALS
   Project: Modern Shopping Cart (ApexStore)
   ========================================================================== */

// Concept 1: const - Immutable binding for static product catalog
const products = [
    {
        id: "prod-1",
        title: "Pro Wireless ANC Headphones",
        price: 199.99,
        category: "Audio",
        icon: "🎧",
        desc: "Spatial audio with hybrid active noise cancellation."
    },
    {
        id: "prod-2",
        title: "Tactile Mechanical Keyboard",
        price: 129.50,
        category: "Peripherals",
        icon: "⌨️",
        desc: "Hot-swappable switches with per-key RGB backlighting."
    },
    {
        id: "prod-3",
        title: "Ergonomic Precision Mouse",
        price: 79.99,
        category: "Peripherals",
        icon: "🖱️",
        desc: "4000 DPI sensor with silent magnetic scrolling."
    },
    {
        id: "prod-4",
        title: "Ultra-Wide Curved Gaming Monitor",
        price: 499.00,
        category: "Displays",
        icon: "🖥️",
        desc: "34-inch 144Hz WQHD panoramic curved display."
    }
];

// Concept 1: let - Mutable reference for shopping cart state
let cart = [];
let appliedCoupons = [];

// DOM Elements
const catalogGrid = document.getElementById("products-grid");
const cartItemsList = document.getElementById("cart-items-list");
const cartBadgeCount = document.getElementById("cart-badge-count");
const subtotalEl = document.getElementById("summary-subtotal");
const discountEl = document.getElementById("summary-discount");
const totalEl = document.getElementById("summary-total");
const destructuringInsightEl = document.getElementById("destructuring-insight");
const checkoutBtn = document.getElementById("btn-checkout");
const couponInput = document.getElementById("coupon-input");
const btnApplyCoupon = document.getElementById("btn-apply-coupon");
const couponsContainer = document.getElementById("applied-coupons-tags");

// Receipt Modal Elements
const receiptModal = document.getElementById("receipt-modal");
const receiptContent = document.getElementById("receipt-content");
const btnCloseModal = document.getElementById("btn-close-modal");

// ==========================================================================
// 2. RENDER CATALOG (Arrow Function, Template Strings, Object Destructuring)
// ==========================================================================

/**
 * Concept 4: Arrow Function
 * Concept 6: Object Destructuring directly in function parameters ({ id, title, price, icon, desc })
 * Concept 2: Template Strings (template literals with backticks and ${})
 */
const renderCatalog = () => {
    catalogGrid.innerHTML = products.map(({ id, title, price, icon, desc }) => `
        <article class="product-card" id="${id}">
            <div>
                <div class="product-icon">${icon}</div>
                <h3 class="product-name">${title}</h3>
                <p class="product-desc">${desc}</p>
            </div>
            <div class="product-footer">
                <span class="product-price">$${price.toFixed(2)}</span>
                <button class="btn-add-cart" onclick="addToCart('${id}')">
                    Add to Cart
                </button>
            </div>
        </article>
    `).join("");
};

// ==========================================================================
// 3. CART OPERATIONS (Spread Operator & Immutable Updates)
// ==========================================================================

/**
 * Concept 5: Spread Operator for immutably updating arrays and objects
 */
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Concept 6: Object Destructuring
    const { id, title, price, icon } = product;

    // Check if item exists in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Concept 5: Spread Operator on objects ({ ...item, quantity: item.quantity + 1 })
        cart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        // Concept 5: Spread Operator on arrays ([...cart, newItem])
        cart = [...cart, { id, title, price, icon, quantity: 1 }];
    }

    updateCartUI();
};

const updateQuantity = (productId, delta) => {
    cart = cart
        .map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty };
            }
            return item;
        })
        .filter(item => item.quantity > 0); // Drop item if quantity becomes 0

    updateCartUI();
};

// ==========================================================================
// 4. COUPON CALCULATION (Rest Operator)
// ==========================================================================

/**
 * Concept 4: Rest Operator (...coupons)
 * Collects an arbitrary number of applied coupon codes into a true Array
 */
const calculateDiscounts = (subtotal, ...coupons) => {
    let totalDiscountPercent = 0;

    // Evaluate rest parameter array
    coupons.forEach(code => {
        if (code === "SAVE10") totalDiscountPercent += 10;
        if (code === "APEX20") totalDiscountPercent += 20;
        if (code === "VIP5") totalDiscountPercent += 5;
    });

    // Cap maximum discount at 35%
    const cappedPercent = Math.min(totalDiscountPercent, 35);
    const discountAmount = (subtotal * cappedPercent) / 100;

    return { cappedPercent, discountAmount };
};

// Apply coupon handler
btnApplyCoupon.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();
    const validCodes = ["SAVE10", "APEX20", "VIP5"];

    if (!code) return;

    if (!validCodes.includes(code)) {
        alert(`Invalid promo code "${code}". Available test codes: SAVE10, APEX20, VIP5.`);
        return;
    }

    if (appliedCoupons.includes(code)) {
        alert(`Coupon "${code}" is already active!`);
        return;
    }

    // Concept 5: Spread operator to append new coupon
    appliedCoupons = [...appliedCoupons, code];
    couponInput.value = "";
    updateCartUI();
});

// ==========================================================================
// 5. UPDATE CART UI & DESTRUCTURING DISPLAY
// ==========================================================================

const updateCartUI = () => {
    // 1. Calculate Cart Totals
    const subtotal = cart.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
    const totalItems = cart.reduce((acc, { quantity }) => acc + quantity, 0);

    // Concept 4: Rest parameter invocation (passing subtotal + spread applied coupons)
    const { cappedPercent, discountAmount } = calculateDiscounts(subtotal, ...appliedCoupons);
    const finalTotal = Math.max(0, subtotal - discountAmount);

    // 2. Render Cart Item Cards
    if (cart.length === 0) {
        cartItemsList.innerHTML = `<div class="empty-cart-msg">Your shopping bag is empty.</div>`;
        checkoutBtn.disabled = true;
    } else {
        cartItemsList.innerHTML = cart.map(({ id, title, price, quantity, icon }) => `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${icon} ${title}</h4>
                    <span class="item-unit-price">$${price.toFixed(2)} each</span>
                </div>
                <div class="item-qty-controls">
                    <button class="btn-qty" onclick="updateQuantity('${id}', -1)">−</button>
                    <span class="item-qty-num">${quantity}</span>
                    <button class="btn-qty" onclick="updateQuantity('${id}', 1)">+</button>
                </div>
            </div>
        `).join("");
        checkoutBtn.disabled = false;
    }

    // 3. Render Applied Coupon Badges
    couponsContainer.innerHTML = appliedCoupons.map(code => `
        <span class="coupon-tag">${code} (${code === "APEX20" ? "20%" : code === "SAVE10" ? "10%" : "5%"})</span>
    `).join("");

    // 4. Update Summary Rows using Template Literals
    cartBadgeCount.textContent = `${totalItems} ${totalItems === 1 ? "Item" : "Items"}`;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    discountEl.textContent = discountAmount > 0 
        ? `-$${discountAmount.toFixed(2)} (${cappedPercent}% OFF)` 
        : "$0.00";
    totalEl.textContent = `$${finalTotal.toFixed(2)}`;

    // 5. Demonstrate Array Destructuring
    renderArrayDestructuringInsight();
};

/**
 * Concept 7: Array Destructuring
 * Extracts primary, secondary, and remaining items from the cart array
 */
const renderArrayDestructuringInsight = () => {
    if (cart.length === 0) {
        destructuringInsightEl.innerHTML = `
            <strong>ES6 Array Destructuring Insight:</strong><br>
            <code>const [firstItem, secondItem, ...others] = cart;</code><br>
            Cart is currently empty. Add items to observe array destructuring.
        `;
        return;
    }

    // Concept 7: Array Destructuring with Rest pattern ([first, second, ...rest])
    const [firstItem, secondItem, ...otherItems] = cart;

    destructuringInsightEl.innerHTML = `
        <strong>ES6 Array Destructuring Analysis:</strong><br>
        • Primary Item [0]: <em>"${firstItem.title}"</em> (Qty: ${firstItem.quantity})<br>
        • Secondary Item [1]: <em>${secondItem ? secondItem.title : "(None)"}</em><br>
        • Remaining Tail (...others): <em>${otherItems.length} other product line(s)</em>
    `;
};

// ==========================================================================
// 6. CHECKOUT RECEIPT (Template Literals & Destructuring)
// ==========================================================================

checkoutBtn.addEventListener("click", () => {
    const subtotal = cart.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
    const { cappedPercent, discountAmount } = calculateDiscounts(subtotal, ...appliedCoupons);
    const grandTotal = subtotal - discountAmount;

    // Concept 2: Multiline Template String with dynamic interpolation
    const receiptText = `
========================================
           APEXSTORE RECEIPT
========================================
Date: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
Order ID: #${Math.floor(100000 + Math.random() * 900000)}

ORDERED ITEMS:
${cart.map(({ title, price, quantity }) => 
    `- ${title}\n  Qty: ${quantity} × $${price.toFixed(2)} = $${(quantity * price).toFixed(2)}`
).join("\n")}

----------------------------------------
Subtotal:              $${subtotal.toFixed(2)}
Discounts (${cappedPercent}%):       -$${discountAmount.toFixed(2)}
----------------------------------------
FINAL CHARGE:          $${grandTotal.toFixed(2)}
========================================
Thank you for shopping with ES6 syntax!
    `.trim();

    receiptContent.textContent = receiptText;
    receiptModal.classList.add("open");
});

btnCloseModal.addEventListener("click", () => {
    receiptModal.classList.remove("open");
    // Clear cart after checkout
    cart = [];
    appliedCoupons = [];
    updateCartUI();
});

// Initial Setup
renderCatalog();
updateCartUI();
