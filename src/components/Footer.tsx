import { personal } from '../data/personal';
import { MysteryTrigger } from './curiosity/MysteryTrigger';

export function Footer() {
  return (
    <footer
      className="border-t px-5 py-8 text-center text-xs sm:px-8"
      style={{ borderColor: 'var(--border)', color: 'var(--ink-faint)' }}
    >
      <p>
        Built by {personal.name} with React, TypeScript, and an unreasonable number of questions. ©{' '}
        {new Date().getFullYear()}
        <MysteryTrigger id="footer-mark" label="One more thing, if you read this far" align="end" className="ml-1">
          <span aria-hidden="true">.</span>
        </MysteryTrigger>
      </p>
    </footer>
  );
}
