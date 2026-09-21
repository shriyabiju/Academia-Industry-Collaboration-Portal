/**
 * API Service Layer
 *
 * This file provides a clean abstraction over all data fetching.
 * Currently returns mock data with simulated async behavior.
 *
 * FUTURE INTEGRATION: Replace each function body with a fetch() call to your FastAPI backend.
 * Example:
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`)
 *   if (!res.ok) throw new Error('Failed to fetch student')
 *   return res.json()
 *
 * Backend Architecture (planned):
 *   Next.js Frontend → FastAPI Backend → Python AI Services (spaCy, Sentence Transformers, Scikit-learn) → PostgreSQL
 */

import { mockStudents, currentStudent, type Student } from '@/data/students'
import { mockStudentSkills, mockSkillGaps, skillRadarData } from '@/data/skills'
import { mockAssessments, mockAssessmentResult } from '@/data/assessments'
import { mockOpportunities } from '@/data/opportunities'
import { mockLearningResources } from '@/data/learning'
import { mockIndustryPartners, mockStudentMatches, mockSkillDemand } from '@/data/industry'
import {
  mockInstitutionalKPIs,
  mockSkillGapData,
  mockCompetencyDistribution,
  mockInternshipProgress,
  mockCareerDomainData,
  mockPlacementTrend,
  mockIndustryDemandTrend,
} from '@/data/analytics'
import { mockAcademicPrograms, mockAcademicianKPIs } from '@/data/academician'

// Simulate network delay for realistic prototype feel
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ─────────────────────────────────────────────────────────────────────────────
// Student APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getStudents(): Promise<Student[]> {
  await delay()
  return mockStudents
}

export async function getStudent(id: string): Promise<Student | undefined> {
  await delay()
  return mockStudents.find((s) => s.id === id)
}

export async function getCurrentStudent(): Promise<Student> {
  await delay()
  return currentStudent
}

// ─────────────────────────────────────────────────────────────────────────────
// Skills APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getStudentSkills(studentId: string) {
  await delay()
  return mockStudentSkills
}

export async function getSkillGaps(studentId: string) {
  await delay()
  return mockSkillGaps
}

export async function getSkillRadarData(studentId: string) {
  await delay()
  return skillRadarData
}

// ─────────────────────────────────────────────────────────────────────────────
// Assessment APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getAssessments() {
  await delay()
  return mockAssessments
}

export async function getAssessment(id: string) {
  await delay()
  return mockAssessments.find((a) => a.id === id)
}

export async function submitAssessment(assessmentId: string, answers: Record<string, number>) {
  await delay(800)
  // FUTURE: POST /api/assessments/{id}/submit with answers, receive AI-generated result
  return mockAssessmentResult
}

export async function getAssessmentResult(studentId: string) {
  await delay()
  return mockAssessmentResult
}

// ─────────────────────────────────────────────────────────────────────────────
// Opportunity APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getOpportunities() {
  await delay()
  return mockOpportunities
}

export async function getOpportunity(id: string) {
  await delay()
  return mockOpportunities.find((o) => o.id === id)
}

export async function getMatchedOpportunities(studentId: string) {
  await delay()
  // FUTURE: GET /api/opportunities/match?studentId={id}
  // This will call Sentence Transformers + Scikit-learn matching engine on FastAPI
  return mockOpportunities.filter((o) => o.matchScore !== undefined).sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
}

export async function applyToOpportunity(studentId: string, opportunityId: string) {
  await delay(500)
  return { success: true, applicationId: `APP-${Date.now()}` }
}

// ─────────────────────────────────────────────────────────────────────────────
// Learning APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getLearningResources(studentId: string) {
  await delay()
  // FUTURE: GET /api/learning?studentId={id} — personalized recommendations
  return mockLearningResources
}

export async function getLearningResourcesBySkill(skillName: string) {
  await delay()
  return mockLearningResources.filter((r) => r.targetSkill.toLowerCase().includes(skillName.toLowerCase()))
}

// ─────────────────────────────────────────────────────────────────────────────
// Industry APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getIndustryPartners() {
  await delay()
  return mockIndustryPartners
}

export async function getStudentMatchesForOpportunity(opportunityId: string) {
  await delay()
  return mockStudentMatches.find((m) => m.opportunityId === opportunityId)
}

export async function getAllStudentMatches() {
  await delay()
  return mockStudentMatches
}

export async function getSkillDemand() {
  await delay()
  return mockSkillDemand
}

export async function postOpportunity(data: Record<string, unknown>) {
  await delay(600)
  return { success: true, opportunityId: `OPP-${Date.now()}` }
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getInstitutionalKPIs() {
  await delay()
  return mockInstitutionalKPIs
}

export async function getSkillGapAnalytics() {
  await delay()
  return mockSkillGapData
}

export async function getCompetencyDistribution() {
  await delay()
  return mockCompetencyDistribution
}

export async function getInternshipProgress() {
  await delay()
  return mockInternshipProgress
}

export async function getCareerDomainData() {
  await delay()
  return mockCareerDomainData
}

export async function getPlacementTrend() {
  await delay()
  return mockPlacementTrend
}

export async function getIndustryDemandTrend() {
  await delay()
  return mockIndustryDemandTrend
}

// ─────────────────────────────────────────────────────────────────────────────
// Academician APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getAcademicPrograms() {
  await delay()
  return mockAcademicPrograms
}

export async function getAcademicianKPIs() {
  await delay()
  return mockAcademicianKPIs
}
