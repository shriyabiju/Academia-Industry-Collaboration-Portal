'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import {
  ArrowRight, TrendingUp, AlertCircle, CheckCircle2,
  Briefcase, Brain, Award, BookOpen,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import Tabs, { useTabs } from '@/components/ui/Tabs'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { mockStudentSkills, mockSkillGaps, skillRadarData } from '@/data/skills'
import { currentStudent } from '@/data/students'

const levelColor = {
  Advanced:     'bg-indigo-500 text-white',
  Intermediate: 'bg-amber-400 text-white',
  Beginner:     'bg-gray-300 text-gray-700',
}

const trendIcon = (t?: string) =>
  t === 'up'   ? <TrendingUp size={11} className="text-emerald-500" /> :
  t === 'down' ? <TrendingUp size={11} className="text-red-400 rotate-180" /> : null

export default function SkillsPage() {
  const { active, setActive } = useTabs('overview')

  const technical = mockStudentSkills.filter((s) => s.category === 'Technical')
  const soft      = mockStudentSkills.filter((s) => s.category === 'Soft')
  const domain    = mockStudentSkills.filter((s) => s.category === 'Domain')

  const categoryAvg = (list: typeof mockStudentSkills) =>
    Math.round(list.reduce((a, s) => a + s.score, 0) / list.length)

  return (
    <div className="space-y-8 page-enter">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skill Intelligence</p>
          <h1 className="text-2xl font-bold text-gray-900">Skill Intelligence Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Verified competency profile built from assessments, projects and industry feedback
          </p>
        </div>
        <Link href="/student/opportunities">
          <Button variant="primary">
            <Briefcase size={14} /> Find Opportunities
          </Button>
        </Link>
      </div>

      {/* ── Hero score card ── */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-card-md overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative flex flex-wrap items-center gap-8">
          <div>
            <p className="text-indigo-200 text-sm font-medium">Overall Competency Score</p>
            <div className="text-6xl font-extrabold mt-1 tabular">
              <AnimatedNumber value={currentStudent.overallCompetency} suffix="%" />
            </div>
            <p className="text-indigo-300 text-sm mt-1">
              Based on {currentStudent.skillsAssessed} skills assessed
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: 'Technical',  value: categoryAvg(technical), color: 'text-white' },
              { label: 'Domain',     value: categoryAvg(domain),    color: 'text-indigo-200' },
              { label: 'Soft Skills',value: categoryAvg(soft),      color: 'text-indigo-300' },
            ].map((item) => (
              <div key={item.label}>
                <div className={`text-3xl font-bold ${item.color} tabular`}>{item.value}%</div>
                <div className="text-xs text-indigo-300 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Advanced',     count: mockStudentSkills.filter((s) => s.level === 'Advanced').length,     dot: 'bg-white' },
              { label: 'Intermediate', count: mockStudentSkills.filter((s) => s.level === 'Intermediate').length, dot: 'bg-indigo-300' },
              { label: 'Beginner',     count: mockStudentSkills.filter((s) => s.level === 'Beginner').length,     dot: 'bg-indigo-400/60' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                <div>
                  <div className="text-xl font-bold text-white tabular">{item.count}</div>
                  <div className="text-[10px] text-indigo-300">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Competency Radar</h2>
          <p className="text-xs text-gray-400 mb-4">Visual overview of your key skill dimensions</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={skillRadarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} />
              <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2.5} dot={{ r: 3, fill: '#6366f1' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Score Breakdown</h2>
          <p className="text-xs text-gray-400 mb-4">All skills ranked by competency score</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[...mockStudentSkills].sort((a, b) => b.score - a.score).map((s) => ({ name: s.name, score: s.score }))}
              layout="vertical" margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} width={80} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={((val: unknown) => [`${val}%`, 'Score']) as never}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} fill="#6366f1" maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Category tabs ── */}
      <Card>
        <Tabs
          tabs={[
            { id: 'overview',   label: 'All Skills',       badge: mockStudentSkills.length },
            { id: 'technical',  label: 'Technical',        badge: technical.length },
            { id: 'domain',     label: 'Domain',           badge: domain.length },
            { id: 'soft',       label: 'Soft Skills',      badge: soft.length },
          ]}
          active={active}
          onChange={setActive}
          className="mb-6"
        />

        {(() => {
          const list =
            active === 'technical' ? technical :
            active === 'domain'    ? domain    :
            active === 'soft'      ? soft      :
            mockStudentSkills

          return (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
              {list.map((skill) => (
                <div key={skill.id} className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                      {trendIcon(skill.trend)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 tabular">{skill.score}%</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${levelColor[skill.level]}`}>
                        {skill.level[0]}
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={skill.score} color="auto" showValue={false} size="sm" animate />
                </div>
              ))}
            </div>
          )
        })()}
      </Card>

      {/* ── Strengths vs Gaps ── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card accent="green">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={17} className="text-emerald-500" />
            <h2 className="text-sm font-semibold text-gray-900">Your Strengths</h2>
          </div>
          <div className="space-y-3">
            {mockStudentSkills.filter((s) => s.level === 'Advanced').map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">{s.name}</span>
                    <span className="text-xs font-bold text-emerald-600 tabular">{s.score}%</span>
                  </div>
                  <ProgressBar value={s.score} color="green" showValue={false} size="xs" animate />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-700 font-medium">
            💡 These skills give you a competitive edge. Highlight them in your applications.
          </div>
        </Card>

        {/* Gaps */}
        <Card accent="amber">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={17} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-900">Skill Gaps to Close</h2>
          </div>
          <div className="space-y-4">
            {mockSkillGaps.map((gap) => (
              <div key={gap.skillId} className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{gap.skillName}</span>
                  <Badge variant={gap.priority === 'High' ? 'danger' : 'warning'} size="xs">
                    {gap.priority} Priority
                  </Badge>
                </div>
                <div className="relative h-2.5 bg-gray-200 rounded-full overflow-visible mb-2">
                  <div className="absolute h-full bg-amber-400 rounded-full transition-all duration-700"
                    style={{ width: `${gap.currentScore}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-full"
                    style={{ left: `${gap.requiredScore}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Current <strong className="text-amber-600">{gap.currentLevel} ({gap.currentScore}%)</strong></span>
                  <span>Required <strong className="text-indigo-600">{gap.requiredLevel} ({gap.requiredScore}%)</strong></span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/student/learning" className="block mt-4">
            <Button variant="secondary" size="sm" className="w-full">
              <BookOpen size={13} /> Get Learning Recommendations <ArrowRight size={13} />
            </Button>
          </Link>
        </Card>
      </div>

      {/* ── Evidence panel ── */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Skill Evidence</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <Brain size={18} />, label: 'Assessment Evidence', count: 3, desc: '3 assessments completed', color: 'indigo', items: ['Software Development', 'Data Science', 'Problem Solving'] },
            { icon: <Award size={18} />, label: 'Project Evidence',    count: 2, desc: '2 projects submitted',   color: 'blue',   items: ['REST API for Student Mgmt', 'Sales Data Dashboard'] },
            { icon: <BookOpen size={18} />, label: 'Certifications',   count: 0, desc: 'No certifications yet', color: 'amber',  items: [] },
          ].map((ev) => (
            <div key={ev.label}
              className={`p-4 rounded-xl bg-${ev.color}-50 border border-${ev.color}-100`}>
              <div className={`w-8 h-8 rounded-lg bg-${ev.color}-100 text-${ev.color}-600 flex items-center justify-center mb-3`}>
                {ev.icon}
              </div>
              <p className="text-sm font-semibold text-gray-900">{ev.label}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-3">{ev.desc}</p>
              {ev.items.length > 0 ? (
                <div className="space-y-1.5">
                  {ev.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <CheckCircle2 size={11} className={`text-${ev.color}-500`} />
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">Earn certifications to strengthen your profile</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
