import { GraduationCap } from 'lucide-react';
import { experience } from '../../data/experience';
import type { Experience as ExperienceItem } from '../../data/types';
import { Section } from '../ui/Section';
import { TechTags } from './projects/ProjectBits';

function EmphasisCard({ item }: { item: ExperienceItem }) {
  const isTraining = item.kind === 'training';
  const isLarge = item.emphasis === 'lg';

  return (
    <li className="relative ps-10 sm:ps-12">
      <span
        className="absolute start-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2"
        style={{
          borderColor: isTraining ? 'var(--accent-2)' : 'var(--accent)',
          background: 'var(--bg)',
        }}
        aria-hidden="true"
      >
        {isTraining ? (
          <GraduationCap className="h-3.5 w-3.5" style={{ color: 'var(--accent-2)' }} />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
        )}
      </span>

      <div
        className="rounded-xl border p-5 sm:p-6"
        style={{
          borderColor: 'var(--border)',
          background: isTraining ? 'transparent' : 'var(--bg-raised)',
          borderStyle: isTraining ? 'dashed' : 'solid',
        }}
      >
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className={`font-display font-semibold ${isLarge ? 'text-2xl' : 'text-xl'}`}>{item.organization}</h3>
          {isTraining && (
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide"
              style={{ background: 'var(--accent-2-soft)', color: 'var(--accent-2)' }}
            >
              Training
            </span>
          )}
        </div>
        <p className="mb-3 text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {item.role}
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {item.summary}
        </p>
        <ul className="mb-4 space-y-2">
          {item.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--ink-faint)' }} />
              {point}
            </li>
          ))}
        </ul>
        {item.stack && <TechTags stack={item.stack} />}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Where I've worked"
      title="Learning fast, on real codebases"
      description="Two internships and one earlier detour into data science, each one taught me something I still use."
    >
      <ol className="relative flex flex-col gap-6">
        <span
          className="pointer-events-none absolute bottom-2 start-0 top-2 flex w-6 justify-center"
          aria-hidden="true"
        >
          <span className="h-full w-px" style={{ background: 'var(--border-strong)' }} />
        </span>
        {experience.map((item) => (
          <EmphasisCard key={item.id} item={item} />
        ))}
      </ol>
    </Section>
  );
}