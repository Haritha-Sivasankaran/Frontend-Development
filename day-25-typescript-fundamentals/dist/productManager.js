/**
 * ==========================================================================
 * DAY 25: TYPESCRIPT FUNDAMENTALS
 * File: src/productManager.ts
 * ==========================================================================
 * Encapsulates the core business logic, type-safe functions, calculation
 * routines, and compile-time error defense mechanisms.
 */
// Initial Seed Database
let productsDatabase = [
    {
        id: 1,
        name: "Mechanical Ergonomic Keyboard",
        price: 149.99,
        category: "Electronics",
        available: true,
        metadata: ["SUP-EL-901", 34],
        tags: ["peripherals", "ergonomic", "rgb"],
        createdAt: "2026-03-01"
    },
    {
        id: 2,
        name: "Noise-Cancelling Wireless Headphones",
        price: 279.50,
        category: "Electronics",
        available: true,
        metadata: ["SUP-EL-902", 18],
        tags: ["audio", "wireless", "anc"],
        createdAt: "2026-03-02"
    },
    {
        id: 3,
        name: "Merino Wool Winter Pullover",
        price: 89.00,
        category: "Clothing",
        available: true,
        metadata: ["SUP-CL-410", 52],
        tags: ["winter", "apparel", "wool"],
        createdAt: "2026-03-03"
    },
    {
        id: 4,
        name: "Designing Data-Intensive Applications",
        price: 45.00,
        category: "Books",
        available: true,
        metadata: ["SUP-BK-115", 85],
        tags: ["tech", "architecture", "distributed"],
        createdAt: "2026-03-04"
    },
    {
        id: 5,
        name: "Organic Fair-Trade Espresso Beans (1kg)",
        price: 24.95,
        category: "Food",
        available: false,
        metadata: ["SUP-FD-088", 0],
        tags: ["coffee", "organic", "fair-trade"],
        createdAt: "2026-03-05"
    },
    {
        id: 6,
        name: "Minimalist Standing Desk Converter",
        price: 219.00,
        category: "Home",
        available: true,
        metadata: ["SUP-HM-302", 12],
        tags: ["furniture", "ergonomics", "desk"],
        createdAt: "2026-03-06"
    }
];
let nextProductId = 7;
/**
 * 1. Retrieve all products
 * Demonstrates: Return type annotation (Product[])
 */
export function getAllProducts() {
    return [...productsDatabase];
}
/**
 * 2. Retrieve a product by ID
 * Demonstrates: Union return type (Product | undefined)
 */
export function getProductById(id) {
    return productsDatabase.find((product) => product.id === id);
}
/**
 * 3. Add a new product
 * Demonstrates:
 * - Interface parameter (NewProductInput)
 * - Explicit return type (Product)
 * - Readonly ID assignment
 * - Tuple creation: [input.supplierCode, input.stockUnits]
 */
export function addProduct(input) {
    const newProduct = {
        id: nextProductId++,
        name: input.name.trim(),
        price: Number(input.price.toFixed(2)),
        category: input.category,
        available: input.available,
        metadata: [input.supplierCode.trim().toUpperCase(), input.stockUnits],
        tags: input.tags && input.tags.length > 0 ? input.tags : ["general"],
        createdAt: new Date().toISOString().split('T')[0]
    };
    productsDatabase.push(newProduct);
    return newProduct;
}
/**
 * 4. Toggle availability
 * Demonstrates: Return type with null for missing entity (Product | null)
 */
export function toggleAvailability(id) {
    const targetProduct = productsDatabase.find((p) => p.id === id);
    if (!targetProduct) {
        return null;
    }
    targetProduct.available = !targetProduct.available;
    return targetProduct;
}
/**
 * 5. Delete product
 * Demonstrates: boolean return type
 */
export function deleteProduct(id) {
    const initialLength = productsDatabase.length;
    productsDatabase = productsDatabase.filter((p) => p.id !== id);
    return productsDatabase.length < initialLength;
}
/**
 * 6. Filter products
 * Demonstrates:
 * - Function with interface parameter (ProductFilter)
 * - Array methods with typed arrow functions
 * - Union string comparison
 */
export function filterProducts(filter) {
    return productsDatabase.filter((product) => {
        // Category check
        if (filter.category && filter.category !== 'All') {
            if (product.category !== filter.category)
                return false;
        }
        // Min price check
        if (filter.minPrice !== undefined && filter.minPrice !== null && !isNaN(filter.minPrice)) {
            if (product.price < filter.minPrice)
                return false;
        }
        // Max price check
        if (filter.maxPrice !== undefined && filter.maxPrice !== null && !isNaN(filter.maxPrice)) {
            if (product.price > filter.maxPrice)
                return false;
        }
        // Availability check
        if (filter.availableOnly) {
            if (!product.available)
                return false;
        }
        // Search term check (name or tags)
        if (filter.searchTerm && filter.searchTerm.trim() !== '') {
            const term = filter.searchTerm.trim().toLowerCase();
            const matchesName = product.name.toLowerCase().includes(term);
            const matchesTag = product.tags.some((t) => t.toLowerCase().includes(term));
            const matchesSupplier = product.metadata[0].toLowerCase().includes(term);
            if (!matchesName && !matchesTag && !matchesSupplier)
                return false;
        }
        return true;
    });
}
/**
 * 7. Calculate aggregate statistics
 * Demonstrates:
 * - Optional parameter with default fallback
 * - Record<ProductCategory, number> dictionary
 * - Explicit return interface (ProductStats)
 */
export function calculateStats(products = productsDatabase) {
    const totalProducts = products.length;
    const availableProducts = products.filter((p) => p.available).length;
    const totalValuation = products.reduce((acc, p) => {
        const stockUnits = p.metadata[1]; // from tuple
        return acc + (p.price * stockUnits);
    }, 0);
    const averagePrice = totalProducts > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts
        : 0;
    const categoryBreakdown = {
        Electronics: 0,
        Clothing: 0,
        Books: 0,
        Food: 0,
        Home: 0
    };
    products.forEach((p) => {
        if (categoryBreakdown[p.category] !== undefined) {
            categoryBreakdown[p.category]++;
        }
    });
    return {
        totalProducts,
        availableProducts,
        averagePrice: Number(averagePrice.toFixed(2)),
        totalValuation: Number(totalValuation.toFixed(2)),
        categoryBreakdown
    };
}
/**
 * 8. Apply discount using a Tuple
 * Demonstrates:
 * - Tuple destructuring: const [promoCode, percentage] = discount;
 * - Interface return type (DiscountResult)
 */
export function applyDiscount(product, discount) {
    const [promoCode, percentage] = discount;
    const factor = Math.max(0, Math.min(100, percentage)) / 100;
    const savings = product.price * factor;
    const discountedPrice = product.price - savings;
    return {
        originalPrice: product.price,
        discountPercent: percentage,
        discountedPrice: Number(discountedPrice.toFixed(2)),
        savings: Number(savings.toFixed(2)),
        promoCode
    };
}
/**
 * 9. Derive Inventory Status from Tuple metadata
 * Demonstrates: Union return type
 */
export function getInventoryStatus(product) {
    const stockUnits = product.metadata[1];
    if (stockUnits === 0 || !product.available) {
        return 'out-of-stock';
    }
    else if (stockUnits <= 15) {
        return 'low-stock';
    }
    else {
        return 'in-stock';
    }
}
/**
 * 10. Educational Demos: How TypeScript Catches Errors Before Runtime
 * Returns 5 concrete scenarios contrasting vanilla JavaScript bugs with TypeScript compiler errors.
 */
export function getCompileTimeErrorDemos() {
    return [
        {
            id: "err-1",
            title: "1. Type Mismatch (String Concatenation Bug)",
            badJavaScriptSnippet: `// JavaScript silently concatenates strings with numbers!\nconst price = "149.99"; // String from an input\nconst tax = 15;         // Number\nconst total = price + tax;\nconsole.log(total); // Prints "149.9915" instead of 164.99!`,
            typeScriptError: `error TS2322: Type 'string' is not assignable to type 'number'.\nproduct.price = "149.99"; // ❌ Compile-time error in TS`,
            explanation: `In vanilla JavaScript, dynamic coercion treats + with a string as string concatenation. TypeScript flags this instantly at build-time because price is typed as number.`,
            runtimeConsequence: `Critical financial calculation failure in production billing systems.`
        },
        {
            id: "err-2",
            title: "2. Typo in Object Keys (Silent Undefined)",
            badJavaScriptSnippet: `// JavaScript returns undefined for mistyped properties\nconst product = { name: "Headphones", price: 279.50 };\nconsole.log(product.nme); // undefined - no error thrown!\nconsole.log(product.nme.toUpperCase()); // CRASH: TypeError!`,
            typeScriptError: `error TS2551: Property 'nme' does not exist on type 'Product'. Did you mean 'name'?`,
            explanation: `TypeScript cross-references object access against the Product interface. If you mistype a property, TS flags it and even suggests the correct spelling!`,
            runtimeConsequence: `Uncaught TypeError: Cannot read properties of undefined (reading 'toUpperCase').`
        },
        {
            id: "err-3",
            title: "3. Invalid Union Literal (Domain Data Corruption)",
            badJavaScriptSnippet: `// JavaScript allows any arbitrary string\nproduct.category = "Gadgets"; // Not a valid category in our store!\n// Later, our category filter has no idea what "Gadgets" is.`,
            typeScriptError: `error TS2322: Type '"Gadgets"' is not assignable to type 'ProductCategory'.\nDid you mean 'Electronics'?`,
            explanation: `ProductCategory is defined as a union: 'Electronics' | 'Clothing' | 'Books' | 'Food' | 'Home'. TypeScript guarantees that invalid categories cannot enter the data stream.`,
            runtimeConsequence: `Silent database corruption and broken catalog search queries.`
        },
        {
            id: "err-4",
            title: "4. Missing Required Properties on Creation",
            badJavaScriptSnippet: `// JavaScript allows missing fields\nfunction saveProduct(p) { return p.price * 1.1; }\nsaveProduct({ name: "Pencil" }); // Returns NaN because price is undefined!`,
            typeScriptError: `error TS2345: Argument of type '{ name: string; }' is not assignable to parameter of type 'NewProductInput'.\nProperty 'price' is missing in type.`,
            explanation: `Interfaces act as strict contracts. If an engineer forgets to pass price, category, or stockUnits, the compiler blocks the build immediately.`,
            runtimeConsequence: `NaN values propagated throughout database tables and customer invoices.`
        },
        {
            id: "err-5",
            title: "5. Tuple Bounds & Type Position Inversion",
            badJavaScriptSnippet: `// JavaScript arrays allow arbitrary types and lengths\nconst metadata = [50, "SUP-900", "extra_data"];\n// If consumer expected [supplierCode: string, stockUnits: number]:\nconst supplier = metadata[0].toLowerCase(); // CRASH: 50.toLowerCase is not a function!`,
            typeScriptError: `error TS2322: Type 'number' is not assignable to type 'string'.\nSource has 3 elements but target allows only 2.`,
            explanation: `TypeScript tuples define exact length and element types at every index. Positional mistakes are caught immediately before execution.`,
            runtimeConsequence: `Uncaught TypeError: metadata[0].toLowerCase is not a function.`
        }
    ];
}
