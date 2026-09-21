// PROTOTYPE DATA — Replace with FastAPI /api/assessments endpoints

export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  skill: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export interface Assessment {
  id: string
  title: string
  domain: string
  type: 'Domain-Specific' | 'Scenario-Based'
  description: string
  duration: number // minutes
  totalQuestions: number
  questions: Question[]
}

export interface AssessmentResult {
  assessmentId: string
  studentId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  skillBreakdown: { skill: string; score: number; level: string }[]
  completedAt: string
}

export const mockAssessments: Assessment[] = [
  {
    id: 'ASS001',
    title: 'Software Development Competency',
    domain: 'Software Development',
    type: 'Domain-Specific',
    description: 'Evaluate your core software development skills including programming, system design, and best practices.',
    duration: 45,
    totalQuestions: 15,
    questions: [
      {
        id: 'Q001',
        text: 'Which of the following best describes the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctIndex: 1,
        skill: 'Problem Solving',
        difficulty: 'Medium',
      },
      {
        id: 'Q002',
        text: 'What does REST stand for in the context of web APIs?',
        options: [
          'Remote Execution State Transfer',
          'Representational State Transfer',
          'Resource Entity State Transfer',
          'Runtime Environment Service Transfer',
        ],
        correctIndex: 1,
        skill: 'REST APIs',
        difficulty: 'Easy',
      },
      {
        id: 'Q003',
        text: 'Which Python data structure would you use to store unique elements?',
        options: ['List', 'Tuple', 'Set', 'Dictionary'],
        correctIndex: 2,
        skill: 'Python',
        difficulty: 'Easy',
      },
      {
        id: 'Q004',
        text: 'In SQL, which clause is used to filter grouped results?',
        options: ['WHERE', 'HAVING', 'FILTER', 'GROUP BY'],
        correctIndex: 1,
        skill: 'SQL',
        difficulty: 'Medium',
      },
      {
        id: 'Q005',
        text: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          'To declare component state variables',
          'To handle side effects in functional components',
          'To create custom hooks',
          'To memoize expensive calculations',
        ],
        correctIndex: 1,
        skill: 'React',
        difficulty: 'Medium',
      },
      {
        id: 'Q006',
        text: 'Which Git command creates a new branch and switches to it?',
        options: ['git branch new-branch', 'git checkout -b new-branch', 'git create new-branch', 'git switch new-branch'],
        correctIndex: 1,
        skill: 'Git & Version Control',
        difficulty: 'Easy',
      },
      {
        id: 'Q007',
        text: 'What is a decorator in Python?',
        options: [
          'A way to add comments to code',
          'A function that modifies another function\'s behavior',
          'A type of loop',
          'A built-in data structure',
        ],
        correctIndex: 1,
        skill: 'Python',
        difficulty: 'Hard',
      },
      {
        id: 'Q008',
        text: 'Which HTTP status code indicates a resource was not found?',
        options: ['200', '301', '404', '500'],
        correctIndex: 2,
        skill: 'REST APIs',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'ASS002',
    title: 'Data Science & Analytics',
    domain: 'Data Science & AI',
    type: 'Domain-Specific',
    description: 'Assess your data science skills including statistics, ML fundamentals, and data analysis.',
    duration: 40,
    totalQuestions: 12,
    questions: [
      {
        id: 'Q101',
        text: 'Which measure of central tendency is most affected by outliers?',
        options: ['Median', 'Mode', 'Mean', 'Variance'],
        correctIndex: 2,
        skill: 'Data Analysis',
        difficulty: 'Easy',
      },
      {
        id: 'Q102',
        text: 'What type of machine learning is used when labels are available for training data?',
        options: ['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Semi-supervised Learning'],
        correctIndex: 1,
        skill: 'Machine Learning',
        difficulty: 'Easy',
      },
      {
        id: 'Q103',
        text: 'Which Python library is primarily used for numerical computations?',
        options: ['Pandas', 'Matplotlib', 'NumPy', 'Scikit-learn'],
        correctIndex: 2,
        skill: 'Python',
        difficulty: 'Easy',
      },
      {
        id: 'Q104',
        text: 'What does overfitting mean in machine learning?',
        options: [
          'The model is too simple to capture patterns',
          'The model performs well on training data but poorly on new data',
          'The model has too few parameters',
          'The training data has insufficient samples',
        ],
        correctIndex: 1,
        skill: 'Machine Learning',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'ASS003',
    title: 'Cross-Domain Problem Solving',
    domain: 'Multi-Domain',
    type: 'Scenario-Based',
    description: 'Real-world scenarios that test practical problem solving, communication, and cross-functional thinking.',
    duration: 50,
    totalQuestions: 10,
    questions: [
      {
        id: 'Q201',
        text: 'A startup\'s web app is experiencing slow load times. The database has 2M records and queries are taking 5+ seconds. What is your FIRST step?',
        options: [
          'Immediately switch to a NoSQL database',
          'Analyze query execution plans and add missing indexes',
          'Rewrite the entire backend in a faster language',
          'Purchase more powerful servers',
        ],
        correctIndex: 1,
        skill: 'Problem Solving',
        difficulty: 'Medium',
      },
      {
        id: 'Q202',
        text: 'Your team\'s sprint is delayed because two developers disagree on architecture. As team lead, what do you do?',
        options: [
          'Make the decision yourself without discussion',
          'Ignore the disagreement and let them figure it out',
          'Facilitate a structured discussion with pros/cons, then make a time-boxed decision',
          'Escalate to management immediately',
        ],
        correctIndex: 2,
        skill: 'Communication',
        difficulty: 'Medium',
      },
      {
        id: 'Q203',
        text: 'A client wants a new feature added in 2 days that normally takes 1 week. What is the best approach?',
        options: [
          'Agree and work overtime without informing the team',
          'Refuse the request entirely',
          'Clarify requirements, identify a minimal viable version, and negotiate scope with the client',
          'Delegate entirely to junior developers',
        ],
        correctIndex: 2,
        skill: 'Communication',
        difficulty: 'Hard',
      },
    ],
  },
]

export const mockAssessmentResult: AssessmentResult = {
  assessmentId: 'ASS001',
  studentId: 'STU001',
  score: 73,
  totalQuestions: 8,
  correctAnswers: 6,
  timeTaken: 28,
  skillBreakdown: [
    { skill: 'Python', score: 88, level: 'Advanced' },
    { skill: 'SQL', score: 65, level: 'Intermediate' },
    { skill: 'React', score: 40, level: 'Beginner' },
    { skill: 'REST APIs', score: 75, level: 'Intermediate' },
    { skill: 'Problem Solving', score: 80, level: 'Advanced' },
    { skill: 'Git & Version Control', score: 90, level: 'Advanced' },
  ],
  completedAt: '2026-09-21T10:30:00Z',
}
