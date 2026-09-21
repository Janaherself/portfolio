import type { Project } from '../../../data/types';
import { CuriosityNote } from '../../ui/CuriosityNote';
import { ProjectLinks, StatusBadge, TechTags } from './ProjectBits';

const WORKFLOW_ITEMS = ['Membership tracking', 'Class scheduling', 'Check-ins', 'Attendance history'];

export function AqwaCard({ project }: { project: Project }) {
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
            label="Why start from a real gym's whiteboard?"
            note="I'm a member there. I watched the front desk juggle a paper sign-in sheet and full stacks of members records and thought: this is a problem I could solve!"
            className="mt-0.5"
          />
        </p>
        <TechTags stack={project.stack} />
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div
        className="relative flex flex-col justify-between rounded-lg border p-5"
        style={{
          borderColor: 'var(--border-strong)',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 27px, var(--border) 27px, var(--border) 28px), var(--bg-sunken)',
        }}
        aria-hidden="true"
      >
        <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-faint)' }}>
          the whiteboard, digitized
        </p>
        <ul className="space-y-3">
          {WORKFLOW_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--ink-soft)' }}>
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border"
                style={{ borderColor: 'var(--border-strong)' }}
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-display text-4xl font-semibold" style={{ color: 'var(--accent)' }}>
          {project.motif}<span className="font-mono text-base" style={{ color: 'var(--ink-faint)' }}> in progress</span>
        </p>
      </div>
    </article>
  );
}
