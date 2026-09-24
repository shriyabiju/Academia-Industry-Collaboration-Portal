'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard, ClipboardCheck, Brain, Briefcase, BookOpen,
  FileText, User, Building2, Settings, Target, Users, BarChart3,
  GraduationCap, Award, Handshake, Lightbulb, FlaskConical, Zap,
  LogOut, ChevronLeft, ChevronRight, Layers, X,
} from 'lucide-react'

type PortalType = 'student' | 'industry' | 'academician' | 'institution'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface NavGroup {
  heading?: string
  items: NavItem[]
}

const navGroups: Record<PortalType, NavGroup[]> = {
  student: [
    {
      heading: 'Overview',
      items: [
        { label: 'Dashboard',          href: '/student',               icon: <LayoutDashboard size={16} /> },
        { label: 'My Profile',         href: '/student/profile',       icon: <User size={16} /> },
      ],
    },
    {
      heading: 'Skills',
      items: [
        { label: 'Assessments',        href: '/student/assessments',   icon: <ClipboardCheck size={16} /> },
        { label: 'Skill Intelligence', href: '/student/skills',        icon: <Brain size={16} /> },
        { label: 'Learning',           href: '/student/learning',      icon: <BookOpen size={16} /> },
      ],
    },
    {
      heading: 'Opportunities',
      items: [
        { label: 'Opportunities',      href: '/student/opportunities', icon: <Briefcase size={16} /> },
        { label: 'Applications',       href: '/student/applications',  icon: <FileText size={16} />, badge: 3 },
      ],
    },
  ],
  industry: [
    {
      heading: 'Overview',
      items: [
        { label: 'Dashboard', href: '/industry',         icon: <LayoutDashboard size={16} /> },
        { label: 'Profile',   href: '/industry/profile', icon: <Building2 size={16} /> },
      ],
    },
    {
      heading: 'Talent',
      items: [
        { label: 'Skill Requirements', href: '/industry/skills',        icon: <Target size={16} /> },
        { label: 'Opportunities',      href: '/industry/opportunities', icon: <Briefcase size={16} /> },
        { label: 'Candidates',         href: '/industry/matches',       icon: <Users size={16} />, badge: 18 },
        { label: 'Applications',       href: '/industry/applications',  icon: <FileText size={16} />, badge: 7 },
      ],
    },
    {
      heading: 'Insights',
      items: [
        { label: 'Analytics', href: '/industry/analytics', icon: <BarChart3 size={16} /> },
      ],
    },
  ],
  academician: [
    {
      heading: 'Overview',
      items: [
        { label: 'Dashboard', href: '/academician', icon: <LayoutDashboard size={16} /> },
      ],
    },
    {
      heading: 'Programs',
      items: [
        { label: 'Faculty Internships', href: '/academician/programs?type=faculty',    icon: <GraduationCap size={16} /> },
        { label: 'Industrial Training', href: '/academician/programs?type=training',   icon: <Building2 size={16} /> },
        { label: 'FDPs',                href: '/academician/programs?type=fdp',         icon: <Award size={16} /> },
        { label: 'Mentorship',          href: '/academician/programs?type=mentorship',  icon: <Handshake size={16} /> },
        { label: 'Workshops',           href: '/academician/programs?type=workshop',    icon: <Lightbulb size={16} /> },
        { label: 'Research',            href: '/academician/programs?type=research',    icon: <FlaskConical size={16} /> },
      ],
    },
    {
      heading: 'My Activity',
      items: [
        { label: 'All Programs', href: '/academician/programs', icon: <Layers size={16} /> },
      ],
    },
  ],
  institution: [
    {
      heading: 'Overview',
      items: [
        { label: 'Analytics',   href: '/institution',             icon: <BarChart3 size={16} /> },
        { label: 'Students',    href: '/institution/students',    icon: <Users size={16} /> },
        { label: 'Departments', href: '/institution/departments', icon: <GraduationCap size={16} /> },
      ],
    },
    {
      heading: 'Administration',
      items: [
        { label: 'Settings', href: '/institution/settings', icon: <Settings size={16} /> },
      ],
    },
  ],
}

const portalMeta: Record<PortalType, { label: string; color: string; dot: string }> = {
  student:     { label: 'Student Portal',     color: 'text-indigo-600',  dot: 'bg-indigo-500' },
  industry:    { label: 'Industry Portal',    color: 'text-blue-600',    dot: 'bg-blue-500' },
  academician: { label: 'Academician Portal', color: 'text-purple-600',  dot: 'bg-purple-500' },
  institution: { label: 'Institution Admin',  color: 'text-emerald-600', dot: 'bg-emerald-500' },
}

const portalUserMap: Record<PortalType, { name: string; role: string }> = {
  student:     { name: 'Shriya Biju',       role: 'B.Tech CSE · Year 3' },
  industry:    { name: 'TechCorp India',    role: 'Industry Partner' },
  academician: { name: 'Dr. Aakash Achari', role: 'Associate Professor' },
  institution: { name: 'BITS Pilani',       role: 'Institution Admin' },
}

interface SidebarProps {
  portal: PortalType
  userName?: string
  /** Called when a nav item is clicked — used by mobile drawer to close */
  onNavClick?: () => void
  /** True when rendered inside the mobile drawer (disables the collapse toggle) */
  mobileDrawer?: boolean
}

export default function Sidebar({ portal, userName, onNavClick, mobileDrawer = false }: SidebarProps) {
  const pathname = usePathname()
  // On mobile drawer we always show expanded; collapse only available on desktop
  const [collapsed, setCollapsed] = useState(false)

  const groups      = navGroups[portal]
  const meta        = portalMeta[portal]
  const user        = portalUserMap[portal]
  const displayName = userName ?? user.name

  // In mobile drawer mode never collapse
  const isCollapsed = mobileDrawer ? false : collapsed

  const isActive = (href: string) => {
    if (href === `/${portal}`) return pathname === href
    return pathname.startsWith(href.split('?')[0])
  }

  return (
    <aside
      className={clsx(
        'flex flex-col bg-white border-r border-gray-100 h-full',
        // Mobile drawer: fixed full height, no width transition
        mobileDrawer
          ? 'w-[260px] shadow-card-lg'
          : [
              'h-screen sticky top-0 flex-shrink-0',
              'transition-[width] duration-200 ease-out',
              isCollapsed ? 'w-[60px]' : 'w-[232px]',
            ].join(' '),
      )}
    >
      {/* ── Brand row ── */}
      <div className="flex items-center h-14 px-3 border-b border-gray-100 flex-shrink-0">
        {!isCollapsed && (
          <Link
            href="/"
            className="flex items-center gap-2 flex-1 min-w-0"
            onClick={onNavClick}
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm truncate">
              Hire<span className="text-indigo-600">-X</span>
            </span>
          </Link>
        )}

        {isCollapsed && !mobileDrawer && (
          <div className="flex-1 flex justify-center">
            <Link href="/" onClick={onNavClick}>
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                <Zap size={13} className="text-white" />
              </div>
            </Link>
          </div>
        )}

        {/* Desktop collapse toggle */}
        {!mobileDrawer && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors ml-1"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}

        {/* Mobile drawer close button */}
        {mobileDrawer && onNavClick && (
          <button
            onClick={onNavClick}
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors ml-auto"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Portal label ── */}
      {!isCollapsed && (
        <div className="px-4 pt-3 pb-2 border-b border-gray-50">
          <div className="flex items-center gap-1.5">
            <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', meta.dot)} />
            <p className={clsx('text-[10px] font-bold uppercase tracking-widest', meta.color)}>
              {meta.label}
            </p>
          </div>
        </div>
      )}

      {/* ── Nav items ── */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 py-2 space-y-4">
        {groups.map((group, gi) => (
          <div key={gi}>
            {!isCollapsed && group.heading && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-1.5 mt-1">
                {group.heading}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    onClick={onNavClick}
                    className={clsx(
                      'flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-sm font-medium',
                      'transition-all duration-150 select-none relative',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
                      active
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      isCollapsed && 'justify-center',
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-r-full" />
                    )}
                    <span className={clsx('flex-shrink-0', active ? 'text-indigo-600' : 'text-gray-400')}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className={clsx(
                            'flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center',
                            active ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600',
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="flex-shrink-0 border-t border-gray-100 p-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0',
              portalMeta[portal].color.replace('text-', 'bg-').replace('-600', '-100'),
              portalMeta[portal].color,
            )}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-900 truncate">{displayName}</p>
              <p className="text-[10px] text-gray-400 truncate">{user.role}</p>
            </div>
          </div>
        )}
        <Link
          href="/login"
          title={isCollapsed ? 'Sign out' : undefined}
          onClick={onNavClick}
          className={clsx(
            'flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-gray-500',
            'hover:bg-red-50 hover:text-red-600 transition-all duration-150',
            isCollapsed && 'justify-center',
          )}
        >
          <LogOut size={14} />
          {!isCollapsed && <span>Sign out</span>}
        </Link>
      </div>
    </aside>
  )
}
