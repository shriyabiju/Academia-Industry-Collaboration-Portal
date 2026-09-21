'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { ArrowRight, TrendingUp, AlertCircle, CheckCircle2, Briefcase } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import SkillTag from '@/components/ui/SkillTag'
import { mockStudentSkills, mockSkillGaps, skillRadarData } from '@/data/skills'
import { currentStudent } from '@/data/students'

export default function SkillsPage() {
  const [view, setView] = useState<'overview' | 'technical' | 'soft' | 'domain'>('overview')

  const technical = mockStudentSkills.filter((s) => s.category === 'Technical')
  const soft = mockStudentSkills.filter((s) => s.category === 'Soft')
  const domain = mockStudentSkills.filter((s) => s.category === 'Domain')

  const barData = mockStudentSkills.map((s) => ({ name: s.name, score: s.score, level: s.level }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Intelligence Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Your verified competency profile based on assessments</p>
        </div>
        <Link href="/student/opportunities">
          <Button variant="primary">
            <Briefcase size={15} /> Find Opportunities
          </Button>
        </Link>
      </div>

      {/* Overall score */}
      <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-indigo-200 text-sm font-medium">Overall Competency Score</p>
            <div className="text-6xl font-extrabold mt-1">{currentStudent.overallCompetency}%</div>
            <p className="text-indigo-200 text-sm mt-1">Based on {currentStudent.skillsAssessed} skills assessed</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Advanced', count: mockStudentSkills.filter((s) => s.level === 'Advanced').length, color: 'text-white' },
              { label: 'Intermediate', count: mockStudentSkills.filter((s) => s.level === 'Intermediate').length, color: 'text-indigo-200' },
              { label: 'Beginner', count: mockStudentSkills.filter((s) => s.level === 'Beginner').length, color: 'text-indigo-300' },
            ].map((item) => (
              <div key={item.label}>
                <div className={`text-3xl font-bold ${item.color}`}>{item.count}</div>
                <div className="text-xs text-indigo-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Competency Radar</h2>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={skillRadarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">All Skills — Score Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} width={60} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={((val: unknown) => [`${val}%`, 'Score']) as never}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}
                fill="#6366f1"
                label={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Skills by category */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Technical Skills', skills: technical, color: 'indigo' },
          { label: 'Domain Skills', skills: domain, color: 'blue' },
          { label: 'Soft Skills', skills: soft, color: 'purple' },
        ].map(({ label, skills, color }) => (
          <Card key={label}>
            <h3 className={`text-sm font-semibold text-${color}-600 uppercase tracking-wide mb-4`}>{label}</h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <Badge
                      variant={skill.level === 'Advanced' ? 'indigo' : skill.level === 'Intermediate' ? 'info' : 'default'}
                      size="sm"
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <ProgressBar value={skill.score} showValue={false} size="xs" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Strengths and Gaps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-green-500" />
            <h2 className="text-base font-semibold text-gray-900">Strengths</h2>
          </div>
          <div className="space-y-2">
            {mockStudentSkills.filter((s) => s.level === 'Advanced').map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                    <span className="text-xs font-semibold text-green-600">{s.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-amber-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-amber-500" />
            <h2 className="text-base font-semibold text-gray-900">Skill Gaps — Improvement Areas</h2>
          </div>
          <div className="space-y-3">
            {mockSkillGaps.map((gap) => (
              <div key={gap.skillId} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">{gap.skillName}</span>
                  <Badge variant={gap.priority === 'High' ? 'danger' : 'warning'} size="sm">
                    {gap.priority} Priority
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Current: <strong className="text-amber-700">{gap.currentLevel}</strong></span>
                  <span>→</span>
                  <span>Required: <strong className="text-indigo-700">{gap.requiredLevel}</strong></span>
                  <span className="ml-auto text-amber-600 font-medium">Gap: {gap.gap}pts</span>
                </div>
                <div className="mt-2 relative h-1.5 bg-gray-200 rounded-full">
                  <div className="absolute left-0 top-0 h-full bg-amber-400 rounded-full" style={{ width: `${gap.currentScore}%` }} />
                  <div className="absolute top-0 h-full w-0.5 bg-indigo-500" style={{ left: `${gap.requiredScore}%` }} />
                </div>
              </div>
            ))}
            <Link href="/student/learning">
              <Button variant="secondary" size="sm" className="w-full mt-2">
                Get Learning Recommendations <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
