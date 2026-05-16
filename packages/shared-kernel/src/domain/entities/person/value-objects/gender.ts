export const GenderValues = ["female", "male", "non_binary", "not_informed"] as const;

/**
 * Public gender values used by callers and exposed through IntelliSense.
 */
export type Gender = (typeof GenderValues)[number];

const GenderCodeValues = ["F", "M", "NB", "NI"] as const;

/**
 * Compact gender values used internally for storage/comparison.
 */
export type GenderCode = (typeof GenderCodeValues)[number];

export function toGenderCode(gender: Gender): GenderCode {
  switch (gender) {
    case "female":
      return "F";
    case "male":
      return "M";
    case "non_binary":
      return "NB";
    case "not_informed":
      return "NI";
  }
}

export function toGender(code: GenderCode): Gender {
  switch (code) {
    case "F":
      return "female";
    case "M":
      return "male";
    case "NB":
      return "non_binary";
    case "NI":
      return "not_informed";
  }
}

export function isGender(input: string): input is Gender {
  return GenderValues.includes(input as Gender);
}

export function isGenderCode(input: string): input is GenderCode {
  return GenderCodeValues.includes(input as GenderCode);
}
