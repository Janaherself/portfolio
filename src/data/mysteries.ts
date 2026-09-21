export interface Mystery {
  id: string;
  note: string;
}

export const mysteries: Mystery[] = [
  {
    id: 'coffee-pot',
    note: 'Hope you brought some coffee. I\'m a HUGE fan ☕🪭',
  },
  {
    id: 'nav-logo',
    note: 'My browser had 26 tabs open at the time i wrote this (usually even more). This is what I call "fine R&D" 🤓',
  },
  {
    id: 'hero-terminal',
    note: 'A real internship side quest: I spotted a tiny issue that wasn\'t part of my task. I investigated anyway, learned a completely new concept, and fixed it. Basically, i saw it… and couldn\'t unsee it. 👀',
  },
  {
    id: 'skill-chip',
    note: 'A good API is a conversation between systems. I\'m a fan of both good conversations and systems that work ⛓',
  },
  {
    id: 'footer-mark',
    note: 'You clicked the dot! Of course you did!!! Tiny details are kind of my thing 🧐',
  },
];

export const MYSTERY_COUNT = mysteries.length;

export function getMystery(id: string): Mystery {
  const found = mysteries.find((mystery) => mystery.id === id);
  if (!found) {
    throw new Error(`Unknown mystery id: "${id}".`);
  }
  return found;
}
