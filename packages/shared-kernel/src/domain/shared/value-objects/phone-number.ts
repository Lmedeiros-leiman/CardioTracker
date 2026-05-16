import { err, ok, type Result } from "neverthrow";

export type PhoneNumberError =
  | { kind: "empty_string" }
  | { kind: "invalid_format"; input: string };

export class PhoneNumber {
  public static readonly E164Regex = /^\+[1-9]\d{1,14}$/;

  private constructor(public readonly value: string) {}

  static create(input: string): Result<PhoneNumber, PhoneNumberError> {
    const normalized = input.replace(/[\s().-]/g, "");

    if (!normalized) return err({ kind: "empty_string" });
    if (!PhoneNumber.E164Regex.test(normalized)) return err({ kind: "invalid_format", input });

    return ok(new PhoneNumber(normalized));
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}
