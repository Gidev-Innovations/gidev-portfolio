import type { ImageName } from "../data/images";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** One or two sentences, written or approved by the person. */
  bio: string;
  /** Portrait from `npm run images`. Falls back to initials when missing. */
  photo?: ImageName;
  photoAlt?: string;
  /** Public profile, e.g. LinkedIn or GitHub. */
  profileUrl?: string;
};

/**
 * TODO(confirm with Gidev): add real team members (with their consent), their
 * roles and a portrait each. The About page hides the team section while this
 * list is empty, so no placeholder people are ever shown.
 */
export const team: TeamMember[] = [];
