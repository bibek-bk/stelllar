import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastOptions, Toast, ToastContextValue, ToastContext } from '../hooks/useToast';

const MAX_TOASTS = 4;
const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const handle = timeoutsRef.current[id];
    if (handle) {
      window.clearTimeout(handle);
      delete timeoutsRef.current[id];
    }
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const show = useCallback((opts: ToastOptions) => {
    const id = opts.id ?? crypto.randomUUID();
    const toast: Toast = {
      id,
      title: opts.title ?? '',
      description: opts.description ?? '',
      variant: opts.variant ?? 'info',
      durationMs: opts.durationMs ?? DEFAULT_DURATION,
      isExiting: false,
    } as Toast;

    setToasts((prev) => {
      const next = [toast, ...prev].slice(0, MAX_TOASTS);
      return next;
    });

    const timeout = window.setTimeout(() => dismiss(id), toast.durationMs);
    timeoutsRef.current[id] = timeout;
    return id;
  }, [dismiss]);

  const success = useCallback((title: string, description?: string, opts?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) => show({ title, description, variant: 'success', ...(opts ?? {}) }), [show]);
  const error = useCallback((title: string, description?: string, opts?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) => show({ title, description, variant: 'error', ...(opts ?? {}) }), [show]);

  const value = useMemo<ToastContextValue>(() => ({ show, dismiss, success, error }), [show, dismiss, success, error]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-16px);
          }
        }

        .toast-enter {
          animation: slideInUp 0.3s ease-out;
        }

        .toast-exit {
          animation: slideOutUp 0.3s ease-out forwards;
        }
      `}</style>
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  const container = document.getElementById('toast-root') || document.body;
  return createPortal(
    <div className="fixed z-[100] top-4 right-4 sm:right-8 flex flex-col gap-3 w-[min(92vw,380px)]">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>,
    container
  );
}

function variantClasses(variant: 'success' | 'error' | 'info' | 'warning') {
  switch (variant) {
    case 'success':
      return 'border-green-500/40 bg-green-500/10 text-green-200';
    case 'error':
      return 'border-red-500/40 bg-red-500/10 text-red-200';
    case 'warning':
      return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-200';
    default:
      return 'border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-foreground)]';
  }
}

function ToastCard({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const { title, description, variant, isExiting } = toast;

  const handleDismiss = () => {
    onDismiss();
  };

  return (
    <div
      className={`w-full border rounded-xl shadow-lg px-4 py-3 backdrop-blur-md ${variantClasses(variant)} ${!isExiting ? 'toast-enter' : 'toast-exit'}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {title ? <div className="font-semibold truncate">{title}</div> : null}
          {description ? <div className="text-sm opacity-90 break-words">{description}</div> : null}
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          className="shrink-0 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
          onClick={handleDismiss}
        >
          ✕
        </button>
      </div>
    </div>
  );
}