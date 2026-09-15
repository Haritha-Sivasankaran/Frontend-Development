import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StudentStats from './components/StudentStats';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';
import Footer from './components/Footer';
import { studentApi } from './services/studentApi';

export default function App() {
    // =========================================================================
    // 1. Core State Management (useState)
    // =========================================================================
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Modal and Editing State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // Notification Toast State
    const [notification, setNotification] = useState(null);

    // API Reload & Simulation Triggers
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [simulateNetworkError, setSimulateNetworkError] = useState(false);

    // =========================================================================
    // 2. Lifecycle & Data Fetching (useEffect)
    // =========================================================================
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        // Execute asynchronous API request
        studentApi.fetchStudents(simulateNetworkError)
            .then((data) => {
                if (isMounted) {
                    setStudents(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message || 'An unexpected error occurred while fetching student data.');
                    setIsLoading(false);
                }
            });

        // Cleanup function: cancels state update if component unmounts during transit
        return () => {
            isMounted = false;
        };
    }, [reloadTrigger, simulateNetworkError]);

    // =========================================================================
    // 3. Notification Toast Timer (useEffect)
    // =========================================================================
    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => {
            setNotification(null);
        }, 4000);
        return () => clearTimeout(timer);
    }, [notification]);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
    };

    // =========================================================================
    // 4. CRUD Event Handlers
    // =========================================================================

    // Add or Edit Student Handler
    const handleSaveStudent = async (formData) => {
        try {
            if (editingStudent) {
                // Update (PUT)
                const updated = await studentApi.updateStudent(editingStudent.id, formData);
                setStudents((prev) =>
                    prev.map((s) => (s.id === editingStudent.id ? { ...s, ...updated } : s))
                );
                showToast(`Student record for "${formData.name}" updated successfully!`, 'success');
            } else {
                // Create (POST)
                const created = await studentApi.createStudent(formData);
                setStudents((prev) => [created, ...prev]);
                showToast(`New student "${formData.name}" registered successfully!`, 'success');
            }
            setIsModalOpen(false);
            setEditingStudent(null);
        } catch (err) {
            showToast(`Failed to save record: ${err.message}`, 'warning');
        }
    };

    // Delete Student Handler
    const handleDeleteStudent = async (id, name) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the student record for "${name}"?\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            await studentApi.deleteStudent(id);
            setStudents((prev) => prev.filter((s) => s.id !== id));
            showToast(`Student record for "${name}" has been removed.`, 'info');
        } catch (err) {
            showToast(`Failed to delete record: ${err.message}`, 'warning');
        }
    };

    // Modal Control Handlers
    const handleOpenAddModal = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    // Search and Filter Reset
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedCourse('All');
        setSelectedStatus('All');
    };

    // Trigger API Refresh
    const handleRefresh = () => {
        setSimulateNetworkError(false);
        setReloadTrigger((prev) => prev + 1);
        showToast('Refreshing student records from API...', 'info');
    };

    // Simulate API Network Error
    const handleSimulateError = () => {
        setSimulateNetworkError(true);
        setReloadTrigger((prev) => prev + 1);
    };

    // =========================================================================
    // 5. Derived Filtered Data Computation
    // =========================================================================
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCourse =
            selectedCourse === 'All' || student.course === selectedCourse;

        const matchesStatus =
            selectedStatus === 'All' || student.status === selectedStatus;

        return matchesSearch && matchesCourse && matchesStatus;
    });

    return (
        <div className="app-container">
            {/* Top Navigation & Actions */}
            <Header
                onOpenAddModal={handleOpenAddModal}
                onRefresh={handleRefresh}
                onSimulateError={handleSimulateError}
                isError={Boolean(error)}
                isLoading={isLoading}
            />

            <main className="main-content">
                {/* Notification Banner */}
                {notification && (
                    <div className={`notification-banner ${notification.type}`} role="alert">
                        <span>{notification.message}</span>
                        <button
                            className="notification-close"
                            onClick={() => setNotification(null)}
                            aria-label="Dismiss notification"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Metric Summary Cards */}
                <StudentStats students={students} />

                {/* Filter and Search Bar */}
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCourse={selectedCourse}
                    onCourseChange={setSelectedCourse}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    courses={studentApi.COURSES}
                    statuses={studentApi.STATUSES}
                    onResetFilters={handleResetFilters}
                />

                {/* Student Records Table */}
                <StudentTable
                    students={filteredStudents}
                    isLoading={isLoading}
                    error={error}
                    onRetry={handleRefresh}
                    onEditStudent={handleOpenEditModal}
                    onDeleteStudent={handleDeleteStudent}
                />

                {/* Educational Concept Breakdown Cards */}
                <section className="pedagogy-section">
                    <h3 className="pedagogy-title">
                        <span>💡</span> React Hooks &amp; Architecture Concepts in this Module
                    </h3>
                    <div className="pedagogy-grid">
                        <div className="pedagogy-card">
                            <h4><span>⚡</span> <code>useEffect</code> Data Lifecycle</h4>
                            <p>
                                Data is loaded after component mount via <code>useEffect(..., [])</code>.
                                A cleanup function sets <code>isMounted = false</code> to avoid memory leaks if unmounted before fetch returns.
                            </p>
                        </div>

                        <div className="pedagogy-card">
                            <h4><span>⏳</span> Loading &amp; Error States</h4>
                            <p>
                                Distinct states (<code>isLoading</code>, <code>error</code>, and data) ensure the UI never crashes or flashes empty screens during asynchronous network requests.
                            </p>
                        </div>

                        <div className="pedagogy-card">
                            <h4><span>📝</span> Controlled Form Validation</h4>
                            <p>
                                Every form field maps to component state (<code>value=&#123;formData.name&#125;</code>) and syncs via <code>onChange</code>. Real-time regex validates on blur and submit.
                            </p>
                        </div>

                        <div className="pedagogy-card">
                            <h4><span>🔄</span> Immutable State Updates</h4>
                            <p>
                                Array spreading (<code>[created, ...prev]</code>), <code>map</code> for updates, and <code>filter</code> for deletions maintain strict immutability for predictable React reconciliation.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Controlled Add / Edit Modal Dialog */}
            <StudentFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveStudent}
                editingStudent={editingStudent}
                courses={studentApi.COURSES}
                statuses={studentApi.STATUSES}
            />

            {/* Global Footer */}
            <Footer
                totalCount={students.length}
                filteredCount={filteredStudents.length}
            />
        </div>
    );
}
