import type { SkillGroup } from './types';

/**
 * Skills grouped by how Jana actually knows them — not a wall of logos,
 * and no invented proficiency percentages.
 */

export const skillGroups: SkillGroup[] = [
  {
    track: 'professional',
    title: 'Used on the job',
    blurb: 'Shipped in production, or built for a team that depends on it.',
    items: ['ASP.NET Core', 'C#', 'React', 'Entity Framework', 'JWT & role-based access', 'Git & GitHub'],
  },
  {
    track: 'personal-projects',
    title: 'Used in my own projects',
    blurb: 'Learned by building something real with it, end to end.',
    items: [
      'TypeScript',
      'Node.js & Express',
      'REST API design',
      'SQL & relational databases',
      'Angular',
      '.NET 8',
      'FluentValidation & AutoMapper',
      'Serilog',
      'Docker & GitHub Actions',
      'Automated testing',
    ],
  },
  {
    track: 'learning',
    title: 'Actively improving',
    blurb: "Comfortable, not finished — I'm still deepening these.",
    items: ['React + TypeScript patterns', 'System design for backend services', 'Data analysis & ML fundamentals'],
  },
];

export const engineeringApproach: string[] = [
  'Understand the problem before touching the solution.',
  "Read the error message twice — the real bug is rarely the first thing it blames.",
  'Ask questions early. It costs a minute now and saves a week later.',
  'Prefer code I can explain over code that just happens to work.',
];
