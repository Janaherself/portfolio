# Jana — Personal Portfolio

A single-page developer portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

- **React 19 + TypeScript** — components and typed content
- **Vite** — dev server and production build
- **Tailwind CSS v4** — styling, via `@tailwindcss/vite`
- **lucide-react** — icons (plus two local brand icons for GitHub/LinkedIn, see below)

No backend, no database, no paid services.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Editing your content

All the actual words on the site live in `src/data/`, separate from the components that render them:

| File | What it controls |
|---|---|
| `src/data/personal.ts` | Name, hero tagline, About paragraphs, social/contact links |
| `src/data/projects.ts` | Aqwa, Sorpresa, Innfinity — description, stack, links, status |
| `src/data/experience.ts` | Capital Placement, FTS, GSG entries |
| `src/data/skills.ts` | Skill groups and the "how I work" rules |

**To add your links:** open `src/data/personal.ts` and fill in the empty `url` fields in `socialLinks` (GitHub, LinkedIn, CV, email). Any link left blank is automatically hidden — you never end up with a dead button.

**To add a project's GitHub/live link:** open `src/data/projects.ts` and fill in `githubUrl` / `liveUrl` for that project. Leave either blank to hide just that button.

## Project structure

```
src/
  components/
    sections/       Hero, Projects, Experience, Skills, About (one file per section)
    sections/projects/  the three distinct project card layouts
    ui/             small reusable pieces (Section wrapper, ThemeToggle, CuriosityNote, icons)
  data/             typed content — see table above
  hooks/            useTheme (light/dark), useReducedMotion
```

## Theme system

Light/dark mode is handled by:

- An inline script in `index.html` that sets `data-theme` on `<html>` before React loads, so there's no flash of the wrong theme.
- `src/hooks/useTheme.tsx`, which persists the choice to `localStorage` (`jana-theme`) and falls back to the OS preference if nothing is saved.
- CSS custom properties in `src/index.css` (`--bg`, `--ink`, `--accent`, etc.) — both themes are hand-tuned, not a simple color inversion.

## Notes on accessibility

- Verified with an automated axe-core scan (0 violations) and manual checks: heading order (h1→h2→h3, no skips), full keyboard navigation with visible focus rings, a skip-to-content link, `prefers-reduced-motion` support, and no horizontal overflow from 320px up.
- Layout uses CSS logical properties (`ps-`, `start-`, `inset-inline-start`) in layout-critical spots (nav skip link, experience timeline) so the structure stays sound if the site is ever translated to a right-to-left language. One small decorative element (the "curiosity note" tooltip position) intentionally still uses a physical offset — see the comment in `src/components/ui/CuriosityNote.tsx` if you ever add Arabic content and want to revisit it.

## Deploying to Vercel (free Hobby plan)

This repo is a standard Vite static build, so Vercel needs almost no configuration — `vercel.json` is already in the repo with the right build command and output directory.

1. Push this project to a GitHub repository (see below if it isn't one yet).
2. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account — no credit card required for the Hobby plan.
3. Click **Add New → Project**, and select your portfolio repo.
4. Vercel will auto-detect it as a Vite project. Leave the defaults (`npm run build`, output directory `dist`).
5. Click **Deploy**. You'll get a free `your-project.vercel.app` URL a minute or two later.
6. Any future `git push` to your main branch redeploys automatically.

### If you haven't pushed to GitHub yet

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Alternative free hosts

If Vercel isn't available to you, this is a plain static build, so the same `dist/` output deploys unchanged to:

- **Cloudflare Pages** — build command `npm run build`, output directory `dist`.
- **Render Static Sites** — same build command and output directory.

No code changes are needed to switch.
