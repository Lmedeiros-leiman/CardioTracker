export const ProgramEnrollmentStatusValues = [
  "pending",
  "active",
  "paused",
  "completed",
  "dropped",
  "cancelled",
] as const;

export type ProgramEnrollmentStatus = (typeof ProgramEnrollmentStatusValues)[number];

export function isProgramEnrollmentStatus(input: string): input is ProgramEnrollmentStatus {
  return ProgramEnrollmentStatusValues.includes(input as ProgramEnrollmentStatus);
}
