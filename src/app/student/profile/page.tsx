'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { currentStudent } from '@/data/students'
import { User, Mail, GraduationCap, Calendar, Target } from 'lucide-react'

export default function ProfilePage() {
  const s = currentStudent
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
            {s.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{s.name}</h2>
            <p className="text-sm text-gray-500">{s.email}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: <GraduationCap size={15} />, label: 'Institution', value: s.institution },
            { icon: <User size={15} />, label: 'Course', value: s.course },
            { icon: <Calendar size={15} />, label: 'Year', value: `Year ${s.year} of 4` },
            { icon: <Target size={15} />, label: 'Graduation', value: s.graduationYear.toString() },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-indigo-500">{row.icon}</span>
              <div>
                <p className="text-xs text-gray-400">{row.label}</p>
                <p className="text-sm font-medium text-gray-900">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-2">Career Domains</p>
          <div className="flex flex-wrap gap-2">
            {s.domains.map((d) => <Badge key={d} variant="indigo">{d}</Badge>)}
          </div>
        </div>
      </Card>
      <Button variant="outline">Edit Profile</Button>
    </div>
  )
}
