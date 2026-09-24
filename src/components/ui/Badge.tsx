import React from 'react'
import clsx from 'clsx'

type Variant =
  | 'default' | 'success' | 'warning' | 'danger' | 'info'
  | 'purple'  | 'indigo'  | 'blue'    | 'teal'   | 'pink'

interface BadgeProps {
  variant?: Variant
  size?: 'xs' | 'sm' | 'md'
  dot?: boolean
  children: React.ReactNode
  className?: string
  /** Outline style instead of filled */
  outline?: boolean
}

const filled: Record<Variant, string> = {
  default: 'bg-gray-100 text-gray-600',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger:  'bg-red-50 text-red-600',
  info:    'bg-sky-50 text-sky-700',
  purple:  'bg-purple-50 text-purple-700',
  indigo:  'bg-indigo-50 text-indigo-700',
  blue:    'bg-blue-50 text-blue-700',
  teal:    'bg-teal-50 text-teal-700',
  pink:    'bg-pink-50 text-pink-700',
}

const outlined: Record<Variant, string> = {
  default: 'border border-gray-200 text-gray-600',
  success: 'border border-emerald-200 text-emerald-700',
  warning: 'border border-amber-200 text-amber-700',
  danger:  'border border-red-200 text-red-600',
  info:    'border border-sky-200 text-sky-700',
  purple:  'border border-purple-200 text-purple-700',
  indigo:  'border border-indigo-200 text-indigo-700',
  blue:    'border border-blue-200 text-blue-700',
  teal:    'border border-teal-200 text-teal-700',
  pink:    'border border-pink-200 text-pink-700',
}

const dotColors: Record<Variant, string> = {
  default: 'bg-gray-400',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  info:    'bg-sky-500',
  purple:  'bg-purple-500',
  indigo:  'bg-indigo-500',
  blue:    'bg-blue-500',
  teal:    'bg-teal-500',
  pink:    'bg-pink-500',
}

const sizes = {
  xs: 'px-1.5 py-px text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export default function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  outline = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full leading-none',
        outline ? outlined[variant] : filled[variant],
        sizes[size],
        className,
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}
