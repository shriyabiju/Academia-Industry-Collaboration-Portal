'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import { mockStudents } from '@/data/students'

export default function InstitutionStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Overview</h1>
        <Button variant="outline" size="sm">Export CSV</Button>
      </div>
      <Card padding="none" className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Student', 'Institution', 'Year', 'Domains', 'Competency', 'Gaps', 'Matches', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{s.institution}</td>
                <td className="px-4 py-3 text-gray-600">Year {s.year}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.domains.slice(0, 1).map((d) => <Badge key={d} variant="indigo" size="sm">{d}</Badge>)}
                  </div>
                </td>
                <td className="px-4 py-3 w-32">
                  <ProgressBar value={s.overallCompetency} showValue={true} size="xs" />
                </td>
                <td className="px-4 py-3">
                  <Badge variant={s.skillGaps > 3 ? 'warning' : 'success'} size="sm">{s.skillGaps}</Badge>
                </td>
                <td className="px-4 py-3 text-indigo-600 font-medium">{s.opportunityMatches}</td>
                <td className="px-4 py-3">
                  <Badge variant="success" dot size="sm">Assessed</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
