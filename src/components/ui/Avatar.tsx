import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Avatar Component
 *
 * Purpose:
 *   Displays a user avatar image with fallback initials and status indicator.
 *
 * Flexibility:
 *   - Control size via preset strings or numeric pixel values.
 *   - Override styling with `className`.
 *   - Status dot can indicate online/offline/away.
 *
 * Accessibility:
 *   - Includes `alt` text for the image.
 *
 * Dynamic Features:
 *   - Generates initials from `alt` when image fails to load.
 */
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const sizeMap: Record<string, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  status,
  className,
}) => {
  const [error, setError] = useState(false);
  const initials = alt
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  const sizeClass = typeof size === 'number' ? undefined : sizeMap[size];
  const customSizeStyle = typeof size === 'number' ? { width: size, height: size } : undefined;

  const statusColor = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-400',
  }[status || 'offline'];

  return (
    <span className={twMerge('relative inline-flex', className)} style={customSizeStyle}>
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={twMerge('rounded-full object-cover', sizeClass)}
          style={customSizeStyle}
        />
      ) : (
        <span
          className={twMerge(
            'flex items-center justify-center rounded-full bg-gray-200 text-gray-600',
            sizeClass
          )}
          style={customSizeStyle}
        >
          {initials}
        </span>
      )}
      {status && (
        <span
          className={twMerge(
            'absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white',
            statusColor
          )}
        />
      )}
    </span>
  );
};

export default Avatar;

/**
 * Usage Example:
 * ```tsx
 * <Avatar src="/me.jpg" alt="Jane Doe" status="online" />
 * <Avatar alt="John Smith" size={32} />
 * ```
 */
