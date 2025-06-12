import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Dropdown Component
 *
 * Purpose:
 *   Provides a popover menu that is keyboard navigable and auto positions
 *   relative to a trigger element.
 *
 * Flexibility:
 *   - Trigger rendered via render prop to allow custom elements.
 *   - Items array drives menu content; each item can be disabled.
 *   - Placement and offset customize positioning.
 *   - Override styles via `className`, `itemClassName`, `menuClassName`.
 *
 * Accessibility:
 *   - Uses ARIA roles `menu` and `menuitem` with keyboard navigation.
 *   - Supports arrow key navigation and closes on Escape.
 *
 * Dynamic Features:
 *   - Animates in/out using Tailwind transitions.
 */
export interface DropdownItem {
  key: string;
  label: React.ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: (props: {
    ref: React.Ref<any>;
    onClick: () => void;
    'aria-expanded': boolean;
  }) => React.ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  offset?: number;
  className?: string;
  itemClassName?: string;
  menuClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  offset = 4,
  className,
  itemClassName,
  menuClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => (h + 1) % items.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => (h - 1 + items.length) % items.length);
      }
      if (e.key === 'Enter' && highlight >= 0) {
        items[highlight]?.onSelect();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, highlight, items]);

  useEffect(() => {
    if (open) {
      const click = (e: MouseEvent) => {
        if (!menuRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', click);
      return () => document.removeEventListener('click', click);
    }
  }, [open]);

  const menuPosition = placement.startsWith('top') ? 'bottom-full' : 'top-full';
  const align = placement.endsWith('end') ? 'right-0' : 'left-0';
  const offsetClass = placement.startsWith('top') ? `-mb-${offset}` : `mt-${offset}`;

  return (
    <div className={twMerge('relative inline-block', className)}>
      {trigger({ ref: buttonRef, onClick: () => setOpen((o) => !o), 'aria-expanded': open })}
      {open && (
        <ul
          ref={menuRef}
          role="menu"
          className={twMerge(
            'absolute z-10 min-w-max bg-white border rounded shadow-lg focus:outline-none transition-transform origin-top-left',
            menuPosition,
            align,
            offsetClass,
            menuClassName
          )}
        >
          {items.map((item, idx) => (
            <li
              key={item.key}
              role="menuitem"
              aria-disabled={item.disabled}
              className={twMerge(
                'px-4 py-2 cursor-pointer focus:bg-gray-100',
                highlight === idx && 'bg-gray-100',
                item.disabled && 'opacity-50 cursor-not-allowed',
                itemClassName
              )}
              onClick={() => {
                if (!item.disabled) {
                  item.onSelect();
                  setOpen(false);
                }
              }}
              onMouseEnter={() => setHighlight(idx)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

/**
 * Usage Example:
 * ```tsx
 * <Dropdown
 *   trigger={({ onClick, ref }) => (
 *     <Button ref={ref as any} onClick={onClick}>Options</Button>
 *   )}
 *   items={[{ key: '1', label: 'Edit', onSelect: () => {} }]}
 * />
 * ```
 */
