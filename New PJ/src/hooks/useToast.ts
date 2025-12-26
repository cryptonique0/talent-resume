import { useState, useCallback, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

/**
 * Hook for managing toast notifications
 */
// Global toast store (module-level singleton)
const toastStore: Toast[] = [];
const subscribers = new Set<(t: Toast[]) => void>();

const notifySubscribers = () => {
  subscribers.forEach((cb) => cb([...toastStore]));
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>(toastStore);

  useEffect(() => {
    const subscriber = (t: Toast[]) => setToasts(t);
    subscribers.add(subscriber);
    // Initialize with current store
    setToasts([...toastStore]);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: Toast = { id, message, type, duration };

      toastStore.push(toast);
      notifySubscribers();

      if (duration > 0) {
        setTimeout(() => {
          // Auto-remove by id
          const idx = toastStore.findIndex((t) => t.id === id);
          if (idx !== -1) {
            toastStore.splice(idx, 1);
            notifySubscribers();
          }
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    const idx = toastStore.findIndex((t) => t.id === id);
    if (idx !== -1) {
      toastStore.splice(idx, 1);
      notifySubscribers();
    }
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, 'success', duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, 'error', duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addToast(message, 'warning', duration),
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};

export default useToast;
