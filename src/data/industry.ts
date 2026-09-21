// PROTOTYPE DATA — Replace with FastAPI /api/industry endpoints

export interface IndustryPartner {
  id: string
  name: string
  sector: string
  location: string
  description: string
  activeOpportunities: number
  totalHires: number
  skillRequirements: { skill: string; level: string; demand: 'High' | 'Medium' | 'Low' }[]
}

export interface StudentMatch {
  studentId: string
  studentName: string
  institution: string
  course: string
  year: number
  matchScore: number
  matchedSkills: string[]
  skillGaps: string[]
  overallCompetency: number
  assessmentStatus: 'Completed' | 'In Progress' | 'Not Started'
  domains: string[]
}

export const mockIndustryPartners: IndustryPartner[] = [
  {
    id: 'IND001',
    name: 'TechCorp India',
    sector: 'Software & Technology',
    location: 'Bengaluru, Karnataka',
    description: 'Leading product company building enterprise SaaS solutions for global markets.',
    activeOpportunities: 4,
    totalHires: 87,
    skillRequirements: [
      { skill: 'Python', level: 'Intermediate', demand: 'High' },
      { skill: 'React', level: 'Intermediate', demand: 'High' },
      { skill: 'SQL', level: 'Intermediate', demand: 'High' },
      { skill: 'REST APIs', level: 'Intermediate', demand: 'Medium' },
      { skill: 'Cloud Deployment', level: 'Beginner', demand: 'Medium' },
      { skill: 'Problem Solving', level: 'Advanced', demand: 'High' },
    ],
  },
  {
    id: 'IND002',
    name: 'AnalyticsFirst',
    sector: 'Data & Analytics',
    location: 'Mumbai, Maharashtra',
    description: 'Data analytics firm specializing in business intelligence and predictive analytics.',
    activeOpportunities: 2,
    totalHires: 34,
    skillRequirements: [
      { skill: 'Python', level: 'Intermediate', demand: 'High' },
      { skill: 'SQL', level: 'Intermediate', demand: 'High' },
      { skill: 'Data Analysis', level: 'Advanced', demand: 'High' },
      { skill: 'Data Visualization', level: 'Intermediate', demand: 'Medium' },
      { skill: 'Machine Learning', level: 'Intermediate', demand: 'Medium' },
    ],
  },
]

export const mockStudentMatches: { opportunityId: string; opportunityTitle: string; matches: StudentMatch[] }[] = [
  {
    opportunityId: 'OPP001',
    opportunityTitle: 'Software Engineering Intern',
    matches: [
      {
        studentId: 'STU002',
        studentName: 'Deepshikha Chaurasia',
        institution: 'IIT Madras',
        course: 'B.Tech EE',
        year: 4,
        matchScore: 91,
        matchedSkills: ['Python', 'SQL', 'REST APIs', 'Problem Solving', 'Git'],
        skillGaps: ['React'],
        overallCompetency: 81,
        assessmentStatus: 'Completed',
        domains: ['Data Science & AI', 'Cloud Computing'],
      },
      {
        studentId: 'STU001',
        studentName: 'Shriya Biju',
        institution: 'BITS Pilani',
        course: 'B.Tech CSE',
        year: 3,
        matchScore: 84,
        matchedSkills: ['Python', 'SQL', 'REST APIs', 'Problem Solving'],
        skillGaps: ['React', 'Cloud Deployment'],
        overallCompetency: 72,
        assessmentStatus: 'Completed',
        domains: ['Software Development', 'Data Science & AI'],
      },
      {
        studentId: 'STU005',
        studentName: 'Bakir',
        institution: 'SRM University',
        course: 'B.Tech CSE',
        year: 4,
        matchScore: 79,
        matchedSkills: ['Python', 'SQL', 'Problem Solving'],
        skillGaps: ['React', 'REST APIs', 'Cloud Deployment'],
        overallCompetency: 79,
        assessmentStatus: 'Completed',
        domains: ['Data Science & AI', 'Business & Management'],
      },
    ],
  },
  {
    opportunityId: 'OPP002',
    opportunityTitle: 'Data Analyst Intern',
    matches: [
      {
        studentId: 'STU002',
        studentName: 'Deepshikha Chaurasia',
        institution: 'IIT Madras',
        course: 'B.Tech EE',
        year: 4,
        matchScore: 88,
        matchedSkills: ['Python', 'SQL', 'Data Analysis', 'Communication'],
        skillGaps: ['Data Visualization'],
        overallCompetency: 81,
        assessmentStatus: 'Completed',
        domains: ['Data Science & AI', 'Cloud Computing'],
      },
      {
        studentId: 'STU001',
        studentName: 'Shriya Biju',
        institution: 'BITS Pilani',
        course: 'B.Tech CSE',
        year: 3,
        matchScore: 76,
        matchedSkills: ['Python', 'SQL', 'Data Analysis', 'Communication'],
        skillGaps: ['Data Visualization'],
        overallCompetency: 72,
        assessmentStatus: 'Completed',
        domains: ['Software Development', 'Data Science & AI'],
      },
    ],
  },
]

export const mockSkillDemand = [
  { skill: 'Python', demand: 92, companies: 18 },
  { skill: 'React', demand: 87, companies: 15 },
  { skill: 'SQL', demand: 85, companies: 17 },
  { skill: 'Cloud Deployment', demand: 78, companies: 13 },
  { skill: 'Machine Learning', demand: 74, companies: 11 },
  { skill: 'Data Analysis', demand: 70, companies: 12 },
  { skill: 'Communication', demand: 68, companies: 20 },
  { skill: 'REST APIs', demand: 65, companies: 14 },
]
