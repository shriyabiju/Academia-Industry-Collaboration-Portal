'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ClipboardCheck, Clock, BookOpen, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SkillLoop from '@/components/shared/SkillLoop'
import { mockAssessments } from '@/data/assessments'

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        <p className="text-sm text-gray-500 mt-1">Evaluate your skills and build your verified competency profile</p>
      </div>

      <Card padding="sm" className="bg-indigo-50 border-indigo-100">
        <div className="flex items-center gap-3 mb-2">
          <Zap size={16} className="text-indigo-600" />
          <p className="text-sm font-semibold text-indigo-900">You are at Step 1 of the Skill Intelligence Loop</p>
        </div>
        <SkillLoop activeStep={1} orientation="horizontal" size="sm" />
      </Card>

      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Available Assessments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id} hover className="flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${assessment.type === 'Scenario-Based' ? 'bg-purple-50 text-purple-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {assessment.type === 'Scenario-Based' ? <Zap size={18} /> : <ClipboardCheck size={18} />}
                </div>
                <Badge variant={assessment.type === 'Scenario-Based' ? 'purple' : 'indigo'} size="sm">
                  {assessment.type}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{assessment.title}</h3>
              <p className="text-xs text-gray-500 flex-1 mb-4 leading-relaxed">{assessment.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Clock size={12} /> {assessment.duration} min</span>
                <span className="flex items-center gap-1"><BookOpen size={12} /> {assessment.totalQuestions} questions</span>
              </div>
              {assessment.type === 'Scenario-Based' && (
                <div className="bg-purple-50 rounded-lg px-3 py-2 mb-4">
                  <p className="text-xs text-purple-700 font-medium">
                    Evaluates practical problem solving, cross-domain thinking and communication skills through real-world scenarios.
                  </p>
                </div>
              )}
              <Link href={`/student/assessments/${assessment.id}`}>
                <Button variant="primary" size="sm" className="w-full">
                  Start Assessment <ArrowRight size={14} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Completed</h2>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Software Development Competency</p>
              <p className="text-xs text-gray-500">Completed 3 weeks ago · Score: 73% · 6/8 correct</p>
            </div>
            <Link href="/student/assessments/ASS001/result">
              <Button variant="outline" size="sm">View Result</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
