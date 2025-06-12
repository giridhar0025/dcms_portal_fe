import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Input Component
 *
 * Purpose:
 *   Provides a styled text input with label, helper text, error display, and
 *   optional icons. Supports various input types and dynamic validation states.
 *
 * Flexibility:
 *   - Customize appearance using `className` and icon props.
 *   - Provide custom label or helper as strings or React nodes.
 *   - Pass any native input attributes via rest props.
 *
 * Accessibility:
 *   - Associates label using `htmlFor` and `id` props.
 *   - Error message is linked via `aria-describedby` when present.
 *
 * Dynamic Features:
 *   - Applies error styling when `error` is provided.
 *   - Supports disabled and readOnly states; icons are optionally clickable.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text or node */
  label?: React.ReactNode;
  /** Helper text below the input */
  helperText?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  /** Trailing icon */
  trailingIcon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const baseInputClasses =
  'block w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50';

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leadingIcon,
  trailingIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || React.useId();
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leadingIcon && <span className="absolute left-3">{leadingIcon}</span>}
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={twMerge(
            baseInputClasses,
            leadingIcon && 'pl-9',
            trailingIcon && 'pr-9',
            error
              ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        {trailingIcon && <span className="absolute right-3">{trailingIcon}</span>}
      </div>
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

/**
 * Usage Example:
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   leadingIcon={<MailIcon />}
 *   error={form.errors.email}
 * />
 * ```
 */
