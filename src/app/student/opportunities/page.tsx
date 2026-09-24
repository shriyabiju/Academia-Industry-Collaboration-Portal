'use client'
import React, { useMemo, useState } from 'react'
import { Search, Zap, TrendingUp, AlertTriangle, BarChart3, SlidersHorizontal } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import OpportunityCard from '@/components/ui/OpportunityCard'
import EmptyState from '@/components/ui/EmptyState'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { mockOpportunities } from '@/data/opportunities'
import { currentStudent } from '@/data/students'
import {
  calculateOpportunityMatch,
  getMatchedSkills,
  getPartialSkills,
  getMissingSkills,
} from '@/lib/matching'

type FilterType = 'All' | 'Internship' | 'Project' | 'Training'
type SortKey   = 'match' | 'deadline'

export default function OpportunitiesPage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('All')
  const [search,     setSearch]     = useState('')
  const [sortBy,     setSortBy]     = useState<SortKey>('match')

  const student = currentStudent.profile

  // Engine — memoised
  const computed = useMemo(() =>
    mockOpportunities.map((opp) => ({
      opp,
      result:  calculateOpportunityMatch(student, opp.spec),
      matched: getMatchedSkills(student, opp.spec),
      partial: getPartialSkills(student, opp.spec),
      missing: getMissingSkills(student, opp.spec),
    })),
  [student])

  const visible = useMemo(() => {
    let list = computed
    if (typeFilter !== 'All')       list = list.filter((c) => c.opp.type === typeFilter)
    if (search.trim())              list = list.filter((c) =>
      c.opp.title.toLowerCase().includes(search.toLowerCase()) ||
      c.opp.company.toLowerCase().includes(search.toLowerCase()))
    return [...list].sort((a, b) =>
      sortBy === 'match'
        ? b.result.overallScore - a.result.overallScore
        : new Date(a.opp.deadline).getTime() - new Date(b.opp.deadline).getTime())
  }, [computed, typeFilter, search, sortBy])

  const strong  = computed.filter((c) => c.result.overallScore >= 80).length
  const good    = computed.filter((c) => c.result.overallScore >= 65 && c.result.overallScore < 80).length
  const partial = computed.filter((c) => c.result.overallScore < 65).length

  return (
    <div className="space-y-8 page-enter">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Step 3 of 6 — Match</p>
          <h1 className="text-2xl font-bold text-gray-900">Opportunity Matching</h1>
          <p className="text-sm text-gray-500 mt-1">
            Live scores from your assessed skill profile ·{' '}
            <span className="font-medium text-gray-700">Technical 50% · Assessment 20% · Projects 15% · Soft 10% · Experience 5%</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-medium text-indigo-700">
          <Zap size={13} className="text-indigo-500" />
          Engine-scored · Real-time
        </div>
      </div>

      {/* ── Match summary KPIs ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { count: strong,  label: 'Strong Match',  sub: '80%+',   color: 'emerald', icon: <TrendingUp size={15} className="text-emerald-500" /> },
          { count: good,    label: 'Good Match',    sub: '65–79%', color: 'amber',   icon: <BarChart3 size={15} className="text-amber-500" /> },
          { count: partial, label: 'Partial Match', sub: '<65%',   color: 'gray',    icon: <AlertTriangle size={15} className="text-gray-400" /> },
        ].map((item) => (
          <div key={item.label}
            className={`bg-${item.color === 'gray' ? 'gray' : item.color}-50 border border-${item.color === 'gray' ? 'gray' : item.color}-100 rounded-2xl p-4 flex items-center gap-3`}>
            {item.icon}
            <div>
              <div className={`text-2xl font-bold text-${item.color === 'gray' ? 'gray-500' : item.color + '-600'} tabular`}>
                <AnimatedNumber value={item.count} />
              </div>
              <div className="text-xs text-gray-600 font-medium">{item.label}</div>
              <div className="text-[10px] text-gray-400">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + filters ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search by role or company…"
            className="input-base pl-9"
          />
        </div>

        {/* Type filter — scrollable on mobile */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl overflow-x-auto scrollbar-hide flex-shrink-0">
          {(['All', 'Internship', 'Project', 'Training'] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                typeFilter === t
                  ? 'bg-white text-gray-900 shadow-card'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="select-base flex-shrink-0"
        >
          <option value="match">Sort: Best Match</option>
          <option value="deadline">Sort: Deadline</option>
        </select>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <strong className="text-gray-800">{visible.length}</strong> of{' '}
          <strong className="text-gray-800">{computed.length}</strong> opportunities
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-200" /> Matched</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-50 border border-amber-200" /> Partial</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-50 border border-red-100" /> Missing</span>
        </div>
      </div>

      {/* Cards grid — 1 col mobile, 2 md, 3 xl */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {visible.map(({ opp, result, matched, partial: ps, missing }) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              showMatchScore
              portal="student"
              liveScore={result.overallScore}
              matchedSkills={matched}
              partialSkills={ps}
              missingSkills={missing}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SlidersHorizontal size={28} />}
          title="No opportunities match your filters"
          description="Try adjusting the type filter or clearing the search."
          action={{ label: 'Clear Filters', onClick: () => { setTypeFilter('All'); setSearch('') } }}
        />
      )}
    </div>
  )
}
