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
import { ProductId } from './types.js';
declare global {
    interface Window {
        openDiscountModal: (id: ProductId) => void;
        handleToggleAvailability: (id: ProductId) => void;
        handleDeleteProduct: (id: ProductId) => void;
    }
}
