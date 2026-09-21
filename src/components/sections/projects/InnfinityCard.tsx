import type { Project } from '../../../data/types';
import { CuriosityNote } from '../../ui/CuriosityNote';
import { ProjectLinks, StatusBadge, TechTags } from './ProjectBits';

const LAYERS = ['Controllers', 'Services', 'Repositories', 'SQL Server'];

export function InnfinityCard({ project }: { project: Project }) {
  return (
    <article
      className="grid gap-8 rounded-xl border p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
    >
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-semibold">{project.name}</h3>
          <StatusBadge project={project} />
        </div>
        <p className="mb-4 font-mono text-sm" style={{ color: 'var(--accent)' }}>
          {project.tagline}
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {project.description}
        </p>
        <p className="mb-6 flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {project.contribution}
          <CuriosityNote
            label="Why bother with this much structure for a side project?"
            note="Because the discipline is the point. Logging, validation, and tests are easy to skip on a personal project, I wanted to practice them properly."
            className="mt-0.5"
          />
        </p>
        <TechTags stack={project.stack} />
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div
        className="flex flex-col justify-center gap-2.5 rounded-lg border p-6"
        style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-sunken)' }}
        aria-hidden="true"
      >
        {LAYERS.map((layer, index) => (
          <div key={layer} className="flex items-center gap-3">
            <div
              className="flex-1 rounded-md border px-4 py-3 text-center font-mono text-xs font-semibold"
              style={{
                borderColor: 'var(--border-strong)',
                background: 'var(--bg-raised)',
                color: index === LAYERS.length - 1 ? 'var(--accent)' : 'var(--ink)',
              }}
            >
              {layer}
            </div>
          </div>
        ))}
        <p className="mt-2 text-center font-mono text-[11px]" style={{ color: 'var(--ink-faint)' }}>
          + FluentValidation · AutoMapper · Serilog · tests · CI
        </p>
      </div>
    </article>
  );
}
