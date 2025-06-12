import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

/**
 * Modal Component
 *
 * Purpose:
 *   Provides an accessible dialog that traps focus and prevents body scroll.
 *   Supports animations and customizable size. Contains Header, Body, and Footer
 *   subcomponents for flexible composition.
 *
 * Flexibility:
 *   - Control visibility with `isOpen` and `onClose`.
 *   - Override styling via `className`, `overlayClassName`, and
 *     `contentClassName`.
 *   - Adjust width with predefined sizes or custom strings.
 *
 * Accessibility:
 *   - Uses ARIA roles `dialog` and `aria-modal`.
 *   - Closes on ESC key and optionally on backdrop click.
 *   - Focus is trapped within the modal while open.
 *
 * Dynamic Features:
 *   - Animates open/close using Tailwind data-state attributes.
 *   - Uses React Portal to render to document body.
 */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal requests to close */
  onClose: () => void;
  /** Preset size or custom width */
  size?: 'sm' | 'md' | 'lg' | string;
  /** Allow closing on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Class overrides */
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

export const ModalHeader: React.FC<{ className?: string }> = ({
  className,
  children,
}) => (
  <div className={twMerge('px-6 py-4 border-b', className)}>{children}</div>
);

export const ModalBody: React.FC<{ className?: string }> = ({
  className,
  children,
}) => (
  <div className={twMerge('px-6 py-4', className)}>{children}</div>
);

export const ModalFooter: React.FC<{ className?: string }> = ({
  className,
  children,
}) => (
  <div className={twMerge('px-6 py-4 border-t', className)}>{children}</div>
);

export const Modal: React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnBackdropClick = true,
  className,
  overlayClassName,
  contentClassName,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const focusable = overlayRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      previousActive?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // trigger animation on open after mount
    if (isOpen && firstRender.current && overlayRef.current) {
      requestAnimationFrame(() => {
        overlayRef.current?.setAttribute('data-state', 'open');
        firstRender.current = false;
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses =
    size === 'sm'
      ? 'max-w-sm'
      : size === 'md'
      ? 'max-w-md'
      : size === 'lg'
      ? 'max-w-lg'
      : typeof size === 'string'
      ? size
      : 'max-w-md';

  const modal = (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current && closeOnBackdropClick) onClose();
      }}
      data-state="closed"
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        overlayClassName
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={twMerge(
          'bg-white rounded shadow-lg w-full transform data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
          widthClasses,
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

/**
 * Usage Example:
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
 *   <Modal.Header>Title</Modal.Header>
 *   <Modal.Body>Content</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
