'use client'
import React, { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Clock, Building2, TrendingUp,
  CheckCircle2, AlertCircle, Minus,
  BookOpen, ChevronLeft, Zap, Award,
  Brain, ClipboardCheck, FolderOpen, Users, Timer,
  RefreshCw, SendHorizontal, Loader2,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { mockOpportunities } from '@/data/opportunities'
import { currentStudent } from '@/data/students'
import {
  calculateOpportunityMatch,
  getMatchedSkills,
  getPartialSkills,
  getMissingSkills,
} from '@/lib/matching'

// ─── small dimension-score row ───────────────────────────────────────────────
function DimensionRow({
  icon,
  label,
  raw,
  contribution,
  weight,
}: {
  icon: React.ReactNode
  label: string
  raw: number
  contribution: number
  weight: string
}) {
  const color: 'green' | 'amber' | 'indigo' =
    raw >= 70 ? 'green' : raw >= 40 ? 'amber' : 'indigo'
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">{weight}</span>
            <span className="font-semibold text-gray-800">{raw}%</span>
            <span className="text-indigo-500 font-bold">+{contribution.toFixed(1)}</span>
          </div>
        </div>
        <ProgressBar value={raw} showValue={false} size="xs" color={color} />
      </div>
    </div>
  )
}

export default function OpportunityDetailPage() {
  const params = useParams()
  const [applied, setApplied]   = useState(false)
  const [applying, setApplying] = useState(false)

  const opp     = mockOpportunities.find((o) => o.id === params.id) ?? mockOpportunities[0]
  const student = currentStudent.profile

  // ── run engine ─────────────────────────────────────────────────────────────
  const result  = useMemo(() => calculateOpportunityMatch(student, opp.spec), [student, opp.spec])
  const matched = useMemo(() => getMatchedSkills(student, opp.spec),          [student, opp.spec])
  const partial = useMemo(() => getPartialSkills(student, opp.spec),           [student, opp.spec])
  const missing = useMemo(() => getMissingSkills(student, opp.spec),           [student, opp.spec])

  const score      = result.overallScore
  const scoreColor = score >= 80 ? 'text-green-600' : score >= 65 ? 'text-amber-600' : 'text-gray-600'
  const scoreBg    = score >= 80 ? 'bg-green-50 border-green-200' : score >= 65 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'

  // ── apply handler ──────────────────────────────────────────────────────────
  const handleApply = async () => {
    if (applied) return
    setApplying(true)
    // FUTURE: POST /api/applications { studentId, opportunityId }
    await new Promise((r) => setTimeout(r, 1000))
    setApplying(false)
    setApplied(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/student/opportunities"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft size={15} /> Back to Opportunities
      </Link>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <Card>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap mb-2">
              <Badge variant="indigo">{opp.type}</Badge>
              <Badge variant="default">{opp.domain}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{opp.title}</h1>
            <div className="flex items-center gap-1.5 mt-1 text-gray-600">
              <Building2 size={15} />
              <span className="font-medium">{opp.company}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} />{opp.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{opp.duration}</span>
              {opp.stipend && (
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <TrendingUp size={14} />{opp.stipend}
                </span>
              )}
            </div>
          </div>

          {/* Live match badge */}
          <div className={`text-center rounded-xl border p-4 min-w-28 ${scoreBg}`}>
            <div className={`text-4xl font-extrabold ${scoreColor}`}>{score}%</div>
            <div className="text-xs text-gray-500 mt-0.5">Match Score</div>
            <ProgressBar
              value={score}
              showValue={false}
              size="xs"
              color={score >= 80 ? 'green' : score >= 65 ? 'amber' : 'indigo'}
              className="mt-2 w-20 mx-auto"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {score >= 80 ? '🟢 Strong' : score >= 65 ? '🟡 Good' : '🔴 Partial'}
            </p>
          </div>
        </div>
      </Card>

      {/* ── Explanation ─────────────────────────────────────────────────────── */}
      <Card className="border-indigo-100 bg-indigo-50/40">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Zap size={15} />
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-900 mb-1">Why you match this opportunity</p>
            <p className="text-sm text-indigo-800 leading-relaxed">{result.explanation}</p>
            <p className="text-xs text-indigo-400 mt-2 italic">
              Computed by the Hire-X matching engine. Future versions use Sentence Transformers + Scikit-learn via FastAPI.
            </p>
          </div>
        </div>
      </Card>

      {/* ── Score Breakdown ──────────────────────────────────────────────────── */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Score Breakdown</h2>
        <div className="space-y-3">
          <DimensionRow
            icon={<Brain size={14} />}
            label="Technical Skills"
            raw={result.technicalScore}
            contribution={result.technicalContribution}
            weight="50%"
          />
          <DimensionRow
            icon={<ClipboardCheck size={14} />}
            label="Assessment Score"
            raw={result.assessmentScore}
            contribution={result.assessmentContribution}
            weight="20%"
          />
          <DimensionRow
            icon={<FolderOpen size={14} />}
            label="Projects & Domain"
            raw={result.projectScore}
            contribution={result.projectContribution}
            weight="15%"
          />
          <DimensionRow
            icon={<Users size={14} />}
            label="Soft Skills"
            raw={result.softSkillScore}
            contribution={result.softSkillContribution}
            weight="10%"
          />
          <DimensionRow
            icon={<Timer size={14} />}
            label="Experience"
            raw={result.experienceScore}
            contribution={result.experienceContribution}
            weight="5%"
          />
        </div>

        {/* Overall total row */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-bold text-gray-900">Overall Match</span>
          <span className={`text-2xl font-extrabold ${scoreColor}`}>{score}%</span>
        </div>
      </Card>

      {/* ── Skill Breakdown ──────────────────────────────────────────────────── */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Required Skills vs. Your Profile</h2>

        {/* Matched */}
        {matched.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
              ✓ Matched ({matched.length})
            </p>
            <div className="space-y-2">
              {matched.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-green-50 border border-green-100"
                >
                  <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 flex-1">{s.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="default" size="sm">Required: {s.requiredLevel}</Badge>
                    <Badge variant="success" size="sm">
                      Yours: {s.studentLevel}
                      {s.isExceeding && ' ↑'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partial */}
        {partial.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
              ⚠ Partial — improve to meet requirement ({partial.length})
            </p>
            <div className="space-y-2">
              {partial.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <AlertCircle size={15} className="text-amber-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 flex-1">{s.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="indigo" size="sm">Required: {s.requiredLevel}</Badge>
                    <Badge variant="warning" size="sm">Yours: {s.studentLevel}</Badge>
                    <span className="text-amber-600 font-semibold">
                      {Math.round(s.satisfaction * 100)}% there
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing */}
        {missing.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
              ✗ Missing — not in your profile ({missing.length})
            </p>
            <div className="space-y-2">
              {missing.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-red-50 border border-red-100"
                >
                  <Minus size={15} className="text-red-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 flex-1">{s.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="indigo" size="sm">Required: {s.requiredLevel}</Badge>
                    <Badge variant="default" size="sm">{s.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary counts */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="text-center bg-green-50 rounded-lg p-2.5">
            <div className="text-xl font-bold text-green-600">{matched.length}</div>
            <div className="text-xs text-gray-500">Matched</div>
          </div>
          <div className="text-center bg-amber-50 rounded-lg p-2.5">
            <div className="text-xl font-bold text-amber-600">{partial.length}</div>
            <div className="text-xs text-gray-500">Partial</div>
          </div>
          <div className="text-center bg-red-50 rounded-lg p-2.5">
            <div className="text-xl font-bold text-red-500">{missing.length}</div>
            <div className="text-xs text-gray-500">Missing</div>
          </div>
        </div>
      </Card>

      {/* ── Recommended Actions ──────────────────────────────────────────────── */}
      {result.recommendations.length > 0 && (
        <Card className="border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-amber-600" />
            <h2 className="text-base font-semibold text-gray-900">Recommended Actions</h2>
          </div>
          <ol className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {rec}
              </li>
            ))}
          </ol>
          {(missing.length > 0 || partial.length > 0) && (
            <Link href="/student/learning" className="mt-4 block">
              <Button variant="secondary" size="sm" className="w-full">
                <BookOpen size={14} /> Go to Learning Recommendations
              </Button>
            </Link>
          )}
        </Card>
      )}

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-3">About this Opportunity</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{opp.description}</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 font-medium">Eligibility</p>
            <p className="text-sm text-gray-700 mt-0.5">{opp.eligibility}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 font-medium">Application Deadline</p>
            <p className="text-sm text-gray-700 mt-0.5">
              {new Date(opp.deadline).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          {opp.spec.preferredCertifications.length > 0 && (
            <div className="p-3 bg-indigo-50 rounded-lg sm:col-span-2">
              <p className="text-xs text-indigo-500 font-medium">Preferred Certifications</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {opp.spec.preferredCertifications.map((c) => (
                  <Badge key={c} variant="indigo" size="sm">{c}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* ── Apply CTA ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {applied ? (
          <div className="flex-1 flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-xl py-3 px-4">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-sm font-semibold text-green-700">
              Application submitted! You'll hear back soon.
            </span>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="flex-1 justify-center"
            loading={applying}
            onClick={handleApply}
            disabled={applying}
          >
            {applying ? (
              <><Loader2 size={16} className="animate-spin" /> Submitting…</>
            ) : (
              <><SendHorizontal size={16} /> Apply Now</>
            )}
          </Button>
        )}

        {(missing.length > 0 || partial.length > 0) && !applied && (
          <Link href="/student/learning">
            <Button variant="outline" size="lg">
              <BookOpen size={16} /> Close Gaps First
            </Button>
          </Link>
        )}

        {!applied && (
          <Link href="/student/assessments">
            <Button variant="ghost" size="lg">
              <RefreshCw size={16} /> Reassess
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
