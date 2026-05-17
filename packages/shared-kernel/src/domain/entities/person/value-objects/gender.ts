export const GenderValues = ["female", "male", "not_informed"] as const;

/**
 * Public gender values used by callers and exposed through IntelliSense.
 */
export type Gender = (typeof GenderValues)[number];

/**
 * Verifica se uma string é um valor válido de {@link Gender}.
 */
export function isGender(input: string): input is Gender {
    return GenderValues.includes(input as Gender);
}
