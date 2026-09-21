'use client'
import React from 'react'
import Link from 'next/link'
import { GraduationCap, Building2, Award, Handshake, Lightbulb, FlaskConical, ArrowRight, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockAcademicPrograms, mockAcademicianKPIs } from '@/data/academician'

const typeIcons: Record<string, React.ReactNode> = {
  'Faculty Internship': <GraduationCap size={16} />,
  'Industrial Training': <Building2 size={16} />,
  'FDP': <Award size={16} />,
  'Mentorship': <Handshake size={16} />,
  'Workshop': <Lightbulb size={16} />,
  'Research Collaboration': <FlaskConical size={16} />,
}

const typeColors: Record<string, 'indigo' | 'blue' | 'purple' | 'success' | 'warning' | 'info'> = {
  'Faculty Internship': 'indigo',
  'Industrial Training': 'blue',
  'FDP': 'purple',
  'Mentorship': 'success',
  'Workshop': 'warning',
  'Research Collaboration': 'info',
}

export default function AcademicianDashboard() {
  const kpis = mockAcademicianKPIs
  const featured = mockAcademicPrograms.slice(0, 4)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500">Welcome back, Dr. Aakash Achari</p>
        <h1 className="text-2xl font-bold text-gray-900">Academician Portal</h1>
        <p className="text-sm text-gray-500 mt-0.5">BITS Pilani · Department of CSE</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Programs" value={kpis.activePrograms} icon={<GraduationCap size={20} />} color="indigo" />
        <KPICard title="Faculty Participating" value={kpis.facultyParticipation} icon={<Award size={20} />} color="purple" />
        <KPICard title="Industry Collaborations" value={kpis.industryCollaborations} icon={<Building2 size={20} />} color="blue" />
        <KPICard title="Research Opportunities" value={kpis.researchOpportunities} icon={<FlaskConical size={20} />} color="green" />
      </div>

      {/* Category quick nav */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(typeIcons).map(([type, icon]) => (
          <Link key={type} href={`/academician/programs?type=${type.toLowerCase().replace(/ /g, '-')}`}>
            <Card hover padding="sm" className="text-center">
              <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2 bg-${typeColors[type]}-50 text-${typeColors[type]}-600`}>
                {icon}
              </div>
              <p className="text-xs font-medium text-gray-700 leading-tight">{type}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured programs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Featured Programs</h2>
          <Link href="/academician/programs">
            <Button variant="ghost" size="sm">View All <ArrowRight size={14} /></Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((prog) => (
            <Card key={prog.id} hover className="flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-${typeColors[prog.type]}-50 text-${typeColors[prog.type]}-600`}>
                    {typeIcons[prog.type]}
                  </div>
                  <Badge variant={typeColors[prog.type]} size="sm">{prog.type}</Badge>
                </div>
                <Badge variant={prog.status === 'Open' ? 'success' : prog.status === 'Closing Soon' ? 'warning' : 'default'} dot size="sm">
                  {prog.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{prog.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{prog.organization}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1 leading-relaxed">{prog.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={11} />Deadline: {prog.deadline}</span>
                {prog.stipend && <span className="text-green-600 font-medium">{prog.stipend}</span>}
              </div>
              <div className="flex gap-2">
                <Link href={`/academician/programs/${prog.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Details</Button>
                </Link>
                <Button variant="primary" size="sm">Apply</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
