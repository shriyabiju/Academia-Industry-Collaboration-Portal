/**
 * Hire-X — Explainable Matching Engine
 *
 * Dimension weights (must sum to 1.0):
 *   Technical Skills : 50 %
 *   Assessment Score : 20 %
 *   Projects/Domain  : 15 %
 *   Soft Skills      : 10 %
 *   Experience       : 5  %
 *
 * FUTURE: replace arithmetic with Sentence Transformers + Scikit-learn
 * via FastAPI:  POST /api/match  { studentId, opportunityId }
 */

// ─── types ────────────────────────────────────────────────────────────────────

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type SkillCategory    = 'Technical' | 'Soft' | 'Domain'

export interface StudentSkill {
  name: string
  category: SkillCategory
  level: ProficiencyLevel
  score: number          // 0–100 assessed score
}

export interface StudentProject {
  title: string
  skills: string[]
  domain: string
}

/** Flat profile fed to the engine — built from existing mock data via buildStudentProfile() */
export interface StudentProfile {
  id: string
  name: string
  institution: string
  course: string
  year: number
  domains: string[]
  skills: StudentSkill[]
  assessmentScore: number        // 0–100, latest assessment
  assessmentCompleted: boolean
  projects: StudentProject[]
  experienceMonths: number       // prior internship / industry months
  certifications: string[]
}

export interface RequiredSkillSpec {
  name: string
  category: SkillCategory
  requiredLevel: ProficiencyLevel
}

/** Engine-side representation of an opportunity */
export interface OpportunitySpec {
  id: string
  title: string
  company: string
  requiredSkills: RequiredSkillSpec[]
  minAssessmentScore: number     // 0–100
  requiredDomains: string[]
  minExperienceMonths: number
  preferredCertifications: string[]
  minYear?: number
}

// ─── result types ─────────────────────────────────────────────────────────────

export interface MatchedSkill {
  name: string
  studentLevel: ProficiencyLevel
  requiredLevel: ProficiencyLevel
  score: number
  isExceeding: boolean
}

export interface PartialSkill {
  name: string
  studentLevel: ProficiencyLevel
  requiredLevel: ProficiencyLevel
  score: number
  satisfaction: number  // 0–1
}

export interface MissingSkill {
  name: string
  requiredLevel: ProficiencyLevel
  category: SkillCategory
}

export interface MatchResult {
  overallScore: number

  // raw dimension scores 0–100
  technicalScore: number
  softSkillScore: number
  assessmentScore: number
  projectScore: number
  experienceScore: number

  // weighted contribution to overall (out of 100)
  technicalContribution: number
  softSkillContribution: number
  assessmentContribution: number
  projectContribution: number
  experienceContribution: number

  matchedSkills: MatchedSkill[]
  partialSkills: PartialSkill[]
  missingSkills: MissingSkill[]

  explanation: string
  recommendations: string[]
}

// ─── constants ────────────────────────────────────────────────────────────────

const WEIGHTS = {
  technical:  0.50,
  assessment: 0.20,
  project:    0.15,
  soft:       0.10,
  experience: 0.05,
} as const

const LEVEL_SCORE: Record<ProficiencyLevel, number> = {
  Beginner:     33,
  Intermediate: 66,
  Advanced:     100,
}

// ─── helpers ──────────────────────────────────────────────────────────────────

/** How well does the student's level satisfy the requirement? 0–1 */
function levelSatisfaction(
  studentLevel: ProficiencyLevel | undefined,
  required: ProficiencyLevel,
): number {
  if (!studentLevel) return 0
  const s = LEVEL_SCORE[studentLevel]
  const r = LEVEL_SCORE[required]
  if (s >= r) return 1
  return parseFloat((s / r).toFixed(4))
}

function findSkill(
  student: StudentProfile,
  name: string,
): StudentSkill | undefined {
  return student.skills.find((sk) => sk.name.toLowerCase() === name.toLowerCase())
}

// ─── dimension scorers ────────────────────────────────────────────────────────

function scoreTechnical(student: StudentProfile, spec: OpportunitySpec): number {
  const req = spec.requiredSkills.filter((s) => s.category === 'Technical')
  if (req.length === 0) return 100
  const total = req.reduce((acc, r) => {
    const sk = findSkill(student, r.name)
    return acc + levelSatisfaction(sk?.level, r.requiredLevel) * 100
  }, 0)
  return Math.round(total / req.length)
}

function scoreSoft(student: StudentProfile, spec: OpportunitySpec): number {
  const req = spec.requiredSkills.filter((s) => s.category === 'Soft')
  if (req.length === 0) return 100
  const total = req.reduce((acc, r) => {
    const sk = findSkill(student, r.name)
    return acc + levelSatisfaction(sk?.level, r.requiredLevel) * 100
  }, 0)
  return Math.round(total / req.length)
}

function scoreAssessment(student: StudentProfile, spec: OpportunitySpec): number {
  if (!student.assessmentCompleted) return 25   // heavy penalty for no assessment
  if (spec.minAssessmentScore === 0) return 100
  return Math.min(100, Math.round((student.assessmentScore / spec.minAssessmentScore) * 100))
}

function scoreProject(student: StudentProfile, spec: OpportunitySpec): number {
  if (spec.requiredDomains.length === 0) return 100
  const studentDomains = [
    ...student.domains.map((d) => d.toLowerCase()),
    ...student.projects.map((p) => p.domain.toLowerCase()),
  ]
  const matched = spec.requiredDomains.filter((d) =>
    studentDomains.some((sd) => sd.includes(d.toLowerCase()) || d.toLowerCase().includes(sd)),
  )
  return Math.round((matched.length / spec.requiredDomains.length) * 100)
}

function scoreExperience(student: StudentProfile, spec: OpportunitySpec): number {
  if (spec.minExperienceMonths === 0) return 100
  return Math.min(100, Math.round((student.experienceMonths / spec.minExperienceMonths) * 100))
}

// ─── public API ───────────────────────────────────────────────────────────────

/**
 * Returns all skills the student meets or exceeds the required level for.
 */
export function getMatchedSkills(
  student: StudentProfile,
  spec: OpportunitySpec,
): MatchedSkill[] {
  return spec.requiredSkills
    .filter((r) => {
      const sk = findSkill(student, r.name)
      return sk && levelSatisfaction(sk.level, r.requiredLevel) >= 1
    })
    .map((r) => {
      const sk = findSkill(student, r.name)!
      return {
        name: r.name,
        studentLevel: sk.level,
        requiredLevel: r.requiredLevel,
        score: sk.score,
        isExceeding: LEVEL_SCORE[sk.level] > LEVEL_SCORE[r.requiredLevel],
      }
    })
}

/**
 * Returns skills the student has but below the required level.
 */
export function getPartialSkills(
  student: StudentProfile,
  spec: OpportunitySpec,
): PartialSkill[] {
  return spec.requiredSkills
    .filter((r) => {
      const sk = findSkill(student, r.name)
      if (!sk) return false
      const sat = levelSatisfaction(sk.level, r.requiredLevel)
      return sat > 0 && sat < 1
    })
    .map((r) => {
      const sk = findSkill(student, r.name)!
      return {
        name: r.name,
        studentLevel: sk.level,
        requiredLevel: r.requiredLevel,
        score: sk.score,
        satisfaction: levelSatisfaction(sk.level, r.requiredLevel),
      }
    })
}

/**
 * Returns required skills the student has no record of at all.
 */
export function getMissingSkills(
  student: StudentProfile,
  spec: OpportunitySpec,
): MissingSkill[] {
  return spec.requiredSkills
    .filter((r) => !findSkill(student, r.name))
    .map((r) => ({
      name: r.name,
      requiredLevel: r.requiredLevel,
      category: r.category,
    }))
}

/**
 * Builds a human-readable explanation of the match score.
 */
export function getMatchExplanation(result: MatchResult, spec: OpportunitySpec): string {
  const parts: string[] = []

  parts.push(
    `Your profile matches ${result.overallScore}% of the requirements for ${spec.title} at ${spec.company}.`,
  )

  const exceeding = result.matchedSkills.filter((s) => s.isExceeding)
  if (exceeding.length > 0) {
    parts.push(`You exceed the required level in ${exceeding.map((s) => s.name).join(', ')}.`)
  }

  if (result.partialSkills.length > 0) {
    parts.push(
      `You have partial proficiency in ${result.partialSkills.map((s) => s.name).join(', ')} — improving these would boost your score.`,
    )
  }

  if (result.missingSkills.length > 0) {
    const names = result.missingSkills.map((s) => s.name)
    parts.push(`${names.join(', ')} ${names.length === 1 ? 'is' : 'are'} not yet in your skill profile.`)
  }

  if (!result.assessmentScore || result.assessmentScore < 50) {
    parts.push('Completing the domain assessment would significantly improve your score (20% weight).')
  }

  return parts.join(' ')
}

/**
 * Main entry point.
 * Calculates a full, explainable MatchResult for a student × opportunity pair.
 */
export function calculateOpportunityMatch(
  student: StudentProfile,
  spec: OpportunitySpec,
): MatchResult {
  const technicalScore  = scoreTechnical(student, spec)
  const softSkillScore  = scoreSoft(student, spec)
  const assessmentScore = scoreAssessment(student, spec)
  const projectScore    = scoreProject(student, spec)
  const experienceScore = scoreExperience(student, spec)

  const technicalContribution  = parseFloat((technicalScore  * WEIGHTS.technical).toFixed(1))
  const softSkillContribution  = parseFloat((softSkillScore  * WEIGHTS.soft).toFixed(1))
  const assessmentContribution = parseFloat((assessmentScore * WEIGHTS.assessment).toFixed(1))
  const projectContribution    = parseFloat((projectScore    * WEIGHTS.project).toFixed(1))
  const experienceContribution = parseFloat((experienceScore * WEIGHTS.experience).toFixed(1))

  const overallScore = Math.min(
    100,
    Math.round(
      technicalContribution +
      softSkillContribution +
      assessmentContribution +
      projectContribution +
      experienceContribution,
    ),
  )

  const matchedSkills = getMatchedSkills(student, spec)
  const partialSkills = getPartialSkills(student, spec)
  const missingSkills = getMissingSkills(student, spec)

  // build recommendations
  const recommendations: string[] = []

  if (missingSkills.length > 0) {
    const tech = missingSkills.filter((s) => s.category === 'Technical')
    if (tech.length > 0)
      recommendations.push(
        `Add ${tech.map((s) => `${s.name} (${s.requiredLevel})`).join(', ')} to your profile via courses or projects.`,
      )
    const soft = missingSkills.filter((s) => s.category === 'Soft')
    if (soft.length > 0)
      recommendations.push(`Develop ${soft.map((s) => s.name).join(', ')} through workshops or team projects.`)
  }

  if (partialSkills.length > 0) {
    recommendations.push(
      `Improve ${partialSkills.map((s) => `${s.name} from ${s.studentLevel} → ${s.requiredLevel}`).join(', ')}.`,
    )
  }

  if (!student.assessmentCompleted) {
    recommendations.push('Complete the domain assessment — it carries 20% of your match score.')
  } else if (assessmentScore < 70) {
    recommendations.push(`Retake the assessment to raise your score above ${spec.minAssessmentScore}%.`)
  }

  if (projectScore < 60) {
    recommendations.push(
      `Work on a project in ${spec.requiredDomains.slice(0, 2).join(' or ')} to demonstrate hands-on experience.`,
    )
  }

  if (overallScore >= 80) {
    recommendations.push('Strong match — apply now to get shortlisted before the deadline.')
  }

  const partial: MatchResult = {
    overallScore,
    technicalScore,
    softSkillScore,
    assessmentScore,
    projectScore,
    experienceScore,
    technicalContribution,
    softSkillContribution,
    assessmentContribution,
    projectContribution,
    experienceContribution,
    matchedSkills,
    partialSkills,
    missingSkills,
    explanation: '',
    recommendations,
  }

  partial.explanation = getMatchExplanation(partial, spec)
  return partial
}
