'use client'
import React from 'react'
import Link from 'next/link'
import { MapPin, Clock, Building2, TrendingUp } from 'lucide-react'
import type { Opportunity } from '@/data/opportunities'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'
import ProgressBar from './ProgressBar'
import SkillTag from './SkillTag'

interface OpportunityCardProps {
  opportunity: Opportunity
  showMatchScore?: boolean
  portal?: 'student' | 'industry'
}

export default function OpportunityCard({
  opportunity,
  showMatchScore = true,
  portal = 'student',
}: OpportunityCardProps) {
  const matchScore = opportunity.matchScore ?? 0

  const matchColor = matchScore >= 80 ? 'text-green-600' : matchScore >= 65 ? 'text-amber-600' : 'text-gray-500'
  const progressColor = matchScore >= 80 ? 'green' : matchScore >= 65 ? 'amber' : 'indigo'

  const typeVariants: Record<string, 'indigo' | 'success' | 'purple' | 'info'> = {
    Internship: 'indigo',
    Project: 'purple',
    Training: 'info',
    'Full-time': 'success',
    'Part-time': 'info',
  }

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={typeVariants[opportunity.type] || 'indigo'}>
              {opportunity.type}
            </Badge>
            {opportunity.domain && (
              <Badge variant="default">{opportunity.domain}</Badge>
            )}
          </div>
          <h3 className="text-base font-semibold text-gray-900 mt-1">{opportunity.title}</h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
            <Building2 size={13} />
            <span>{opportunity.company}</span>
          </div>
        </div>
        {showMatchScore && opportunity.matchScore !== undefined && (
          <div className="flex-shrink-0 text-right">
            <div className={`text-2xl font-bold ${matchColor}`}>{matchScore}%</div>
            <div className="text-xs text-gray-400">Match</div>
          </div>
        )}
      </div>

      {showMatchScore && opportunity.matchScore !== undefined && (
        <ProgressBar
          value={matchScore}
          color={progressColor as 'green' | 'amber' | 'indigo'}
          showValue={false}
          size="xs"
        />
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={11} />
          {opportunity.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {opportunity.duration}
        </span>
        {opportunity.stipend && (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <TrendingUp size={11} />
            {opportunity.stipend}
          </span>
        )}
      </div>

      {opportunity.matchedSkills && opportunity.matchedSkills.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-400 mb-1.5">Matched Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.matchedSkills.slice(0, 4).map((s) => (
              <SkillTag key={s} name={s} matched />
            ))}
            {opportunity.missingSkills?.slice(0, 2).map((s) => (
              <SkillTag key={s} name={s} gap />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <Link href={`/${portal}/opportunities/${opportunity.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/${portal}/opportunities/${opportunity.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Apply
          </Button>
        </Link>
        {portal === 'student' && opportunity.missingSkills && opportunity.missingSkills.length > 0 && (
          <Link href="/student/learning">
            <Button variant="secondary" size="sm">
              Close Gap
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
