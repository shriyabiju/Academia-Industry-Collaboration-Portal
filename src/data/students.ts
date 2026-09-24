// PROTOTYPE DATA — Replace with FastAPI /api/students endpoints

import type { StudentProfile } from '@/lib/matching'

// ─── existing Student interface (preserved for all existing UI components) ───

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
  /** Engine-ready profile — used by calculateOpportunityMatch() */
  profile: StudentProfile
}

// ─── mock data ────────────────────────────────────────────────────────────────

export const mockStudents: Student[] = [
  // ── STU001 · Shriya Biju ──────────────────────────────────────────────────
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
    profile: {
      id: 'STU001',
      name: 'Shriya Biju',
      institution: 'BITS Pilani',
      course: 'B.Tech Computer Science',
      year: 3,
      domains: ['Software Development', 'Data Science & AI'],
      assessmentScore: 73,
      assessmentCompleted: true,
      experienceMonths: 0,
      certifications: [],
      projects: [
        {
          title: 'REST API for Student Management System',
          skills: ['Python', 'REST APIs', 'SQL'],
          domain: 'Software Development',
        },
        {
          title: 'Sales Data Analysis Dashboard',
          skills: ['Python', 'Data Analysis', 'SQL'],
          domain: 'Data Science & AI',
        },
      ],
      skills: [
        { name: 'Python',                category: 'Technical', level: 'Advanced',      score: 85 },
        { name: 'SQL',                   category: 'Technical', level: 'Intermediate',  score: 65 },
        { name: 'React',                 category: 'Technical', level: 'Beginner',      score: 35 },
        { name: 'REST APIs',             category: 'Technical', level: 'Intermediate',  score: 60 },
        { name: 'Git & Version Control', category: 'Technical', level: 'Advanced',      score: 80 },
        { name: 'Cloud Deployment',      category: 'Technical', level: 'Beginner',      score: 25 },
        { name: 'Data Analysis',         category: 'Domain',    level: 'Intermediate',  score: 62 },
        { name: 'Machine Learning',      category: 'Domain',    level: 'Beginner',      score: 40 },
        { name: 'Data Visualization',    category: 'Domain',    level: 'Beginner',      score: 30 },
        { name: 'Communication',         category: 'Soft',      level: 'Intermediate',  score: 68 },
        { name: 'Problem Solving',       category: 'Soft',      level: 'Advanced',      score: 82 },
        { name: 'Teamwork',              category: 'Soft',      level: 'Intermediate',  score: 70 },
      ],
    },
  },

  // ── STU002 · Deepshikha Chaurasia ─────────────────────────────────────────
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
    profile: {
      id: 'STU002',
      name: 'Deepshikha Chaurasia',
      institution: 'IIT Madras',
      course: 'B.Tech Electrical Engineering',
      year: 4,
      domains: ['Data Science & AI', 'Cloud Computing'],
      assessmentScore: 84,
      assessmentCompleted: true,
      experienceMonths: 2,
      certifications: ['Google Data Analytics'],
      projects: [
        {
          title: 'Predictive Maintenance using ML',
          skills: ['Python', 'Machine Learning', 'Data Analysis'],
          domain: 'Data Science & AI',
        },
        {
          title: 'Cloud-based Data Pipeline on AWS',
          skills: ['Cloud Deployment', 'Python', 'SQL'],
          domain: 'Cloud Computing',
        },
      ],
      skills: [
        { name: 'Python',                category: 'Technical', level: 'Advanced',     score: 90 },
        { name: 'SQL',                   category: 'Technical', level: 'Advanced',     score: 82 },
        { name: 'React',                 category: 'Technical', level: 'Beginner',     score: 30 },
        { name: 'REST APIs',             category: 'Technical', level: 'Intermediate', score: 65 },
        { name: 'Git & Version Control', category: 'Technical', level: 'Advanced',     score: 85 },
        { name: 'Cloud Deployment',      category: 'Technical', level: 'Intermediate', score: 68 },
        { name: 'Data Analysis',         category: 'Domain',    level: 'Advanced',     score: 88 },
        { name: 'Machine Learning',      category: 'Domain',    level: 'Intermediate', score: 72 },
        { name: 'Data Visualization',    category: 'Domain',    level: 'Intermediate', score: 70 },
        { name: 'Communication',         category: 'Soft',      level: 'Advanced',     score: 85 },
        { name: 'Problem Solving',       category: 'Soft',      level: 'Advanced',     score: 88 },
        { name: 'Teamwork',              category: 'Soft',      level: 'Advanced',     score: 83 },
      ],
    },
  },

  // ── STU003 · Dhruva ───────────────────────────────────────────────────────
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
    profile: {
      id: 'STU003',
      name: 'Dhruva',
      institution: 'NIT Trichy',
      course: 'B.Tech Information Technology',
      year: 3,
      domains: ['Cybersecurity', 'Software Development'],
      assessmentScore: 65,
      assessmentCompleted: true,
      experienceMonths: 0,
      certifications: [],
      projects: [
        {
          title: 'Network Vulnerability Scanner',
          skills: ['Python', 'Git & Version Control'],
          domain: 'Cybersecurity',
        },
        {
          title: 'CLI Task Manager in Python',
          skills: ['Python', 'SQL'],
          domain: 'Software Development',
        },
      ],
      skills: [
        { name: 'Python',                category: 'Technical', level: 'Intermediate', score: 68 },
        { name: 'SQL',                   category: 'Technical', level: 'Intermediate', score: 60 },
        { name: 'React',                 category: 'Technical', level: 'Beginner',     score: 20 },
        { name: 'REST APIs',             category: 'Technical', level: 'Beginner',     score: 38 },
        { name: 'Git & Version Control', category: 'Technical', level: 'Intermediate', score: 65 },
        { name: 'Cloud Deployment',      category: 'Technical', level: 'Beginner',     score: 20 },
        { name: 'Data Analysis',         category: 'Domain',    level: 'Beginner',     score: 35 },
        { name: 'Machine Learning',      category: 'Domain',    level: 'Beginner',     score: 25 },
        { name: 'Data Visualization',    category: 'Domain',    level: 'Beginner',     score: 22 },
        { name: 'Communication',         category: 'Soft',      level: 'Intermediate', score: 65 },
        { name: 'Problem Solving',       category: 'Soft',      level: 'Intermediate', score: 70 },
        { name: 'Teamwork',              category: 'Soft',      level: 'Intermediate', score: 68 },
      ],
    },
  },

  // ── STU004 · Abhinav Nair ─────────────────────────────────────────────────
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
    profile: {
      id: 'STU004',
      name: 'Abhinav Nair',
      institution: 'VIT Vellore',
      course: 'B.Tech CSE',
      year: 2,
      domains: ['UI/UX', 'Software Development'],
      assessmentScore: 55,
      assessmentCompleted: true,
      experienceMonths: 0,
      certifications: [],
      projects: [
        {
          title: 'Portfolio Website with React',
          skills: ['React', 'Git & Version Control'],
          domain: 'UI/UX',
        },
      ],
      skills: [
        { name: 'Python',                category: 'Technical', level: 'Beginner',     score: 42 },
        { name: 'SQL',                   category: 'Technical', level: 'Beginner',     score: 38 },
        { name: 'React',                 category: 'Technical', level: 'Beginner',     score: 45 },
        { name: 'REST APIs',             category: 'Technical', level: 'Beginner',     score: 30 },
        { name: 'Git & Version Control', category: 'Technical', level: 'Intermediate', score: 60 },
        { name: 'Cloud Deployment',      category: 'Technical', level: 'Beginner',     score: 15 },
        { name: 'Data Analysis',         category: 'Domain',    level: 'Beginner',     score: 25 },
        { name: 'Machine Learning',      category: 'Domain',    level: 'Beginner',     score: 18 },
        { name: 'Data Visualization',    category: 'Domain',    level: 'Beginner',     score: 20 },
        { name: 'Communication',         category: 'Soft',      level: 'Intermediate', score: 65 },
        { name: 'Problem Solving',       category: 'Soft',      level: 'Intermediate', score: 62 },
        { name: 'Teamwork',              category: 'Soft',      level: 'Intermediate', score: 66 },
      ],
    },
  },

  // ── STU005 · Bakir ────────────────────────────────────────────────────────
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
    profile: {
      id: 'STU005',
      name: 'Bakir',
      institution: 'SRM University',
      course: 'B.Tech Computer Science',
      year: 4,
      domains: ['Data Science & AI', 'Business & Management'],
      assessmentScore: 78,
      assessmentCompleted: true,
      experienceMonths: 3,
      certifications: ['IBM Data Science'],
      projects: [
        {
          title: 'Customer Churn Prediction Model',
          skills: ['Python', 'Machine Learning', 'Data Analysis'],
          domain: 'Data Science & AI',
        },
        {
          title: 'E-commerce Analytics Dashboard',
          skills: ['Python', 'SQL', 'Data Visualization'],
          domain: 'Data Science & AI',
        },
      ],
      skills: [
        { name: 'Python',                category: 'Technical', level: 'Advanced',     score: 83 },
        { name: 'SQL',                   category: 'Technical', level: 'Intermediate', score: 72 },
        { name: 'React',                 category: 'Technical', level: 'Beginner',     score: 28 },
        { name: 'REST APIs',             category: 'Technical', level: 'Intermediate', score: 58 },
        { name: 'Git & Version Control', category: 'Technical', level: 'Intermediate', score: 70 },
        { name: 'Cloud Deployment',      category: 'Technical', level: 'Beginner',     score: 32 },
        { name: 'Data Analysis',         category: 'Domain',    level: 'Advanced',     score: 80 },
        { name: 'Machine Learning',      category: 'Domain',    level: 'Intermediate', score: 65 },
        { name: 'Data Visualization',    category: 'Domain',    level: 'Intermediate', score: 62 },
        { name: 'Communication',         category: 'Soft',      level: 'Advanced',     score: 80 },
        { name: 'Problem Solving',       category: 'Soft',      level: 'Advanced',     score: 82 },
        { name: 'Teamwork',              category: 'Soft',      level: 'Advanced',     score: 78 },
      ],
    },
  },
]

// ─── convenience exports ──────────────────────────────────────────────────────

/** The logged-in student for the student portal prototype */
export const currentStudent = mockStudents[0]

/**
 * Helper — returns a StudentProfile directly from a student record.
 * Future: replace with GET /api/students/{id}/profile
 */
export function getStudentProfile(studentId: string) {
  return mockStudents.find((s) => s.id === studentId)?.profile ?? mockStudents[0].profile
}
