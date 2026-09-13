import type { Experience } from './types';

/**
 * Work + training history, in reverse-chronological / emphasis order.
 * `emphasis` controls how much visual weight each entry gets in the
 * timeline — it is not a claim about seniority.
 */

export const experience: Experience[] = [
  {
    id: 'capital-placement',
    organization: 'Capital Placement',
    role: 'Software Engineering Intern',
    kind: 'internship',
    summary:
      "Joined a remote team and an unfamiliar React codebase — and shipped my first production feature within the first month.",
    highlights: [
      'Learned an existing production codebase fast enough to ship real changes to it, not just read it.',
      'Contributed across the frontend and backend, alongside engineers and designers, with shared ownership of features.',
      'Did manual QA on my own deliverables before they went out — nobody else was going to catch my edge cases for me.',
      'Used AI agents as part of my day-to-day development workflow, not as a shortcut around understanding the code.',
    ],
    stack: ['React', 'TypeScript'],
    emphasis: 'lg',
  },
  {
    id: 'fts',
    organization: 'FTS',
    role: 'Backend Development Intern',
    kind: 'internship',
    summary:
      'Backend-focused internship building APIs with ASP.NET Core, from data access up to auth.',
    highlights: [
      'Built and maintained ASP.NET Core APIs.',
      'Wrote and managed Entity Framework migrations.',
      'Implemented JWT authentication and role-based access control.',
    ],
    stack: ['ASP.NET Core', 'Entity Framework', 'JWT'],
    emphasis: 'md',
  },
  {
    id: 'gsg',
    organization: 'GSG',
    role: 'Data Science Training',
    kind: 'training',
    summary:
      'Structured training in data science fundamentals — an earlier chapter that still shapes how I think about data.',
    highlights: [
      'Learned core data handling and analysis techniques.',
      'Got hands-on exposure to machine learning concepts and workflows.',
      'Not professional experience — training that adds a data-literate angle to my engineering background.',
    ],
    emphasis: 'sm',
  },
];
