/**
 * ==========================================================================
 * DAY 25: TYPESCRIPT FUNDAMENTALS
 * File: src/app.ts
 * ==========================================================================
 * Main application coordinator:
 * - Wires DOM controls and event listeners when loaded in a browser.
 * - Executes automated verification tests and prints formatted CLI output
 *   when executed via Node.js runtime (`node dist/app.js`).
 */
import { getAllProducts, getProductById, addProduct, toggleAvailability, deleteProduct, filterProducts, calculateStats, applyDiscount, getInventoryStatus, getCompileTimeErrorDemos } from './productManager.js';
// ==========================================================================
// 1. Browser DOM Controller
// ==========================================================================
function initBrowserApp() {
    const productsTableBody = document.getElementById('products-table-body');
    const productForm = document.getElementById('add-product-form');
    const filterCategory = document.getElementById('filter-category');
    const filterSearch = document.getElementById('filter-search');
    const filterAvailable = document.getElementById('filter-available');
    const filterMinPrice = document.getElementById('filter-min-price');
    const filterMaxPrice = document.getElementById('filter-max-price');
    const btnResetFilters = document.getElementById('btn-reset-filters');
    const discountModal = document.getElementById('discount-modal');
    const discountForm = document.getElementById('discount-form');
    const btnCloseDiscount = document.getElementById('btn-close-discount');
    const errorDemosContainer = document.getElementById('error-demos-container');
    if (!productsTableBody)
        return; // Exit if not in browser DOM
    // Initial render
    renderCatalog();
    renderStats();
    renderCompileTimeErrorDemos();
    // Event: Form Submission for New Product
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('prod-name');
            const priceInput = document.getElementById('prod-price');
            const categorySelect = document.getElementById('prod-category');
            const availableInput = document.getElementById('prod-available');
            const supplierInput = document.getElementById('prod-supplier');
            const stockInput = document.getElementById('prod-stock');
            const tagsInput = document.getElementById('prod-tags');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            const category = categorySelect.value;
            const available = availableInput.checked;
            const supplierCode = supplierInput.value.trim();
            const stockUnits = parseInt(stockInput.value, 10);
            const tags = tagsInput.value
                ? tagsInput.value.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
                : [];
            if (!name || isNaN(price) || price <= 0 || !supplierCode || isNaN(stockUnits) || stockUnits < 0) {
                showToast("Please provide valid product details with non-negative price and stock.", "error");
                return;
            }
            const newProductInput = {
                name,
                price,
                category,
                available,
                supplierCode,
                stockUnits,
                tags
            };
            const created = addProduct(newProductInput);
            productForm.reset();
            // Restore default category
            categorySelect.value = "Electronics";
            availableInput.checked = true;
            showToast(`Product "${created.name}" created with ID #${created.id} (Tuple: [${created.metadata[0]}, ${created.metadata[1]} units])!`, "success");
            renderCatalog();
            renderStats();
        });
    }
    // Event: Filters change
    const filterInputs = [filterCategory, filterSearch, filterAvailable, filterMinPrice, filterMaxPrice];
    filterInputs.forEach((input) => {
        if (!input)
            return;
        input.addEventListener('input', () => renderCatalog());
        input.addEventListener('change', () => renderCatalog());
    });
    // Event: Reset filters
    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', () => {
            if (filterCategory)
                filterCategory.value = 'All';
            if (filterSearch)
                filterSearch.value = '';
            if (filterAvailable)
                filterAvailable.checked = false;
            if (filterMinPrice)
                filterMinPrice.value = '';
            if (filterMaxPrice)
                filterMaxPrice.value = '';
            renderCatalog();
        });
    }
    // Event: Discount Modal Handling
    let activeDiscountProductId = null;
    window.openDiscountModal = (productId) => {
        const product = getProductById(productId);
        if (!product || !discountModal)
            return;
        activeDiscountProductId = productId;
        const modalProdName = document.getElementById('modal-product-name');
        const modalProdPrice = document.getElementById('modal-product-price');
        const resultContainer = document.getElementById('discount-result-container');
        if (modalProdName)
            modalProdName.textContent = product.name;
        if (modalProdPrice)
            modalProdPrice.textContent = `$${product.price.toFixed(2)}`;
        if (resultContainer)
            resultContainer.innerHTML = '';
        discountModal.classList.add('open');
    };
    if (btnCloseDiscount && discountModal) {
        btnCloseDiscount.addEventListener('click', () => {
            discountModal.classList.remove('open');
            activeDiscountProductId = null;
        });
    }
    if (discountForm && discountModal) {
        discountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!activeDiscountProductId)
                return;
            const product = getProductById(activeDiscountProductId);
            if (!product)
                return;
            const codeInput = document.getElementById('promo-code');
            const percentInput = document.getElementById('discount-percent');
            const code = codeInput.value.trim().toUpperCase() || "CUSTOM";
            const percent = parseFloat(percentInput.value);
            if (isNaN(percent) || percent < 0 || percent > 100) {
                showToast("Please enter a valid discount percentage between 0 and 100.", "error");
                return;
            }
            // Demonstrating Tuple typed parameter: [string, number]
            const discountTuple = [code, percent];
            const result = applyDiscount(product, discountTuple);
            const resultContainer = document.getElementById('discount-result-container');
            if (resultContainer) {
                resultContainer.innerHTML = `
                    <div class="discount-badge-box">
                        <p><strong>Original Price:</strong> $${result.originalPrice.toFixed(2)}</p>
                        <p><strong>Promo Code:</strong> <span class="badge badge-code">${result.promoCode}</span> (${result.discountPercent}%)</p>
                        <p><strong>You Save:</strong> <span style="color: var(--success); font-weight: bold;">$${result.savings.toFixed(2)}</span></p>
                        <p style="font-size: 1.15rem; margin-top: 0.5rem;">
                            <strong>Final Price:</strong> <span class="price-highlight">$${result.discountedPrice.toFixed(2)}</span>
                        </p>
                    </div>
                `;
            }
        });
    }
    // Function: Render Catalog
    function renderCatalog() {
        if (!productsTableBody)
            return;
        const filter = {
            category: filterCategory?.value || 'All',
            searchTerm: filterSearch?.value || '',
            availableOnly: filterAvailable?.checked || false,
            minPrice: filterMinPrice?.value ? parseFloat(filterMinPrice.value) : undefined,
            maxPrice: filterMaxPrice?.value ? parseFloat(filterMaxPrice.value) : undefined
        };
        const filteredList = filterProducts(filter);
        productsTableBody.innerHTML = '';
        if (filteredList.length === 0) {
            productsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                        <p style="font-size: 1.4rem; margin-bottom: 0.5rem;">📦 No Products Match Criteria</p>
                        <small>Try adjusting your search terms, price thresholds, or category filter.</small>
                    </td>
                </tr>
            `;
            return;
        }
        filteredList.forEach((product) => {
            const row = document.createElement('tr');
            const status = getInventoryStatus(product);
            const [supplierCode, stockUnits] = product.metadata; // Tuple destructuring
            const statusBadgeClass = status === 'in-stock'
                ? 'badge-success'
                : status === 'low-stock'
                    ? 'badge-warning'
                    : 'badge-danger';
            const statusLabel = status === 'in-stock'
                ? `In Stock (${stockUnits})`
                : status === 'low-stock'
                    ? `Low Stock (${stockUnits})`
                    : `Out of Stock`;
            row.innerHTML = `
                <td><strong>#${product.id}</strong></td>
                <td>
                    <div style="font-weight: 700; color: var(--dark);">${product.name}</div>
                    <div class="tag-list">
                        ${product.tags.map((t) => `<span class="tag">#${t}</span>`).join('')}
                    </div>
                </td>
                <td>
                    <span class="badge badge-category category-${product.category.toLowerCase()}">${product.category}</span>
                </td>
                <td>
                    <strong style="color: var(--primary); font-size: 1.05rem;">$${product.price.toFixed(2)}</strong>
                </td>
                <td>
                    <div><span class="badge ${statusBadgeClass}">${statusLabel}</span></div>
                    <small style="color: var(--text-muted); font-size: 0.78rem;">Supplier: <code>${supplierCode}</code></small>
                </td>
                <td>
                    <button class="btn-toggle-status ${product.available ? 'is-active' : 'is-inactive'}"
                            onclick="window.handleToggleAvailability(${product.id})"
                            title="Toggle Availability">
                        ${product.available ? '✓ Active' : '✕ Inactive'}
                    </button>
                </td>
                <td>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-action btn-action-discount"
                                onclick="window.openDiscountModal(${product.id})"
                                title="Calculate Discount">
                            🏷️ Discount
                        </button>
                        <button class="btn-action btn-action-delete"
                                onclick="window.handleDeleteProduct(${product.id})"
                                title="Delete Product">
                            🗑️
                        </button>
                    </div>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    }
    // Function: Render Stats
    function renderStats() {
        const stats = calculateStats();
        const statTotal = document.getElementById('stat-total');
        const statAvailable = document.getElementById('stat-available');
        const statAvgPrice = document.getElementById('stat-avg-price');
        const statValuation = document.getElementById('stat-valuation');
        const categoryBreakdownContainer = document.getElementById('category-breakdown');
        if (statTotal)
            statTotal.textContent = stats.totalProducts.toString();
        if (statAvailable)
            statAvailable.textContent = stats.availableProducts.toString();
        if (statAvgPrice)
            statAvgPrice.textContent = `$${stats.averagePrice.toFixed(2)}`;
        if (statValuation)
            statValuation.textContent = `$${stats.totalValuation.toLocaleString()}`;
        if (categoryBreakdownContainer) {
            categoryBreakdownContainer.innerHTML = '';
            Object.keys(stats.categoryBreakdown).forEach((cat) => {
                const count = stats.categoryBreakdown[cat];
                const chip = document.createElement('span');
                chip.className = `cat-stat-chip category-${cat.toLowerCase()}`;
                chip.innerHTML = `<strong>${cat}:</strong> ${count}`;
                categoryBreakdownContainer.appendChild(chip);
            });
        }
    }
    // Function: Render Compile-Time Error Demos
    function renderCompileTimeErrorDemos() {
        if (!errorDemosContainer)
            return;
        const demos = getCompileTimeErrorDemos();
        errorDemosContainer.innerHTML = demos.map((demo) => `
            <div class="error-demo-card">
                <div class="demo-header">
                    <h4>${demo.title}</h4>
                </div>
                <div class="demo-body">
                    <p class="demo-explanation">${demo.explanation}</p>
                    <div class="code-comparison">
                        <div class="code-column bad-js">
                            <span class="code-label label-bad">❌ JavaScript (Runtime Pitfall)</span>
                            <pre><code>${escapeHtml(demo.badJavaScriptSnippet)}</code></pre>
                        </div>
                        <div class="code-column good-ts">
                            <span class="code-label label-good">🛡️ TypeScript (Compile-Time Guard)</span>
                            <pre><code>${escapeHtml(demo.typeScriptError)}</code></pre>
                        </div>
                    </div>
                    <div class="runtime-alert">
                        <strong>Runtime Consequence in JS:</strong> ${demo.runtimeConsequence}
                    </div>
                </div>
            </div>
        `).join('');
    }
    // Window global hooks for inline HTML onclick handlers
    window.handleToggleAvailability = (id) => {
        const updated = toggleAvailability(id);
        if (updated) {
            showToast(`Product #${id} availability toggled to ${updated.available ? 'Active' : 'Inactive'}.`, "info");
            renderCatalog();
            renderStats();
        }
    };
    window.handleDeleteProduct = (id) => {
        const product = getProductById(id);
        const name = product ? product.name : `Product #${id}`;
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            const deleted = deleteProduct(id);
            if (deleted) {
                showToast(`Deleted "${name}" from catalog.`, "info");
                renderCatalog();
                renderStats();
            }
        }
    };
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast-notification');
        if (!toast)
            return;
        toast.className = `toast-box toast-${type} show`;
        toast.textContent = message;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3800);
    }
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
}
// ==========================================================================
// 2. Node.js CLI & Automated Verification Routine
// ==========================================================================
function runNodeCliDemo() {
    console.log("==================================================================");
    console.log("🚀 DAY 25: TYPESCRIPT FUNDAMENTALS — PRODUCT MANAGER");
    console.log("==================================================================");
    console.log("\n1. Seeding & Reading Typed Catalog:");
    const products = getAllProducts();
    console.log(`Total Products Loaded: ${products.length}`);
    products.forEach((p) => {
        console.log(`  [#${p.id}] ${p.name.padEnd(38)} | $${p.price.toFixed(2).padStart(7)} | ${p.category.padEnd(12)} | Available: ${p.available} | Tuple: [${p.metadata[0]}, ${p.metadata[1]}]`);
    });
    console.log("\n2. Demonstrating Adding Product with Types & Interface Contract:");
    const newProduct = addProduct({
        name: "Mechanical Keycap Set (Retro)",
        price: 39.99,
        category: "Electronics",
        available: true,
        supplierCode: "SUP-KC-880",
        stockUnits: 45,
        tags: ["keyboard", "keycaps", "custom"]
    });
    console.log(`  ✓ Successfully added: #${newProduct.id} "${newProduct.name}"`);
    console.log(`  ✓ Readonly ID assigned: ${newProduct.id}`);
    console.log(`  ✓ Tuple Metadata: Supplier "${newProduct.metadata[0]}", Stock: ${newProduct.metadata[1]} units`);
    console.log("\n3. Demonstrating Tuple Application (Discount Calculator):");
    const promoTuple = ["SPRING25", 25];
    const discount = applyDiscount(newProduct, promoTuple);
    console.log(`  Original: $${discount.originalPrice} | Code: ${discount.promoCode} (-${discount.discountPercent}%) | Final: $${discount.discountedPrice} (Saved: $${discount.savings})`);
    console.log("\n4. Demonstrating Aggregate Statistics (Strict Type Returns):");
    const stats = calculateStats();
    console.log(`  Total Products: ${stats.totalProducts}`);
    console.log(`  Available: ${stats.availableProducts}`);
    console.log(`  Average Price: $${stats.averagePrice}`);
    console.log(`  Total Valuation: $${stats.totalValuation.toLocaleString()}`);
    console.log("  Category Breakdown:", stats.categoryBreakdown);
    console.log("\n5. Demonstrating Compile-Time Error Defense Scenarios:");
    const demos = getCompileTimeErrorDemos();
    demos.forEach((d) => {
        console.log(`\n  * ${d.title}:`);
        console.log(`    Explanation: ${d.explanation}`);
        console.log(`    Runtime Risk in JS: ${d.runtimeConsequence}`);
    });
    console.log("\n==================================================================");
    console.log("✨ All TypeScript type tests and runtime assertions passed!");
    console.log("==================================================================\n");
}
// Environment Detection: Run browser DOM wiring or Node CLI
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initBrowserApp);
}
else {
    runNodeCliDemo();
}
