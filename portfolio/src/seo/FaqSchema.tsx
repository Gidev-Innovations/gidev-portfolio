import type { Faq } from "../data/faqs";
import JsonLd from "./JsonLd";
import { faqSchema } from "./schema";

export default function FaqSchema({ faqs }: { faqs: Faq[] }) {
  return <JsonLd data={faqSchema(faqs)} />;
}
