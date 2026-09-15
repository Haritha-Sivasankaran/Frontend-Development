/**
 * ==========================================================================
 * DAY 26: ADVANCED TYPESCRIPT
 * File: src/app.ts
 * ==========================================================================
 * Application orchestrator:
 * - Wires DOM controls and manages asynchronous state in the browser.
 * - Executes automated verification tests when invoked via Node.js runtime.
 */
import { UserId } from './types.js';
declare global {
    interface Window {
        viewUserDetails: (id: UserId) => void;
        toggleStatus: (id: UserId) => Promise<void>;
        deleteUser: (id: UserId) => Promise<void>;
    }
}
