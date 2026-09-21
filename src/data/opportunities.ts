// PROTOTYPE DATA — Replace with FastAPI /api/opportunities endpoints

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
  requiredSkills: RequiredSkill[]
  matchScore?: number
  matchedSkills?: string[]
  missingSkills?: string[]
  matchExplanation?: string
  tags: string[]
}

export const mockOpportunities: Opportunity[] = [
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
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Advanced' },
      { name: 'SQL', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
      { name: 'REST APIs', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
      { name: 'React', requiredLevel: 'Intermediate', isMatched: false, studentLevel: 'Beginner' },
      { name: 'Problem Solving', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Advanced' },
      { name: 'Cloud Deployment', requiredLevel: 'Beginner', isMatched: false, studentLevel: 'Beginner' },
    ],
    matchScore: 84,
    matchedSkills: ['Python', 'SQL', 'REST APIs', 'Problem Solving'],
    missingSkills: ['React', 'Cloud Deployment'],
    matchExplanation:
      'Your assessed skill profile matches 84% of the required competencies for this opportunity. Your Python and Problem Solving skills are rated above the required level. Closing the React and Cloud Deployment gaps would improve your match to 100%.',
    tags: ['Python', 'React', 'SQL', 'Backend'],
  },
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
      { name: 'Python', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Advanced' },
      { name: 'SQL', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
      { name: 'Data Analysis', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
      { name: 'Data Visualization', requiredLevel: 'Intermediate', isMatched: false, studentLevel: 'Beginner' },
      { name: 'Communication', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
    ],
    matchScore: 76,
    matchedSkills: ['Python', 'SQL', 'Data Analysis', 'Communication'],
    missingSkills: ['Data Visualization'],
    matchExplanation:
      'Your profile matches 76% of the requirements. Strong alignment on Python and data analysis skills. Improving data visualization would significantly boost your match for this and similar roles.',
    tags: ['Data Analysis', 'Python', 'SQL', 'Visualization'],
  },
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
      { name: 'Python', requiredLevel: 'Advanced', isMatched: false, studentLevel: 'Advanced' },
      { name: 'Machine Learning', requiredLevel: 'Intermediate', isMatched: false, studentLevel: 'Beginner' },
      { name: 'Data Analysis', requiredLevel: 'Advanced', isMatched: false, studentLevel: 'Intermediate' },
      { name: 'Problem Solving', requiredLevel: 'Advanced', isMatched: true, studentLevel: 'Advanced' },
      { name: 'Communication', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
    ],
    matchScore: 71,
    matchedSkills: ['Python', 'Problem Solving', 'Communication'],
    missingSkills: ['Machine Learning', 'Advanced Data Analysis'],
    matchExplanation:
      'Your profile matches 71% of requirements. You meet the Python and problem-solving bar, but the ML and advanced data analysis skills are below required levels. This is a growth opportunity.',
    tags: ['ML', 'NLP', 'Python', 'Research'],
  },
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
      { name: 'React', requiredLevel: 'Intermediate', isMatched: false, studentLevel: 'Beginner' },
      { name: 'CSS/Tailwind', requiredLevel: 'Intermediate', isMatched: false, studentLevel: 'Beginner' },
      { name: 'Problem Solving', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Advanced' },
      { name: 'Communication', requiredLevel: 'Intermediate', isMatched: true, studentLevel: 'Intermediate' },
    ],
    matchScore: 62,
    matchedSkills: ['Problem Solving', 'Communication'],
    missingSkills: ['React', 'CSS/Tailwind'],
    matchExplanation:
      'Your soft skills are a good match, but technical frontend skills are below the required threshold. Completing React and CSS training would dramatically improve your match.',
    tags: ['React', 'Frontend', 'UI/UX', 'Design'],
  },
]
