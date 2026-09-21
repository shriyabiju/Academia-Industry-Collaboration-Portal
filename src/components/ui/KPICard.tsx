import React from 'react'
import clsx from 'clsx'
import Card from './Card'

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: { value: number; label: string }
  color?: 'indigo' | 'green' | 'amber' | 'blue' | 'purple'
  className?: string
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'indigo',
  className,
}: KPICardProps) {
  const colors = {
    indigo: { icon: 'bg-indigo-50 text-indigo-600', accent: 'text-indigo-600' },
    green: { icon: 'bg-green-50 text-green-600', accent: 'text-green-600' },
    amber: { icon: 'bg-amber-50 text-amber-600', accent: 'text-amber-600' },
    blue: { icon: 'bg-blue-50 text-blue-600', accent: 'text-blue-600' },
    purple: { icon: 'bg-purple-50 text-purple-600', accent: 'text-purple-600' },
  }

  return (
    <Card className={clsx('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className={clsx('text-3xl font-bold mt-1', colors[color].accent)}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <p
              className={clsx(
                'text-xs font-medium mt-2',
                trend.value >= 0 ? 'text-green-600' : 'text-red-500',
              )}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className={clsx('flex-shrink-0 p-2.5 rounded-lg ml-4', colors[color].icon)}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
