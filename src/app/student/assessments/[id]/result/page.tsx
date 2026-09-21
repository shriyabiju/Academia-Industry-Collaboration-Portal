'use client'
import React from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import SkillLoop from '@/components/shared/SkillLoop'
import { mockAssessmentResult } from '@/data/assessments'

export default function AssessmentResultPage() {
  const result = mockAssessmentResult
  const passed = result.score >= 60

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Result hero */}
      <Card className={`text-center border-2 ${passed ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {passed ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Assessment Complete</h1>
        <p className="text-gray-500 text-sm mt-1">Software Development Competency</p>
        <div className="mt-4">
          <div className={`text-5xl font-extrabold ${passed ? 'text-green-600' : 'text-amber-600'}`}>
            {result.score}%
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {result.correctAnswers}/{result.totalQuestions} correct · {result.timeTaken} minutes
          </p>
        </div>
        <div className="mt-4">
          <Badge variant={passed ? 'success' : 'warning'} size="md">
            {passed ? 'Passed — Competency Verified' : 'Below Threshold — Review Recommended'}
          </Badge>
        </div>
      </Card>

      {/* Loop progress */}
      <Card padding="sm" className="bg-indigo-50/50 border-indigo-100">
        <p className="text-xs font-semibold text-indigo-700 mb-2">Skill Intelligence Loop — Step 1 complete, moving to Step 2</p>
        <SkillLoop activeStep={2} orientation="horizontal" size="sm" />
        <p className="text-xs text-indigo-600 mt-2">Your skill profile has been updated. Gaps have been identified below.</p>
      </Card>

      {/* Skill breakdown */}
      <Card>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Skill Breakdown</h2>
        <div className="space-y-4">
          {result.skillBreakdown.map((item) => (
            <div key={item.skill}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={item.level === 'Advanced' ? 'indigo' : item.level === 'Intermediate' ? 'info' : 'default'}
                    size="sm"
                  >
                    {item.level}
                  </Badge>
                  <span className="text-sm font-semibold text-gray-600">{item.score}%</span>
                </div>
              </div>
              <ProgressBar value={item.score} showValue={false} size="sm" />
            </div>
          ))}
        </div>
      </Card>

      {/* Key insights */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-green-600" />
            <h3 className="text-sm font-semibold text-gray-900">Strengths Confirmed</h3>
          </div>
          <ul className="space-y-1.5">
            {result.skillBreakdown.filter((s) => s.level === 'Advanced').map((s) => (
              <li key={s.skill} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                {s.skill} ({s.score}%)
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={16} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-gray-900">Gaps Identified</h3>
          </div>
          <ul className="space-y-1.5">
            {result.skillBreakdown.filter((s) => s.level === 'Beginner').map((s) => (
              <li key={s.skill} className="flex items-center gap-2 text-sm text-gray-700">
                <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                {s.skill} ({s.score}%)
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/student/skills" className="flex-1">
          <Button variant="primary" className="w-full">
            View Full Skill Profile <ArrowRight size={16} />
          </Button>
        </Link>
        <Link href="/student/opportunities" className="flex-1">
          <Button variant="outline" className="w-full">
            Find Opportunities <ArrowRight size={16} />
          </Button>
        </Link>
        <Link href="/student/learning" className="flex-1">
          <Button variant="secondary" className="w-full">
            Close Skill Gaps <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <Link href="/student/assessments">
          <button className="text-sm text-gray-400 hover:text-indigo-600 flex items-center gap-1.5 mx-auto transition-colors">
            <RefreshCw size={13} /> Retake or take another assessment
          </button>
        </Link>
      </div>
    </div>
  )
}
