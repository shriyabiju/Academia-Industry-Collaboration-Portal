'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const apps = [
  { id: 1, student: 'Deepshikha Chaurasia', role: 'Software Engineering Intern', match: 91, status: 'Shortlisted', date: '2026-09-15' },
  { id: 2, student: 'Shriya Biju', role: 'Software Engineering Intern', match: 84, status: 'Under Review', date: '2026-09-16' },
  { id: 3, student: 'Bakir', role: 'Software Engineering Intern', match: 79, status: 'Under Review', date: '2026-09-17' },
  { id: 4, student: 'Dhruva', role: 'Software Engineering Intern', match: 74, status: 'Under Review', date: '2026-09-18' },
  { id: 5, student: 'Abhinav Nair', role: 'Software Engineering Intern', match: 65, status: 'Under Review', date: '2026-09-19' },
  { id: 6, student: 'Deepshikha Chaurasia', role: 'Data Analyst Intern', match: 88, status: 'Interview Scheduled', date: '2026-09-14' },
  { id: 7, student: 'Shriya Biju', role: 'Data Analyst Intern', match: 76, status: 'Under Review', date: '2026-09-16' },
  { id: 8, student: 'Dhruva', role: 'Data Analyst Intern', match: 70, status: 'Under Review', date: '2026-09-17' },
  { id: 9, student: 'Abhinav Nair', role: 'Data Analyst Intern', match: 62, status: 'Under Review', date: '2026-09-18' },
]

const statusVariant: Record<string, 'success' | 'info' | 'warning' | 'purple'> = {
  Shortlisted: 'success',
  'Under Review': 'info',
  'Interview Scheduled': 'purple',
}

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500">Manage incoming student applications</p>
        </div>
        <div className="flex gap-2 text-xs">
          {['All', 'Under Review', 'Shortlisted', 'Interview Scheduled'].map((s) => (
            <button key={s} className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">{s}</button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {apps.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center">{a.student.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{a.student}</p>
                  <p className="text-xs text-gray-500">{a.role} · Match: <span className="text-indigo-600 font-semibold">{a.match}%</span> · Applied {a.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[a.status] ?? 'info'} dot>{a.status}</Badge>
                <Button variant="outline" size="sm">View Profile</Button>
                <Button variant="primary" size="sm">Shortlist</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
