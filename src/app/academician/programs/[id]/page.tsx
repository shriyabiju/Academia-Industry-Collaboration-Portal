'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Users, ChevronLeft, DollarSign } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockAcademicPrograms } from '@/data/academician'

const typeColors: Record<string, 'indigo' | 'blue' | 'purple' | 'success' | 'warning' | 'info'> = {
  'Faculty Internship': 'indigo', 'Industrial Training': 'blue', 'FDP': 'purple',
  'Mentorship': 'success', 'Workshop': 'warning', 'Research Collaboration': 'info',
}

export default function ProgramDetailPage() {
  const { id } = useParams()
  const prog = mockAcademicPrograms.find((p) => p.id === id) ?? mockAcademicPrograms[0]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/academician/programs" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <ChevronLeft size={15} /> Back to Programs
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex gap-2 mb-2">
              <Badge variant={typeColors[prog.type] ?? 'indigo'}>{prog.type}</Badge>
              <Badge variant={prog.status === 'Open' ? 'success' : prog.status === 'Closing Soon' ? 'warning' : 'default'} dot>{prog.status}</Badge>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{prog.title}</h1>
            <p className="text-sm text-gray-600 mt-0.5">{prog.organization} · {prog.domain}</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-5">{prog.description}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {[
            { icon: <Calendar size={14} />, label: 'Duration', value: prog.duration },
            { icon: <MapPin size={14} />, label: 'Location', value: prog.location },
            prog.seats ? { icon: <Users size={14} />, label: 'Seats', value: `${prog.seats} seats` } : null,
            prog.stipend ? { icon: <DollarSign size={14} />, label: 'Stipend', value: prog.stipend } : null,
            { icon: <Calendar size={14} />, label: 'Deadline', value: prog.deadline },
          ].filter(Boolean).map((row) => row && (
            <div key={row.label} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-indigo-500">{row.icon}</span>
              <div>
                <p className="text-xs text-gray-400">{row.label}</p>
                <p className="text-sm font-medium text-gray-800">{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Eligibility</p>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{prog.eligibility}</p>
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {prog.tags.map((t) => <span key={t} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{t}</span>)}
          </div>
        </div>

        {prog.applicants !== undefined && (
          <div className="mb-5 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5">
            <p className="text-sm text-amber-800"><span className="font-semibold">{prog.applicants} people</span> have already applied to this program.</p>
          </div>
        )}

        <Button variant="primary" size="lg" className="w-full" disabled={prog.status === 'Closed'}>
          {prog.status === 'Closed' ? 'Applications Closed' : 'Apply for this Program'}
        </Button>
      </Card>
    </div>
  )
}
