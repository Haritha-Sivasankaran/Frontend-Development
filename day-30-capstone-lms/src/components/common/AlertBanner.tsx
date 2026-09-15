import React from 'react';

interface AlertBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title = 'Service Interruption',
  message,
  onRetry
}) => {
  return (
    <div className="error-banner" role="alert">
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠️</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary btn-sm" onClick={onRetry}>
          🔄 Retry Connection
        </button>
      )}
    </div>
  );
};
