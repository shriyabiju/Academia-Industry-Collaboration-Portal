'use client'
import React, { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import clsx from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  message?: string
  duration?: number
}

interface ToastContextValue {
  toast: (variant: ToastVariant, title: string, message?: string, duration?: number) => void
  success: (title: string, message?: string) => void
  error:   (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info:    (title: string, message?: string) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

const styles: Record<ToastVariant, { wrap: string; icon: string; dot: string }> = {
  success: {
    wrap: 'bg-white border border-emerald-200 shadow-card-md',
    icon: 'text-emerald-500',
    dot:  'bg-emerald-500',
  },
  error: {
    wrap: 'bg-white border border-red-200 shadow-card-md',
    icon: 'text-red-500',
    dot:  'bg-red-500',
  },
  warning: {
    wrap: 'bg-white border border-amber-200 shadow-card-md',
    icon: 'text-amber-500',
    dot:  'bg-amber-500',
  },
  info: {
    wrap: 'bg-white border border-sky-200 shadow-card-md',
    icon: 'text-sky-500',
    dot:  'bg-sky-500',
  },
}

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error:   <XCircle     size={18} />,
  warning: <AlertTriangle size={18} />,
  info:    <Info         size={18} />,
}

function SingleToast({
  item,
  onClose,
}: {
  item: ToastItem
  onClose: (id: string) => void
}) {
  const [exiting, setExiting] = useState(false)
  const s = styles[item.variant]

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onClose(item.id), 280)
  }, [item.id, onClose])

  useEffect(() => {
    const t = setTimeout(dismiss, item.duration ?? 4500)
    return () => clearTimeout(t)
  }, [dismiss, item.duration])

  return (
    <div
      role="alert"
      className={clsx(
        'flex items-start gap-3 px-4 py-3 rounded-2xl max-w-sm w-full pointer-events-auto',
        s.wrap,
        exiting ? 'animate-slide-out-right' : 'animate-slide-in-right',
      )}
    >
      {/* Left dot */}
      <div className={clsx('mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0', s.dot)} />

      {/* Icon */}
      <div className={clsx('flex-shrink-0 mt-0.5', s.icon)}>{icons[item.variant]}</div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
        {item.message && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.message}</p>
        )}
      </div>

      {/* Close */}
      <button
        onClick={dismiss}
        className="flex-shrink-0 mt-0.5 text-gray-400 hover:text-gray-700 transition-colors rounded-md"
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>
    </div>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((
    variant: ToastVariant,
    title: string,
    message?: string,
    duration?: number,
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setToasts((prev) => [...prev.slice(-4), { id, variant, title, message, duration }])
  }, [])

  const success = useCallback((t: string, m?: string) => toast('success', t, m), [toast])
  const error   = useCallback((t: string, m?: string) => toast('error',   t, m), [toast])
  const warning = useCallback((t: string, m?: string) => toast('warning', t, m), [toast])
  const info    = useCallback((t: string, m?: string) => toast('info',    t, m), [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none"
        >
          {toasts.map((item) => (
            <SingleToast key={item.id} item={item} onClose={remove} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}
