import { FileText, Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { personal, socialLinks } from '../../data/personal';
import type { SocialLink } from '../../data/types';
import { Section } from '../ui/Section';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

const ICONS: Record<SocialLink['icon'], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  'file-text': FileText,
  mail: Mail,
};

function CoffeeCup() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path
        d="M20 28h28l-2.5 24a6 6 0 0 1-6 5.5H28.5a6 6 0 0 1-6-5.5L20 28Z"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M48 32h4a6 6 0 0 1 0 12h-3" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <path
        className="steam"
        d="M27 20c0-3 3-3 3-6s-2-4-2-4"
        stroke="var(--accent-2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="steam steam-delay"
        d="M36 20c0-3 3-3 3-6s-2-4-2-4"
        stroke="var(--accent-2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function About() {
  const availableLinks = socialLinks.filter((link) => link.url);

  return (
    <Section
      id="about"
      eyebrow="Say hello"
      title="Curious about the rest?"
      description="Here's the short version of who I am — and how to reach me if you want the longer one."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="max-w-2xl space-y-4">
          {personal.about.map((paragraph, index) => (
            <p key={index} className="leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {paragraph}
            </p>
          ))}

          {availableLinks.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-4">
              {availableLinks.map((link) => {
                const Icon = ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.icon === 'mail' ? `mailto:${link.url}` : link.url}
                    target={link.icon === 'mail' ? undefined : '_blank'}
                    rel={link.icon === 'mail' ? undefined : 'noreferrer noopener'}
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="pt-4 text-sm italic" style={{ color: 'var(--ink-faint)' }}>
              Contact links go here — add GitHub, LinkedIn, a CV, or an email in{' '}
              <code className="font-mono" style={{ color: 'var(--ink)' }}>
                src/data/personal.ts
              </code>
              .
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 justify-self-center rounded-xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}>
          <CoffeeCup />
          <p className="font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
            fuel level: sufficient
          </p>
        </div>
      </div>
    </Section>
  );
}
