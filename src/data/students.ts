// PROTOTYPE DATA — Replace with FastAPI /api/students endpoints

export interface Student {
  id: string
  name: string
  email: string
  institution: string
  course: string
  year: number
  graduationYear: number
  domains: string[]
  overallCompetency: number
  skillsAssessed: number
  skillGaps: number
  opportunityMatches: number
  avatar?: string
}

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Shriya Biju',
    email: 'shriya.biju@bits.ac.in',
    institution: 'BITS Pilani',
    course: 'B.Tech Computer Science',
    year: 3,
    graduationYear: 2026,
    domains: ['Software Development', 'Data Science & AI'],
    overallCompetency: 72,
    skillsAssessed: 12,
    skillGaps: 4,
    opportunityMatches: 8,
  },
  {
    id: 'STU002',
    name: 'Deepshikha Chaurasia',
    email: 'deepshikha.chaurasia@iit.ac.in',
    institution: 'IIT Madras',
    course: 'B.Tech Electrical Engineering',
    year: 4,
    graduationYear: 2025,
    domains: ['Data Science & AI', 'Cloud Computing'],
    overallCompetency: 81,
    skillsAssessed: 15,
    skillGaps: 2,
    opportunityMatches: 12,
  },
  {
    id: 'STU003',
    name: 'Dhruva',
    email: 'dhruva@nit.ac.in',
    institution: 'NIT Trichy',
    course: 'B.Tech Information Technology',
    year: 3,
    graduationYear: 2026,
    domains: ['Cybersecurity', 'Software Development'],
    overallCompetency: 68,
    skillsAssessed: 10,
    skillGaps: 5,
    opportunityMatches: 6,
  },
  {
    id: 'STU004',
    name: 'Abhinav Nair',
    email: 'abhinav.nair@vit.ac.in',
    institution: 'VIT Vellore',
    course: 'B.Tech CSE',
    year: 2,
    graduationYear: 2027,
    domains: ['UI/UX', 'Software Development'],
    overallCompetency: 55,
    skillsAssessed: 8,
    skillGaps: 6,
    opportunityMatches: 4,
  },
  {
    id: 'STU005',
    name: 'Bakir',
    email: 'bakir@srm.ac.in',
    institution: 'SRM University',
    course: 'B.Tech Computer Science',
    year: 4,
    graduationYear: 2025,
    domains: ['Data Science & AI', 'Business & Management'],
    overallCompetency: 79,
    skillsAssessed: 14,
    skillGaps: 3,
    opportunityMatches: 10,
  },
]

export const currentStudent = mockStudents[0]
