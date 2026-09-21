'use client'
import React from 'react'
import Link from 'next/link'
import {
  Brain,
  Briefcase,
  ClipboardCheck,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import SkillTag from '@/components/ui/SkillTag'
import SkillLoop from '@/components/shared/SkillLoop'
import { mockStudentSkills, mockSkillGaps } from '@/data/skills'
import { currentStudent } from '@/data/students'

const recommendedActions = [
  { id: 1, label: 'Complete React Fundamentals training', type: 'Learning', href: '/student/learning', priority: 'High' },
  { id: 2, label: 'Take AWS Cloud Practitioner certification', type: 'Certification', href: '/student/learning', priority: 'High' },
  { id: 3, label: 'Reattempt Software Dev assessment to update profile', type: 'Assessment', href: '/student/assessments', priority: 'Medium' },
  { id: 4, label: 'Apply to Software Engineering Internship (84% match)', type: 'Opportunity', href: '/student/opportunities', priority: 'High' },
]

export default function StudentDashboard() {
  const student = currentStudent
  const technicalSkills = mockStudentSkills.filter((s) => s.category === 'Technical')
  const softSkills = mockStudentSkills.filter((s) => s.category === 'Soft')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">Good morning 👋</p>
          <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {student.institution} · {student.course} · Year {student.year}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student/assessments">
            <Button variant="outline" size="sm">
              <ClipboardCheck size={15} />
              Take Assessment
            </Button>
          </Link>
          <Link href="/student/opportunities">
            <Button variant="primary" size="sm">
              <Briefcase size={15} />
              View Opportunities
            </Button>
          </Link>
        </div>
      </div>

      {/* Skill Intelligence Loop progress */}
      <Card padding="sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Skill Intelligence Loop</p>
          <Badge variant="indigo" size="sm">Step 3 of 6 · Matching</Badge>
        </div>
        <SkillLoop activeStep={3} orientation="horizontal" size="sm" />
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Overall Competency"
          value={`${student.overallCompetency}%`}
          subtitle="Based on latest assessment"
          icon={<Brain size={20} />}
          color="indigo"
          trend={{ value: 5, label: 'since last month' }}
        />
        <KPICard
          title="Skills Assessed"
          value={student.skillsAssessed}
          subtitle="Across all domains"
          icon={<ClipboardCheck size={20} />}
          color="blue"
        />
        <KPICard
          title="Skill Gaps"
          value={student.skillGaps}
          subtitle="Needing attention"
          icon={<AlertCircle size={20} />}
          color="amber"
        />
        <KPICard
          title="Opportunity Matches"
          value={student.opportunityMatches}
          subtitle="Above 60% match"
          icon={<Briefcase size={20} />}
          color="green"
          trend={{ value: 3, label: 'new this week' }}
        />
      </div>

      {/* Skill Profile + Gaps */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Profile */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">My Skill Profile</h2>
            <Link href="/student/skills">
              <Button variant="ghost" size="sm">
                Full Profile <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Technical</p>
              {technicalSkills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="mb-3">
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
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Soft Skills</p>
              {softSkills.map((skill) => (
                <div key={skill.id} className="mb-3">
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
          </div>
        </Card>

        {/* Strengths + Gaps */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-green-500" />
              Your Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Problem Solving', 'Git & Version Control', 'Communication'].map((s) => (
                <SkillTag key={s} name={s} matched />
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle size={15} className="text-amber-500" />
              Skill Gaps
            </h3>
            <div className="flex flex-wrap gap-2">
              {mockSkillGaps.map((gap) => (
                <SkillTag key={gap.skillId} name={gap.skillName} gap />
              ))}
            </div>
            <Link href="/student/learning">
              <Button variant="secondary" size="sm" className="w-full mt-3">
                <BookOpen size={14} />
                Close Gaps
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recommended Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recommended Actions</h2>
          <Badge variant="indigo">{recommendedActions.length} pending</Badge>
        </div>
        <div className="space-y-3">
          {recommendedActions.map((action) => {
            const typeColor: Record<string, 'indigo' | 'info' | 'success' | 'warning'> = {
              Learning: 'indigo',
              Certification: 'info',
              Assessment: 'warning',
              Opportunity: 'success',
            }
            return (
              <Link key={action.id} href={action.href}>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <Badge variant={typeColor[action.type]} size="sm">{action.type}</Badge>
                  <span className="text-sm text-gray-700 flex-1">{action.label}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={action.priority === 'High' ? 'danger' : 'warning'} size="sm">{action.priority}</Badge>
                    <ArrowRight size={14} className="text-gray-300" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Card>

      {/* Loop reminder */}
      <Card padding="sm" className="border-indigo-100 bg-indigo-50/50">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-900">Keep your profile current</p>
              <p className="text-xs text-indigo-600">Last assessment: 3 weeks ago. Reassessing improves your opportunity matches.</p>
            </div>
          </div>
          <Link href="/student/assessments">
            <Button variant="primary" size="sm">
              Reassess Now
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
