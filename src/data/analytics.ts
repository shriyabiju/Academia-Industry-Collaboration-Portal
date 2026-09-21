// PROTOTYPE DATA — Replace with FastAPI /api/analytics endpoints

export const mockInstitutionalKPIs = {
  studentsAssessed: 1842,
  studentsMatched: 1124,
  activeInternships: 287,
  placementProgress: 68,
  totalStudents: 2400,
  assessmentCoverage: 77,
  industryPartners: 42,
  averageCompetency: 64,
}

export const mockSkillGapData = [
  { skill: 'React / Frontend', students: 412, percentage: 22 },
  { skill: 'Cloud Deployment', students: 387, percentage: 21 },
  { skill: 'Machine Learning', students: 354, percentage: 19 },
  { skill: 'Data Visualization', students: 298, percentage: 16 },
  { skill: 'Cybersecurity', students: 245, percentage: 13 },
  { skill: 'Communication', students: 198, percentage: 11 },
  { skill: 'SQL / Databases', students: 167, percentage: 9 },
]

export const mockCompetencyDistribution = [
  { level: 'Advanced', count: 312, percentage: 17, color: '#4f46e5' },
  { level: 'Intermediate', count: 892, percentage: 48, color: '#6366f1' },
  { level: 'Beginner', count: 638, percentage: 35, color: '#a5b4fc' },
]

export const mockInternshipProgress = [
  { month: 'Apr', applied: 120, shortlisted: 64, selected: 32 },
  { month: 'May', applied: 165, shortlisted: 88, selected: 48 },
  { month: 'Jun', applied: 210, shortlisted: 115, selected: 67 },
  { month: 'Jul', applied: 187, shortlisted: 98, selected: 55 },
  { month: 'Aug', applied: 243, shortlisted: 142, selected: 89 },
  { month: 'Sep', applied: 198, shortlisted: 124, selected: 76 },
]

export const mockCareerDomainData = [
  { domain: 'Software Dev', students: 680, color: '#4f46e5' },
  { domain: 'Data Science & AI', students: 520, color: '#6366f1' },
  { domain: 'Cloud Computing', students: 310, color: '#818cf8' },
  { domain: 'Cybersecurity', students: 280, color: '#a5b4fc' },
  { domain: 'UI/UX', students: 190, color: '#c7d2fe' },
  { domain: 'Business & Mgmt', students: 220, color: '#e0e7ff' },
]

export const mockDepartmentFilter = [
  'All Departments',
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
]

export const mockPlacementTrend = [
  { year: '2022', placed: 420, total: 680, rate: 62 },
  { year: '2023', placed: 498, total: 720, rate: 69 },
  { year: '2024', placed: 542, total: 760, rate: 71 },
  { year: '2025', placed: 589, total: 800, rate: 74 },
  { year: '2026', placed: 287, total: 840, rate: 68 },
]

export const mockIndustryDemandTrend = [
  { month: 'Apr', python: 78, react: 65, sql: 72, cloud: 55, ml: 48 },
  { month: 'May', python: 80, react: 70, sql: 74, cloud: 58, ml: 52 },
  { month: 'Jun', python: 82, react: 73, sql: 75, cloud: 62, ml: 56 },
  { month: 'Jul', python: 85, react: 78, sql: 76, cloud: 65, ml: 60 },
  { month: 'Aug', python: 88, react: 82, sql: 80, cloud: 72, ml: 65 },
  { month: 'Sep', python: 92, react: 87, sql: 85, cloud: 78, ml: 74 },
]
