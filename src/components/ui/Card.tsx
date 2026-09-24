import React from 'react'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  border?: boolean
  /** Adds a coloured left-border accent */
  accent?: 'indigo' | 'green' | 'amber' | 'blue' | 'purple' | 'red'
  /** Subtle gradient-tinted background */
  tint?: 'indigo' | 'green' | 'amber' | 'blue' | 'purple'
  onClick?: () => void
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

const accents = {
  indigo: 'border-l-4 border-l-indigo-500',
  green:  'border-l-4 border-l-green-500',
  amber:  'border-l-4 border-l-amber-400',
  blue:   'border-l-4 border-l-blue-500',
  purple: 'border-l-4 border-l-purple-500',
  red:    'border-l-4 border-l-red-400',
}

const tints = {
  indigo: 'bg-indigo-50/30',
  green:  'bg-green-50/30',
  amber:  'bg-amber-50/30',
  blue:   'bg-blue-50/30',
  purple: 'bg-purple-50/30',
}

export default function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  border = true,
  accent,
  tint,
  onClick,
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-card',
        border && 'border border-gray-100',
        hover && 'card-interactive',
        accent && accents[accent],
        tint && tints[tint],
        paddings[padding],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
