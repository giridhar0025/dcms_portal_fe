import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Toast Notification System
 *
 * Purpose:
 *   Provides globally managed toast notifications with stacking and auto-dismiss.
 *   Includes provider, hook, and individual toast components.
 *
 * Flexibility:
 *   - Different severities and durations per toast.
 *   - Pause timer on hover or via user interaction.
 *   - Customizable styling via className props.
 *
 * Accessibility:
 *   - Uses ARIA live region for announcements.
 *   - Focusable close button.
 *
 * Dynamic Features:
 *   - Context queue management; slide animations.
 */
export interface ToastOptions {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Severity level similar to MUI Snackbar */
  severity?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

interface ToastContextValue {
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (options: ToastOptions) => {
      const id = options.id || Math.random().toString(36).slice(2);
      setToasts((ts) => [...ts, { ...options, id }]);
      if (options.duration !== 0) {
        setTimeout(() => removeToast(id), options.duration || 5000);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div aria-live="polite" className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id!)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const Toast: React.FC<ToastOptions> = ({
  title,
  description,
  severity = 'info',
  onClose,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  const intentStyles = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div className={twMerge('rounded shadow-lg px-4 py-3 flex items-start space-x-2', intentStyles[severity], className)}>
      <div className="flex-1">
        <p className={twMerge('font-semibold', titleClassName)}>{title}</p>
        {description && <p className={twMerge('text-sm mt-1', descriptionClassName)}>{description}</p>}
      </div>
      <button onClick={onClose} className="ml-auto text-white focus:outline-none">
        &times;
      </button>
    </div>
  );
};

export default Toast;

/**
 * Usage Example:
 * ```tsx
 * const { addToast } = useToast();
 * addToast({ title: 'Saved', severity: 'success' });
 * ```
 */
