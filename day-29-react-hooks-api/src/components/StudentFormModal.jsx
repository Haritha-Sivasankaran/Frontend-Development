import React, { useState, useEffect } from 'react';

/**
 * StudentFormModal Component
 * Controlled form modal handling both Student Registration (Create) and Student Editing (Update).
 * Features real-time controlled inputs and form validation.
 */
export default function StudentFormModal({
    isOpen,
    onClose,
    onSubmit,
    editingStudent,
    courses,
    statuses
}) {
    const isEditMode = Boolean(editingStudent);

    // Controlled Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: courses[0] || 'Full Stack Web',
        gpa: '3.50',
        status: statuses[0] || 'Active'
    });

    // Form Errors State
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Synchronize form values whenever editingStudent or isOpen changes
    useEffect(() => {
        if (editingStudent) {
            setFormData({
                name: editingStudent.name || '',
                email: editingStudent.email || '',
                phone: editingStudent.phone || '',
                course: editingStudent.course || courses[0],
                gpa: String(editingStudent.gpa || '3.50'),
                status: editingStudent.status || statuses[0]
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                course: courses[0] || 'Full Stack Web',
                gpa: '3.50',
                status: 'Active'
            });
        }
        setErrors({});
        setTouched({});
    }, [editingStudent, isOpen, courses, statuses]);

    // Validation Logic
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Full name is required.';
                } else if (value.trim().length < 3) {
                    error = 'Name must be at least 3 characters.';
                } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
                    error = 'Name can only contain letters, spaces, and hyphens.';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    error = 'Email address is required.';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                    error = 'Please enter a valid email address (e.g. name@domain.com).';
                }
                break;

            case 'phone':
                if (!value.trim()) {
                    error = 'Contact phone number is required.';
                } else if (value.replace(/[^0-9]/g, '').length < 8) {
                    error = 'Phone number must contain at least 8 digits.';
                }
                break;

            case 'course':
                if (!value) {
                    error = 'Please select an academic course.';
                }
                break;

            case 'gpa':
                const gpaNum = parseFloat(value);
                if (value === '' || isNaN(gpaNum)) {
                    error = 'GPA is required.';
                } else if (gpaNum < 0.0 || gpaNum > 4.0) {
                    error = 'GPA must be between 0.0 and 4.0.';
                }
                break;

            case 'status':
                if (!value) {
                    error = 'Please select an enrollment status.';
                }
                break;

            default:
                break;
        }

        return error;
    };

    // Generic Controlled Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Validate immediately if field was previously touched
        if (touched[name]) {
            const errorMsg = validateField(name, value);
            setErrors((prev) => ({
                ...prev,
                [name]: errorMsg
            }));
        }
    };

    // On Blur Handler (Marks field as touched to trigger validation UI)
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const errorMsg = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    // Form Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const newTouched = {
            name: true,
            email: true,
            phone: true,
            course: true,
            gpa: true,
            status: true
        };
        setTouched(newTouched);

        // Validate all fields
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        // Call parent submission handler with form payload
        onSubmit({
            ...formData,
            gpa: parseFloat(formData.gpa)
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        {isEditMode ? '✏️ Edit Student Record' : '📝 Register New Student'}
                    </h3>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        ✕
                    </button>
                </div>

                <form className="student-form" onSubmit={handleSubmit} noValidate>
                    {/* Full Name */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="student-name">
                            Full Name <span className="required-star">*</span>
                        </label>
                        <input
                            type="text"
                            id="student-name"
                            name="name"
                            className={`form-input ${touched.name && errors.name ? 'has-error' : ''}`}
                            placeholder="e.g. Maya Lin"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                        {touched.name && errors.name && (
                            <span className="error-feedback">⚠️ {errors.name}</span>
                        )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="student-email">
                                Email Address <span className="required-star">*</span>
                            </label>
                            <input
                                type="email"
                                id="student-email"
                                name="email"
                                className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && (
                                <span className="error-feedback">⚠️ {errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="student-phone">
                                Phone Number <span className="required-star">*</span>
                            </label>
                            <input
                                type="tel"
                                id="student-phone"
                                name="phone"
                                className={`form-input ${touched.phone && errors.phone ? 'has-error' : ''}`}
                                placeholder="+1 555-0199"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.phone && errors.phone && (
                                <span className="error-feedback">⚠️ {errors.phone}</span>
                            )}
                        </div>
                    </div>

                    {/* Course & Status Grid */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="student-course">
                                Academic Program <span className="required-star">*</span>
                            </label>
                            <select
                                id="student-course"
                                name="course"
                                className={`form-select ${touched.course && errors.course ? 'has-error' : ''}`}
                                value={formData.course}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {courses.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                            {touched.course && errors.course && (
                                <span className="error-feedback">⚠️ {errors.course}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="student-status">
                                Enrollment Status <span className="required-star">*</span>
                            </label>
                            <select
                                id="student-status"
                                name="status"
                                className={`form-select ${touched.status && errors.status ? 'has-error' : ''}`}
                                value={formData.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            {touched.status && errors.status && (
                                <span className="error-feedback">⚠️ {errors.status}</span>
                            )}
                        </div>
                    </div>

                    {/* GPA */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="student-gpa">
                            Cumulative GPA (0.00 - 4.00) <span className="required-star">*</span>
                        </label>
                        <input
                            type="number"
                            id="student-gpa"
                            name="gpa"
                            step="0.01"
                            min="0.00"
                            max="4.00"
                            className={`form-input ${touched.gpa && errors.gpa ? 'has-error' : ''}`}
                            value={formData.gpa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.gpa && errors.gpa && (
                            <span className="error-feedback">⚠️ {errors.gpa}</span>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {isEditMode ? '💾 Save Changes' : '➕ Register Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
