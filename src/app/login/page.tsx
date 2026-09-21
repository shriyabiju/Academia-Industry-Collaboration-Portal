'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Building2, BookOpen, BarChart3, ArrowRight, Zap, ChevronLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import clsx from 'clsx'

const roles = [
  {
    id: 'student',
    label: 'Student',
    description: 'Assess your skills, find matched opportunities, and close skill gaps with personalized learning.',
    icon: <GraduationCap size={28} />,
    color: 'indigo',
    href: '/student',
    demoUser: 'Shriya Biju',
    demoEmail: 'shriya.biju@bits.ac.in',
  },
  {
    id: 'industry',
    label: 'Industry',
    description: 'Post opportunities, define skill requirements, and discover matched student talent.',
    icon: <Building2 size={28} />,
    color: 'blue',
    href: '/industry',
    demoUser: 'TechCorp India',
    demoEmail: 'hr@techcorp.in',
  },
  {
    id: 'academician',
    label: 'Academician',
    description: 'Explore faculty internships, FDPs, mentorship programs and research collaborations.',
    icon: <BookOpen size={28} />,
    color: 'purple',
    href: '/academician',
    demoUser: 'Dr. Aakash Achari',
    demoEmail: 'aakash.achari@bits.ac.in',
  },
  {
    id: 'institution',
    label: 'Institution / Admin',
    description: 'Track placement readiness, skill gaps, and institutional analytics across departments.',
    icon: <BarChart3 size={28} />,
    color: 'green',
    href: '/institution',
    demoUser: 'BITS Pilani Admin',
    demoEmail: 'admin@bits.ac.in',
  },
]

const colorMap: Record<string, { ring: string; bg: string; text: string; btnBg: string; selectedBg: string; selectedBorder: string }> = {
  indigo: {
    ring: 'ring-indigo-300',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    btnBg: 'bg-indigo-600 hover:bg-indigo-700',
    selectedBg: 'bg-indigo-50',
    selectedBorder: 'border-indigo-400',
  },
  blue: {
    ring: 'ring-blue-300',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
    selectedBg: 'bg-blue-50',
    selectedBorder: 'border-blue-400',
  },
  purple: {
    ring: 'ring-purple-300',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    btnBg: 'bg-purple-600 hover:bg-purple-700',
    selectedBg: 'bg-purple-50',
    selectedBorder: 'border-purple-400',
  },
  green: {
    ring: 'ring-green-300',
    bg: 'bg-green-50',
    text: 'text-green-600',
    btnBg: 'bg-green-600 hover:bg-green-700',
    selectedBg: 'bg-green-50',
    selectedBorder: 'border-green-400',
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const selected = roles.find((r) => r.id === selectedRole)

  const handleLogin = async () => {
    if (!selected) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push(selected.href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">
            Skill<span className="text-indigo-600">Bridge</span>
          </span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft size={15} />
          Back to Home
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to SkillBridge</h1>
            <p className="text-gray-500 mt-2">Select your role to access your personalized portal</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {roles.map((role) => {
              const c = colorMap[role.color]
              const isSelected = selectedRole === role.id
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={clsx(
                    'text-left rounded-2xl border-2 p-5 transition-all duration-150 hover:shadow-md focus:outline-none',
                    isSelected
                      ? `${c.selectedBg} ${c.selectedBorder} shadow-sm ring-2 ${c.ring}`
                      : 'bg-white border-gray-100 hover:border-gray-200',
                  )}
                >
                  <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center mb-3', c.bg, c.text)}>
                    {role.icon}
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-semibold text-gray-900">{role.label}</h3>
                    {isSelected && (
                      <div className={clsx('w-5 h-5 rounded-full flex items-center justify-center', c.bg)}>
                        <div className={clsx('w-2.5 h-2.5 rounded-full', `bg-${role.color}-600`)} />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{role.description}</p>
                </button>
              )
            })}
          </div>

          {/* Login form */}
          {selected && (
            <Card className="mb-4 border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', colorMap[selected.color].bg, colorMap[selected.color].text)}>
                  {selected.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sign in as {selected.label}</p>
                  <p className="text-xs text-gray-400">Demo credentials pre-filled</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={selected.demoEmail}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="demo123456"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <Button
                className="w-full justify-center"
                loading={loading}
                onClick={handleLogin}
              >
                Continue as {selected.label}
                <ArrowRight size={16} />
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">
                Prototype demo — no real authentication. Any credentials work.
              </p>
            </Card>
          )}

          {!selected && (
            <p className="text-center text-sm text-gray-400">Select a role above to continue</p>
          )}
        </div>
      </div>
    </div>
  )
}
