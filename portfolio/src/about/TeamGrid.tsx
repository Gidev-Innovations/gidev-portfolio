import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import ResponsiveImage from "../components/ResponsiveImage";
import { trackPointer } from "../lib/spotlight";
import { team, type TeamMember } from "../data/team";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div
      onPointerMove={trackPointer}
      className="spot spot-border group h-full rounded-3xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_20px_60px_rgba(20,20,19,0.08)] motion-reduce:transform-none"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-brand-light">
        {member.photo ? (
          <ResponsiveImage
            name={member.photo}
            alt={member.photoAlt ?? `Portrait of ${member.name}`}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl font-semibold text-brand-dark" aria-hidden="true">
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="px-2 pb-3 pt-4">
        <h3 className="text-lg font-semibold text-gray-950">{member.name}</h3>
        <p className="text-sm font-medium text-brand-dark">{member.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{member.bio}</p>
        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-dark underline underline-offset-4"
          >
            Profile <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> of {member.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}

/** Hidden until src/data/team.ts has real entries. */
export default function TeamGrid() {
  if (team.length === 0) return null;

  return (
    <section aria-labelledby="about-team-heading" className="mb-28">
      <Reveal className="mb-14 text-center">
        <div className="text-center">
          <Eyebrow>The team</Eyebrow>
        </div>
        <h2 id="about-team-heading" className="text-4xl font-semibold tracking-[-0.04em] text-gray-950 md:text-5xl">
          The people behind the work
        </h2>
      </Reveal>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, index) => (
          <Reveal as="li" key={member.id} delay={(index % 4) * 80}>
            <MemberCard member={member} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
