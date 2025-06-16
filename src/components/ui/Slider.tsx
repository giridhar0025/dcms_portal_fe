import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium';
  className?: string;
}

const colorStyles = {
  primary: 'accent-blue-600',
  secondary: 'accent-gray-600',
  success: 'accent-green-600',
  error: 'accent-red-600',
  info: 'accent-sky-600',
  warning: 'accent-yellow-500',
};

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ color = 'primary', size = 'medium', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        className={twMerge(
          'w-full cursor-pointer',
          size === 'small' ? 'h-1' : 'h-2',
          colorStyles[color],
          className
        )}
        {...props}
      />
    );
  }
);
Slider.displayName = 'Slider';
export default Slider;
