'use client'
import React from 'react'
import Link from 'next/link'
import { Users, Briefcase, Target, FileText, Plus, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { mockOpportunities } from '@/data/opportunities'
import { mockStudentMatches, mockSkillDemand } from '@/data/industry'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function IndustryDashboard() {
  const topMatches = mockStudentMatches[0]?.matches.slice(0, 3) ?? []

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="text-2xl font-bold text-gray-900">TechCorp India</h1>
          <p className="text-sm text-gray-500">Industry Partner Dashboard</p>
        </div>
        <Link href="/industry/opportunities/new">
          <Button variant="primary">
            <Plus size={16} /> Post Opportunity
          </Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Opportunities" value="4" subtitle="2 closing soon" icon={<Briefcase size={20} />} color="indigo" />
        <KPICard title="Required Skills" value="6" subtitle="defined across roles" icon={<Target size={20} />} color="blue" />
        <KPICard title="Student Matches" value="18" subtitle="above 70% match" icon={<Users size={20} />} color="green" trend={{ value: 12, label: 'this month' }} />
        <KPICard title="Applications" value="34" subtitle="7 shortlisted" icon={<FileText size={20} />} color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top matches */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Top Student Matches</h2>
            <Link href="/industry/matches">
              <Button variant="ghost" size="sm">View All <ArrowRight size={14} /></Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400 mb-3">Software Engineering Intern</p>
          <div className="space-y-3">
            {topMatches.map((m, i) => (
              <div key={m.studentId} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-indigo-50/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {m.studentName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{m.studentName}</p>
                  <p className="text-xs text-gray-400 truncate">{m.institution} · {m.course}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-base font-bold ${m.matchScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                    {m.matchScore}%
                  </div>
                  <Badge variant={m.assessmentStatus === 'Completed' ? 'success' : 'warning'} size="sm">
                    {m.assessmentStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Link href="/industry/matches">
            <Button variant="outline" size="sm" className="w-full mt-3">View All Matches</Button>
          </Link>
        </Card>

        {/* Skill demand chart */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Your Skill Requirements vs. Market</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockSkillDemand.slice(0, 6)} layout="vertical" margin={{ left: 90 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11 }} width={90} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={((v: unknown) => [`${v}%`, 'Market Demand']) as never}
              />
              <Bar dataKey="demand" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Active opportunities */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Active Opportunities</h2>
          <Link href="/industry/opportunities">
            <Button variant="ghost" size="sm">View All <ArrowRight size={14} /></Button>
          </Link>
        </div>
        <div className="space-y-3">
          {mockOpportunities.slice(0, 3).map((opp) => (
            <div key={opp.id} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
              <div>
                <p className="text-sm font-semibold text-gray-900">{opp.title}</p>
                <p className="text-xs text-gray-400">{opp.type} · {opp.location} · Deadline: {opp.deadline}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">
                    {mockStudentMatches.find((m) => m.opportunityId === opp.id)?.matches.length ?? 0}
                  </div>
                  <div className="text-xs text-gray-400">matches</div>
                </div>
                <Badge variant="success" dot>Active</Badge>
                <Link href={`/industry/matches`}>
                  <Button variant="outline" size="sm">View Matches</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
