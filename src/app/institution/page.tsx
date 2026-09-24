'use client'
import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'
import {
  Users, TrendingUp, Briefcase, Target, Filter, Download,
  AlertCircle, CheckCircle2, Zap, Building2,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import Tabs, { useTabs } from '@/components/ui/Tabs'
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

export default function InstitutionAnalyticsPage() {
  const [dept, setDept]     = useState('All Departments')
  const [period, setPeriod] = useState('2025–26')
  const { active: activeTab, setActive: setActiveTab } = useTabs('overview')

  const kpis = mockInstitutionalKPIs

  return (
    <div className="space-y-8 page-enter">

      {/* ── Header ── */}
      <div className="relative bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-2xl overflow-hidden shadow-card-md">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative flex items-start justify-between gap-6 p-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Building2 size={16} className="text-white" />
              </div>
              <span className="text-emerald-200 text-sm font-medium">Institution Admin</span>
            </div>
            <h1 className="text-2xl font-bold text-white">BITS Pilani</h1>
            <p className="text-emerald-300 text-sm mt-0.5">Institutional Intelligence Dashboard · Academic Year {period}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/20">
                <AnimatedNumber value={kpis.totalStudents} /> Total Students
              </Badge>
              <Badge className="bg-emerald-500/40 text-emerald-100 border-emerald-400/30" dot>
                {kpis.assessmentCoverage}% Assessed
              </Badge>
              <Badge className="bg-cyan-500/40 text-cyan-100 border-cyan-400/30">
                {kpis.industryPartners} Industry Partners
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Button className="bg-white/15 border border-white/25 text-white hover:bg-white/25 backdrop-blur-sm" size="sm">
              <Download size={13} /> Export
            </Button>
          </div>
        </div>
      </div>

      {/* ── Filters — wrap gracefully on mobile ── */}
      <Card padding="sm">
        <div className="flex flex-wrap items-center gap-2.5">
          <Filter size={14} className="text-gray-400 flex-shrink-0" />
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="select-base flex-1 min-w-32">
            {mockDepartmentFilter.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="select-base flex-1 min-w-28">
            {['All Courses', 'B.Tech', 'M.Tech', 'MBA', 'PhD'].map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="select-base flex-1 min-w-24">
            {['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4'].map((y) => <option key={y}>{y}</option>)}
          </select>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="select-base flex-1 min-w-28">
            {['2025–26', '2024–25', '2023–24'].map((y) => <option key={y}>{y}</option>)}
          </select>
          <Button variant="primary" size="sm" className="flex-shrink-0">Apply Filters</Button>
        </div>
      </Card>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Students Assessed"
          value={<AnimatedNumber value={kpis.studentsAssessed} />}
          subtitle={`of ${kpis.totalStudents} · ${kpis.assessmentCoverage}% coverage`}
          icon={<Users size={18} />}
          color="indigo"
          trend={{ value: 8, label: 'vs last year' }}
        />
        <KPICard
          title="Students Matched"
          value={<AnimatedNumber value={kpis.studentsMatched} />}
          subtitle="to industry opportunities"
          icon={<Target size={18} />}
          color="blue"
          trend={{ value: 12, label: 'vs last year' }}
        />
        <KPICard
          title="Active Internships"
          value={<AnimatedNumber value={kpis.activeInternships} />}
          subtitle={`${kpis.industryPartners} industry partners`}
          icon={<Briefcase size={18} />}
          color="green"
          trend={{ value: 18, label: 'vs last year' }}
        />
        <KPICard
          title="Placement Progress"
          value={<AnimatedNumber value={kpis.placementProgress} suffix="%" />}
          subtitle="of final year students"
          icon={<TrendingUp size={18} />}
          color="amber"
          trend={{ value: 6, label: 'vs last year' }}
        />
      </div>

      {/* ── Tab navigation ── */}
      <Tabs
        tabs={[
          { id: 'overview',  label: 'Skill Gaps' },
          { id: 'placement', label: 'Placement Pipeline' },
          { id: 'demand',    label: 'Industry Demand' },
          { id: 'domains',   label: 'Career Domains' },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* ── Tab: Skill Gaps ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-900">Top Student Skill Gaps</h2>
              <Badge variant="warning" size="sm">Curriculum Insight</Badge>
            </div>
            <p className="text-xs text-gray-400 mb-5">Most common skill gaps across assessed students</p>
            <div className="space-y-4">
              {mockSkillGapData.map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{item.students} students</span>
                      <span className="text-xs font-bold text-amber-600 tabular">{item.percentage}%</span>
                    </div>
                  </div>
                  <ProgressBar value={item.percentage} color="amber" showValue={false} size="sm" animate />
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            {/* Competency distribution donut */}
            <Card>
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Competency Distribution</h2>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={mockCompetencyDistribution} cx="50%" cy="50%"
                    innerRadius={50} outerRadius={75} dataKey="count">
                    {mockCompetencyDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={((v: unknown, name: unknown) => [`${v} students`, name]) as never}
                    contentStyle={{ fontSize: 11, borderRadius: 10 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {mockCompetencyDistribution.map((item) => (
                  <div key={item.level} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-gray-700 flex-1">{item.level}</span>
                    <span className="text-xs font-bold text-gray-900 tabular">{item.percentage}%</span>
                    <span className="text-xs text-gray-400 tabular">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Avg competency */}
            <Card tint="indigo" className="border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2">Average Competency</p>
              <div className="text-4xl font-extrabold text-indigo-600 tabular mb-2">
                <AnimatedNumber value={kpis.averageCompetency} suffix="%" />
              </div>
              <ProgressBar value={kpis.averageCompetency} color="indigo" showValue={false} size="md" animate />
              <p className="text-xs text-indigo-500 mt-2">Across all assessed students</p>
            </Card>
          </div>
        </div>
      )}

      {/* ── Tab: Placement Pipeline ── */}
      {activeTab === 'placement' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Internship Funnel</h2>
            <p className="text-xs text-gray-400 mb-4">Apr–Sep 2026</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={mockInternshipProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="applied"     fill="#e0e7ff" name="Applied"     radius={[3, 3, 0, 0]} />
                <Bar dataKey="shortlisted" fill="#818cf8" name="Shortlisted" radius={[3, 3, 0, 0]} />
                <Bar dataKey="selected"    fill="#4f46e5" name="Selected"    radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Placement Rate Trend</h2>
            <p className="text-xs text-gray-400 mb-4">Year-over-year placement %</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mockPlacementTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[55, 80]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip
                  formatter={((v: unknown) => [`${v}%`, 'Placement Rate']) as never}
                  contentStyle={{ fontSize: 11, borderRadius: 10 }}
                />
                <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#6366f1' }} name="Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* ── Tab: Industry Demand ── */}
      {activeTab === 'demand' && (
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Industry Skill Demand Trend</h2>
          <p className="text-xs text-gray-400 mb-4">6-month rolling demand across industry partners</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockIndustryDemandTrend ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {[
                { key: 'python', color: '#6366f1', label: 'Python' },
                { key: 'react',  color: '#3b82f6', label: 'React' },
                { key: 'sql',    color: '#10b981', label: 'SQL' },
                { key: 'cloud',  color: '#f59e0b', label: 'Cloud' },
                { key: 'ml',     color: '#8b5cf6', label: 'ML' },
              ].map(({ key, color, label }) => (
                <Line key={key} type="monotone" dataKey={key} stroke={color}
                  strokeWidth={2} dot={false} name={label} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* ── Tab: Career Domains ── */}
      {activeTab === 'domains' && (
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Career Domain Distribution</h2>
          <p className="text-xs text-gray-400 mb-4">Students by career interest domain</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockCareerDomainData} layout="vertical" margin={{ left: 90, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="domain" tick={{ fontSize: 10, fill: '#6b7280' }} width={90} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
              <Bar dataKey="students" radius={[0, 6, 6, 0]} name="Students" maxBarSize={18}>
                {mockCareerDomainData.map((entry, i) => (
                  <Cell key={i} fill={entry.color ?? '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* ── Key insight strip ── */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl">
        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Zap size={15} />
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-900">Key Institutional Insight</p>
          <p className="text-sm text-indigo-700 mt-0.5 leading-relaxed">
            React/Frontend and Cloud Deployment are the top skill gaps affecting{' '}
            <strong>{Math.round((mockSkillGapData[0].students / kpis.studentsAssessed) * 100)}%</strong> and{' '}
            <strong>{Math.round((mockSkillGapData[1].students / kpis.studentsAssessed) * 100)}%</strong> of students.
            Industry demand for these skills has grown steadily over 6 months.
            Adding dedicated modules would directly improve placement outcomes.
          </p>
        </div>
      </div>
    </div>
  )
}
