'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, Building2, TrendingUp, CheckCircle2, AlertCircle, BookOpen, ChevronLeft } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { mockOpportunities } from '@/data/opportunities'

export default function OpportunityDetailPage() {
  const params = useParams()
  const opp = mockOpportunities.find((o) => o.id === params.id) ?? mockOpportunities[0]
  const matchScore = opp.matchScore ?? 0
  const matchColor = matchScore >= 80 ? 'text-green-600' : matchScore >= 65 ? 'text-amber-600' : 'text-gray-600'

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/student/opportunities" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <ChevronLeft size={15} /> Back to Opportunities
      </Link>

      {/* Header card */}
      <Card>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap mb-2">
              <Badge variant="indigo">{opp.type}</Badge>
              <Badge variant="default">{opp.domain}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{opp.title}</h1>
            <div className="flex items-center gap-1.5 mt-1 text-gray-600">
              <Building2 size={15} /> <span className="font-medium">{opp.company}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} />{opp.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{opp.duration}</span>
              {opp.stipend && <span className="flex items-center gap-1.5 text-green-600 font-medium"><TrendingUp size={14} />{opp.stipend}</span>}
            </div>
          </div>
          {opp.matchScore !== undefined && (
            <div className="text-center bg-gray-50 rounded-xl p-5 min-w-28">
              <div className={`text-4xl font-extrabold ${matchColor}`}>{matchScore}%</div>
              <div className="text-xs text-gray-400 mt-0.5">Match Score</div>
              <ProgressBar value={matchScore} showValue={false} size="xs" className="mt-2 w-20 mx-auto" />
            </div>
          )}
        </div>
      </Card>

      {/* Match explanation */}
      {opp.matchExplanation && (
        <Card className="border-indigo-100 bg-indigo-50/40">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-900 mb-1">Why you match this opportunity</p>
              <p className="text-sm text-indigo-800 leading-relaxed">{opp.matchExplanation}</p>
              <p className="text-xs text-indigo-500 mt-2 italic">
                Match score is based on your assessed skill profile vs. required competencies. Future versions use Sentence Transformers semantic matching.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Description */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-3">About this Opportunity</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{opp.description}</p>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500"><span className="font-medium">Eligibility:</span> {opp.eligibility}</p>
          <p className="text-xs text-gray-500 mt-1"><span className="font-medium">Deadline:</span> {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </Card>

      {/* Required Skills vs Your Profile */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Required Skills vs. Your Profile</h2>
        <div className="space-y-3">
          {opp.requiredSkills.map((skill) => (
            <div key={skill.name} className={`flex items-center gap-4 p-3 rounded-lg border ${skill.isMatched ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
              <div className="flex-shrink-0">
                {skill.isMatched
                  ? <CheckCircle2 size={18} className="text-green-500" />
                  : <AlertCircle size={18} className="text-amber-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm font-semibold text-gray-900">{skill.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Required: <Badge variant="indigo" size="sm">{skill.requiredLevel}</Badge></span>
                    <span className="text-gray-500">Yours: <Badge variant={skill.isMatched ? 'success' : 'warning'} size="sm">{skill.studentLevel}</Badge></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{opp.matchedSkills?.length ?? 0}</div>
            <div className="text-xs text-gray-500">Skills Matched</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-600">{opp.missingSkills?.length ?? 0}</div>
            <div className="text-xs text-gray-500">Gaps to Close</div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="lg" className="flex-1">
          Apply Now
        </Button>
        {opp.missingSkills && opp.missingSkills.length > 0 && (
          <Link href="/student/learning" className="flex-1">
            <Button variant="secondary" size="lg" className="w-full">
              <BookOpen size={16} /> Close Skill Gaps First
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
