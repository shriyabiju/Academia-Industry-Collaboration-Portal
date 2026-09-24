'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Students',     href: '#students' },
  { label: 'Industry',     href: '#industry' },
  { label: 'Academicians', href: '#academicians' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">
              Hire<span className="text-indigo-600">-X</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button variant="primary" size="sm">
                Get Started <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-0.5 animate-fade-in-down pb-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3 px-1">
              <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
