'use client'
import React, { useState } from 'react'
import {
  Users, CheckCircle2, AlertCircle, Brain,
  ClipboardCheck, FolderOpen, UserCheck, Timer, X,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import Tabs, { useTabs } from '@/components/ui/Tabs'
import Modal from '@/components/ui/Modal'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { mockStudentMatches } from '@/data/industry'
import type { StudentMatch } from '@/data/industry'

// ─── Why-match score row ──────────────────────────────────────────────────────
function DimRow({
  icon, label, score, weight, color,
}: {
  icon: React.ReactNode; label: string; score: number
  weight: string; color: 'green' | 'amber' | 'indigo'
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-700">{label}</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">{weight}</span>
            <span className="font-bold text-gray-800">{score}%</span>
          </div>
        </div>
        <ProgressBar value={score} color={color} showValue={false} size="xs" animate />
      </div>
    </div>
  )
}

// ─── Why-this-candidate modal ─────────────────────────────────────────────────
function WhyCandidateModal({
  student, open, onClose,
}: {
  student: StudentMatch | null; open: boolean; onClose: () => void
}) {
  if (!student) return null

  const scoreColor = student.matchScore >= 85
    ? 'text-emerald-600' : student.matchScore >= 70
    ? 'text-amber-500' : 'text-gray-500'
  const ringColor = student.matchScore >= 85
    ? 'ring-emerald-200' : student.matchScore >= 70
    ? 'ring-amber-200' : 'ring-gray-200'

  // Derive approximate dimension scores from overall + skills
  const techScore = Math.min(100, student.matchScore + 8)
  const assessScore = student.overallCompetency
  const projScore = Math.min(100, student.matchScore + 2)
  const softScore = Math.min(100, student.matchScore - 5)
  const expScore = student.year >= 4 ? 70 : student.year >= 3 ? 45 : 25

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Why This Candidate Matches"
      description={`Explainable match analysis for ${student.studentName}`}
    >
      <div className="space-y-6">
        {/* Candidate header */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg flex items-center justify-center flex-shrink-0">
            {student.studentName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">{student.studentName}</p>
            <p className="text-sm text-gray-500">{student.institution} · {student.course} · Year {student.year}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant={student.assessmentStatus === 'Completed' ? 'success' : 'warning'} size="xs" dot>
                {student.assessmentStatus}
              </Badge>
              <span className="text-xs text-gray-400">Overall Competency: <strong className="text-gray-700">{student.overallCompetency}%</strong></span>
            </div>
          </div>
          {/* Match ring */}
          <div className={`w-16 h-16 rounded-full ring-4 ${ringColor} flex flex-col items-center justify-center bg-white flex-shrink-0`}>
            <span className={`text-xl font-extrabold tabular leading-none ${scoreColor}`}>{student.matchScore}%</span>
            <span className="text-[9px] text-gray-400 mt-0.5">match</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Brain size={14} className="text-indigo-500" />
            Match Score Breakdown
          </h3>
          <div className="space-y-3">
            <DimRow icon={<Brain size={12} />}          label="Technical Skills"   score={techScore}   weight="50%" color={techScore   >= 70 ? 'green' : 'amber'} />
            <DimRow icon={<ClipboardCheck size={12} />}  label="Assessment Score"  score={assessScore} weight="20%" color={assessScore >= 70 ? 'green' : 'amber'} />
            <DimRow icon={<FolderOpen size={12} />}      label="Projects & Domain" score={projScore}   weight="15%" color={projScore   >= 70 ? 'green' : 'amber'} />
            <DimRow icon={<UserCheck size={12} />}       label="Soft Skills"       score={softScore}   weight="10%" color={softScore   >= 70 ? 'green' : 'amber'} />
            <DimRow icon={<Timer size={12} />}           label="Experience"        score={expScore}    weight="5%"  color={expScore    >= 60 ? 'green' : 'indigo'} />
          </div>
          <div className="mt-4 flex items-center justify-between px-2 py-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="text-sm font-bold text-indigo-900">Overall Match Score</span>
            <span className={`text-2xl font-extrabold tabular ${scoreColor}`}>{student.matchScore}%</span>
          </div>
        </div>

        {/* Skill breakdown */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Matched */}
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2.5">
              ✓ Matched Skills ({student.matchedSkills.length})
            </p>
            <div className="space-y-1.5">
              {student.matchedSkills.map((s) => (
                <div key={s} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-800">{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Gaps */}
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2.5">
              ✗ Skill Gaps ({student.skillGaps.length})
            </p>
            {student.skillGaps.length > 0 ? (
              <div className="space-y-1.5">
                {student.skillGaps.map((s) => (
                  <div key={s} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
                    <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-800">{s}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle2 size={13} /> No skill gaps — perfect fit!
              </div>
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl">
          <p className="text-sm font-semibold text-indigo-900 mb-1">Hire-X Recommendation</p>
          <p className="text-sm text-indigo-700 leading-relaxed">
            {student.matchScore >= 85
              ? `${student.studentName} is a strong match. All critical skills are covered. Recommend fast-tracking to interview.`
              : student.matchScore >= 70
              ? `${student.studentName} is a good match with minor gaps. Skills can be bridged with a short onboarding program.`
              : `${student.studentName} shows potential but has ${student.skillGaps.length} skill gap${student.skillGaps.length > 1 ? 's' : ''}. Consider a training role or revisit after next assessment.`}
          </p>
        </div>
      </div>
    </Modal>
  )
}

// ─── Candidate card ───────────────────────────────────────────────────────────
function CandidateCard({
  student, rank, onWhyClick, onShortlist,
}: {
  student: StudentMatch; rank: number; onWhyClick: () => void; onShortlist: () => void
}) {
  const [shortlisted, setShortlisted] = useState(false)
  const color = student.matchScore >= 85 ? 'text-emerald-600' : student.matchScore >= 70 ? 'text-amber-600' : 'text-gray-500'
  const ring  = student.matchScore >= 85 ? 'ring-emerald-200' : student.matchScore >= 70 ? 'ring-amber-200' : 'ring-gray-200'
  const accent = rank === 0 ? 'green' : rank === 1 ? 'indigo' : rank === 2 ? 'blue' : undefined

  return (
    <Card accent={accent as any}>
      <div className="flex items-start gap-4">
        {/* Rank */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
          rank === 0 ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200' :
          rank === 1 ? 'bg-gray-100 text-gray-600 ring-2 ring-gray-200' :
          rank === 2 ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200' :
          'bg-gray-50 text-gray-400'
        }`}>
          #{rank + 1}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold text-gray-900">{student.studentName}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{student.institution} · {student.course} · Year {student.year}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <Badge variant={student.assessmentStatus === 'Completed' ? 'success' : 'warning'} size="xs" dot>
                  {student.assessmentStatus}
                </Badge>
                <span className="text-xs text-gray-400">Competency: <strong className="text-gray-700">{student.overallCompetency}%</strong></span>
              </div>
            </div>
            {/* Score ring */}
            <div className={`w-14 h-14 rounded-full ring-4 ${ring} flex flex-col items-center justify-center bg-white flex-shrink-0`}>
              <span className={`text-lg font-extrabold tabular leading-none ${color}`}>{student.matchScore}%</span>
              <span className="text-[8px] text-gray-400 mt-0.5">match</span>
            </div>
          </div>

          {/* Skills grid — stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Matched Skills</p>
              <div className="flex flex-wrap gap-1">
                {student.matchedSkills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <CheckCircle2 size={8} />{s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Skill Gaps</p>
              {student.skillGaps.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {student.skillGaps.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
                      <AlertCircle size={8} />{s}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 size={11} /> No gaps
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Button variant="primary" size="sm" onClick={onWhyClick}>
              <Brain size={13} /> Why This Match?
            </Button>
            <Button
              variant={shortlisted ? 'success' : 'outline'}
              size="sm"
              onClick={() => { setShortlisted(true); onShortlist() }}
            >
              {shortlisted ? <CheckCircle2 size={13} /> : <UserCheck size={13} />}
              {shortlisted ? 'Shortlisted' : 'Shortlist'}
            </Button>
            <Button variant="ghost" size="sm">Message</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StudentMatchesPage() {
  const { active: selectedOpp, setActive: setSelectedOpp } = useTabs(mockStudentMatches[0].opportunityId)
  const [modalStudent, setModalStudent] = useState<StudentMatch | null>(null)

  const current = mockStudentMatches.find((m) => m.opportunityId === selectedOpp)

  return (
    <div className="space-y-8 page-enter">

      {/* Header */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Talent Intelligence</p>
        <h1 className="text-2xl font-bold text-gray-900">Student Matches</h1>
        <p className="text-sm text-gray-500 mt-1">
          Candidates ranked by explainable skill match score · Click "Why This Match?" for full breakdown
        </p>
      </div>

      {/* Opportunity selector */}
      <Tabs
        variant="pill"
        tabs={mockStudentMatches.map((m) => ({
          id: m.opportunityId,
          label: m.opportunityTitle,
          badge: m.matches.length,
        }))}
        active={selectedOpp}
        onChange={setSelectedOpp}
      />

      {current && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Strong Match (85%+)', count: current.matches.filter((m) => m.matchScore >= 85).length, color: 'emerald' },
              { label: 'Good Match (70–84%)', count: current.matches.filter((m) => m.matchScore >= 70 && m.matchScore < 85).length, color: 'amber' },
              { label: 'Partial (<70%)',      count: current.matches.filter((m) => m.matchScore < 70).length, color: 'gray' },
            ].map((s) => (
              <div key={s.label}
                className={`bg-${s.color === 'gray' ? 'gray' : s.color}-50 border border-${s.color === 'gray' ? 'gray' : s.color}-100 rounded-2xl p-4 text-center`}>
                <div className={`text-2xl font-bold text-${s.color === 'gray' ? 'gray-500' : s.color + '-600'} tabular`}>
                  <AnimatedNumber value={s.count} />
                </div>
                <div className="text-xs text-gray-600 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Candidate cards */}
          <div className="space-y-4">
            {current.matches.map((student, rank) => (
              <CandidateCard
                key={student.studentId}
                student={student}
                rank={rank}
                onWhyClick={() => setModalStudent(student)}
                onShortlist={() => {}}
              />
            ))}
          </div>
        </>
      )}

      {/* Why-match modal */}
      <WhyCandidateModal
        student={modalStudent}
        open={modalStudent !== null}
        onClose={() => setModalStudent(null)}
      />
    </div>
  )
}
