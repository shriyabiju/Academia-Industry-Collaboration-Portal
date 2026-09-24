'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pill' | 'segment'
  size?: 'sm' | 'md'
  className?: string
}

// ─── Underline style ─────────────────────────────────────────────────────────

function UnderlineTabs({ tabs, active, onChange, size, className }: TabsProps) {
  return (
    <div className={clsx('flex gap-0 border-b border-gray-200', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={clsx(
              'relative flex items-center gap-1.5 font-medium transition-all duration-150 select-none',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 rounded-t',
              size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm',
              isActive
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-800',
              tab.disabled && 'opacity-40 cursor-not-allowed',
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={clsx(
                'inline-flex items-center justify-center px-1.5 rounded-full text-[10px] font-semibold min-w-[18px] h-[18px]',
                isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500',
              )}>
                {tab.badge}
              </span>
            )}
            {/* Active indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Pill style ───────────────────────────────────────────────────────────────

function PillTabs({ tabs, active, onChange, size, className }: TabsProps) {
  return (
    <div className={clsx('flex flex-wrap gap-1.5', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={clsx(
              'flex items-center gap-1.5 font-medium rounded-xl transition-all duration-150 select-none',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
              tab.disabled && 'opacity-40 cursor-not-allowed',
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={clsx(
                'inline-flex items-center justify-center px-1.5 rounded-full text-[10px] font-semibold min-w-[18px] h-[18px]',
                isActive ? 'bg-white/25 text-white' : 'bg-white text-gray-600',
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Segment control ──────────────────────────────────────────────────────────

function SegmentTabs({ tabs, active, onChange, size, className }: TabsProps) {
  return (
    <div className={clsx('inline-flex bg-gray-100 p-1 rounded-xl gap-1', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={clsx(
              'flex items-center gap-1.5 font-medium rounded-lg transition-all duration-150 select-none',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
              size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
              isActive
                ? 'bg-white text-gray-900 shadow-card'
                : 'text-gray-500 hover:text-gray-700',
              tab.disabled && 'opacity-40 cursor-not-allowed',
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Tabs(props: TabsProps) {
  const { variant = 'underline' } = props
  if (variant === 'pill')    return <PillTabs    {...props} />
  if (variant === 'segment') return <SegmentTabs {...props} />
  return <UnderlineTabs {...props} />
}

// ─── Controlled hook helper ───────────────────────────────────────────────────

export function useTabs(initial: string) {
  const [active, setActive] = useState(initial)
  return { active, setActive }
}
