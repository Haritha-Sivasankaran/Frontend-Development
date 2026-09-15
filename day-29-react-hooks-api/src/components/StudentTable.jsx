import React from 'react';

/**
 * StudentTable Component
 * Renders the tabular list of students with loading, empty, and action states.
 */
export default function StudentTable({
    students,
    isLoading,
    error,
    onRetry,
    onEditStudent,
    onDeleteStudent
}) {
    // 1. Loading State
    if (isLoading) {
        return (
            <div className="table-container">
                <div className="loading-container">
                    <div className="spinner" role="status" aria-label="Loading"></div>
                    <div>
                        <p className="loading-text">Fetching Student Records from API...</p>
                        <p className="loading-subtext">Executing useEffect asynchronous fetch request</p>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Error State
    if (error) {
        return (
            <div className="error-card">
                <div className="error-icon">⚠️</div>
                <h3 className="error-title">Failed to Load Student Records</h3>
                <p className="error-message">{error}</p>
                <div className="error-actions">
                    <button className="btn btn-primary" onClick={onRetry}>
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    // 3. Empty State
    if (students.length === 0) {
        return (
            <div className="table-container">
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <h3 className="empty-title">No Students Found</h3>
                    <p className="empty-description">
                        No student records match your current search query or filter selection.
                    </p>
                </div>
            </div>
        );
    }

    // Helper: Compute initials for student avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    // Helper: GPA Badge Styling
    const getGpaClass = (gpa) => {
        const num = Number(gpa);
        if (num >= 3.7) return 'gpa-badge gpa-high';
        if (num >= 3.2) return 'gpa-badge gpa-medium';
        return 'gpa-badge gpa-low';
    };

    // Helper: Status Pill Styling
    const getStatusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'status-pill status-active';
            case 'Enrolled':
                return 'status-pill status-enrolled';
            case 'On Leave':
                return 'status-pill status-on-leave';
            case 'Graduated':
                return 'status-pill status-graduated';
            default:
                return 'status-pill';
        }
    };

    return (
        <div className="table-container">
            <div className="table-header-info">
                <h3 className="table-title">Student Directory</h3>
                <span className="table-count-badge">
                    Showing {students.length} {students.length === 1 ? 'Student' : 'Students'}
                </span>
            </div>

            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Contact Information</th>
                        <th>Course / Track</th>
                        <th>GPA</th>
                        <th>Status</th>
                        <th>Enrolled Date</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>
                                <div className="student-identity">
                                    <div className="student-avatar" aria-hidden="true">
                                        {getInitials(student.name)}
                                    </div>
                                    <div>
                                        <span className="student-name">{student.name}</span>
                                        <span className="student-id">{student.id}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="contact-cell">
                                    <span className="contact-email">{student.email}</span>
                                    <span className="contact-phone">{student.phone}</span>
                                </div>
                            </td>
                            <td>
                                <span className="course-tag">
                                    <span>📖</span> {student.course}
                                </span>
                            </td>
                            <td>
                                <span className={getGpaClass(student.gpa)}>
                                    {Number(student.gpa).toFixed(2)}
                                </span>
                            </td>
                            <td>
                                <span className={getStatusClass(student.status)}>
                                    ● {student.status}
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>
                                    {student.enrollmentDate}
                                </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div className="action-buttons-cell" style={{ justifyContent: 'flex-end' }}>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => onEditStudent(student)}
                                        title={`Edit ${student.name}`}
                                        aria-label={`Edit ${student.name}`}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => onDeleteStudent(student.id, student.name)}
                                        title={`Delete ${student.name}`}
                                        aria-label={`Delete ${student.name}`}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
