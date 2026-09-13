import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../../data/types';
import { GithubIcon } from '../../ui/BrandIcons';

export function TechTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-soft)' }}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) {
    return (
      <p className="text-xs italic" style={{ color: 'var(--ink-faint)' }}>
        Links coming soon.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}
        >
          <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Code
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Live demo
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function StatusBadge({ project }: { project: Project }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
      style={{ background: 'var(--accent-soft)', color: 'var(--accent-strong)' }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-strong)' }} aria-hidden="true" />
      {project.status === 'in-progress' ? 'in progress' : 'complete'}
    </span>
  );
}
