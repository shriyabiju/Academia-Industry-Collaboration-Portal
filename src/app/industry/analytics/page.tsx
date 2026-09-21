'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import { mockSkillDemand } from '@/data/industry'
import { mockIndustryDemandTrend } from '@/data/analytics'
import { Users, TrendingUp, Briefcase, Target } from 'lucide-react'

export default function IndustryAnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Applications" value="34" icon={<Users size={20} />} color="indigo" />
        <KPICard title="Shortlisted" value="7" subtitle="20.6% conversion" icon={<Target size={20} />} color="green" />
        <KPICard title="Avg Match Score" value="78%" icon={<TrendingUp size={20} />} color="blue" />
        <KPICard title="Roles Filled" value="3" subtitle="this quarter" icon={<Briefcase size={20} />} color="amber" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Skill Demand in Market</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockSkillDemand} layout="vertical" margin={{ left: 90 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11 }} width={90} />
              <Tooltip formatter={((v: unknown) => [`${v}%`, 'Demand']) as never} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="demand" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Skill Demand Trend (6 months)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mockIndustryDemandTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              {['python', 'react', 'sql', 'cloud', 'ml'].map((key, i) => (
                <Line key={key} type="monotone" dataKey={key} stroke={['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][i]} strokeWidth={2} dot={false} name={key.charAt(0).toUpperCase() + key.slice(1)} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
