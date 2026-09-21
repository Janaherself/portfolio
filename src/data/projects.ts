import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'aqwa',
    name: 'Aqwa',
    tagline: 'A gym, minus the clipboard.',
    motif: 'reps',
    description:
      "Aqwa is a gym management app I started after watching my own gym run on spreadsheets, whiteboards, and memory. Membership tracking, class scheduling, and day-to-day admin all happen manually, so I'm building the software version of that process.",
    contribution:
      "I'm designing the data model and API around how a gym actually operates day to day, then building the interface on top. It's still taking shape, the workflows and architecture are actively evolving as I learn more about the real problem.",
    stack: ['ASP.NET Core', 'C#', 'React', 'TypeScript', 'PostgreSQL'],
    status: 'in-progress',
    statusNote: 'Personal project, actively being designed and built.',
    githubUrl: 'https://github.com/Janaherself/aqwa',
    liveUrl: '',
  },
  {
    slug: 'sorpresa',
    name: 'Sorpresa',
    tagline: 'Shopping, but your\'re not gonna expect what is coming.',
    motif: 'orders',
    description:
      'Sorpresa is a mystery-package shopping app: browse categories, order a "surprise" package instead of a specific product, and the app handles the logic behind what that actually means for inventory and fulfillment.',
    contribution:
      'I built the REST API and database layer (such as schema design and raw SQL queries), and the Angular frontend that consumes it. Most of the interesting problems were on the backend: modelling categories and mystery packages in a way that stays sane as rules change.',
    stack: ['Node.js', 'Express', 'Angular', 'TypeScript', 'PostgreSQL'],
    status: 'complete',
    statusNote: 'Personal project.',
    githubUrl: 'https://github.com/Janaherself/sorpresa-frontend',
    liveUrl: 'https://sorpresa-vz4i.onrender.com',
  },
  {
    slug: 'innfinity',
    name: 'Innfinity',
    tagline: 'A hotel booking API that takes itself seriously.',
    motif: 'bookings',
    description:
      "Innfinity is a hotel booking API built the way I'd want a real backend team to build one: layered architecture, validation at the edges, structured logging, and tests that actually run in CI.",
    contribution:
      'I built the layered architecture (controllers → services → repositories), wired up validation with FluentValidation, mapping with AutoMapper, and logging with Serilog, and set up automated tests plus a Docker + GitHub Actions pipeline. This one is about proving I can build backend software that\'s maintainable, not just functional.',
    stack: [
      '.NET 8',
      'ASP.NET Core',
      'SQL Server',
      'FluentValidation',
      'AutoMapper',
      'Serilog',
      'Docker',
      'GitHub Actions',
    ],
    status: 'complete',
    statusNote: 'Personal project.',
    githubUrl: 'https://github.com/Janaherself/Hotel-Booking-Platform',
    liveUrl: '',
  },
];
