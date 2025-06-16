import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Card Component
 *
 * Purpose:
 *   Provides a container with optional header, footer, and image/banner. Useful
 *   for presenting grouped content with consistent padding and shadow.
 *
 * Flexibility:
 *   - Optional `header`, `footer`, and `imageSrc`.
 *   - Control shadow depth via `elevation` (0-5).
 *   - Override styles with `className`.
 *
 * Accessibility:
 *   - Image includes `alt` text; header/footer are semantic divs.
 *
 * Dynamic Features:
 *   - Elevation maps to Tailwind shadow classes for easy customization.
 */
export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: 'elevation' | 'outlined';
  className?: string;
  children?: React.ReactNode;
}

const elevationMap = [
  'shadow-none',
  'shadow-sm',
  'shadow',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
];

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  imageSrc,
  imageAlt,
  elevation = 1,
  variant = 'elevation',
  className,
  children,
}) => {
  const style =
    variant === 'outlined'
      ? 'border border-gray-200'
      : elevationMap[elevation];

  return (
    <div className={twMerge('bg-white rounded-md overflow-hidden', style, className)}>
      {imageSrc && (
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
      )}
      {header && <div className="px-4 py-2 border-b">{header}</div>}
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-2 border-t">{footer}</div>}
    </div>
  );
};

export default Card;

/**
 * Usage Example:
 * ```tsx
 * <Card
 *   header={<h3 className="text-lg font-semibold">Title</h3>}
 *   footer={<Button>Action</Button>}
 *   imageSrc="/banner.jpg"
 *   elevation={3}
 * >
 *   Body content
 * </Card>
 * ```
 */
