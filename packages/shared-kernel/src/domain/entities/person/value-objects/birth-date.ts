import { err, ok, type Result } from "neverthrow";

export type BirthDateError =
  | { kind: "invalid_date" }
  | { kind: "future_date" }
  | { kind: "implausible_age"; maximumAge: number };

export class BirthDate {
  private static readonly MaximumAge = 130;

  private constructor(public readonly value: Date) {}

  static create(input: Date): Result<BirthDate, BirthDateError> {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return err({ kind: "invalid_date" });

    const today = new Date();
    if (date > today) return err({ kind: "future_date" });

    const age = today.getFullYear() - date.getFullYear();
    if (age > BirthDate.MaximumAge) return err({ kind: "implausible_age", maximumAge: BirthDate.MaximumAge });

    return ok(new BirthDate(date));
  }

  get ageInYears(): number {
    const today = new Date();
    let age = today.getFullYear() - this.value.getFullYear();
    const monthDelta = today.getMonth() - this.value.getMonth();
    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < this.value.getDate())) age -= 1;
    return age;
  }

  equals(other: BirthDate): boolean {
    return this.value.toISOString() === other.value.toISOString();
  }
}
