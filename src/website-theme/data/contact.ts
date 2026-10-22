export const startingOptions = [
  {
    id: "new" as const,
    label: "Starting something new",
    hint: "A product, system, or app",
    chips: ["New product or MVP", "Business system", "Customer app", "New revenue channel"],
  },
  {
    id: "continuation" as const,
    label: "Something is holding us back",
    hint: "A rented tool, an old system, or manual work",
    chips: ["SaaS limits us", "Outdated system", "Team to take over", "Manual work"],
  },
];
