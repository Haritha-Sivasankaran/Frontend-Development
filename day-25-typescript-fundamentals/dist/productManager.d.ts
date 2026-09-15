/**
 * ==========================================================================
 * DAY 25: TYPESCRIPT FUNDAMENTALS
 * File: src/productManager.ts
 * ==========================================================================
 * Encapsulates the core business logic, type-safe functions, calculation
 * routines, and compile-time error defense mechanisms.
 */
import { Product, ProductId, NewProductInput, ProductFilter, ProductStats, DiscountTuple, DiscountResult, InventoryStatus, CompileTimeErrorDemo } from './types.js';
/**
 * 1. Retrieve all products
 * Demonstrates: Return type annotation (Product[])
 */
export declare function getAllProducts(): Product[];
/**
 * 2. Retrieve a product by ID
 * Demonstrates: Union return type (Product | undefined)
 */
export declare function getProductById(id: ProductId): Product | undefined;
/**
 * 3. Add a new product
 * Demonstrates:
 * - Interface parameter (NewProductInput)
 * - Explicit return type (Product)
 * - Readonly ID assignment
 * - Tuple creation: [input.supplierCode, input.stockUnits]
 */
export declare function addProduct(input: NewProductInput): Product;
/**
 * 4. Toggle availability
 * Demonstrates: Return type with null for missing entity (Product | null)
 */
export declare function toggleAvailability(id: ProductId): Product | null;
/**
 * 5. Delete product
 * Demonstrates: boolean return type
 */
export declare function deleteProduct(id: ProductId): boolean;
/**
 * 6. Filter products
 * Demonstrates:
 * - Function with interface parameter (ProductFilter)
 * - Array methods with typed arrow functions
 * - Union string comparison
 */
export declare function filterProducts(filter: ProductFilter): Product[];
/**
 * 7. Calculate aggregate statistics
 * Demonstrates:
 * - Optional parameter with default fallback
 * - Record<ProductCategory, number> dictionary
 * - Explicit return interface (ProductStats)
 */
export declare function calculateStats(products?: Product[]): ProductStats;
/**
 * 8. Apply discount using a Tuple
 * Demonstrates:
 * - Tuple destructuring: const [promoCode, percentage] = discount;
 * - Interface return type (DiscountResult)
 */
export declare function applyDiscount(product: Product, discount: DiscountTuple): DiscountResult;
/**
 * 9. Derive Inventory Status from Tuple metadata
 * Demonstrates: Union return type
 */
export declare function getInventoryStatus(product: Product): InventoryStatus;
/**
 * 10. Educational Demos: How TypeScript Catches Errors Before Runtime
 * Returns 5 concrete scenarios contrasting vanilla JavaScript bugs with TypeScript compiler errors.
 */
export declare function getCompileTimeErrorDemos(): CompileTimeErrorDemo[];
