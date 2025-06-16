import React, { ElementType, forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Button Component
 *
 * Purpose:
 *   Provides a flexible button element that can render as different HTML tags
 *   or custom components. Handles disabled states, loading indicators, and
 *   optional icons. Supports full-width layout and multiple visual variants.
 *
 * Flexibility:
 *   - Render as a button, anchor, or any custom element via the `as` prop.
 *   - Override styles using `className` or supply additional props like
 *     `aria-*` or `data-*` attributes.
 *   - Customize appearance with `variant`, `size`, and placement of icons.
 *
 * Accessibility:
 *   - Uses appropriate ARIA attributes for disabled state.
 *   - Keyboard focus is preserved when using as="button" or anchor tags.
 *
 * Dynamic Features:
 *   - Displays a spinner when `loading` is true and disables interactions.
 *   - Adjusts layout for full width vs inline.
 */

export interface ButtonProps<T extends ElementType = 'button'> {
  children?: React.ReactNode;
  /** Visual style variant */
  variant?: 'contained' | 'outlined' | 'text';
  /** Color palette */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  /** Size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Icon placed to the left of children */
  leftIcon?: ReactNode;
  /** Icon placed to the right of children */
  rightIcon?: ReactNode;
  /** Shows loading spinner and disables button */
  loading?: boolean;
  /** Expands button to full width */
  fullWidth?: boolean;
  /** Render as another element */
  as?: T;
  /** Additional class name overrides */
  className?: string;
  disabled?: boolean;
}

const colorMap = {
  primary: {
    contained: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outlined:
      'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  },
  secondary: {
    contained:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outlined:
      'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    text: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
  },
  success: {
    contained:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outlined:
      'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    text: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
  },
  error: {
    contained: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outlined:
      'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    text: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
  },
  info: {
    contained: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500',
    outlined:
      'border border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500',
    text: 'text-sky-600 hover:bg-sky-50 focus:ring-sky-500',
  },
  warning: {
    contained:
      'bg-yellow-600 text-black hover:bg-yellow-700 focus:ring-yellow-500',
    outlined:
      'border border-yellow-600 text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500',
    text: 'text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500',
  },
} as const;

const sizeStyles = {
  small: 'text-xs px-2.5 py-1.5',
  medium: 'text-sm px-4 py-2',
  large: 'text-base px-5 py-3',
};

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      leftIcon,
      rightIcon,
      loading,
      fullWidth,
      as,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || 'button';
    const disabled = loading || (props as any).disabled;

    return (
      <Component
        ref={ref as any}
        className={twMerge(
          'inline-flex items-center justify-center border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
          colorMap[color][variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : 'inline-flex',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);
Button.displayName = 'Button';

export default Button;

/**
 * Usage Example:
 *
 * ```tsx
 * <Button variant="contained" color="primary" size="medium" onClick={() => alert('Clicked!')}>
 *   Submit
 * </Button>
 *
 * <Button
 *   as="a"
 *   href="/"
 *   variant="outlined"
 *   leftIcon={<IconHome />}
 *   fullWidth
 * >
 *   Go Home
 * </Button>
 * ```
 */
