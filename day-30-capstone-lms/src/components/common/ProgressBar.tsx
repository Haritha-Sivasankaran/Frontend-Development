import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = true,
  size = 'md'
}) => {
  const clampedProgress = Math.min(Math.max(Math.round(progress), 0), 100);
  const isComplete = clampedProgress === 100;

  const height = size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px';

  return (
    <div className="progress-track-wrapper">
      {showLabel && (
        <div className="progress-track-labels">
          <span>{isComplete ? 'Completed 🎉' : 'Course Progress'}</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div className="progress-bar-bg" style={{ height }}>
        <div
          className={`progress-bar-fill ${isComplete ? 'completed' : ''}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
