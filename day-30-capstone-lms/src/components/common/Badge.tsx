import React from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  icon
}) => {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
