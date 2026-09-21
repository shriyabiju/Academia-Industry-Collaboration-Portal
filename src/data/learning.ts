// PROTOTYPE DATA — Replace with FastAPI /api/learning-resources endpoints

export type ResourceType = 'Course' | 'Certification' | 'Workshop' | 'Industry Program' | 'Tutorial'

export interface LearningResource {
  id: string
  title: string
  provider: string
  type: ResourceType
  targetSkill: string
  currentLevel: string
  targetLevel: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  enrolled?: number
  progress?: number
  url?: string
  reason: string
  tags: string[]
  free: boolean
  cost?: string
}

export const mockLearningResources: LearningResource[] = [
  {
    id: 'LR001',
    title: 'React — The Complete Guide',
    provider: 'NPTEL / Udemy',
    type: 'Course',
    targetSkill: 'React',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '40 hours',
    difficulty: 'Beginner',
    rating: 4.7,
    enrolled: 12400,
    progress: 0,
    reason: 'React is a required competency for 3 high-match opportunities in your profile, including the Software Engineering Internship (84% match).',
    tags: ['React', 'JavaScript', 'Frontend', 'Components'],
    free: false,
    cost: '₹499',
  },
  {
    id: 'LR002',
    title: 'AWS Cloud Practitioner Essentials',
    provider: 'AWS Training',
    type: 'Certification',
    targetSkill: 'Cloud Deployment',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '6 hours',
    difficulty: 'Beginner',
    rating: 4.8,
    enrolled: 8900,
    progress: 0,
    reason: 'Cloud Deployment is identified as a top skill gap across 4 matched opportunities. This free AWS certification provides an industry-recognized credential.',
    tags: ['AWS', 'Cloud', 'DevOps', 'Deployment'],
    free: true,
  },
  {
    id: 'LR003',
    title: 'Data Visualization with Python & Matplotlib',
    provider: 'NPTEL',
    type: 'Course',
    targetSkill: 'Data Visualization',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '20 hours',
    difficulty: 'Beginner',
    rating: 4.5,
    enrolled: 6700,
    progress: 15,
    reason: 'Advanced data visualization is required for the Data Analyst Internship (76% match). Improving this skill would directly increase your opportunity matches.',
    tags: ['Python', 'Matplotlib', 'Seaborn', 'Plotly'],
    free: true,
  },
  {
    id: 'LR004',
    title: 'Machine Learning Foundations',
    provider: 'Google Developers',
    type: 'Course',
    targetSkill: 'Machine Learning',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '15 hours',
    difficulty: 'Intermediate',
    rating: 4.6,
    enrolled: 21000,
    progress: 0,
    reason: 'ML skills are required for the AI/ML Research Project (71% match). Building foundational ML knowledge aligns with your Data Science career domain.',
    tags: ['ML', 'Scikit-learn', 'Python', 'AI'],
    free: true,
  },
  {
    id: 'LR005',
    title: 'React Workshop — Industry Live Program',
    provider: 'TechCorp India',
    type: 'Workshop',
    targetSkill: 'React',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '2 days',
    difficulty: 'Intermediate',
    rating: 4.9,
    enrolled: 450,
    progress: 0,
    reason: 'Hands-on industry workshop with direct mentorship from TechCorp engineers. Participants who complete this workshop are fast-tracked for internship interviews.',
    tags: ['React', 'Industry', 'Hands-on', 'Mentorship'],
    free: false,
    cost: '₹1,200',
  },
  {
    id: 'LR006',
    title: 'Cloud Fundamentals Certification',
    provider: 'Microsoft Azure',
    type: 'Certification',
    targetSkill: 'Cloud Deployment',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    duration: '8 hours',
    difficulty: 'Beginner',
    rating: 4.6,
    enrolled: 15000,
    progress: 0,
    reason: 'Azure AZ-900 is one of the most recognized entry-level cloud certifications, accepted by 89% of industry partners on this platform.',
    tags: ['Azure', 'Cloud', 'Microsoft', 'Certification'],
    free: false,
    cost: '₹2,500',
  },
]
