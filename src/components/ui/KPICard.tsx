import React from 'react'
import clsx from 'clsx'
import Card from './Card'

interface KPICardProps {
  title: string
  value: React.ReactNode
  subtitle?: string
  icon?: React.ReactNode
  trend?: { value: number; label: string; positive?: boolean }
  color?: 'indigo' | 'green' | 'amber' | 'blue' | 'purple' | 'red'
  className?: string
  /** Show left accent border */
  accentBorder?: boolean
  onClick?: () => void
}

const colorMap = {
  indigo: { icon: 'bg-indigo-50 text-indigo-600', value: 'text-indigo-600', accent: 'indigo' as const },
  green:  { icon: 'bg-emerald-50 text-emerald-600', value: 'text-emerald-600', accent: 'green' as const },
  amber:  { icon: 'bg-amber-50 text-amber-600', value: 'text-amber-600', accent: 'amber' as const },
  blue:   { icon: 'bg-blue-50 text-blue-600', value: 'text-blue-600', accent: 'blue' as const },
  purple: { icon: 'bg-purple-50 text-purple-600', value: 'text-purple-600', accent: 'purple' as const },
  red:    { icon: 'bg-red-50 text-red-600', value: 'text-red-600', accent: 'red' as const },
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'indigo',
  accentBorder = true,
  onClick,
  className,
}: KPICardProps) {
  const c = colorMap[color]

  // Determine if trend is positive (default: positive if value >= 0)
  const isPositive = trend
    ? (trend.positive !== undefined ? trend.positive : trend.value >= 0)
    : true

  return (
    <Card
      className={clsx(
        'relative overflow-hidden',
        onClick && 'card-interactive',
        className,
      )}
      accent={accentBorder ? c.accent : undefined}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">{title}</p>
          <p className={clsx('text-3xl font-bold mt-1.5 tabular leading-none', c.value)}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{subtitle}</p>
          )}
          {trend && (
            <p className={clsx('text-xs font-semibold mt-2 flex items-center gap-1',
              isPositive ? 'text-emerald-600' : 'text-red-500',
            )}>
              <span>{isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="font-normal text-gray-400">{trend.label}</span>
            </p>
          )}
        </div>
        {icon && (
          <div className={clsx('flex-shrink-0 p-2.5 rounded-xl', c.icon)}>
            {icon}
          </div>
        )}
      </div>

      {/* Subtle background decorative circle */}
      <div className={clsx(
        'absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-[0.06]',
        `bg-${color}-500`,
      )} />
    </Card>
  )
}
