// PROTOTYPE DATA — Replace with FastAPI /api/skills endpoints

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Skill {
  id: string
  name: string
  category: 'Technical' | 'Soft' | 'Domain'
  level: ProficiencyLevel
  score: number // 0-100
  trend?: 'up' | 'down' | 'stable'
}

export interface SkillGap {
  skillId: string
  skillName: string
  currentLevel: ProficiencyLevel
  currentScore: number
  requiredLevel: ProficiencyLevel
  requiredScore: number
  gap: number
  priority: 'High' | 'Medium' | 'Low'
}

export const mockStudentSkills: Skill[] = [
  // Technical Skills
  { id: 'SK001', name: 'Python', category: 'Technical', level: 'Advanced', score: 85, trend: 'up' },
  { id: 'SK002', name: 'SQL', category: 'Technical', level: 'Intermediate', score: 65, trend: 'stable' },
  { id: 'SK003', name: 'React', category: 'Technical', level: 'Beginner', score: 35, trend: 'up' },
  { id: 'SK004', name: 'REST APIs', category: 'Technical', level: 'Intermediate', score: 60, trend: 'stable' },
  { id: 'SK005', name: 'Git & Version Control', category: 'Technical', level: 'Advanced', score: 80, trend: 'stable' },
  { id: 'SK006', name: 'Cloud Deployment', category: 'Technical', level: 'Beginner', score: 25, trend: 'stable' },
  // Domain Skills
  { id: 'SK007', name: 'Data Analysis', category: 'Domain', level: 'Intermediate', score: 62, trend: 'up' },
  { id: 'SK008', name: 'Machine Learning', category: 'Domain', level: 'Beginner', score: 40, trend: 'up' },
  { id: 'SK009', name: 'Data Visualization', category: 'Domain', level: 'Beginner', score: 30, trend: 'stable' },
  // Soft Skills
  { id: 'SK010', name: 'Communication', category: 'Soft', level: 'Intermediate', score: 68, trend: 'stable' },
  { id: 'SK011', name: 'Problem Solving', category: 'Soft', level: 'Advanced', score: 82, trend: 'up' },
  { id: 'SK012', name: 'Teamwork', category: 'Soft', level: 'Intermediate', score: 70, trend: 'stable' },
]

export const mockSkillGaps: SkillGap[] = [
  {
    skillId: 'SK003',
    skillName: 'React',
    currentLevel: 'Beginner',
    currentScore: 35,
    requiredLevel: 'Intermediate',
    requiredScore: 60,
    gap: 25,
    priority: 'High',
  },
  {
    skillId: 'SK006',
    skillName: 'Cloud Deployment',
    currentLevel: 'Beginner',
    currentScore: 25,
    requiredLevel: 'Intermediate',
    requiredScore: 60,
    gap: 35,
    priority: 'High',
  },
  {
    skillId: 'SK009',
    skillName: 'Advanced Data Visualization',
    currentLevel: 'Beginner',
    currentScore: 30,
    requiredLevel: 'Intermediate',
    requiredScore: 60,
    gap: 30,
    priority: 'Medium',
  },
  {
    skillId: 'SK008',
    skillName: 'Machine Learning',
    currentLevel: 'Beginner',
    currentScore: 40,
    requiredLevel: 'Intermediate',
    requiredScore: 60,
    gap: 20,
    priority: 'Medium',
  },
]

export const skillRadarData = [
  { subject: 'Python', score: 85, fullMark: 100 },
  { subject: 'SQL', score: 65, fullMark: 100 },
  { subject: 'React', score: 35, fullMark: 100 },
  { subject: 'Data Analysis', score: 62, fullMark: 100 },
  { subject: 'Communication', score: 68, fullMark: 100 },
  { subject: 'Problem Solving', score: 82, fullMark: 100 },
]
