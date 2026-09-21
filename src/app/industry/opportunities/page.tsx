'use client'
import React from 'react'
import Link from 'next/link'
import { Plus, MapPin, Clock, Users } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockOpportunities } from '@/data/opportunities'
import { mockStudentMatches } from '@/data/industry'

export default function IndustryOpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your posted opportunities</p>
        </div>
        <Link href="/industry/opportunities/new">
          <Button variant="primary"><Plus size={16} /> Post New</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockOpportunities.slice(0, 3).map((opp) => {
          const matches = mockStudentMatches.find((m) => m.opportunityId === opp.id)?.matches.length ?? 0
          return (
            <Card key={opp.id}>
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex gap-2 mb-1">
                    <Badge variant="indigo">{opp.type}</Badge>
                    <Badge variant="success" dot>Active</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={11} />{opp.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{opp.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{matches} matches</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/industry/matches">
                    <Button variant="outline" size="sm">View Matches ({matches})</Button>
                  </Link>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
