export const SpecialtyValues = [
    "cardiology",
    "physiotherapy",
    "nursing",
    "nutrition",
    "psychology",
] as const;

export type Specialty = (typeof SpecialtyValues)[number];

export function isSpecialty(input: string): input is Specialty {
    return SpecialtyValues.includes(input as Specialty);
}
