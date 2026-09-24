'use client'
import React from 'react'
import Link from 'next/link'
import {
  Users, Briefcase, Target, FileText, Plus, ArrowRight,
  TrendingUp, CheckCircle2, AlertCircle, Building2,
  ChevronRight, Zap,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { mockOpportunities } from '@/data/opportunities'
import { mockStudentMatches, mockSkillDemand } from '@/data/industry'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell,
} from 'recharts'

// ─── Rank badge ───────────────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  const styles = [
    'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300',
    'bg-gray-100 text-gray-600 ring-2 ring-gray-300',
    'bg-orange-100 text-orange-700 ring-2 ring-orange-300',
  ]
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${styles[rank] ?? 'bg-gray-50 text-gray-500'}`}>
      #{rank + 1}
    </div>
  )
}

// ─── Candidate row ────────────────────────────────────────────────────────────
function CandidateRow({ m, rank }: { m: typeof mockStudentMatches[0]['matches'][0]; rank: number }) {
  const color = m.matchScore >= 85 ? 'text-emerald-600' : m.matchScore >= 70 ? 'text-amber-600' : 'text-gray-500'
  const ring  = m.matchScore >= 85 ? 'ring-emerald-200' : m.matchScore >= 70 ? 'ring-amber-200' : 'ring-gray-200'

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
      <RankBadge rank={rank} />

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
        {m.studentName.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{m.studentName}</p>
            <p className="text-xs text-gray-400 truncate">{m.institution} · Y{m.year}</p>
          </div>
          {/* Score ring */}
          <div className={`flex-shrink-0 w-11 h-11 rounded-full ring-3 ${ring} flex flex-col items-center justify-center bg-white`}>
            <span className={`text-sm font-extrabold tabular leading-none ${color}`}>{m.matchScore}%</span>
            <span className="text-[8px] text-gray-400">match</span>
          </div>
        </div>

        {/* Skill chips — wrap on mobile */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {m.matchedSkills.slice(0, 3).map((s) => (
            <span key={s} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              <CheckCircle2 size={8} />{s}
            </span>
          ))}
          {m.skillGaps.slice(0, 2).map((s) => (
            <span key={s} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
              <AlertCircle size={8} />{s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Badge variant={m.assessmentStatus === 'Completed' ? 'success' : 'warning'} size="xs" dot>
            {m.assessmentStatus}
          </Badge>
          <Button variant="outline" size="xs">Profile</Button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IndustryDashboard() {
  const topMatches = mockStudentMatches[0]?.matches.slice(0, 4) ?? []
  const allOpps = mockOpportunities

  return (
    <div className="space-y-8 page-enter">

      {/* ── Header ── */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 rounded-2xl overflow-hidden shadow-card-md">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative flex items-center justify-between gap-6 p-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Building2 size={16} className="text-white" />
              </div>
              <span className="text-blue-200 text-sm font-medium">Industry Partner Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-white">TechCorp India</h1>
            <p className="text-blue-300 text-sm mt-0.5">Software & Technology · Bengaluru, Karnataka</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-white/20 text-white border-white/20">4 Active Opportunities</Badge>
              <Badge className="bg-blue-500/40 text-blue-100 border-blue-400/30" dot>87 Total Hires</Badge>
            </div>
          </div>
          <Link href="/industry/opportunities/new">
            <Button className="bg-white text-blue-700 hover:bg-blue-50 shadow font-semibold">
              <Plus size={15} /> Post Opportunity
            </Button>
          </Link>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Opportunities"
          value={<AnimatedNumber value={4} />}
          subtitle="2 closing this month"
          icon={<Briefcase size={18} />}
          color="indigo"
        />
        <KPICard
          title="Skill Requirements"
          value={<AnimatedNumber value={6} />}
          subtitle="Defined across roles"
          icon={<Target size={18} />}
          color="blue"
        />
        <KPICard
          title="Student Matches"
          value={<AnimatedNumber value={18} />}
          subtitle="Above 70% match score"
          icon={<Users size={18} />}
          color="green"
          trend={{ value: 12, label: 'this month' }}
        />
        <KPICard
          title="Applications"
          value={<AnimatedNumber value={34} />}
          subtitle="7 shortlisted"
          icon={<FileText size={18} />}
          color="amber"
          trend={{ value: 8, label: 'vs last week' }}
        />
      </div>

      {/* ── Top candidates + skill demand — stack on mobile ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Candidate list */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Top Matched Candidates</h2>
              <p className="text-xs text-gray-400 mt-0.5">Software Engineering Intern · Ranked by skill match</p>
            </div>
            <Link href="/industry/matches">
              <Button variant="ghost" size="sm">
                All Candidates <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className="space-y-1">
            {topMatches.map((m, i) => (
              <CandidateRow key={m.studentId} m={m} rank={i} />
            ))}
          </div>
          <Link href="/industry/matches" className="block mt-3">
            <Button variant="outline" size="sm" className="w-full">
              View Full Candidate Ranking
            </Button>
          </Link>
        </Card>

        {/* Skill demand chart */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Market Skill Demand</h2>
          <p className="text-xs text-gray-400 mb-4">Industry-wide demand across partners</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockSkillDemand.slice(0, 6)} layout="vertical" margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 10, fill: '#6b7280' }} width={90} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 10, border: '1px solid #e5e7eb' }}
                formatter={((v: unknown) => [`${v}%`, 'Demand']) as never}
              />
              <Bar dataKey="demand" radius={[0, 6, 6, 0]} maxBarSize={14}>
                {mockSkillDemand.slice(0, 6).map((entry, i) => (
                  <Cell key={i} fill={entry.demand >= 80 ? '#4f46e5' : entry.demand >= 70 ? '#6366f1' : '#a5b4fc'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Active opportunities table ── */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Active Opportunities</h2>
            <p className="text-xs text-gray-400 mt-0.5">All open roles with live match counts</p>
          </div>
          <Link href="/industry/opportunities">
            <Button variant="ghost" size="sm">Manage <ChevronRight size={13} /></Button>
          </Link>
        </div>
        {/* Horizontally scrollable on mobile */}
        <div className="table-responsive">
          <table className="table-base">
            <thead>
              <tr>
                <th>Role</th>
                <th>Type</th>
                <th>Location</th>
                <th>Deadline</th>
                <th>Matches</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allOpps.slice(0, 4).map((opp) => {
                const matchCount = mockStudentMatches.find((m) => m.opportunityId === opp.id)?.matches.length ?? 0
                return (
                  <tr key={opp.id}>
                    <td>
                      <p className="font-medium text-gray-900 whitespace-nowrap">{opp.title}</p>
                      <p className="text-xs text-gray-400">{opp.company}</p>
                    </td>
                    <td><Badge variant="indigo" size="xs">{opp.type}</Badge></td>
                    <td className="text-gray-500 whitespace-nowrap">{opp.location}</td>
                    <td className="text-gray-500 tabular whitespace-nowrap">
                      {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td>
                      <span className="font-semibold text-indigo-600 tabular">{matchCount}</span>
                      <span className="text-xs text-gray-400 ml-1">students</span>
                    </td>
                    <td><Badge variant="success" size="xs" dot>Active</Badge></td>
                    <td>
                      <Link href="/industry/matches">
                        <Button variant="ghost" size="xs">View</Button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Insight strip ── */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl">
        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Zap size={15} />
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-900">Skill Intelligence Insight</p>
          <p className="text-sm text-indigo-700 mt-0.5 leading-relaxed">
            React and Cloud Deployment are your most in-demand skills with the least supply in the current student cohort.
            Consider posting training programs to close this gap and build a stronger pipeline.
          </p>
        </div>
        <Link href="/industry/opportunities/new" className="flex-shrink-0">
          <Button variant="secondary" size="sm">Post Training</Button>
        </Link>
      </div>
    </div>
  )
}
