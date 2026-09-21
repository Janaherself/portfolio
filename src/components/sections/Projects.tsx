import { projects } from '../../data/projects';
import { Section } from '../ui/Section';
import { AqwaCard } from './projects/AqwaCard';
import { SorpresaCard } from './projects/SorpresaCard';
import { InnfinityCard } from './projects/InnfinityCard';

const CARD_BY_SLUG: Record<string, typeof AqwaCard> = {
  aqwa: AqwaCard,
  sorpresa: SorpresaCard,
  innfinity: InnfinityCard,
};

export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Three problems I decided to solve myself"
      description="Personal projects, each one built to get better at a specific thing, a real workflow, a full-stack build, a properly-structured backend."
    >
      <div className="flex flex-col gap-8">
        {projects.map((project) => {
          const Card = CARD_BY_SLUG[project.slug];
          return <Card key={project.slug} project={project} />;
        })}
      </div>
    </Section>
  );
}
