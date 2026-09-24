import React from 'react'
import clsx from 'clsx'

interface PageHeaderProps {
  /** Eyebrow label above the title */
  eyebrow?: string
  title: string | React.ReactNode
  subtitle?: string
  /** Right-aligned actions */
  actions?: React.ReactNode
  /** Optional breadcrumb / back element */
  breadcrumb?: React.ReactNode
  className?: string
  /** Make the header area visually heavier */
  hero?: boolean
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  breadcrumb,
  className,
  hero = false,
}: PageHeaderProps) {
  return (
    <div className={clsx(
      'flex flex-col gap-1',
      hero ? 'pb-6 mb-2 border-b border-gray-100' : '',
      className,
    )}>
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              {eyebrow}
            </p>
          )}
          <h1 className={clsx(
            'font-bold text-gray-900 tracking-tight leading-tight',
            hero ? 'text-3xl' : 'text-2xl',
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
