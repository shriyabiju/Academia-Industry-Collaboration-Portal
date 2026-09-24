'use client'
import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  value: number          // 0–100
  max?: number
  label?: string
  showValue?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'indigo' | 'green' | 'amber' | 'red' | 'blue' | 'auto'
  className?: string
  /** Animate the fill on mount */
  animate?: boolean
  /** Show a target marker line */
  target?: number
}

const trackColors = {
  indigo: 'bg-indigo-100',
  green:  'bg-green-100',
  amber:  'bg-amber-100',
  red:    'bg-red-100',
  blue:   'bg-blue-100',
  auto:   'bg-gray-100',
}

const fillColors = {
  indigo: 'bg-indigo-500',
  green:  'bg-emerald-500',
  amber:  'bg-amber-500',
  red:    'bg-red-500',
  blue:   'bg-blue-500',
  auto:   '',
}

const heights = {
  xs: 'h-1.5',
  sm: 'h-2',
  md: 'h-2.5',
  lg: 'h-3',
}

function autoColor(pct: number): 'green' | 'amber' | 'red' {
  if (pct >= 70) return 'green'
  if (pct >= 45) return 'amber'
  return 'red'
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'sm',
  color = 'indigo',
  animate = true,
  target,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fillRef = useRef<HTMLDivElement>(null)

  const resolvedColor: Exclude<typeof color, 'auto'> =
    color === 'auto' ? autoColor(pct) : color

  // Set CSS variable for the animated progress
  useEffect(() => {
    if (fillRef.current && animate) {
      fillRef.current.style.setProperty('--progress-width', `${pct}%`)
      fillRef.current.style.width = `${pct}%`
    }
  }, [pct, animate])

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold tabular text-gray-500">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={clsx(
        'relative w-full rounded-full overflow-visible',
        trackColors[resolvedColor],
        heights[size],
      )}>
        <div
          ref={fillRef}
          className={clsx(
            'h-full rounded-full',
            fillColors[resolvedColor],
            animate ? 'transition-[width] duration-700 ease-out' : '',
          )}
          style={{ width: animate ? '0%' : `${pct}%` }}
        />
        {/* Target marker */}
        {target !== undefined && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-500 rounded-full"
            style={{ left: `${Math.min(100, target)}%` }}
          />
        )}
      </div>
    </div>
  )
}
