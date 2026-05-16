import { err, ok, type Result } from "neverthrow";

export type FullNameError =
  | { kind: "empty_string" }
  | { kind: "malformed_unicode" }
  | { kind: "too_short"; minimum: number }
  | { kind: "too_long"; maximum: number };

export class FullName {
  private static readonly MinLength = 2;
  private static readonly MaxLength = 160;

  private constructor(public readonly value: string) {}

  static create(input: string): Result<FullName, FullNameError> {
    const normalized = input.trim().replace(/\s+/g, " ");

    if (!normalized) return err({ kind: "empty_string" });
    if (!normalized.isWellFormed()) return err({ kind: "malformed_unicode" });
    if (normalized.length < FullName.MinLength) return err({ kind: "too_short", minimum: FullName.MinLength });
    if (normalized.length > FullName.MaxLength) return err({ kind: "too_long", maximum: FullName.MaxLength });

    return ok(new FullName(normalized));
  }

  equals(other: FullName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
