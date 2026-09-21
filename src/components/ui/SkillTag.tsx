import React from 'react'
import clsx from 'clsx'
import type { ProficiencyLevel } from '@/data/skills'

interface SkillTagProps {
  name: string
  level?: ProficiencyLevel
  matched?: boolean
  gap?: boolean
  size?: 'sm' | 'md'
}

export default function SkillTag({ name, level, matched, gap, size = 'sm' }: SkillTagProps) {
  const levelColors: Record<string, string> = {
    Advanced: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
    Beginner: 'bg-gray-50 text-gray-600 border-gray-200',
  }

  const base = clsx(
    'inline-flex items-center gap-1 border rounded-md font-medium',
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
    matched
      ? 'bg-green-50 text-green-700 border-green-200'
      : gap
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : level
      ? levelColors[level]
      : 'bg-gray-100 text-gray-700 border-gray-200',
  )

  return (
    <span className={base}>
      {matched && <span className="text-green-500">✓</span>}
      {gap && <span className="text-amber-500">⚠</span>}
      {name}
      {level && !matched && !gap && (
        <span className="opacity-60 font-normal">· {level}</span>
      )}
    </span>
  )
}
