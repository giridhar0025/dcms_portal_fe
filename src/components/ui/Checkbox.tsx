import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium';
  className?: string;
}

const colorRing = {
  primary: 'text-blue-600 focus:ring-blue-500',
  secondary: 'text-gray-600 focus:ring-gray-500',
  success: 'text-green-600 focus:ring-green-500',
  error: 'text-red-600 focus:ring-red-500',
  info: 'text-sky-600 focus:ring-sky-500',
  warning: 'text-yellow-600 focus:ring-yellow-500',
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, color = 'primary', size = 'medium', className, id, ...props },
    ref
  ) => {
    const inputId = id || React.useId();
    return (
      <label className="inline-flex items-center space-x-2" htmlFor={inputId}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          className={twMerge(
            'rounded border-gray-300 focus:outline-none focus:ring-2',
            size === 'small' ? 'h-4 w-4' : 'h-5 w-5',
            colorRing[color],
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
