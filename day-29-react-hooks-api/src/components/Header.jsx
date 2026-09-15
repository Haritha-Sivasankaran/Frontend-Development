import React from 'react';

/**
 * Header Component
 * Displays system branding, live API status, and top action buttons.
 */
export default function Header({
    onOpenAddModal,
    onRefresh,
    onSimulateError,
    isError,
    isLoading
}) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="brand-wrapper">
                    <div className="brand-logo" aria-hidden="true">🎓</div>
                    <div>
                        <h1 className="brand-title">EduSphere SIS</h1>
                        <p className="brand-subtitle">React Hooks &amp; REST API Student Management</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className={`api-status-badge ${isError ? 'error' : ''}`}>
                        <span className="status-dot"></span>
                        <span>{isError ? 'API Error' : isLoading ? 'Syncing...' : 'API Live (REST)'}</span>
                    </div>

                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={onRefresh}
                        disabled={isLoading}
                        title="Re-run useEffect fetch request"
                    >
                        🔄 Refresh API
                    </button>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={onSimulateError}
                        disabled={isLoading}
                        title="Simulate network failure to test error state handling"
                    >
                        ⚡ Test Error State
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={onOpenAddModal}
                    >
                        <span>➕</span>
                        <span>Register Student</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
