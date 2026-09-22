# ☕ Jana — Personal Portfolio

A single-page developer portfolio that asks "wait, why?" a few too many times, then goes and builds the answer.

No templated hero, no three identical project cards, no gradient soup — just a small, carefully-made corner of the internet built with React, TypeScript, and a genuine love of figuring out how things work.

There's also a small hidden game built into the site. More on that below — with a spoiler warning, because half the fun is not knowing.

---

## What's in here

- **A hero** that opens with a typed terminal log instead of "Hi, I'm Jana"
- **Three project case studies** — Aqwa, Sorpresa, Innfinity — each with its own visual identity instead of three identical cards
- **An experience timeline**, weighted by how much there is to say, not just chronology
- **A full light/dark theme**, hand-designed for both, not just one palette with the colors flipped
- **A tiny hidden curiosity game** scattered across the site — five things to find, and something waiting on the other side of finding all of them

## Built with

- **React 19 + TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **lucide-react** for icons

No backend, no database, no paid services, no heavy UI kit doing the design thinking on my behalf.

---

## 🕵️ The curiosity game

There are **5 small discoveries** hidden around this site — some obvious once you know to look, some genuinely sneaky. Keep an eye on the little counter in the header (✦ `0/5`) — it'll fill in as you find things, and it'll nudge you once, gently, in case you missed that this was a thing at all.

Find something, and it flies up to the counter like a coin pickup. Find all five, and something a little more celebratory happens — I promise it's worth the hunt.

<details>
<summary><strong>🚨 Spoiler alert — click only if you'd rather have the answer key than the fun</strong></summary>

Seriously, consider not clicking this. It's five things, it'll take you a couple of minutes, and finding them yourself is the entire point.

Still here? Fine. Here's where they are:

| # | Where to look |
|---|---|
| 1 | Somewhere in the "about" section, there's a coffee pot. It doesn't just sit there. |
| 2 | The logo in the header does more than take you back to the top — if you're persistent about it. |
| 3 | That terminal-style log near the top of the page isn't purely decorative. |
| 4 | One specific skill, among many listed, has more going on than the others. |
| 5 | Read all the way to the very last character of the page. |

</details>

---

## Want to fork this and make it yours?

Go for it. The whole point of keeping content separate from components was so someone else could do exactly this!!

Quick tour: clone it, `npm install`, `npm run dev` to see it locally. Every word on the site — your name, your projects, your experience, your links, even the hidden game's trivia — lives in `src/data/`, not scattered through the JSX, so swapping in your own story doesn't mean touching component code. Update everything in there, and it's yours. When you're ready, it deploys to Vercel's free tier in a few clicks — connect the repo, accept the defaults, done.

---

## Notes on craft

A few things I cared about that don't always make it into a portfolio README:

- **Accessible by default** — verified with an automated accessibility scan (zero violations, light and dark mode alike), full keyboard navigation with visible focus states, a skip-to-content link, and respect for reduced-motion preferences throughout.
- **No horizontal scrollbars, ever** — tested from a 320px-wide phone screen up to a full desktop.
- **RTL-ready structure** — the layout is built with logical CSS properties in the places that matter, so it wouldn't fall apart if this ever needed to run right-to-left.
- **Every animation is optional** — anyone with reduced-motion turned on gets the same information, just without the flourish.

---

Built by Jana, fueled by coffee, and mildly obsessed with asking "but why does it do that?" one more time than is strictly necessary.