'use client'
import React, { useState } from 'react'
import { Search, SlidersHorizontal, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import OpportunityCard from '@/components/ui/OpportunityCard'
import SkillLoop from '@/components/shared/SkillLoop'
import { mockOpportunities } from '@/data/opportunities'

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState<string>('All')
  const types = ['All', 'Internship', 'Project', 'Training']

  const filtered = filter === 'All' ? mockOpportunities : mockOpportunities.filter((o) => o.type === filter)
  const sorted = [...filtered].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Opportunity Matching</h1>
          <p className="text-sm text-gray-500 mt-1">
            Opportunities matched to your skill profile — ordered by match score
          </p>
        </div>
      </div>

      {/* Loop context */}
      <Card padding="sm" className="bg-indigo-50/60 border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} className="text-indigo-600" />
          <p className="text-xs font-semibold text-indigo-800">Skill Intelligence Loop — Step 3: Match</p>
        </div>
        <p className="text-xs text-indigo-600 mb-2">
          Your skill profile was used to rank these opportunities. Match scores are based on your assessed competencies vs. required skills.
          <span className="font-semibold"> This is prototype data — future versions use Sentence Transformers + Scikit-learn.</span>
        </p>
        <SkillLoop activeStep={3} orientation="horizontal" size="sm" />
      </Card>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search opportunities..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === t ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Match score legend */}
      <div className="flex items-center gap-6 text-xs text-gray-500 flex-wrap">
        <span className="font-medium text-gray-700">Match Score:</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" /> 80%+ Strong match</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400" /> 65–79% Good match</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-400" /> &lt;65% Partial match</span>
      </div>

      {/* Opportunity grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} showMatchScore portal="student" />
        ))}
      </div>

      {sorted.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-400 text-sm">No opportunities match the selected filter.</p>
        </Card>
      )}
    </div>
  )
}
