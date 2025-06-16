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
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'standard' | 'dot';
  shape?: 'pill' | 'circle';
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

const colorStyles = {
  default: 'bg-gray-200 text-gray-900',
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-sky-600 text-white',
  warning: 'bg-yellow-600 text-black',
};

export const Badge: React.FC<BadgeProps> = ({
  color = 'default',
  variant = 'standard',
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
        colorStyles[color],
        shapeClass,
        className
      )}
    >
      {variant === 'dot' ? (
        <span className="sr-only">{children}</span>
      ) : typeof count === 'number' ? (
        count
      ) : (
        children
      )}
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
