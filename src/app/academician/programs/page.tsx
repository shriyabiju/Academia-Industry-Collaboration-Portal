'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockAcademicPrograms, type AcademicProgramType } from '@/data/academician'

const allTypes: AcademicProgramType[] = [
  'Faculty Internship', 'Industrial Training', 'FDP', 'Workshop', 'Mentorship', 'Research Collaboration',
]

const typeColors: Record<string, 'indigo' | 'blue' | 'purple' | 'success' | 'warning' | 'info'> = {
  'Faculty Internship': 'indigo', 'Industrial Training': 'blue', 'FDP': 'purple',
  'Mentorship': 'success', 'Workshop': 'warning', 'Research Collaboration': 'info',
}

export default function ProgramsPage() {
  const [active, setActive] = useState<string>('All')

  const filtered = active === 'All' ? mockAcademicPrograms : mockAcademicPrograms.filter((p) => p.type === active)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Programs</h1>
        <p className="text-sm text-gray-500 mt-1">Industry programs curated for academic faculty</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...allTypes].map((type) => (
          <button
            key={type}
            onClick={() => setActive(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${active === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((prog) => (
          <Card key={prog.id} hover className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <Badge variant={typeColors[prog.type] ?? 'indigo'} size="sm">{prog.type}</Badge>
              <Badge variant={prog.status === 'Open' ? 'success' : prog.status === 'Closing Soon' ? 'warning' : 'default'} dot size="sm">
                {prog.status}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{prog.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{prog.organization} · {prog.domain}</p>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">{prog.description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
              <span className="flex items-center gap-1"><Calendar size={11} />{prog.duration}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{prog.location}</span>
              {prog.seats && <span className="flex items-center gap-1"><Users size={11} />{prog.seats} seats</span>}
            </div>
            {prog.stipend && (
              <p className="text-xs text-green-600 font-semibold mb-3">{prog.stipend}</p>
            )}
            <p className="text-xs text-gray-500 mb-3">
              <span className="font-medium">Eligibility:</span> {prog.eligibility}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {prog.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-auto">
              <Link href={`/academician/programs/${prog.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Details</Button>
              </Link>
              <Button variant="primary" size="sm" disabled={prog.status === 'Closed'}>
                {prog.status === 'Closed' ? 'Closed' : 'Apply'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
