'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  GraduationCap, Building2, BookOpen, BarChart3,
  ArrowRight, Zap, ChevronLeft, CheckCircle2, Eye, EyeOff,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import clsx from 'clsx'

// ─── Role definitions ─────────────────────────────────────────────────────────

const roles = [
  {
    id: 'student',
    label: 'Student',
    tagline: 'Assess · Match · Grow',
    description: 'Get assessed, see your skill gaps, and match with real industry opportunities.',
    icon: GraduationCap,
    color: 'indigo',
    href: '/student',
    demoUser: 'Shriya Biju',
    demoEmail: 'shriya.biju@bits.ac.in',
    highlights: ['Skill intelligence profile', 'Opportunity matching', 'Learning roadmap'],
  },
  {
    id: 'industry',
    label: 'Industry',
    tagline: 'Post · Match · Hire',
    description: 'Define skill requirements, surface matched talent, manage your hiring pipeline.',
    icon: Building2,
    color: 'blue',
    href: '/industry',
    demoUser: 'TechCorp India',
    demoEmail: 'hr@techcorp.in',
    highlights: ['Skill-based candidate search', 'Explainable match scores', 'Pipeline management'],
  },
  {
    id: 'academician',
    label: 'Academician',
    tagline: 'Learn · Collaborate · Lead',
    description: 'Explore faculty internships, FDPs, mentorship programs and research collaborations.',
    icon: BookOpen,
    color: 'purple',
    href: '/academician',
    demoUser: 'Dr. Aakash Achari',
    demoEmail: 'aakash.achari@bits.ac.in',
    highlights: ['Faculty programs', 'Research collaborations', 'Industry partnerships'],
  },
  {
    id: 'institution',
    label: 'Institution',
    tagline: 'Track · Analyse · Improve',
    description: 'Monitor placement readiness, skill gaps, and curriculum effectiveness institution-wide.',
    icon: BarChart3,
    color: 'green',
    href: '/institution',
    demoUser: 'BITS Pilani Admin',
    demoEmail: 'admin@bits.ac.in',
    highlights: ['Placement analytics', 'Skill gap heatmap', 'Curriculum insights'],
  },
]

// ─── Color maps ───────────────────────────────────────────────────────────────

const colorConfig: Record<string, {
  card: string; cardSelected: string; iconBg: string; iconText: string
  ring: string; btn: string; dot: string; tagBg: string; tagText: string
}> = {
  indigo: {
    card: 'border-gray-100 hover:border-indigo-200',
    cardSelected: 'border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-200',
    iconBg: 'bg-indigo-100', iconText: 'text-indigo-600',
    ring: 'ring-indigo-300',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
    dot: 'bg-indigo-500',
    tagBg: 'bg-indigo-50', tagText: 'text-indigo-600',
  },
  blue: {
    card: 'border-gray-100 hover:border-blue-200',
    cardSelected: 'border-blue-400 bg-blue-50/40 ring-2 ring-blue-200',
    iconBg: 'bg-blue-100', iconText: 'text-blue-600',
    ring: 'ring-blue-300',
    btn: 'bg-blue-600 hover:bg-blue-700',
    dot: 'bg-blue-500',
    tagBg: 'bg-blue-50', tagText: 'text-blue-600',
  },
  purple: {
    card: 'border-gray-100 hover:border-purple-200',
    cardSelected: 'border-purple-400 bg-purple-50/40 ring-2 ring-purple-200',
    iconBg: 'bg-purple-100', iconText: 'text-purple-600',
    ring: 'ring-purple-300',
    btn: 'bg-purple-600 hover:bg-purple-700',
    dot: 'bg-purple-500',
    tagBg: 'bg-purple-50', tagText: 'text-purple-600',
  },
  green: {
    card: 'border-gray-100 hover:border-emerald-200',
    cardSelected: 'border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-200',
    iconBg: 'bg-emerald-100', iconText: 'text-emerald-600',
    ring: 'ring-emerald-300',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    dot: 'bg-emerald-500',
    tagBg: 'bg-emerald-50', tagText: 'text-emerald-600',
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const selected = roles.find((r) => r.id === selectedRole)
  const c = selected ? colorConfig[selected.color] : null

  const handleLogin = async () => {
    if (!selected) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    router.push(selected.href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/60 flex flex-col">

      {/* ── Top bar ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100/80 bg-white/60 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">
            Hire<span className="text-indigo-600">-X</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={15} />
          Back to Home
        </Link>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-4xl animate-fade-in-up">

          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-semibold text-indigo-700">Demo Mode · No signup required</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Hire-X</h1>
            <p className="text-gray-500 mt-2 text-sm">Select your role to enter your personalised portal</p>
          </div>

          {/* Role cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {roles.map((role) => {
              const cfg = colorConfig[role.color]
              const isSelected = selectedRole === role.id
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={clsx(
                    'relative text-left rounded-2xl border-2 p-5 transition-all duration-200',
                    'focus:outline-none',
                    'hover:shadow-card-md hover:-translate-y-0.5',
                    isSelected
                      ? `${cfg.cardSelected} shadow-card-md -translate-y-0.5`
                      : `bg-white ${cfg.card}`,
                  )}
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 size={18} className={cfg.iconText} />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center mb-3.5', cfg.iconBg, cfg.iconText)}>
                    <Icon size={22} />
                  </div>

                  {/* Label + tagline */}
                  <p className="font-bold text-gray-900 text-base">{role.label}</p>
                  <p className={clsx('text-xs font-semibold mt-0.5 mb-2', cfg.tagText)}>{role.tagline}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{role.description}</p>

                  {/* Feature chips */}
                  <div className="mt-3.5 space-y-1.5">
                    {role.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className={clsx('w-1 h-1 rounded-full flex-shrink-0', cfg.dot)} />
                        {h}
                      </div>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Login form — slides in when role selected */}
          {selected && c && (
            <div className="max-w-md mx-auto animate-scale-in">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card-lg overflow-hidden">
                {/* Form header */}
                <div className={clsx('px-6 py-4 flex items-center gap-3 border-b border-gray-100', c.iconBg + '/30')}>
                  <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', c.iconBg, c.iconText)}>
                    <selected.icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Sign in as {selected.label}</p>
                    <p className="text-xs text-gray-400">Demo credentials pre-filled</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Demo Ready
                    </span>
                  </div>
                </div>

                {/* Fields */}
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email address</label>
                    <input
                      type="email"
                      defaultValue={selected.demoEmail}
                      className="input-base"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-600">Password</label>
                      <span className="text-xs text-gray-400">Demo: any password works</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        defaultValue="demo123456"
                        className="input-base pr-10"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={clsx(
                      'w-full py-2.5 px-4 rounded-xl text-white font-semibold text-sm',
                      'flex items-center justify-center gap-2',
                      'transition-all duration-150 hover:-translate-y-px hover:shadow-md active:translate-y-0',
                      'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
                      c.btn,
                    )}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Entering portal…</span>
                      </>
                    ) : (
                      <>
                        <span>Continue as {selected.label}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* User preview */}
                <div className="px-6 pb-5">
                  <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                    <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0', c.iconBg, c.iconText)}>
                      {selected.demoUser.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{selected.demoUser}</p>
                      <p className="text-xs text-gray-400 truncate">{selected.demoEmail}</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400 flex-shrink-0">Demo User</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selected && (
            <p className="text-center text-sm text-gray-400 mt-2">← Select a role above to continue</p>
          )}

          {/* Bottom disclaimer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            This is a Smart India Hackathon 2026 prototype. No real authentication is performed.
          </p>
        </div>
      </main>
    </div>
  )
}
