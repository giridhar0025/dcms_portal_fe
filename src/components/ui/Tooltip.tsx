import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Tooltip Component
 *
 * Purpose:
 *   Wraps elements to show a tooltip on hover or focus. Supports configurable
 *   delay and placement with smooth opacity animations.
 *
 * Flexibility:
 *   - Accept any ReactNode as content.
 *   - Customize placement and delay.
 *   - Override styles using `className` and `contentClassName`.
 *
 * Accessibility:
 *   - Uses `role="tooltip"` and is focusable through keyboard.
 *
 * Dynamic Features:
 *   - Delay showing/hiding using setTimeout.
 *   - Positions using CSS transforms relative to the trigger.
 */
export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  contentClassName?: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  delay = 200,
  className,
  contentClassName,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLElement>(null);

  const show = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timeout.current);
    setVisible(false);
  };

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  } as const;

  return (
    <span className={twMerge('relative inline-flex', className)}
      ref={triggerRef as any}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={twMerge(
            'absolute z-20 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 animate-fade-in',
            positions[placement],
            contentClassName
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;

/**
 * Usage Example:
 * ```tsx
 * <Tooltip content="More info" placement="right">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
