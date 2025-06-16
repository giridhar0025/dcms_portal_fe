import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium';
  className?: string;
}

const colorBg = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-sky-600',
  warning: 'bg-yellow-500',
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onChange,
      color = 'primary',
      size = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = useState(false);
    const isChecked = typeof checked === 'boolean' ? checked : internal;
    const width = size === 'small' ? 'w-9' : 'w-11';
    const height = size === 'small' ? 'h-5' : 'h-6';
    const knobSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
    const knobTranslate = size === 'small'
      ? isChecked ? 'translate-x-4' : 'translate-x-0'
      : isChecked ? 'translate-x-5' : 'translate-x-0';

    const toggle = () => {
      const next = !isChecked;
      if (checked === undefined) {
        setInternal(next);
      }
      onChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={twMerge(
          'relative rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          isChecked ? colorBg[color] : 'bg-gray-200',
          width,
          height,
          className
        )}
        aria-pressed={isChecked}
        {...props}
      >
        <span
          className={twMerge(
            'absolute left-0 top-0 transition-transform bg-white rounded-full',
            knobSize,
            knobTranslate
          )}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';

export default Switch;
