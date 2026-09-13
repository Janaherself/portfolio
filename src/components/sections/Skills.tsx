import { skillGroups, engineeringApproach } from '../../data/skills';
import { Section } from '../ui/Section';
import { MysteryTrigger } from '../curiosity/MysteryTrigger';

const MYSTERY_SKILL = 'REST API design';

export function Skills() {
  return (
    <Section
      id="approach"
      eyebrow="How I work"
      title="Skills, honestly labeled"
      description="Grouped by how I actually know each one — not a wall of logos, and no invented expert badges."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.track}
            className="rounded-xl border p-5 sm:p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
          >
            <h3 className="font-display text-lg font-semibold">{group.title}</h3>
            <p className="mb-4 mt-1 text-sm" style={{ color: 'var(--ink-faint)' }}>
              {group.blurb}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) =>
                item === MYSTERY_SKILL ? (
                  <li key={item}>
                    <MysteryTrigger id="skill-chip" label={`${item} — this one has a story`}>
                      <span
                        className="rounded-full border px-2.5 py-1 text-xs font-medium"
                        style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-soft)' }}
                      >
                        {item}
                      </span>
                    </MysteryTrigger>
                  </li>
                ) : (
                  <li
                    key={item}
                    className="rounded-full border px-2.5 py-1 text-xs font-medium"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--ink-soft)' }}
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mt-8 rounded-xl border p-6 sm:p-8"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-sunken)' }}
      >
        <h3 className="mb-4 font-display text-lg font-semibold">A few rules I actually follow</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {engineeringApproach.map((rule) => (
            <li key={rule} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              <span className="mt-1 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>
                →
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
