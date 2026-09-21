import React from 'react'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  border?: boolean
}

export default function Card({
  children,
  className,
  padding = 'md',
  hover = false,
  border = true,
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm',
        border && 'border border-gray-100',
        hover && 'transition-shadow duration-200 hover:shadow-md cursor-pointer',
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}
