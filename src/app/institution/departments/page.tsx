'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'

const depts = [
  { name: 'Computer Science', students: 420, assessed: 89, avgCompetency: 71, placements: 74 },
  { name: 'Information Technology', students: 380, assessed: 82, avgCompetency: 68, placements: 70 },
  { name: 'Electronics & Communication', students: 340, assessed: 71, avgCompetency: 62, placements: 65 },
  { name: 'Electrical Engineering', students: 300, assessed: 65, avgCompetency: 59, placements: 61 },
  { name: 'Mechanical Engineering', students: 280, assessed: 58, avgCompetency: 55, placements: 56 },
]

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Department Overview</h1>
      <div className="grid gap-5">
        {depts.map((d) => (
          <Card key={d.name}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{d.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{d.students} students enrolled</p>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center flex-shrink-0">
                {[
                  { label: 'Assessed', value: `${d.assessed}%` },
                  { label: 'Avg Competency', value: `${d.avgCompetency}%` },
                  { label: 'Placed', value: `${d.placements}%` },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-bold text-indigo-600">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <ProgressBar value={d.assessed} label="Assessment Coverage" size="xs" />
              <ProgressBar value={d.avgCompetency} label="Avg Competency" size="xs" />
              <ProgressBar value={d.placements} label="Placement Rate" size="xs" color="green" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
