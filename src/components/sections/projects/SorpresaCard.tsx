import type { Project } from '../../../data/types';
import { CuriosityNote } from '../../ui/CuriosityNote';
import { ProjectLinks, StatusBadge, TechTags } from './ProjectBits';

const CATEGORY_STICKERS = [
  { label: 'snacks?', rotate: '-rotate-3' },
  { label: 'tech??', rotate: 'rotate-2' },
  { label: 'totally random', rotate: '-rotate-1' },
];

export function SorpresaCard({ project }: { project: Project }) {
  return (
    <article
      className="grid gap-8 rounded-xl border p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
    >
      <div
        className="relative order-2 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-lg border p-6 lg:order-1"
        style={{ borderColor: 'var(--border-strong)', background: 'var(--accent-2-soft)' }}
        aria-hidden="true"
      >
        <span className="font-display text-7xl font-bold" style={{ color: 'var(--accent-2)' }}>
          ?
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORY_STICKERS.map((sticker) => (
            <span
              key={sticker.label}
              className={`${sticker.rotate} rounded-md border px-3 py-1.5 font-mono text-xs font-semibold shadow-sm`}
              style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-strong)', color: 'var(--accent-2)' }}
            >
              {sticker.label}
            </span>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-semibold">{project.name}</h3>
          <StatusBadge project={project} />
        </div>
        <p className="mb-4 font-mono text-sm" style={{ color: 'var(--accent-2)' }}>
          {project.tagline}
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {project.description}
        </p>
        <p className="mb-6 flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {project.contribution}
          <CuriosityNote
            label="Why raw SQL instead of an ORM?"
            note="I wanted to actually feel the queries, category joins and order logic get complicated fast, and writing the SQL by hand taught me more than an ORM would have hidden from me."
            className="mt-0.5"
          />
        </p>
        <TechTags stack={project.stack} />
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
