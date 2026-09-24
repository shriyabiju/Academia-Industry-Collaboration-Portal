import React from 'react'
import clsx from 'clsx'
import Button from './Button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void; variant?: 'primary' | 'outline' }
  secondaryAction?: { label: string; onClick: () => void }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { py: 'py-10', icon: 'w-10 h-10', title: 'text-sm', desc: 'text-xs' },
  md: { py: 'py-16', icon: 'w-12 h-12', title: 'text-base', desc: 'text-sm' },
  lg: { py: 'py-20', icon: 'w-16 h-16', title: 'text-lg',  desc: 'text-sm' },
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className,
}: EmptyStateProps) {
  const s = sizes[size]

  return (
    <div className={clsx('empty-state px-8', s.py, className)}>
      {icon && (
        <div className={clsx(
          s.icon,
          'rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-5 mx-auto',
        )}>
          {icon}
        </div>
      )}
      <h3 className={clsx('font-semibold text-gray-700', s.title)}>{title}</h3>
      {description && (
        <p className={clsx('text-gray-400 mt-1.5 max-w-xs mx-auto leading-relaxed', s.desc)}>
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
          {action && (
            <Button variant={action.variant ?? 'primary'} size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
