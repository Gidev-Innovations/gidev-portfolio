import { CreditCard, FileCheck2, PhoneCall, Sparkles, type LucideIcon } from "lucide-react";
import { BUSINESS } from "./site";

export type TrustFact = { id: string; label: string; icon: LucideIcon };

/** Facts already stated elsewhere on the site (services, FAQs, contact). Do not add claims here that are not. */
export const trustFacts: TrustFact[] = [
  { id: "payments", label: "Flexible payment integrations", icon: CreditCard },
  { id: "terms", label: "Scope and terms agreed before work starts", icon: FileCheck2 },
  { id: "ai", label: "Practical AI & automation", icon: Sparkles },
  { id: "call", label: `Free ${BUSINESS.callLength} intro call`, icon: PhoneCall },
];

export type ReviewProof = {
  /** Out of 5. */
  rating: number;
  count: number;
  /** Where the reviews live, e.g. "Google". */
  source: string;
  url?: string;
};

/**
 * TODO(confirm with Gidev): add a real aggregate rating and review count once
 * genuine reviews exist, e.g. { rating: 5, count: 12, source: "Google", url: "..." }.
 * The hero rating slot stays hidden while this is null.
 */
export const reviewProof = null as ReviewProof | null;
