export type BudgetRange = { value: string; label: string };

/**
 * Qualifying options for the contact form. These are the visitor's own budget
 * brackets, not Gidev prices.
 * TODO(confirm with Gidev): adjust the brackets (and currency) to match the
 * work you actually take on. Keep the last two options.
 */
export const budgetRanges: BudgetRange[] = [
  { value: "under-100k-kes", label: "Under KES 100,000" },
  { value: "100k-300k-kes", label: "KES 100,000 – 300,000" },
  { value: "300k-750k-kes", label: "KES 300,000 – 750,000" },
  { value: "over-750k-kes", label: "Over KES 750,000" },
  { value: "monthly-retainer", label: "Ongoing monthly support" },
  { value: "not-sure", label: "Not sure yet" },
];
