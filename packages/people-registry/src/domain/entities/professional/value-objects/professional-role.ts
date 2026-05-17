export const ProfessionalRoleValues = [
    "receptionist",
    "clinician",
    "clinical_manager",
    "admin",
] as const;

export type ProfessionalRole = (typeof ProfessionalRoleValues)[number];

export function isProfessionalRole(input: string): input is ProfessionalRole {
    return ProfessionalRoleValues.includes(input as ProfessionalRole);
}
