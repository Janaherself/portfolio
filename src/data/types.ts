/**
 * Shared content types.
 *
 * Everything a visitor reads lives in plain data files under `src/data/`.
 * Components only render this data — they don't contain copy themselves.
 * That split means updating a project, a job, or a link never requires
 * touching JSX.
 */

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** What Jana specifically explored, built, or owned. */
  contribution: string;
  stack: string[];
  status: 'in-progress' | 'complete';
  /** Free-text note shown near the status, e.g. "personal project, still evolving". */
  statusNote?: string;
  /** Leave empty/undefined to hide the button instead of guessing a URL. */
  githubUrl?: string;
  liveUrl?: string;
  /** A short accent word used in the project's visual treatment, e.g. "reps", "orders". */
  motif: string;
}

export type ExperienceKind = 'internship' | 'training';

export interface Experience {
  id: string;
  organization: string;
  role: string;
  kind: ExperienceKind;
  period?: string;
  summary: string;
  highlights: string[];
  stack?: string[];
  /** Controls visual weight in the timeline: 'lg' | 'md' | 'sm'. */
  emphasis: 'lg' | 'md' | 'sm';
}

export type SkillTrack = 'professional' | 'personal-projects' | 'learning';

export interface SkillGroup {
  track: SkillTrack;
  title: string;
  blurb: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url?: string;
  icon: 'github' | 'linkedin' | 'file-text' | 'mail';
}
