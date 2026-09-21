'use client'
import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'
import { Users, TrendingUp, Briefcase, Target, Filter, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import {
  mockInstitutionalKPIs,
  mockSkillGapData,
  mockCompetencyDistribution,
  mockInternshipProgress,
  mockCareerDomainData,
  mockPlacementTrend,
  mockIndustryDemandTrend,
  mockDepartmentFilter,
} from '@/data/analytics'

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#f0f4ff']

export default function InstitutionAnalyticsPage() {
  const [dept, setDept] = useState('All Departments')
  const [period, setPeriod] = useState('2025–26')

  const kpis = mockInstitutionalKPIs

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500">BITS Pilani · Admin Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-900">Institutional Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Placement readiness, skill gaps & curriculum insights</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" size="sm">
            <Download size={14} /> Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Filter size={14} /> Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter size={14} className="text-gray-400" />
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          >
            {mockDepartmentFilter.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
            {['All Courses', 'B.Tech', 'M.Tech', 'MBA', 'PhD'].map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
            {['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4'].map((y) => <option key={y}>{y}</option>)}
          </select>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          >
            {['2025–26', '2024–25', '2023–24'].map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
      </Card>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Students Assessed"
          value={kpis.studentsAssessed.toLocaleString()}
          subtitle={`of ${kpis.totalStudents.toLocaleString()} total · ${kpis.assessmentCoverage}% coverage`}
          icon={<Users size={20} />}
          color="indigo"
          trend={{ value: 8, label: 'vs last year' }}
        />
        <KPICard
          title="Students Matched"
          value={kpis.studentsMatched.toLocaleString()}
          subtitle="to industry opportunities"
          icon={<Target size={20} />}
          color="blue"
          trend={{ value: 12, label: 'vs last year' }}
        />
        <KPICard
          title="Active Internships"
          value={kpis.activeInternships}
          subtitle={`${kpis.industryPartners} industry partners`}
          icon={<Briefcase size={20} />}
          color="green"
          trend={{ value: 18, label: 'vs last year' }}
        />
        <KPICard
          title="Placement Progress"
          value={`${kpis.placementProgress}%`}
          subtitle="of final year students placed"
          icon={<TrendingUp size={20} />}
          color="amber"
          trend={{ value: 6, label: 'vs last year' }}
        />
      </div>

      {/* Row 2: Skill Gaps + Competency Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Gap Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Top Student Skill Gaps</h2>
            <Badge variant="warning">Curriculum Insight</Badge>
          </div>
          <p className="text-xs text-gray-500 mb-4">Most common skill gaps across assessed students — use this to guide curriculum updates.</p>
          <div className="space-y-3">
            {mockSkillGapData.map((item) => (
              <div key={item.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{item.students} students</span>
                    <span className="text-xs font-semibold text-amber-600">{item.percentage}%</span>
                  </div>
                </div>
                <ProgressBar value={item.percentage} showValue={false} size="sm" color="amber" />
              </div>
            ))}
          </div>
        </Card>

        {/* Competency Distribution */}
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Competency Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={mockCompetencyDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="count"
                nameKey="level"
              >
                {mockCompetencyDistribution.map((entry, i) => (
                  <Cell key={entry.level} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={((v: unknown, name: unknown) => [`${v} students`, name]) as never} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mockCompetencyDistribution.map((item) => (
              <div key={item.level} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-gray-700 flex-1">{item.level}</span>
                <span className="text-xs font-semibold text-gray-900">{item.percentage}%</span>
                <span className="text-xs text-gray-400">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3: Internship Progress + Career Domains */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Internship Funnel (Apr–Sep 2026)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockInternshipProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="applied" fill="#e0e7ff" name="Applied" radius={[2, 2, 0, 0]} />
              <Bar dataKey="shortlisted" fill="#818cf8" name="Shortlisted" radius={[2, 2, 0, 0]} />
              <Bar dataKey="selected" fill="#4f46e5" name="Selected" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Career Domain Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockCareerDomainData} layout="vertical" margin={{ left: 110 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="domain" tick={{ fontSize: 11 }} width={110} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="students" fill="#6366f1" radius={[0, 4, 4, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 4: Placement Trend + Industry Demand */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Placement Rate Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockPlacementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis domain={[55, 80]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={((v: unknown) => [`${v}%`, 'Placement Rate']) as never} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} name="Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Industry Skill Demand Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockIndustryDemandTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {[
                { key: 'python', color: '#6366f1', label: 'Python' },
                { key: 'react', color: '#3b82f6', label: 'React' },
                { key: 'sql', color: '#10b981', label: 'SQL' },
                { key: 'cloud', color: '#f59e0b', label: 'Cloud' },
                { key: 'ml', color: '#8b5cf6', label: 'ML' },
              ].map(({ key, color, label }) => (
                <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={1.5} dot={false} name={label} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary insight */}
      <Card className="bg-indigo-50/50 border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Target size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-900">Key Institutional Insight</p>
            <p className="text-sm text-indigo-800 mt-1 leading-relaxed">
              React/Frontend and Cloud Deployment are the top skill gaps affecting {Math.round((mockSkillGapData[0].students / kpis.studentsAssessed) * 100)}% and {Math.round((mockSkillGapData[1].students / kpis.studentsAssessed) * 100)}% of students respectively.
              Industry demand for these skills has grown steadily over 6 months. Adding dedicated frontend and cloud modules to the curriculum would directly improve placement outcomes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
