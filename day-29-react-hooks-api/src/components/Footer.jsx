import React from 'react';

/**
 * Footer Component
 * Displays application context, active hook mechanisms, and educational credits.
 */
export default function Footer({ totalCount, filteredCount }) {
    return (
        <footer className="footer">
            <p>
                <strong>Day 29: React Hooks &amp; API Integration</strong> — Built with{' '}
                <code>useState</code>, <code>useEffect</code>, and RESTful asynchronous <code>fetch()</code>.
            </p>
            <p style={{ marginTop: '0.4rem', color: 'var(--gray-400)' }}>
                Displaying {filteredCount} of {totalCount} total students in memory &bull; Zero external UI libraries.
            </p>
        </footer>
    );
}
