'use client'
import React from 'react'
import Link from 'next/link'
import {
  MapPin, Clock, Building2, TrendingUp,
  CheckCircle2, AlertCircle, Minus, ArrowRight,
} from 'lucide-react'
import type { Opportunity } from '@/data/opportunities'
import type { MatchedSkill, PartialSkill, MissingSkill } from '@/lib/matching'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'
import ProgressBar from './ProgressBar'
import clsx from 'clsx'

interface OpportunityCardProps {
  opportunity: Opportunity
  showMatchScore?: boolean
  portal?: 'student' | 'industry'
  liveScore?: number
  matchedSkills?: MatchedSkill[]
  partialSkills?: PartialSkill[]
  missingSkills?: MissingSkill[]
}

function matchMeta(score: number): {
  label: string
  labelVariant: 'success' | 'warning' | 'default'
  valueColor: string
  ringColor: string
  barColor: 'green' | 'amber' | 'indigo'
} {
  if (score >= 80) return {
    label: 'Strong Match',
    labelVariant: 'success',
    valueColor: 'text-emerald-600',
    ringColor: 'ring-emerald-200',
    barColor: 'green',
  }
  if (score >= 65) return {
    label: 'Good Match',
    labelVariant: 'warning',
    valueColor: 'text-amber-600',
    ringColor: 'ring-amber-200',
    barColor: 'amber',
  }
  return {
    label: 'Partial Match',
    labelVariant: 'default',
    valueColor: 'text-gray-500',
    ringColor: 'ring-gray-200',
    barColor: 'indigo',
  }
}

const typeVariants: Record<string, 'indigo' | 'success' | 'purple' | 'info' | 'teal'> = {
  Internship:  'indigo',
  Project:     'purple',
  Training:    'info',
  'Full-time': 'success',
  'Part-time': 'teal',
}

export default function OpportunityCard({
  opportunity,
  showMatchScore = true,
  portal = 'student',
  liveScore,
  matchedSkills = [],
  partialSkills = [],
  missingSkills = [],
}: OpportunityCardProps) {
  const score = liveScore ?? opportunity.matchScore ?? 0
  const meta  = matchMeta(score)

  const showMatched = matchedSkills.length > 0
    ? matchedSkills
    : (opportunity.matchedSkills ?? []).map((n) => ({ name: n } as MatchedSkill))

  const showMissing = missingSkills.length > 0
    ? missingSkills
    : (opportunity.missingSkills ?? []).map((n) => ({ name: n } as MissingSkill))

  return (
    <Card hover className="flex flex-col gap-0 overflow-hidden p-0">
      {/* Top accent line based on match quality */}
      <div className={clsx(
        'h-1 w-full rounded-t-2xl',
        score >= 80 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-400' : 'bg-gray-300',
      )} />

      <div className="flex flex-col gap-4 p-5">
        {/* Header: title + match score ring */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <Badge variant={typeVariants[opportunity.type] ?? 'indigo'} size="sm">
                {opportunity.type}
              </Badge>
              {opportunity.domain && (
                <Badge variant="default" size="sm">{opportunity.domain}</Badge>
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">{opportunity.title}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
              <Building2 size={13} className="flex-shrink-0" />
              <span className="font-medium">{opportunity.company}</span>
            </div>
          </div>

          {/* Match score ring */}
          {showMatchScore && (
            <div className={clsx(
              'flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-full ring-4 bg-white',
              meta.ringColor,
            )}>
              <span className={clsx('text-xl font-extrabold tabular leading-none', meta.valueColor)}>
                {score}%
              </span>
              <span className="text-[9px] text-gray-400 leading-none mt-0.5">match</span>
            </div>
          )}
        </div>

        {/* Match quality + progress */}
        {showMatchScore && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Badge variant={meta.labelVariant} size="xs">{meta.label}</Badge>
              <span className="text-xs text-gray-400">
                {showMatched.length} matched · {partialSkills.length} partial · {showMissing.length} missing
              </span>
            </div>
            <ProgressBar value={score} color={meta.barColor} showValue={false} size="xs" animate />
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin size={11} />{opportunity.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />{opportunity.duration}
          </span>
          {opportunity.stipend && (
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp size={11} />{opportunity.stipend}
            </span>
          )}
        </div>

        {/* Skill chips */}
        {(showMatched.length > 0 || partialSkills.length > 0 || showMissing.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {showMatched.slice(0, 3).map((s) => (
              <span key={s.name}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CheckCircle2 size={9} />{s.name}
              </span>
            ))}
            {partialSkills.slice(0, 2).map((s) => (
              <span key={s.name}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                <AlertCircle size={9} />{s.name}
              </span>
            ))}
            {showMissing.slice(0, 2).map((s) => (
              <span key={s.name}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 text-red-600 border border-red-100">
                <Minus size={9} />{s.name}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Link href={`/${portal}/opportunities/${opportunity.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <ArrowRight size={13} />
              View Match
            </Button>
          </Link>
          <Link href={`/${portal}/opportunities/${opportunity.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
