import type { SocialLink } from './types';

export const personal = {
  name: 'Jana',
  role: 'Software Engineer',

  tagline: "I ask a lot of 'why? how? what?', then go figure it out.",

  about: [
    "I'm a software engineer with a backend-leaning brain and a full-stack toolbox. Before I write a line of code, I want to understand why the problem exists in the first place, that's usually the most interesting question anyway 💁🏻‍♀️",
    "I like picking things apart, seeing how they're wired, and then making them a little better. Some of that shows up in production code, some of it shows up in side projects that started as 'huh, that's annoying' and turned into an app.",
  ],

  calendlyUrl: 'https://calendly.com/jana-abusaa/coffee-chat-with-jana',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Janaherself', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jana-abusaa/', icon: 'linkedin' },
  { label: 'CV / Résumé', url: '/cv/JanaAbusaa-SoftwareEngineer.pdf', icon: 'file-text' },
  { label: 'Email', url: 'mailto:jana.abusaa@gmail.com', icon: 'mail' },
];
