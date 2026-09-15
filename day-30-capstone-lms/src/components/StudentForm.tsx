import React, { useState } from 'react';
import { CourseCategory, StudentRegistrationInput, ValidationErrors } from '../types';
import { CATEGORIES } from '../services/api';

interface StudentFormProps {
  onRegister: (data: StudentRegistrationInput) => void;
  isSubmitting?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  onRegister,
  isSubmitting = false
}) => {
  // Controlled Form State
  const [formData, setFormData] = useState<StudentRegistrationInput>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    interest: 'Web Development',
    githubUsername: ''
  });

  // Validation State
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Single field validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name can only contain alphabetic letters and spaces.';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required.';
        if (value.replace(/[^0-9]/g, '').length < 8) return 'Phone must contain at least 8 digits.';
        return '';

      case 'bio':
        if (!value.trim()) return 'Brief bio is required.';
        if (value.trim().length < 10) return 'Bio must be at least 10 characters describing your goals.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      bio: true,
      interest: true,
      githubUsername: true
    };
    setTouched(allTouched);

    // Validate all
    const newErrors: ValidationErrors = {};
    let hasError = false;

    (['name', 'email', 'phone', 'bio'] as const).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (hasError) return;

    onRegister(formData);
  };

  return (
    <div className="form-card-container">
      <h2 className="form-header-title">Student Registration</h2>
      <p className="form-header-sub">
        Create your personalized Ednue LMS learner account to unlock progress tracking, syllabus checklists, and verified completion certificates.
      </p>

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="input-group">
          <label className="input-label" htmlFor="reg-name">
            Full Name <span>*</span>
          </label>
          <input
            type="text"
            id="reg-name"
            name="name"
            className={`text-input ${touched.name && errors.name ? 'input-error' : ''}`}
            placeholder="e.g. Maya Lin"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
          {touched.name && errors.name && (
            <span className="field-error-msg">⚠️ {errors.name}</span>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="form-grid-2">
          <div className="input-group">
            <label className="input-label" htmlFor="reg-email">
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="reg-email"
              name="email"
              className={`text-input ${touched.email && errors.email ? 'input-error' : ''}`}
              placeholder="maya.lin@domain.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <span className="field-error-msg">⚠️ {errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-phone">
              Phone Number <span>*</span>
            </label>
            <input
              type="tel"
              id="reg-phone"
              name="phone"
              className={`text-input ${touched.phone && errors.phone ? 'input-error' : ''}`}
              placeholder="+1 555-0199"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && (
              <span className="field-error-msg">⚠️ {errors.phone}</span>
            )}
          </div>
        </div>

        {/* Primary Track Interest & GitHub */}
        <div className="form-grid-2">
          <div className="input-group">
            <label className="input-label" htmlFor="reg-interest">
              Primary Learning Track <span>*</span>
            </label>
            <select
              id="reg-interest"
              name="interest"
              className="select-input"
              value={formData.interest}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {CATEGORIES.map((cat: CourseCategory) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-github">
              GitHub Username (Optional)
            </label>
            <input
              type="text"
              id="reg-github"
              name="githubUsername"
              className="text-input"
              placeholder="e.g. octocat"
              value={formData.githubUsername}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="input-group">
          <label className="input-label" htmlFor="reg-bio">
            Brief Bio &amp; Career Aspirations <span>*</span>
          </label>
          <textarea
            id="reg-bio"
            name="bio"
            rows={3}
            className={`textarea-input ${touched.bio && errors.bio ? 'input-error' : ''}`}
            placeholder="Share your current experience and goals (min 10 characters)..."
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.bio && errors.bio && (
            <span className="field-error-msg">⚠️ {errors.bio}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isSubmitting}
          style={{ marginTop: '1rem' }}
        >
          {isSubmitting ? 'Creating Account...' : '🚀 Complete Student Registration'}
        </button>
      </form>
    </div>
  );
};
