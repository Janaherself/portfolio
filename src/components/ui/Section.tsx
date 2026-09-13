import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      <div className="mb-10 sm:mb-14">
        {eyebrow && (
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'var(--accent)' }}
          >
            {eyebrow}
          </p>
        )}
        <h2 id={headingId} className="font-display text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--ink-soft)' }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
