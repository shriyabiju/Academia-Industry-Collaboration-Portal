// PROTOTYPE DATA — Replace with FastAPI /api/academician endpoints

export type AcademicProgramType =
  | 'Faculty Internship'
  | 'Industrial Training'
  | 'FDP'
  | 'Workshop'
  | 'Mentorship'
  | 'Research Collaboration'

export interface AcademicProgram {
  id: string
  title: string
  type: AcademicProgramType
  organization: string
  domain: string
  description: string
  duration: string
  location: string
  deadline: string
  seats?: number
  stipend?: string
  eligibility: string
  tags: string[]
  status: 'Open' | 'Closing Soon' | 'Closed'
  applicants?: number
}

export const mockAcademicPrograms: AcademicProgram[] = [
  {
    id: 'AP001',
    title: 'Faculty Internship in AI/ML',
    type: 'Faculty Internship',
    organization: 'Microsoft Research India',
    domain: 'Data Science & AI',
    description:
      'A 2-month immersive faculty internship at Microsoft Research, working alongside researchers on active projects in machine learning and natural language processing. Faculty gain hands-on industry exposure and bring back cutting-edge knowledge to classrooms.',
    duration: '2 months (Summer)',
    location: 'Hyderabad, Telangana',
    deadline: '2026-10-30',
    seats: 10,
    stipend: '₹80,000/month',
    eligibility: 'Assistant/Associate Professors with CSE/IT/Math background, PhD preferred',
    tags: ['AI', 'ML', 'NLP', 'Research', 'Microsoft'],
    status: 'Open',
    applicants: 34,
  },
  {
    id: 'AP002',
    title: 'Industrial Training Program — Cloud & DevOps',
    type: 'Industrial Training',
    organization: 'Amazon Web Services (AWS)',
    domain: 'Cloud Computing',
    description:
      'Structured 3-week industrial training for faculty members to gain practical exposure to AWS cloud infrastructure, DevOps practices, and modern deployment pipelines. Includes AWS certification vouchers.',
    duration: '3 weeks',
    location: 'Online + Bengaluru Campus Visit',
    deadline: '2026-10-15',
    seats: 25,
    stipend: 'Travel + Accommodation provided',
    eligibility: 'Faculty teaching cloud computing, networking, or related subjects',
    tags: ['AWS', 'Cloud', 'DevOps', 'Certification'],
    status: 'Open',
    applicants: 62,
  },
  {
    id: 'AP003',
    title: 'Faculty Development Program — Data Analytics',
    type: 'FDP',
    organization: 'IIT Delhi & NASSCOM',
    domain: 'Data Science & AI',
    description:
      'A comprehensive 5-day FDP jointly organized by IIT Delhi and NASSCOM to upskill faculty on modern data analytics tools, techniques, and curriculum integration strategies.',
    duration: '5 days',
    location: 'IIT Delhi, New Delhi',
    deadline: '2026-09-30',
    seats: 40,
    stipend: 'Free, Travel support available',
    eligibility: 'Faculty from recognized technical institutions, any department',
    tags: ['FDP', 'Data Analytics', 'Curriculum', 'NASSCOM'],
    status: 'Closing Soon',
    applicants: 88,
  },
  {
    id: 'AP004',
    title: 'Industry Mentorship — Startup Ecosystem',
    type: 'Mentorship',
    organization: 'iStart India',
    domain: 'Business & Management',
    description:
      'Faculty members mentor early-stage startups in residence programs, gaining direct exposure to innovation challenges, product thinking, and entrepreneurship ecosystems.',
    duration: '6 months (Part-time)',
    location: 'Remote / Hybrid',
    deadline: '2026-11-01',
    stipend: '₹20,000/month honorarium',
    eligibility: 'Faculty with industry experience or entrepreneurship background',
    tags: ['Startup', 'Mentorship', 'Entrepreneurship', 'Innovation'],
    status: 'Open',
    applicants: 21,
  },
  {
    id: 'AP005',
    title: 'Workshop Facilitation — Cybersecurity Essentials',
    type: 'Workshop',
    organization: 'CERT-In',
    domain: 'Cybersecurity',
    description:
      'Participate as a facilitator or co-trainer in national cybersecurity awareness workshops conducted across colleges. CERT-In provides all training materials and co-facilitator support.',
    duration: '2 days per workshop',
    location: 'Multiple locations across India',
    deadline: '2026-10-20',
    eligibility: 'Faculty with cybersecurity or networking background',
    tags: ['Cybersecurity', 'CERT-In', 'Training', 'National Program'],
    status: 'Open',
    applicants: 45,
  },
  {
    id: 'AP006',
    title: 'Research Collaboration — Sustainable Tech',
    type: 'Research Collaboration',
    organization: 'Tata Consultancy Services (TCS)',
    domain: 'Software Development',
    description:
      'Joint research collaboration with TCS Research on sustainable software engineering practices, green computing, and energy-efficient algorithms. Includes co-publication opportunities.',
    duration: '12 months',
    location: 'Remote + Quarterly visits to TCS Labs',
    deadline: '2026-10-10',
    stipend: 'Research grant up to ₹5,00,000',
    eligibility: 'PhD holders with publication record in relevant area',
    tags: ['Research', 'TCS', 'Sustainability', 'Green Tech'],
    status: 'Open',
    applicants: 18,
  },
]

export const mockAcademicianKPIs = {
  activePrograms: 6,
  facultyParticipation: 124,
  industryCollaborations: 18,
  researchOpportunities: 9,
}
