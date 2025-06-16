import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  className?: string;
}

const baseInputClasses =
  'block w-full focus:outline-none focus:ring-2 disabled:bg-gray-50';

const variantClasses = {
  outlined: 'border rounded-md bg-white',
  filled: 'border border-transparent rounded-md bg-gray-50 focus:bg-white',
  standard: 'border-b rounded-none bg-transparent',
};

const colorRing = {
  primary: 'focus:ring-blue-500',
  secondary: 'focus:ring-gray-500',
  success: 'focus:ring-green-500',
  error: 'focus:ring-red-500',
  info: 'focus:ring-sky-500',
  warning: 'focus:ring-yellow-500',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      variant = 'outlined',
      size = 'medium',
      color = 'primary',
      className,
      id,
      ...props
    },
    ref
  ) => {
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
            ref={ref} // 🔥 This line is key for react-hook-form
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={twMerge(
              baseInputClasses,
              variantClasses[variant],
              size === 'small' ? 'text-sm px-2 py-1' : 'text-base px-3 py-2',
              leadingIcon && 'pl-9',
              trailingIcon && 'pr-9',
              colorRing[color],
              !error && variant !== 'filled' && 'border-gray-300',
              error &&
                'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500',
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
  }
);

Input.displayName = 'Input';
export default Input;
