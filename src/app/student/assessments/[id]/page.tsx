'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { mockAssessments } from '@/data/assessments'
import clsx from 'clsx'

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const assessment = mockAssessments.find((a) => a.id === params.id) ?? mockAssessments[0]
  const questions = assessment.questions

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitting, setSubmitting] = useState(false)

  const q = questions[current]
  const progress = ((current + 1) / questions.length) * 100
  const answered = answers[current] !== undefined

  const handleSelect = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [current]: idx }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    router.push(`/student/assessments/${assessment.id}/result`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Badge variant={assessment.type === 'Scenario-Based' ? 'purple' : 'indigo'}>{assessment.type}</Badge>
        <h1 className="text-xl font-bold text-gray-900 mt-2">{assessment.title}</h1>
        <p className="text-sm text-gray-500">{assessment.domain}</p>
      </div>

      {/* Progress */}
      <Card padding="sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Question {current + 1} of {questions.length}</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={13} />
            <span>{assessment.duration} min</span>
          </div>
        </div>
        <ProgressBar value={progress} showValue={false} size="xs" color="indigo" />
        <div className="flex gap-1 mt-2">
          {questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={clsx(
                'flex-1 h-1.5 rounded-full cursor-pointer transition-colors',
                i === current ? 'bg-indigo-600' : answers[i] !== undefined ? 'bg-green-400' : 'bg-gray-200',
              )}
            />
          ))}
        </div>
      </Card>

      {/* Question card */}
      <Card>
        <div className="mb-2">
          <Badge variant="default" size="sm">{q.skill}</Badge>
          <Badge variant={q.difficulty === 'Hard' ? 'danger' : q.difficulty === 'Medium' ? 'warning' : 'success'} size="sm" className="ml-2">
            {q.difficulty}
          </Badge>
        </div>
        <p className="text-base font-semibold text-gray-900 mt-3 mb-6 leading-relaxed">{q.text}</p>

        {assessment.type === 'Scenario-Based' && (
          <div className="bg-purple-50 border border-purple-100 rounded-lg px-4 py-2.5 mb-5">
            <p className="text-xs text-purple-700 font-medium">
              Scenario-based question — consider practical implications and communication aspects, not just technical correctness.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={clsx(
                'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                answers[current] === idx
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/30',
              )}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border mr-3 text-xs font-bold flex-shrink-0"
                style={{ borderColor: answers[current] === idx ? '#6366f1' : '#d1d5db', color: answers[current] === idx ? '#6366f1' : '#9ca3af', background: answers[current] === idx ? '#eef2ff' : 'white' }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          <ChevronLeft size={16} /> Previous
        </Button>

        <span className="text-sm text-gray-400">
          {Object.keys(answers).length}/{questions.length} answered
        </span>

        {current < questions.length - 1 ? (
          <Button variant="primary" onClick={() => setCurrent((c) => c + 1)}>
            Next <ChevronRight size={16} />
          </Button>
        ) : (
          <Button
            variant="primary"
            loading={submitting}
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 size={16} /> Submit Assessment
          </Button>
        )}
      </div>
    </div>
  )
}
