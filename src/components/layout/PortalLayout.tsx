'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Menu, X, Zap, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

type PortalType = 'student' | 'industry' | 'academician' | 'institution'

interface PortalLayoutProps {
  portal: PortalType
  userName?: string
  children: React.ReactNode
}

const portalUserMap: Record<PortalType, { name: string; role: string; initial: string }> = {
  student:     { name: 'Shriya Biju',       role: 'Student',        initial: 'S' },
  industry:    { name: 'TechCorp India',    role: 'Industry',       initial: 'T' },
  academician: { name: 'Dr. Aakash Achari', role: 'Academician',    initial: 'A' },
  institution: { name: 'BITS Pilani',       role: 'Admin',          initial: 'B' },
}

const portalColors: Record<PortalType, string> = {
  student:     'bg-indigo-100 text-indigo-700',
  industry:    'bg-blue-100 text-blue-700',
  academician: 'bg-purple-100 text-purple-700',
  institution: 'bg-emerald-100 text-emerald-700',
}

export default function PortalLayout({ portal, userName, children }: PortalLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const user = portalUserMap[portal]
  const displayName = userName ?? user.name

  // Close drawer on route change (navigation)
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    if (drawerOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    // Root: full viewport, no horizontal overflow
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar portal={portal} userName={displayName} />
      </div>

      {/* ── Mobile: drawer overlay ── */}
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel — slides in from left */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-50 md:hidden',
          'transform transition-transform duration-300 ease-out',
          drawerOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Sidebar portal={portal} userName={displayName} onNavClick={closeDrawer} mobileDrawer />
      </div>

      {/* ── Right side: mobile header + scrollable main ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Mobile top bar — only visible below md */}
        <header className="md:hidden flex items-center justify-between h-14 px-4 bg-white border-b border-gray-100 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
            >
              <Menu size={20} />
            </button>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 text-base">
                Hire<span className="text-indigo-600">-X</span>
              </span>
            </Link>
          </div>

          {/* Right: user avatar + sign out */}
          <div className="flex items-center gap-2">
            <div className={[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
              portalColors[portal],
            ].join(' ')}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <Link
              href="/login"
              className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </header>

        {/* Main content — scrolls independently */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
