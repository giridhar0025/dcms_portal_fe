import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
}

const baseInputClasses =
  'block w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
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
  }
);

Input.displayName = 'Input';
export default Input;
