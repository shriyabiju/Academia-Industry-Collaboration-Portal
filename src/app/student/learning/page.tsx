'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Star, Users, Clock, ArrowRight, RefreshCw, CheckCircle2, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import SkillLoop from '@/components/shared/SkillLoop'
import { mockLearningResources } from '@/data/learning'
import { mockSkillGaps } from '@/data/skills'

const typeColors: Record<string, 'indigo' | 'info' | 'purple' | 'success' | 'warning'> = {
  Course: 'indigo',
  Certification: 'info',
  Workshop: 'purple',
  'Industry Program': 'success',
  Tutorial: 'warning',
}

const typeIcons: Record<string, React.ReactNode> = {
  Course: <BookOpen size={14} />,
  Certification: <CheckCircle2 size={14} />,
  Workshop: <Users size={14} />,
  'Industry Program': <Zap size={14} />,
  Tutorial: <BookOpen size={14} />,
}

export default function LearningPage() {
  const [startedIds, setStartedIds] = useState<string[]>([])

  const handleStart = (id: string) => setStartedIds((prev) => [...prev, id])

  // Group by skill gap
  const byGap = mockSkillGaps.map((gap) => ({
    gap,
    resources: mockLearningResources.filter((r) => r.targetSkill === gap.skillName),
  })).filter((g) => g.resources.length > 0)

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Close Your Skill Gaps</h1>
          <p className="text-sm text-gray-500 mt-1">Personalized learning recommendations to close your identified skill gaps</p>
        </div>
        <Link href="/student/assessments">
          <Button variant="outline">
            <RefreshCw size={15} /> Reassess Skills
          </Button>
        </Link>
      </div>

      {/* Loop context */}
      <Card padding="sm" className="bg-indigo-50/50 border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={14} className="text-indigo-600" />
          <p className="text-xs font-semibold text-indigo-800">Skill Intelligence Loop — Step 4: Learn</p>
        </div>
        <p className="text-xs text-indigo-600 mb-2">Close your skill gaps with these recommendations, then reassess to advance your profile and unlock more opportunities.</p>
        <SkillLoop activeStep={4} orientation="horizontal" size="sm" />
      </Card>

      {/* Gap summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockSkillGaps.map((gap) => (
          <Card key={gap.skillId} padding="sm" className="border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">{gap.skillName}</span>
              <Badge variant={gap.priority === 'High' ? 'danger' : 'warning'} size="sm">{gap.priority}</Badge>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              <span className="text-amber-700 font-medium">{gap.currentLevel}</span>
              <span className="mx-1">→</span>
              <span className="text-indigo-700 font-medium">{gap.requiredLevel}</span>
            </div>
            <div className="relative h-1.5 bg-gray-200 rounded-full">
              <div className="absolute h-full bg-amber-400 rounded-full" style={{ width: `${gap.currentScore}%` }} />
              <div className="absolute top-0 h-full w-0.5 bg-indigo-500" style={{ left: `${gap.requiredScore}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{gap.gap} points to close</p>
          </Card>
        ))}
      </div>

      {/* Learning resources grouped by gap */}
      {byGap.map(({ gap, resources }) => (
        <div key={gap.skillId}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Close Gap: <span className="text-amber-600">{gap.skillName}</span>
            </h2>
            <Badge variant="default" size="sm">
              {gap.currentLevel} → {gap.requiredLevel}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {resources.map((res) => {
              const started = startedIds.includes(res.id)
              return (
                <Card key={res.id} className="flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={typeColors[res.type] ?? 'indigo'} size="sm">
                      <span className="flex items-center gap-1">{typeIcons[res.type]}{res.type}</span>
                    </Badge>
                    {res.free ? (
                      <Badge variant="success" size="sm">Free</Badge>
                    ) : (
                      <span className="text-xs text-gray-500 font-medium">{res.cost}</span>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{res.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">{res.provider}</p>

                  {/* Reason */}
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs text-amber-800 leading-relaxed">{res.reason}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} />{res.duration}</span>
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400" />{res.rating}
                    </span>
                    {res.enrolled && (
                      <span className="flex items-center gap-1"><Users size={11} />{res.enrolled.toLocaleString()}</span>
                    )}
                  </div>

                  {res.progress !== undefined && res.progress > 0 && (
                    <div className="mb-3">
                      <ProgressBar value={res.progress} label="Progress" size="xs" />
                    </div>
                  )}

                  <div className="mt-auto">
                    <Button
                      variant={started ? 'secondary' : 'primary'}
                      size="sm"
                      className="w-full"
                      onClick={() => handleStart(res.id)}
                    >
                      {started ? (
                        <><CheckCircle2 size={14} /> In Progress</>
                      ) : (
                        <>Start Learning <ArrowRight size={14} /></>
                      )}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      {/* Reassess CTA */}
      <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-bold text-white text-base">After completing your learning — Reassess!</p>
            <p className="text-indigo-200 text-sm mt-1">
              Reassessing updates your skill profile, closes the loop, and improves your opportunity matches.
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-indigo-300">
              <span>LEARN</span>
              <span>→</span>
              <span>IMPROVE</span>
              <span>→</span>
              <span className="font-bold text-white">REASSESS</span>
              <span>→</span>
              <span>MORE OPPORTUNITIES</span>
            </div>
          </div>
          <Link href="/student/assessments">
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold">
              <RefreshCw size={16} /> Reassess Now
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
