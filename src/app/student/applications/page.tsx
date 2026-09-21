'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Building2, Clock, CheckCircle2, Circle } from 'lucide-react'

const applications = [
  { id: 1, title: 'Software Engineering Intern', company: 'TechCorp India', applied: '2026-09-10', status: 'Under Review', match: 84 },
  { id: 2, title: 'Data Analyst Intern', company: 'AnalyticsFirst', applied: '2026-09-14', status: 'Shortlisted', match: 76 },
]

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
      {applications.length === 0 ? (
        <Card className="text-center py-16 text-gray-400">You haven't applied to any opportunities yet.</Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                    <Building2 size={13} />{app.company}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <Clock size={12} />Applied {new Date(app.applied).toLocaleDateString('en-IN')} · Match: <span className="text-indigo-600 font-semibold">{app.match}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={app.status === 'Shortlisted' ? 'success' : 'info'} dot>
                    {app.status}
                  </Badge>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
