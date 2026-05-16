import { err, ok, type Result } from "neverthrow";

export type EmailError =
  | { kind: "empty_string" }
  | { kind: "malformed_unicode" }
  | { kind: "invalid_format"; input: string };

export class Email {
  public static readonly Regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;

  private constructor(public readonly value: string) {}

  static isValid(input: string): boolean {
    return Email.create(input).isOk();
  }

  static create(input: string): Result<Email, EmailError> {
    const normalized = input.trim().toLowerCase();

    if (!normalized) return err({ kind: "empty_string" });
    if (!normalized.isWellFormed()) return err({ kind: "malformed_unicode" });
    if (!Email.Regex.test(normalized)) return err({ kind: "invalid_format", input });

    return ok(new Email(normalized));
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}
