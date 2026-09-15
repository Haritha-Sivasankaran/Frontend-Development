import React from 'react';

/**
 * StudentStats Component
 * Computes and renders high-level metric summaries from student state.
 */
export default function StudentStats({ students }) {
    const totalStudents = students.length;
    
    const activeCount = students.filter(
        (s) => s.status === 'Active' || s.status === 'Enrolled'
    ).length;

    const avgGpa = totalStudents > 0
        ? (students.reduce((acc, s) => acc + Number(s.gpa), 0) / totalStudents).toFixed(2)
        : '0.00';

    const uniqueCourses = new Set(students.map((s) => s.course)).size;

    return (
        <section className="stats-grid" aria-label="Student Overview Metrics">
            <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-primary">👥</div>
                <div className="stat-content">
                    <span className="stat-label">Total Students</span>
                    <span className="stat-value">{totalStudents}</span>
                    <span className="stat-detail">Registered in system</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-success">⚡</div>
                <div className="stat-content">
                    <span className="stat-label">Active Enrolled</span>
                    <span className="stat-value">{activeCount}</span>
                    <span className="stat-detail">{totalStudents > 0 ? Math.round((activeCount / totalStudents) * 100) : 0}% Active rate</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-warning">⭐</div>
                <div className="stat-content">
                    <span className="stat-label">Average GPA</span>
                    <span className="stat-value">{avgGpa}</span>
                    <span className="stat-detail">Across all cohorts</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon-wrapper stat-icon-secondary">📚</div>
                <div className="stat-content">
                    <span className="stat-label">Active Programs</span>
                    <span className="stat-value">{uniqueCourses}</span>
                    <span className="stat-detail">Degree tracks</span>
                </div>
            </div>
        </section>
    );
}
