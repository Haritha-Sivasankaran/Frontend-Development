/**
 * ==========================================================================
 * DAY 25: TYPESCRIPT FUNDAMENTALS
 * File: src/types.ts
 * ==========================================================================
 * This module defines all core type contracts, interfaces, union types,
 * tuples, and type aliases for the TypeScript Product Manager application.
 */
export type ProductId = number;
/**
 * Union Type: Restricts product categories to exactly 5 verified string literals.
 * Any string outside this union triggers a compile-time TypeError.
 */
export type ProductCategory = 'Electronics' | 'Clothing' | 'Books' | 'Food' | 'Home';
export type CategoryFilter = ProductCategory | 'All';
/**
 * Union Type: Derived inventory status indicator
 */
export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
/**
 * Named Tuple: Represents [supplierCode: string, stockUnits: number]
 * Fixed length (2 elements) and fixed ordered types.
 */
export type SupplierMetadataTuple = [supplierCode: string, stockUnits: number];
/**
 * Named Tuple: Represents [promoCode: string, discountPercentage: number]
 * Example: ["TECH20", 20]
 */
export type DiscountTuple = [code: string, percentage: number];
/**
 * Tuple: Price range bounds [min: number, max: number]
 */
export type PriceRangeTuple = [min: number, max: number];
/**
 * Core Product Interface
 * Demonstrates:
 * - Readonly properties
 * - Primitives (string, number, boolean)
 * - Union types (ProductCategory)
 * - Array types (string[])
 * - Tuple types (SupplierMetadataTuple)
 */
export interface Product {
    readonly id: ProductId;
    name: string;
    price: number;
    category: ProductCategory;
    available: boolean;
    metadata: SupplierMetadataTuple;
    tags: string[];
    createdAt: string;
}
/**
 * Interface for creating a new product (omits system-generated fields)
 */
export interface NewProductInput {
    name: string;
    price: number;
    category: ProductCategory;
    available: boolean;
    supplierCode: string;
    stockUnits: number;
    tags?: string[];
}
/**
 * Interface for filtering products
 * Demonstrates optional properties (?)
 */
export interface ProductFilter {
    category?: CategoryFilter;
    minPrice?: number;
    maxPrice?: number;
    availableOnly?: boolean;
    searchTerm?: string;
}
/**
 * Interface for aggregated catalog statistics
 */
export interface ProductStats {
    totalProducts: number;
    availableProducts: number;
    averagePrice: number;
    totalValuation: number;
    categoryBreakdown: Record<ProductCategory, number>;
}
/**
 * Interface for discount calculation output
 */
export interface DiscountResult {
    originalPrice: number;
    discountPercent: number;
    discountedPrice: number;
    savings: number;
    promoCode: string;
}
/**
 * Interface for educational compile-time error demonstrations
 */
export interface CompileTimeErrorDemo {
    id: string;
    title: string;
    badJavaScriptSnippet: string;
    typeScriptError: string;
    explanation: string;
    runtimeConsequence: string;
}
