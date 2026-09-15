import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  submessage?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading Courses...',
  submessage = 'Connecting to catalog microservice'
}) => {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner-circle"></div>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gray-800)' }}>
          {message}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
          {submessage}
        </p>
      </div>
    </div>
  );
};
