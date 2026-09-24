// PROTOTYPE DATA — Replace with FastAPI /api/opportunities endpoints

import type { OpportunitySpec } from '@/lib/matching'

export type OpportunityType = 'Internship' | 'Project' | 'Training' | 'Full-time' | 'Part-time'

export interface RequiredSkill {
  name: string
  requiredLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  isMatched?: boolean
  studentLevel?: string
}

export interface Opportunity {
  id: string
  title: string
  company: string
  companyLogo?: string
  type: OpportunityType
  domain: string
  description: string
  location: string
  duration: string
  stipend?: string
  eligibility: string
  postedDate: string
  deadline: string
  requiredSkills: RequiredSkill[]   // used by existing UI components
  spec: OpportunitySpec             // used by the matching engine
  matchScore?: number               // kept for static fallback only
  matchedSkills?: string[]
  missingSkills?: string[]
  matchExplanation?: string
  tags: string[]
}

export const mockOpportunities: Opportunity[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // OPP001 — Software Engineering Intern @ TechCorp India
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'OPP001',
    title: 'Software Engineering Intern',
    company: 'TechCorp India',
    type: 'Internship',
    domain: 'Software Development',
    description:
      'Work with our core product team to build scalable backend services and contribute to our React-based frontend. You will get hands-on experience with production systems serving millions of users.',
    location: 'Bengaluru, Karnataka',
    duration: '6 months',
    stipend: '₹25,000/month',
    eligibility: 'B.Tech 3rd or 4th year, CGPA ≥ 7.0',
    postedDate: '2026-09-01',
    deadline: '2026-10-15',
    // ── legacy UI fields (preserved) ───────────────────────────────────────
    requiredSkills: [
      { name: 'Python',               requiredLevel: 'Intermediate' },
      { name: 'SQL',                  requiredLevel: 'Intermediate' },
      { name: 'REST APIs',            requiredLevel: 'Intermediate' },
      { name: 'React',                requiredLevel: 'Intermediate' },
      { name: 'Problem Solving',      requiredLevel: 'Intermediate' },
      { name: 'Cloud Deployment',     requiredLevel: 'Beginner'     },
    ],
    tags: ['Python', 'React', 'SQL', 'Backend'],
    // ── engine spec (new) ──────────────────────────────────────────────────
    spec: {
      id: 'OPP001',
      title: 'Software Engineering Intern',
      company: 'TechCorp India',
      requiredSkills: [
        { name: 'Python',               category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'SQL',                  category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'REST APIs',            category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'React',                category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'Git & Version Control',category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'Cloud Deployment',     category: 'Technical', requiredLevel: 'Beginner'     },
        { name: 'Problem Solving',      category: 'Soft',      requiredLevel: 'Intermediate' },
        { name: 'Communication',        category: 'Soft',      requiredLevel: 'Beginner'     },
      ],
      minAssessmentScore: 65,
      requiredDomains: ['Software Development'],
      minExperienceMonths: 0,
      preferredCertifications: ['AWS Cloud Practitioner'],
      minYear: 3,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OPP002 — Data Analyst Intern @ AnalyticsFirst
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'OPP002',
    title: 'Data Analyst Intern',
    company: 'AnalyticsFirst',
    type: 'Internship',
    domain: 'Data Science & AI',
    description:
      'Join our data team to help build dashboards, run analysis pipelines, and generate insights from large datasets. You will work with Python, SQL, and visualization tools.',
    location: 'Mumbai, Maharashtra',
    duration: '4 months',
    stipend: '₹20,000/month',
    eligibility: 'B.Tech / BSc 2nd year or above',
    postedDate: '2026-09-05',
    deadline: '2026-10-01',
    requiredSkills: [
      { name: 'Python',             requiredLevel: 'Intermediate' },
      { name: 'SQL',                requiredLevel: 'Intermediate' },
      { name: 'Data Analysis',      requiredLevel: 'Intermediate' },
      { name: 'Data Visualization', requiredLevel: 'Intermediate' },
      { name: 'Communication',      requiredLevel: 'Intermediate' },
    ],
    tags: ['Data Analysis', 'Python', 'SQL', 'Visualization'],
    spec: {
      id: 'OPP002',
      title: 'Data Analyst Intern',
      company: 'AnalyticsFirst',
      requiredSkills: [
        { name: 'Python',             category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'SQL',                category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'Data Analysis',      category: 'Domain',    requiredLevel: 'Intermediate' },
        { name: 'Data Visualization', category: 'Domain',    requiredLevel: 'Intermediate' },
        { name: 'Machine Learning',   category: 'Domain',    requiredLevel: 'Beginner'     },
        { name: 'Communication',      category: 'Soft',      requiredLevel: 'Intermediate' },
        { name: 'Problem Solving',    category: 'Soft',      requiredLevel: 'Intermediate' },
      ],
      minAssessmentScore: 60,
      requiredDomains: ['Data Science & AI'],
      minExperienceMonths: 0,
      preferredCertifications: ['Google Data Analytics', 'IBM Data Science'],
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OPP003 — AI/ML Research Project @ IIT Research Lab
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'OPP003',
    title: 'AI/ML Research Project',
    company: 'IIT Research Lab',
    type: 'Project',
    domain: 'Data Science & AI',
    description:
      'Contribute to an active research project on natural language processing and text classification. You will implement ML models, run experiments, and co-author research findings.',
    location: 'Chennai, Tamil Nadu (Hybrid)',
    duration: '3 months',
    stipend: '₹15,000/month',
    eligibility: 'B.Tech 3rd/4th year or M.Tech students with ML background',
    postedDate: '2026-09-10',
    deadline: '2026-09-30',
    requiredSkills: [
      { name: 'Python',          requiredLevel: 'Advanced'     },
      { name: 'Machine Learning',requiredLevel: 'Intermediate' },
      { name: 'Data Analysis',   requiredLevel: 'Advanced'     },
      { name: 'Problem Solving', requiredLevel: 'Advanced'     },
      { name: 'Communication',   requiredLevel: 'Intermediate' },
    ],
    tags: ['ML', 'NLP', 'Python', 'Research'],
    spec: {
      id: 'OPP003',
      title: 'AI/ML Research Project',
      company: 'IIT Research Lab',
      requiredSkills: [
        { name: 'Python',             category: 'Technical', requiredLevel: 'Advanced'     },
        { name: 'Machine Learning',   category: 'Domain',    requiredLevel: 'Intermediate' },
        { name: 'Data Analysis',      category: 'Domain',    requiredLevel: 'Advanced'     },
        { name: 'Data Visualization', category: 'Domain',    requiredLevel: 'Intermediate' },
        { name: 'Problem Solving',    category: 'Soft',      requiredLevel: 'Advanced'     },
        { name: 'Communication',      category: 'Soft',      requiredLevel: 'Intermediate' },
      ],
      minAssessmentScore: 70,
      requiredDomains: ['Data Science & AI'],
      minExperienceMonths: 0,
      preferredCertifications: ['DeepLearning.AI', 'Coursera ML Specialization'],
      minYear: 3,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OPP004 — Frontend Developer Intern @ Designify
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'OPP004',
    title: 'Frontend Developer Intern',
    company: 'Designify',
    type: 'Internship',
    domain: 'UI/UX',
    description:
      'Build beautiful, accessible web interfaces using React and collaborate with our design team. Focus on component libraries, responsive layouts, and design systems.',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹18,000/month',
    eligibility: 'Any year, portfolio preferred',
    postedDate: '2026-09-15',
    deadline: '2026-10-20',
    requiredSkills: [
      { name: 'React',          requiredLevel: 'Intermediate' },
      { name: 'CSS/Tailwind',   requiredLevel: 'Intermediate' },
      { name: 'Problem Solving',requiredLevel: 'Intermediate' },
      { name: 'Communication',  requiredLevel: 'Intermediate' },
    ],
    tags: ['React', 'Frontend', 'UI/UX', 'Design'],
    spec: {
      id: 'OPP004',
      title: 'Frontend Developer Intern',
      company: 'Designify',
      requiredSkills: [
        { name: 'React',               category: 'Technical', requiredLevel: 'Intermediate' },
        { name: 'Git & Version Control',category: 'Technical', requiredLevel: 'Beginner'    },
        { name: 'REST APIs',           category: 'Technical', requiredLevel: 'Beginner'     },
        { name: 'Problem Solving',     category: 'Soft',      requiredLevel: 'Intermediate' },
        { name: 'Communication',       category: 'Soft',      requiredLevel: 'Intermediate' },
        { name: 'Teamwork',            category: 'Soft',      requiredLevel: 'Intermediate' },
      ],
      minAssessmentScore: 55,
      requiredDomains: ['UI/UX', 'Software Development'],
      minExperienceMonths: 0,
      preferredCertifications: ['Google UX Design'],
    },
  },
]
