export type TrustReason = { title: string; body: string };

/**
 * Only things the site already states elsewhere (contact page, services,
 * process copy). Do not add claims about years, client counts or results
 * here until they can be backed up.
 */
export const trustReasons: TrustReason[] = [
  {
    title: "Scope and terms agreed before work starts",
    body: "Before work begins we agree the scope and commercial terms, whether that is a fixed project, a monthly retainer or a partnership. You know what you are getting before we write a line of code or design a page.",
  },
  {
    title: "A straight answer before you commit",
    body: "The free intro call and your first message get you a plain view on fit, timeline and cost, with no obligation.",
  },
  {
    title: "Designed around your audience",
    body: "We consider the devices, needs and constraints of the people who will use what we build, and test the important journeys against those requirements.",
  },
  {
    title: "Payments that match how customers pay",
    body: "We can connect supported payment providers to your commerce and business systems, so the checkout fits your customers and operations.",
  },
  {
    title: "Support after launch",
    body: "Maintenance and support is a service in its own right, so the site we hand over has a clear owner for planned updates, agreed content changes and small issues.",
  },
  {
    title: "One team across the whole digital experience",
    body: "Software, AI, search, brand design and marketing sit under one roof, so your product and the way it reaches people can work together.",
  },
];
