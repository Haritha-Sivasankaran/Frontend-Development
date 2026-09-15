/* ==========================================================================
   DAY 14: JAVASCRIPT ARRAYS, OBJECTS AND FUNCTIONS
   Project: TechVault Interactive Shopping Cart
   ========================================================================== */

// 1. Array of Objects: Product Catalog Data Model
const catalog = [
    {
        id: 101,
        name: "Ergonomic Mechanical Keyboard",
        category: "Hardware",
        price: 129.99,
        icon: "⌨️"
    },
    {
        id: 102,
        name: "Wireless Precision Master Mouse",
        category: "Hardware",
        price: 79.50,
        icon: "🖱️"
    },
    {
        id: 103,
        name: "Active Noise-Canceling Studio Headset",
        category: "Audio",
        price: 199.00,
        icon: "🎧"
    },
    {
        id: 104,
        name: "4K Ultra-HD USB-C Streaming Webcam",
        category: "Video",
        price: 95.00,
        icon: "📷"
    }
];

// 2. Mutable Application State: Array of Cart Item Objects
let cart = [];

// Promotional Codes Dictionary Object
const PROMO_CODES = {
    "SAVE10": 0.10, // 10% off
    "TECH20": 0.20  // 20% off
};

let activePromoCode = "";

// 3. DOM Elements
const productsGridEl = document.getElementById("products-grid");
const cartListEl = document.getElementById("cart-items-list");
const cartCountBadgeEl = document.getElementById("cart-count-badge");
const subtotalEl = document.getElementById("summary-subtotal");
const discountRowEl = document.getElementById("summary-discount-row");
const discountEl = document.getElementById("summary-discount");
const totalEl = document.getElementById("summary-total");
const promoInputEl = document.getElementById("promo-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const checkoutBtn = document.getElementById("checkout-btn");

// ==========================================================================
// FUNCTION 1: Render Product Catalog into DOM
// Concepts: Function definition, Array iteration, Object property access
// ==========================================================================
function renderCatalog() {
    productsGridEl.innerHTML = "";

    for (let i = 0; i < catalog.length; i = i + 1) {
        // Accessing object properties via dot notation
        const product = catalog[i];

        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div>
                <div class="product-icon">${product.icon}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-cat">${product.category}</p>
            </div>
            <div class="product-pricing-row">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productsGridEl.appendChild(card);
    }
}

// ==========================================================================
// FUNCTION 2: Add Product to Cart
// Concepts: Function parameters, Array search, Array manipulation (push)
// ==========================================================================
function addToCart(productId) { // 'productId' is the formal parameter
    // Find matching product in catalog array
    let selectedProduct = null;
    for (let i = 0; i < catalog.length; i = i + 1) {
        if (catalog[i].id === productId) {
            selectedProduct = catalog[i];
            break;
        }
    }

    if (!selectedProduct) return;

    // Check if product already exists in cart array
    let existingCartItem = null;
    for (let j = 0; j < cart.length; j = j + 1) {
        if (cart[j].id === productId) {
            existingCartItem = cart[j];
            break;
        }
    }

    if (existingCartItem) {
        // Mutate existing object property
        existingCartItem.quantity = existingCartItem.quantity + 1;
    } else {
        // Create new cart object and push into cart array (Array manipulation)
        const newCartItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            icon: selectedProduct.icon,
            quantity: 1
        };
        cart.push(newCartItem);
    }

    // Refresh UI
    renderCart();
    updateSummary();
}

// ==========================================================================
// FUNCTION 3: Update Item Quantity (+ / -)
// Concepts: Parameters, Arguments, Conditional branching
// ==========================================================================
function updateQuantity(productId, delta) {
    for (let i = 0; i < cart.length; i = i + 1) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + delta;

            // If quantity drops to 0 or below, remove item from cart
            if (cart[i].quantity <= 0) {
                removeFromCart(productId);
                return;
            }
            break;
        }
    }

    renderCart();
    updateSummary();
}

// ==========================================================================
// FUNCTION 4: Remove Product from Cart
// Concepts: Array manipulation using .splice()
// ==========================================================================
function removeFromCart(productId) {
    let targetIndex = -1;
    for (let i = 0; i < cart.length; i = i + 1) {
        if (cart[i].id === productId) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1) {
        // Array manipulation: remove 1 element at targetIndex
        cart.splice(targetIndex, 1);
    }

    renderCart();
    updateSummary();
}

// ==========================================================================
// FUNCTION 5: Calculate Subtotal
// Concepts: Function with parameter and explicit return value
// ==========================================================================
function calculateSubtotal(cartItemsArray) {
    let sum = 0;
    for (let i = 0; i < cartItemsArray.length; i = i + 1) {
        sum = sum + (cartItemsArray[i].price * cartItemsArray[i].quantity);
    }
    return sum; // Returns pure numeric subtotal
}

// ==========================================================================
// FUNCTION 6: Calculate Discount Amount
// Concepts: Multiple parameters, Object property lookup, return value
// ==========================================================================
function calculateDiscount(subtotalAmount, promoCodeString) {
    if (!promoCodeString || !PROMO_CODES[promoCodeString]) {
        return 0; // Return 0 if no valid promo code
    }

    const discountPercentage = PROMO_CODES[promoCodeString];
    const discountValue = subtotalAmount * discountPercentage;
    return discountValue; // Returns dollar discount
}

// ==========================================================================
// FUNCTION 7: Render Cart Items in DOM
// Concepts: Array length checking, DOM rendering, dynamic event bindings
// ==========================================================================
function renderCart() {
    cartListEl.innerHTML = "";

    if (cart.length === 0) {
        cartListEl.innerHTML = '<p class="empty-cart-msg">Your shopping cart is empty.</p>';
        cartCountBadgeEl.textContent = "0 items";
        return;
    }

    let totalItemCount = 0;

    for (let i = 0; i < cart.length; i = i + 1) {
        const item = cart[i];
        totalItemCount = totalItemCount + item.quantity;
        const itemSubtotal = item.price * item.quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <div class="cart-item-details">
                <span class="cart-item-icon">${item.icon}</span>
                <div>
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-unit-price">$${item.price.toFixed(2)} each</span>
                </div>
            </div>

            <div class="qty-controls">
                <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)">+</button>
                <span class="cart-item-subtotal">$${itemSubtotal.toFixed(2)}</span>
                <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">&times;</button>
            </div>
        `;

        cartListEl.appendChild(cartItemDiv);
    }

    cartCountBadgeEl.textContent = `${totalItemCount} item${totalItemCount === 1 ? "" : "s"}`;
}

// ==========================================================================
// FUNCTION 8: Update Order Financial Summary
// Concepts: Calling functions and consuming their return values
// ==========================================================================
function updateSummary() {
    // Calling calculateSubtotal with argument 'cart'
    const rawSubtotal = calculateSubtotal(cart);

    // Calling calculateDiscount with arguments
    const discountAmount = calculateDiscount(rawSubtotal, activePromoCode);

    // Final total calculation
    const finalAmount = rawSubtotal - discountAmount;

    // DOM Updates
    subtotalEl.textContent = `$${rawSubtotal.toFixed(2)}`;

    if (discountAmount > 0) {
        discountRowEl.style.display = "flex";
        discountEl.textContent = `−$${discountAmount.toFixed(2)} (${activePromoCode})`;
    } else {
        discountRowEl.style.display = "none";
    }

    totalEl.textContent = `$${finalAmount.toFixed(2)}`;

    // Toggle checkout button state
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.style.opacity = cart.length === 0 ? "0.5" : "1";
}

// ==========================================================================
// 4. Promo Code Event Listener
// ==========================================================================
applyPromoBtn.addEventListener("click", function () {
    const enteredCode = promoInputEl.value.trim().toUpperCase();

    if (enteredCode === "") {
        alert("Please enter a promotional code (e.g. SAVE10 or TECH20).");
        return;
    }

    if (PROMO_CODES[enteredCode]) {
        activePromoCode = enteredCode;
        alert(`Promo code '${enteredCode}' applied successfully!`);
        updateSummary();
    } else {
        alert(`Invalid promo code '${enteredCode}'. Try 'SAVE10' or 'TECH20'.`);
    }
});

// Checkout action
checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) return;
    const finalTotal = totalEl.textContent;
    alert(`Thank you for your order! Total charged: ${finalTotal}. Order confirmation dispatched.`);
    cart = [];
    activePromoCode = "";
    promoInputEl.value = "";
    renderCart();
    updateSummary();
});

// Initial Bootstrap
renderCatalog();
updateSummary();
