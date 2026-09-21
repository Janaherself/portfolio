export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  contribution: string;
  stack: string[];
  status: 'in-progress' | 'complete';
  statusNote?: string;
  githubUrl?: string;
  liveUrl?: string;
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
