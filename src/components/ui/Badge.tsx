import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Badge Component
 *
 * Purpose:
 *   Displays a small status label or count with color variants and shapes.
 *
 * Flexibility:
 *   - Choose variant colors and shape styles.
 *   - Display a count for dot badges.
 *   - Override styling via `className`.
 *
 * Accessibility:
 *   - Presents textual content for screen readers.
 *
 * Dynamic Features:
 *   - Variants map to Tailwind classes via configuration.
 */
export interface BadgeProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  shape?: 'pill' | 'circle';
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  default: 'bg-gray-200 text-gray-900',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  shape = 'pill',
  count,
  className,
  children,
}) => {
  const shapeClass = shape === 'circle' ? 'rounded-full px-2 py-1' : 'rounded-full px-3 py-1';
  return (
    <span
      className={twMerge(
        'inline-flex items-center text-xs font-medium',
        variantStyles[variant],
        shapeClass,
        className
      )}
    >
      {typeof count === 'number' ? count : children}
    </span>
  );
};

export default Badge;

/**
 * Usage Example:
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger" shape="circle" count={3} />
 * ```
 */
