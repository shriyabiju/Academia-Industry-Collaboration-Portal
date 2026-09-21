'use client'
import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockIndustryPartners } from '@/data/industry'

export default function IndustryProfilePage() {
  const p = mockIndustryPartners[0]
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
      <Card>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">{p.name.charAt(0)}</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
            <p className="text-sm text-gray-500">{p.sector} · {p.location}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-5">{p.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-indigo-600">{p.activeOpportunities}</div>
            <div className="text-xs text-gray-500">Active Opportunities</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{p.totalHires}</div>
            <div className="text-xs text-gray-500">Total Hires via Platform</div>
          </div>
        </div>
      </Card>
      <Button variant="outline">Edit Profile</Button>
    </div>
  )
}
