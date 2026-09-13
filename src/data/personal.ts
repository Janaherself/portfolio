import type { SocialLink } from './types';

/**
 * Core identity content — the hero, the about note, and contact links.
 *
 * Fill in the empty URLs below when you have them. Any link left blank
 * is automatically hidden instead of rendered as a dead button.
 */

export const personal = {
  name: 'Jana',
  role: 'Software Engineer',
  location: '', // optional — add a city/region if you'd like it shown

  /** Short line under the name in the hero. */
  tagline: "I ask a lot of 'wait, why does it do that?' — then go find out.",

  /** Longer paragraph for the About section. Keep it human, not a résumé. */
  about: [
    "I'm a software engineer with a backend-leaning brain and a full-stack toolbox. Before I write a line of code, I want to understand why the problem exists in the first place — that's usually the more interesting question anyway.",
    "I like picking things apart, seeing how they're wired, and then making them a little better. Some of that shows up in production code, some of it shows up in side projects that started as 'huh, that's annoying' and turned into an app.",
    "Also: I run on coffee. Not a personality trait, just a fact.",
  ],

  /** Used in meta tags and footer. */
  shortBio:
    "Software engineer who reads the error message twice, asks why, and then fixes the actual problem.",

  /** Shown as the "quick call" link in the curiosity-game completion modal.
   *  Leave empty to fall back to plain, non-linked text instead of a dead link. */
  calendlyUrl: 'https://calendly.com/jana-abusaa/coffee-chat-with-jana',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Janaherself', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jana-abusaa/', icon: 'linkedin' },
  { label: 'CV / Résumé', url: 'cv', icon: 'file-text' },
  { label: 'Email', url: 'mailto:jana.abusaa@gmail.com', icon: 'mail' },
];
