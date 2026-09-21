'use client'
import React, { useState } from 'react'
import { Users, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import SkillTag from '@/components/ui/SkillTag'
import { mockStudentMatches } from '@/data/industry'

export default function StudentMatchesPage() {
  const [selectedOpp, setSelectedOpp] = useState(mockStudentMatches[0].opportunityId)
  const current = mockStudentMatches.find((m) => m.opportunityId === selectedOpp)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Matches</h1>
        <p className="text-sm text-gray-500 mt-1">Students ranked by skill profile match score for each opportunity</p>
      </div>

      {/* Opportunity selector */}
      <div className="flex gap-3 flex-wrap">
        {mockStudentMatches.map((m) => (
          <button
            key={m.opportunityId}
            onClick={() => setSelectedOpp(m.opportunityId)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedOpp === m.opportunityId ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'}`}
          >
            {m.opportunityTitle} <span className="ml-1.5 text-xs opacity-70">({m.matches.length})</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-900">{current.opportunityTitle}</h2>
            <Badge variant="indigo">{current.matches.length} matches found</Badge>
          </div>

          {current.matches.map((student, rank) => (
            <Card key={student.studentId} className={`border-l-4 ${rank === 0 ? 'border-l-green-500' : rank === 1 ? 'border-l-indigo-400' : 'border-l-blue-300'}`}>
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${rank === 0 ? 'bg-green-100 text-green-700' : rank === 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                  #{rank + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.studentName}</h3>
                      <p className="text-xs text-gray-500">{student.institution} · {student.course} · Year {student.year}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant={student.assessmentStatus === 'Completed' ? 'success' : 'warning'} dot size="sm">
                          {student.assessmentStatus}
                        </Badge>
                        <span className="text-xs text-gray-400">Overall Competency: <span className="font-medium text-gray-700">{student.overallCompetency}%</span></span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-3xl font-extrabold ${student.matchScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                        {student.matchScore}%
                      </div>
                      <div className="text-xs text-gray-400">Match Score</div>
                      <ProgressBar value={student.matchScore} showValue={false} size="xs" className="w-24 mt-1" color={student.matchScore >= 85 ? 'green' : 'amber'} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1.5">Matched Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {student.matchedSkills.map((s) => <SkillTag key={s} name={s} matched />)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1.5">Skill Gaps</p>
                      <div className="flex flex-wrap gap-1.5">
                        {student.skillGaps.length > 0
                          ? student.skillGaps.map((s) => <SkillTag key={s} name={s} gap />)
                          : <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 size={12} /> No gaps</span>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="primary" size="sm">View Skill Profile</Button>
                    <Button variant="outline" size="sm">Shortlist</Button>
                    <Button variant="ghost" size="sm">Message</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
