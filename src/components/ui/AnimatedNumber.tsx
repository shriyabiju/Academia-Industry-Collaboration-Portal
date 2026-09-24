'use client'
import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface AnimatedNumberProps {
  value: number
  /** Number of decimals */
  decimals?: number
  /** Suffix e.g. "%" or "k" */
  suffix?: string
  /** Prefix e.g. "₹" */
  prefix?: string
  /** Duration in ms */
  duration?: number
  className?: string
  /** Start animation when element enters viewport */
  observeViewport?: boolean
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1200,
  className,
  observeViewport = true,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const start = () => {
    if (started) return
    setStarted(true)
    startRef.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const progress = Math.min(elapsed / duration, 1)
      setDisplay(easeOut(progress) * value)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!observeViewport) {
      start()
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect() } },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => { observer.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={clsx('tabular', className)}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  )
}
