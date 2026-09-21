'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard,
  ClipboardCheck,
  Brain,
  Briefcase,
  BookOpen,
  FileText,
  User,
  Building2,
  Settings,
  Target,
  Users,
  BarChart3,
  GraduationCap,
  Award,
  Handshake,
  Lightbulb,
  FlaskConical,
  Zap,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type PortalType = 'student' | 'industry' | 'academician' | 'institution'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: Record<PortalType, NavItem[]> = {
  student: [
    { label: 'Dashboard', href: '/student', icon: <LayoutDashboard size={18} /> },
    { label: 'Assessments', href: '/student/assessments', icon: <ClipboardCheck size={18} /> },
    { label: 'My Skills', href: '/student/skills', icon: <Brain size={18} /> },
    { label: 'Opportunities', href: '/student/opportunities', icon: <Briefcase size={18} /> },
    { label: 'Learning', href: '/student/learning', icon: <BookOpen size={18} /> },
    { label: 'Applications', href: '/student/applications', icon: <FileText size={18} /> },
    { label: 'Profile', href: '/student/profile', icon: <User size={18} /> },
  ],
  industry: [
    { label: 'Dashboard', href: '/industry', icon: <LayoutDashboard size={18} /> },
    { label: 'Skill Requirements', href: '/industry/skills', icon: <Target size={18} /> },
    { label: 'Opportunities', href: '/industry/opportunities', icon: <Briefcase size={18} /> },
    { label: 'Student Matches', href: '/industry/matches', icon: <Users size={18} /> },
    { label: 'Applications', href: '/industry/applications', icon: <FileText size={18} /> },
    { label: 'Analytics', href: '/industry/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Profile', href: '/industry/profile', icon: <Building2 size={18} /> },
  ],
  academician: [
    { label: 'Dashboard', href: '/academician', icon: <LayoutDashboard size={18} /> },
    { label: 'Faculty Internships', href: '/academician/programs?type=faculty', icon: <GraduationCap size={18} /> },
    { label: 'Industrial Training', href: '/academician/programs?type=training', icon: <Building2 size={18} /> },
    { label: 'FDPs', href: '/academician/programs?type=fdp', icon: <Award size={18} /> },
    { label: 'Mentorship', href: '/academician/programs?type=mentorship', icon: <Handshake size={18} /> },
    { label: 'Workshops', href: '/academician/programs?type=workshop', icon: <Lightbulb size={18} /> },
    { label: 'Research', href: '/academician/programs?type=research', icon: <FlaskConical size={18} /> },
  ],
  institution: [
    { label: 'Analytics', href: '/institution', icon: <BarChart3 size={18} /> },
    { label: 'Students', href: '/institution/students', icon: <Users size={18} /> },
    { label: 'Departments', href: '/institution/departments', icon: <GraduationCap size={18} /> },
    { label: 'Settings', href: '/institution/settings', icon: <Settings size={18} /> },
  ],
}

const portalMeta: Record<PortalType, { label: string; color: string }> = {
  student: { label: 'Student Portal', color: 'text-indigo-600' },
  industry: { label: 'Industry Portal', color: 'text-blue-600' },
  academician: { label: 'Academician Portal', color: 'text-purple-600' },
  institution: { label: 'Institution Admin', color: 'text-green-600' },
}

interface SidebarProps {
  portal: PortalType
  userName?: string
}

export default function Sidebar({ portal, userName = 'User' }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const items = navItems[portal]
  const meta = portalMeta[portal]

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-200 sticky top-0',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 flex-shrink-0">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">
              Hire<span className="text-indigo-600">-X</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Portal label */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-50">
          <p className={clsx('text-xs font-semibold uppercase tracking-wider', meta.color)}>
            {meta.label}
          </p>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-hide">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                collapsed && 'justify-center',
              )}
            >
              <span className={clsx('flex-shrink-0', active ? 'text-indigo-600' : 'text-gray-400')}>
                {item.icon}
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-400 capitalize">{portal}</p>
            </div>
          </div>
        )}
        <Link
          href="/login"
          title={collapsed ? 'Logout' : undefined}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors',
            collapsed && 'justify-center',
          )}
        >
          <LogOut size={16} />
          {!collapsed && 'Logout'}
        </Link>
      </div>
    </aside>
  )
}
