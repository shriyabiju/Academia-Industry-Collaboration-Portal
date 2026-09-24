'use client'
import React from 'react'
import Link from 'next/link'
import {
  Brain, Briefcase, ClipboardCheck, BookOpen,
  AlertCircle, CheckCircle2, ArrowRight, RefreshCw,
  TrendingUp, Zap, ChevronRight,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { mockStudentSkills, mockSkillGaps } from '@/data/skills'
import { currentStudent } from '@/data/students'

// ─── Recommended actions ──────────────────────────────────────────────────────

const recommendedActions = [
  { id: 1, label: 'Complete React Fundamentals training',              type: 'Learning',     href: '/student/learning',      priority: 'High'   },
  { id: 2, label: 'Take AWS Cloud Practitioner certification',         type: 'Certification',href: '/student/learning',      priority: 'High'   },
  { id: 3, label: 'Reattempt Software Dev assessment to refresh score',type: 'Assessment',   href: '/student/assessments',   priority: 'Medium' },
  { id: 4, label: 'Apply to Software Engineering Internship (84% match)', type: 'Opportunity', href: '/student/opportunities', priority: 'High' },
]

const typeColor: Record<string, 'indigo' | 'info' | 'success' | 'warning'> = {
  Learning: 'indigo', Certification: 'info', Assessment: 'warning', Opportunity: 'success',
}

// ─── Circular readiness ring ──────────────────────────────────────────────────

function ReadinessRing({ score }: { score: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 70 ? '#4f46e5' : score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative w-36 h-36 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e0e7ff" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-gray-900 tabular">{score}%</span>
        <span className="text-[10px] text-gray-400 font-medium mt-0.5">Readiness</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const student = currentStudent
  const technical = mockStudentSkills.filter((s) => s.category === 'Technical').slice(0, 5)
  const soft      = mockStudentSkills.filter((s) => s.category === 'Soft')
  const topSkills = mockStudentSkills.filter((s) => s.level === 'Advanced')

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 page-enter">

      {/* ── Hero greeting banner ──────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-2xl overflow-hidden shadow-card-md">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative flex items-center justify-between gap-6 p-6 flex-wrap">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-0.5">{greeting} 👋</p>
            <h1 className="text-2xl font-bold text-white">{student.name}</h1>
            <p className="text-indigo-300 text-sm mt-0.5">
              {student.institution} · {student.course} · Year {student.year}
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/20">
                Step 3 of 6 — Matching
              </Badge>
              <Badge className="bg-indigo-500/40 text-indigo-100 border-indigo-400/30" dot>
                Skill Loop Active
              </Badge>
            </div>
          </div>

          {/* Readiness ring */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="white" strokeWidth="10"
                    strokeDasharray={`${(student.overallCompetency / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-white tabular">{student.overallCompetency}%</span>
                  <span className="text-[9px] text-indigo-200 font-medium">Readiness</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex flex-col gap-3">
              <Link href="/student/assessments">
                <Button size="sm" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow">
                  <ClipboardCheck size={13} /> Reassess
                </Button>
              </Link>
              <Link href="/student/opportunities">
                <Button size="sm" className="bg-indigo-500/40 text-white border border-white/30 hover:bg-indigo-500/60">
                  <Briefcase size={13} /> Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Overall Competency"
          value={<AnimatedNumber value={student.overallCompetency} suffix="%" />}
          subtitle="Based on latest assessment"
          icon={<Brain size={18} />}
          color="indigo"
          trend={{ value: 5, label: 'vs last month' }}
        />
        <KPICard
          title="Skills Assessed"
          value={<AnimatedNumber value={student.skillsAssessed} />}
          subtitle="Across all domains"
          icon={<ClipboardCheck size={18} />}
          color="blue"
        />
        <KPICard
          title="Skill Gaps"
          value={<AnimatedNumber value={student.skillGaps} />}
          subtitle="Needing attention"
          icon={<AlertCircle size={18} />}
          color="amber"
        />
        <KPICard
          title="Opportunity Matches"
          value={<AnimatedNumber value={student.opportunityMatches} />}
          subtitle="Above 60% match"
          icon={<Briefcase size={18} />}
          color="green"
          trend={{ value: 3, label: 'new this week' }}
        />
      </div>

      {/* ── Main content: skills + readiness ────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Skill profile — left 2 cols */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Skill Profile</h2>
              <p className="text-xs text-gray-400 mt-0.5">Your latest assessed competencies</p>
            </div>
            <Link href="/student/skills">
              <Button variant="ghost" size="sm">
                Full Profile <ArrowRight size={13} />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Technical Skills</p>
              {technical.map((skill) => (
                <div key={skill.id} className="mb-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      {skill.trend === 'up' && (
                        <TrendingUp size={11} className="text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 tabular">{skill.score}%</span>
                      <Badge
                        variant={skill.level === 'Advanced' ? 'indigo' : skill.level === 'Intermediate' ? 'info' : 'default'}
                        size="xs"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                  <ProgressBar value={skill.score} color="auto" showValue={false} size="xs" animate />
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Soft Skills</p>
              {soft.map((skill) => (
                <div key={skill.id} className="mb-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 tabular">{skill.score}%</span>
                      <Badge
                        variant={skill.level === 'Advanced' ? 'indigo' : skill.level === 'Intermediate' ? 'info' : 'default'}
                        size="xs"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                  <ProgressBar value={skill.score} color="auto" showValue={false} size="xs" animate />
                </div>
              ))}

              {/* Strengths chip list */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Top Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {topSkills.map((s) => (
                    <span key={s.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 size={9} />{s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Skill gaps + next steps */}
        <div className="space-y-5">
          {/* Skill gaps */}
          <Card accent="amber">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={16} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">Skill Gaps</h3>
              <Badge variant="warning" size="xs" className="ml-auto">{mockSkillGaps.length} gaps</Badge>
            </div>
            <div className="space-y-3">
              {mockSkillGaps.map((gap) => (
                <div key={gap.skillId} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{gap.skillName}</span>
                    <Badge variant={gap.priority === 'High' ? 'danger' : 'warning'} size="xs">
                      {gap.priority}
                    </Badge>
                  </div>
                  {/* dual bar: current vs required */}
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-visible">
                    <div className="absolute h-full bg-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${gap.currentScore}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-500 rounded-full"
                      style={{ left: `${gap.requiredScore}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>You: <strong className="text-amber-600">{gap.currentScore}%</strong></span>
                    <span>Need: <strong className="text-indigo-600">{gap.requiredScore}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/learning" className="block mt-4">
              <Button variant="secondary" size="sm" className="w-full">
                <BookOpen size={13} /> Get Learning Plan
              </Button>
            </Link>
          </Card>

          {/* Loop progress */}
          <Card tint="indigo" className="border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Zap size={12} />
              </div>
              <p className="text-xs font-semibold text-indigo-900">Skill Intelligence Loop</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { step: 1, label: 'Assess',  done: true  },
                { step: 2, label: 'Gaps',    done: true  },
                { step: 3, label: 'Match',   done: false, active: true },
                { step: 4, label: 'Learn',   done: false },
                { step: 5, label: 'Improve', done: false },
                { step: 6, label: 'Repeat',  done: false },
              ].map((s) => (
                <div key={s.step}
                  className={`rounded-lg p-2 text-center text-[10px] font-semibold transition-all ${
                    s.done   ? 'bg-indigo-500 text-white' :
                    s.active ? 'bg-indigo-600 text-white ring-2 ring-indigo-300' :
                    'bg-indigo-50 text-indigo-300'
                  }`}
                >
                  {s.done && <span className="block text-xs mb-0.5">✓</span>}
                  {s.active && <span className="block text-xs mb-0.5">→</span>}
                  {s.label}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-indigo-500 mt-2.5 text-center">
              Currently at step 3: Finding opportunities that fit your profile
            </p>
          </Card>
        </div>
      </div>

      {/* ── Recommended Actions ───────────────────────────────────────────── */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recommended Actions</h2>
            <p className="text-xs text-gray-400 mt-0.5">Personalised based on your skill profile</p>
          </div>
          <Badge variant="indigo">{recommendedActions.length} pending</Badge>
        </div>
        <div className="space-y-2">
          {recommendedActions.map((action) => (
            <Link key={action.id} href={action.href}>
              <div className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  action.type === 'Opportunity' ? 'bg-emerald-50 text-emerald-600' :
                  action.type === 'Learning'    ? 'bg-indigo-50 text-indigo-600' :
                  action.type === 'Certification' ? 'bg-sky-50 text-sky-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {action.type === 'Opportunity' ? <Briefcase size={14} /> :
                   action.type === 'Learning'    ? <BookOpen size={14} /> :
                   action.type === 'Certification' ? <CheckCircle2 size={14} /> :
                   <ClipboardCheck size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-800">{action.label}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={typeColor[action.type]} size="xs">{action.type}</Badge>
                  <Badge variant={action.priority === 'High' ? 'danger' : 'warning'} size="xs">{action.priority}</Badge>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* ── Reassess nudge ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <RefreshCw size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-900">Keep your profile current</p>
            <p className="text-xs text-indigo-600">Last assessed 3 weeks ago · Reassessing improves your opportunity matches</p>
          </div>
        </div>
        <Link href="/student/assessments">
          <Button variant="primary" size="sm">Reassess Now</Button>
        </Link>
      </div>
    </div>
  )
}
