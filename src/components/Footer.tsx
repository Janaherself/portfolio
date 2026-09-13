import { personal } from '../data/personal';

export function Footer() {
  return (
    <footer
      className="border-t px-5 py-8 text-center text-xs sm:px-8"
      style={{ borderColor: 'var(--border)', color: 'var(--ink-faint)' }}
    >
      <p>
        Built by {personal.name} with React, TypeScript, and an unreasonable number of questions. © {new Date().getFullYear()}.
      </p>
    </footer>
  );
}
