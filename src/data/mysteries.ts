export interface Mystery {
  id: string;
  note: string;
  hint: string;
}

export const mysteries: Mystery[] = [
  {
    id: 'coffee-pot',
    note: 'Hope you brought some coffee. I\'m a HUGE fan ☕🪭',
    hint: "Further down, there's an empty cup. It isn't just for looking at.",
  },
  {
    id: 'nav-logo',
    note: 'My browser had 26 tabs open at the time i wrote this (usually even more). This is what I call "fine R&D" 🤓',
    hint: 'You have to click, click, click the coffee cup next to my name. Patience runs out after two seconds, though.',
  },
  {
    id: 'hero-terminal',
    note: 'A real internship side quest: I spotted a tiny issue that wasn\'t part of my task. I investigated anyway, learned a completely new concept, and fixed it. Basically, i saw it… and couldn\'t unsee it. 👀',
    hint: "Terminals like being clicked on.",
  },
  {
    id: 'skill-chip',
    note: 'A good API is a conversation between systems. I\'m a fan of both good conversations and systems that work ⛓',
    hint: "One of my skills has opinions about talking to servers. Go find the one about APIs.",
  },
  {
    id: 'footer-mark',
    note: 'You clicked the dot! Of course you did!!! Tiny details are kind of my thing 🧐',
    hint: 'If you make it all the way to the bottom of the page, look closely at the punctuation.',
  },
];

export const MYSTERY_HINT_ORDER = ['nav-logo', 'hero-terminal', 'skill-chip', 'coffee-pot', 'footer-mark'];

export const MYSTERY_COUNT = mysteries.length;

export function getMystery(id: string): Mystery {
  const found = mysteries.find((mystery) => mystery.id === id);
  if (!found) {
    throw new Error(`Unknown mystery id: "${id}".`);
  }
  return found;
}
