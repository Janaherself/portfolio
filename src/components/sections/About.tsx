import { FileText, Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { personal, socialLinks } from '../../data/personal';
import type { SocialLink } from '../../data/types';
import { Section } from '../ui/Section';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { CoffeePotMystery } from '../curiosity/CoffeePotMystery';

const ICONS: Record<SocialLink['icon'], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  'file-text': FileText,
  mail: Mail,
};

export function About() {
  const availableLinks = socialLinks.filter((link) => link.url);

  return (
    <Section
      id="about"
      eyebrow="Say hello"
      title="Curious about the rest?"
      description="Here's the short version of who I am, and how to reach me if you want the longer one."
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
                const opensNewTab = link.icon !== 'mail';
                return (
                  <a
                    key={link.label}
                    href={link.icon === 'mail' ? `mailto:${link.url}` : link.url}
                    target={opensNewTab ? '_blank' : undefined}
                    rel={opensNewTab ? 'noreferrer noopener' : undefined}
                    aria-label={opensNewTab ? `${link.label} (opens in a new tab)` : link.label}
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

        <div
          className="relative flex flex-col items-center gap-2 justify-self-center rounded-xl border p-6"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
        >
          <CoffeePotMystery />
        </div>
      </div>
    </Section>
  );
}
