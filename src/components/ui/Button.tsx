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
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
}

const baseStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 focus:ring-blue-500',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-100 focus:ring-gray-400',
  outline:
    'border border-gray-300 text-gray-900 hover:bg-gray-50 disabled:bg-transparent',
  ghost: 'text-gray-900 hover:bg-gray-100 disabled:text-gray-400',
};

const sizeStyles = {
  xs: 'text-xs px-2.5 py-1.5',
  sm: 'text-sm px-3 py-2',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-3',
};

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
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
          baseStyles[variant],
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
 * <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
 *   Submit
 * </Button>
 *
 * <Button
 *   as="a"
 *   href="/"
 *   variant="outline"
 *   leftIcon={<IconHome />}
 *   fullWidth
 * >
 *   Go Home
 * </Button>
 * ```
 */
