import type { Experience } from './types';

export const experience: Experience[] = [
  {
    id: 'capital-placement',
    organization: 'Capital Placement',
    role: 'Software Engineering Intern',
    kind: 'internship',
    summary:
      "Joined a remote team and an unfamiliar React codebase, shipped my first production feature within the first month.",
    highlights: [
      'Learned an existing production codebase fast enough to ship real changes to it, not just read it.',
      'Contributed across the frontend and backend, alongside engineers and designers, with shared ownership of features.',
      'Did manual QA on my own deliverables before they went out, nobody else was going to catch my edge cases for me.',
      'Used AI agents to accelerate understanding the code and shipping features.',
    ],
    stack: ['React', 'TypeScript', 'ASP.NET Core', 'C#', 'Cosmos DB'],
    emphasis: 'lg',
  },
  {
    id: 'fts',
    organization: 'Foothill Technology Solutions',
    role: 'Backend Development Intern',
    kind: 'internship',
    summary:
      'Backend-focused internship building APIs with ASP.NET Core, from data access up to authorization.',
    highlights: [
      'Learned clean code and system design principles from scratch.',
      'Built and maintained ASP.NET Core REST APIs.',
      'Wrote and managed Entity Framework migrations, and unit/integration tests.',
      'Implemented JWT authentication and role-based access control.',
    ],
    stack: ['ASP.NET Core', 'Entity Framework', 'JWT', 'RBAC', 'REST API Design', 'SQL Server', 'Schema Design'],
    emphasis: 'md',
  },
  {
    id: 'gsg',
    organization: 'Gaza Sky Geeks',
    role: 'Data Science Trainee',
    kind: 'internship',
    summary:
      'Structured training in data science fundamentals, an earlier chapter that still shapes how I think about data.',
    highlights: [
      'Learned core data handling, analysis, and visualization techniques.',
      'Got hands-on exposure to machine learning concepts and workflows.',
    ],
    stack: ['Python', 'Jupyter Notebook', 'Pandas', 'Numpy', 'Plotly', 'Scikit-learn', 'XGBoost', 'TensorFlow', 'NLP'],
    emphasis: 'sm',
  },
];
