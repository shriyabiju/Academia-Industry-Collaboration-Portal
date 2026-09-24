import React from 'react'
import clsx from 'clsx'

// ─── Base ─────────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string
  /** Round into a circle */
  circle?: boolean
  width?: string
  height?: string
  style?: React.CSSProperties
}

export default function Skeleton({ className, circle, width, height, style }: SkeletonProps) {
  return (
    <div
      className={clsx('skeleton', circle ? 'rounded-full' : 'rounded-lg', className)}
      style={style ?? (width || height ? { width, height } : undefined)}
    />
  )
}

// ─── Preset layouts ───────────────────────────────────────────────────────────

/** Single KPI card skeleton */
export function SkeletonKPI() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3 shadow-card">
      <div className="flex justify-between items-start">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-9" circle />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-2.5 w-32" />
    </div>
  )
}

/** List-row skeleton */
export function SkeletonRow({ lines = 2 }: { lines?: number }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Skeleton className="h-10 w-10 flex-shrink-0" circle />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/3" />
        {lines >= 2 && <Skeleton className="h-3 w-1/2" />}
        {lines >= 3 && <Skeleton className="h-3 w-1/3" />}
      </div>
    </div>
  )
}

/** Card skeleton */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
        <Skeleton className="h-10 w-10" circle />
      </div>
      <Skeleton className="h-2 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  )
}

/** Page-level skeleton for dashboards */
export function SkeletonDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-3 w-48" />
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <SkeletonKPI key={i} />)}
      </div>
      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

/** Table skeleton */
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex gap-6">
        {[40, 25, 20, 15].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: `${w}%` }} />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="px-4 py-3.5 border-b border-gray-50 flex gap-6 items-center">
          <Skeleton className="h-8 w-8" circle />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}
