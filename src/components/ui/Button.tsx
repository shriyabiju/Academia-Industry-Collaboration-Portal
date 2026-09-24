'use client'
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  /** Icon-only mode — makes it square */
  iconOnly?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconOnly = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = clsx(
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transition-all duration-150 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'select-none',
    // lift on hover (not when disabled)
    !disabled && !loading && 'hover:-translate-y-px active:translate-y-0',
  )

  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500 shadow-sm hover:shadow-md',
    secondary:
      'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-400',
    outline:
      'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-indigo-400',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm hover:shadow-md',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm hover:shadow-md',
  }

  const sizes = {
    xs: iconOnly ? 'p-1.5 text-xs'         : 'px-2.5 py-1 text-xs gap-1',
    sm: iconOnly ? 'p-2 text-sm'            : 'px-3.5 py-1.5 text-xs gap-1.5',
    md: iconOnly ? 'p-2.5 text-sm'          : 'px-4 py-2 text-sm gap-2',
    lg: iconOnly ? 'p-3 text-base'          : 'px-6 py-2.5 text-sm gap-2',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-3.5 w-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
