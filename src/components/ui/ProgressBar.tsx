import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  value: number // 0–100
  max?: number
  label?: string
  showValue?: boolean
  size?: 'xs' | 'sm' | 'md'
  color?: 'indigo' | 'green' | 'amber' | 'red' | 'blue'
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'sm',
  color = 'indigo',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const trackColors = {
    indigo: 'bg-indigo-100',
    green: 'bg-green-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100',
    blue: 'bg-blue-100',
  }

  const fillColors = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }

  const heights = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
  }

  // color auto-select based on score
  const autoColor = (): typeof color => {
    if (pct >= 70) return 'indigo'
    if (pct >= 45) return 'amber'
    return 'red'
  }

  const resolvedColor = color === 'indigo' ? autoColor() : color

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-gray-500">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={clsx('w-full rounded-full overflow-hidden', trackColors[resolvedColor], heights[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500', fillColors[resolvedColor])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
