import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    track: 'professional',
    title: 'Used on the job',
    blurb: 'Shipped in production, or built for a team that depends on it.',
    items: ['ASP.NET Core', 'Entity Framework', 'TypeScript', 'React', 'Node.js', 'Git & GitHub', 'JWT'],
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
      '.NET 8',
      'FluentValidation',
      'AutoMapper',
      'Serilog',
      'Docker & GitHub Actions',
      'Automated testing',
    ],
  },
  {
    track: 'learning',
    title: 'Actively improving',
    blurb: "Comfortable, not finished, I'm still sharpening (fighting) these.",
    items: ['React + TypeScript patterns', 'System design for frontend', 'Data analysis & ML fundamentals', 'Automation'],
  },
];

export const engineeringApproach: string[] = [
  'Understand the problem before touching the solution.',
  "Read the error message twice, the real bug is usually in the details.",
  'Ask questions early. It costs a minute now and saves a week later.',
  'Prefer code I can explain over code that just happens to work.',
];
