export const EncounterTypeValues = [
    "initial_assessment",
    "followup",
    "reassessment",
    "rehab_session",
    "discharge_assessment",
] as const;

export type EncounterType = (typeof EncounterTypeValues)[number];
