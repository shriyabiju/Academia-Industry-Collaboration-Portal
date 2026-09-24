'use client'
import React from 'react'
import Link from 'next/link'
import {
  GraduationCap, Building2, Award, Handshake, Lightbulb, FlaskConical,
  ArrowRight, Calendar, Clock, TrendingUp, User, Zap, BookOpen,
  AlertCircle,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell,
} from 'recharts'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import {
  mockAcademicPrograms,
  mockAcademicianKPIs,
  mockMyApplications,
  mockAcademicianProfile,
} from '@/data/academician'

// ─── Demand vs Coverage data ──────────────────────────────────────────────────
const demandVsCoverage = [
  { skill: 'React/Frontend',    demand: 87, coverage: 55 },
  { skill: 'Cloud & DevOps',    demand: 78, coverage: 40 },
  { skill: 'Machine Learning',  demand: 74, coverage: 60 },
  { skill: 'SQL & Databases',   demand: 85, coverage: 72 },
  { skill: 'Python',            demand: 92, coverage: 80 },
  { skill: 'Data Analysis',     demand: 70, coverage: 58 },
]

const typeIcons: Record<string, React.ReactNode> = {
  'Faculty Internship':     <GraduationCap size={15} />,
  'Industrial Training':    <Building2 size={15} />,
  'FDP':                    <Award size={15} />,
  'Mentorship':             <Handshake size={15} />,
  'Workshop':               <Lightbulb size={15} />,
  'Research Collaboration': <FlaskConical size={15} />,
}

const typeColors: Record<string, string> = {
  'Faculty Internship':     'indigo',
  'Industrial Training':    'blue',
  'FDP':                    'purple',
  'Mentorship':             'success',
  'Workshop':               'warning',
  'Research Collaboration': 'info',
}

const statusVariant: Record<string, 'indigo' | 'warning' | 'success' | 'danger'> = {
  Applied: 'indigo', 'Under Review': 'warning', Shortlisted: 'success', Selected: 'success', Rejected: 'danger',
}

const daysUntil = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000))

const upcomingDeadlines = [...mockAcademicPrograms]
  .filter((p) => p.status !== 'Closed')
  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  .slice(0, 4)

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AcademicianDashboard() {
  const kpis    = mockAcademicianKPIs
  const profile = mockAcademicianProfile

  return (
    <div className="space-y-8 page-enter">

      {/* ── Header banner ── */}
      <div className="relative bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 rounded-2xl overflow-hidden shadow-card-md">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative flex items-center justify-between gap-6 p-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-purple-200 text-xs font-semibold uppercase tracking-wide mb-0.5">Academician Portal</p>
              <h1 className="text-xl font-bold text-white">{profile.name}</h1>
              <p className="text-purple-300 text-sm mt-0.5">{profile.designation} · {profile.institution} · {profile.department}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {profile.specialization.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-white/15 border border-white/20 rounded-full text-xs font-medium text-white">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <Link href="/academician/programs">
            <Button className="bg-white text-purple-700 hover:bg-purple-50 shadow font-semibold">
              Browse Programs <ArrowRight size={15} />
            </Button>
          </Link>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Programs"
          value={<AnimatedNumber value={kpis.activePrograms} />}
          subtitle="Available to apply"
          icon={<GraduationCap size={18} />}
          color="indigo"
        />
        <KPICard
          title="My Applications"
          value={<AnimatedNumber value={mockMyApplications.length} />}
          subtitle={`${mockMyApplications.filter((a) => ['Shortlisted', 'Selected'].includes(a.status)).length} shortlisted`}
          icon={<Award size={18} />}
          color="purple"
        />
        <KPICard
          title="Industry Collaborations"
          value={<AnimatedNumber value={kpis.industryCollaborations} />}
          subtitle="Active this year"
          icon={<Building2 size={18} />}
          color="blue"
        />
        <KPICard
          title="Research Opportunities"
          value={<AnimatedNumber value={kpis.researchOpportunities} />}
          subtitle="Open for applications"
          icon={<FlaskConical size={18} />}
          color="green"
        />
      </div>

      {/* ── Industry Demand vs Curriculum ── */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Industry Demand vs. Curriculum Coverage</h2>
            <p className="text-xs text-gray-400 mt-0.5">Skill gaps between what industry needs and what curriculum currently covers</p>
          </div>
          <Badge variant="warning" size="sm">Curriculum Insight</Badge>
        </div>

        <div className="mt-5 space-y-4">
          {demandVsCoverage.map((item) => {
            const gap = item.demand - item.coverage
            const urgent = gap > 25
            return (
              <div key={item.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-800">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    {urgent && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                        <AlertCircle size={9} /> Gap: {gap}pts
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-24 sm:w-28 text-[10px] text-gray-500 text-right flex-shrink-0">Industry {item.demand}%</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.demand}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-24 sm:w-28 text-[10px] text-gray-500 text-right flex-shrink-0">Curriculum {item.coverage}%</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${urgent ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${item.coverage}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Insight callout */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Zap size={13} />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">Curriculum Insight</p>
            <p className="text-sm text-amber-800 mt-0.5 leading-relaxed">
              React/Frontend (32pt gap) and Cloud & DevOps (38pt gap) show strong industry demand but lower curriculum coverage.
              Consider adding dedicated modules or FDP sessions in these areas.
            </p>
          </div>
          <Link href="/academician/programs?type=FDP" className="flex-shrink-0">
            <Button variant="secondary" size="sm">Find FDPs</Button>
          </Link>
        </div>
      </Card>

      {/* ── Applications + Deadlines — stack on mobile ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My applications */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">My Applications</h2>
            <Badge variant="indigo" size="xs">{mockMyApplications.length} total</Badge>
          </div>
          <div className="space-y-3">
            {mockMyApplications.map((app) => (
              <div key={app.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs font-semibold text-gray-900 leading-snug">{app.programTitle}</p>
                  <Badge variant={statusVariant[app.status]} size="xs" className="flex-shrink-0">{app.status}</Badge>
                </div>
                <p className="text-xs text-gray-400">{app.organization}</p>
                {app.nextStep && (
                  <p className="text-xs text-indigo-600 mt-1 flex items-center gap-1">
                    <Clock size={9} /> {app.nextStep}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming deadlines */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h2>
            <Link href="/academician/programs">
              <Button variant="ghost" size="sm">All Programs <ArrowRight size={13} /></Button>
            </Link>
          </div>
          <div className="space-y-2">
            {upcomingDeadlines.map((prog) => {
              const days   = daysUntil(prog.deadline)
              const urgent = days <= 10
              const tc     = typeColors[prog.type] ?? 'indigo'
              return (
                <Link key={prog.id} href={`/academician/programs/${prog.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-${tc}-50 text-${tc}-600`}>
                      {typeIcons[prog.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{prog.title}</p>
                      <p className="text-xs text-gray-400 truncate">{prog.organization}</p>
                    </div>
                    <div className="flex-shrink-0 text-right mr-2">
                      <div className={`text-sm font-bold ${urgent ? 'text-red-500' : 'text-gray-700'}`}>
                        {days === 0 ? 'Today!' : `${days}d`}
                      </div>
                      <div className="text-[10px] text-gray-400">left</div>
                    </div>
                    <Badge variant={prog.status === 'Closing Soon' ? 'warning' : 'success'} size="xs" dot>
                      {prog.status}
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>
      </div>

      {/* ── Featured programs — 1 col mobile, 2 sm, 4 xl ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Featured Programs</h2>
          <Link href="/academician/programs">
            <Button variant="ghost" size="sm">View All <ArrowRight size={13} /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {mockAcademicPrograms.slice(0, 4).map((prog) => {
            const tc = typeColors[prog.type] ?? 'indigo'
            return (
              <Card key={prog.id} hover className="flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${tc}-50 text-${tc}-600 flex-shrink-0`}>
                    {typeIcons[prog.type]}
                  </div>
                  <Badge variant={prog.status === 'Open' ? 'success' : prog.status === 'Closing Soon' ? 'warning' : 'default'} size="xs" dot>
                    {prog.status}
                  </Badge>
                </div>
                <Badge variant={tc as any} size="xs" className="self-start mb-2">{prog.type}</Badge>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug line-clamp-2">{prog.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{prog.organization}</p>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1 leading-relaxed">{prog.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={10} />{prog.duration}</span>
                  {prog.stipend && <span className="text-emerald-600 font-semibold truncate">{prog.stipend}</span>}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/academician/programs/${prog.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Details</Button>
                  </Link>
                  <Link href={`/academician/programs/${prog.id}`}>
                    <Button variant="primary" size="sm" disabled={prog.status === 'Closed'}>Apply</Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
