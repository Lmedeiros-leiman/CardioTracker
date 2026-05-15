import { err, ok, type Result } from "neverthrow";
import { EntityId } from "../../../Shared/Abstractions/EntityId";

export type CpfError =
  | { kind: "empty_string" }
  | { kind: "malformed_unicode" }
  | { kind: "missing_mask"; input: string }
  | { kind: "invalid_format"; input: string }
  | { kind: "invalid_characters"; input: string };

export class Cpf extends EntityId<"Cpf"> {
  public static readonly Regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  public static isValid(input: string): boolean {
    return Cpf.create(input).isOk();
  }

  private constructor(input: string) {
    super(input);
  }

  // exibe formatado quando precisar
  get formatted(): string {
    const d = this.value;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }

  public static create(input: string): Result<Cpf, CpfError> {
    return ok(input)
      .andThen(Cpf.#checkNotEmpty)
      .andThen(Cpf.#checkUnicode)
      .andThen(Cpf.#checkFormat)
      .andThen(Cpf.#checkDigits)
      .map((input) => new Cpf(input));
  }

  static readonly #checkNotEmpty = (input: string): Result<string, CpfError> =>
    input.trim().length > 0 ? ok(input) : err({ kind: "empty_string" });

  static readonly #checkUnicode = (input: string): Result<string, CpfError> =>
    input.isWellFormed() ? ok(input) : err({ kind: "malformed_unicode" });

  static readonly #checkFormat = (input: string): Result<string, CpfError> => {
    if (/^\d+$/.test(input)) {
      return err({ kind: "missing_mask", input });
    }
    return Cpf.Regex.test(input)
      ? ok(input.replace(/\D/g, ""))
      : err({ kind: "invalid_format", input });
  };

  static readonly #checkDigits = (digits: string): Result<string, CpfError> => {
    if (/^(\d)\1{10}$/.test(digits)) {
      return err({ kind: "invalid_characters", input: digits });
    }
    if (!Cpf.#verifyDigit(digits, 9) || !Cpf.#verifyDigit(digits, 10)) {
      return err({ kind: "invalid_characters", input: digits });
    }
    return ok(digits);
  };

  static #verifyDigit(digits: string, position: number): boolean {
    const weight = position + 1;
    const sum = digits
      .slice(0, position)
      .split("")
      .reduce((acc, d, i) => acc + Number(d) * (weight - i), 0);

    const remainder = (sum * 10) % 11;
    const expected = remainder >= 10 ? 0 : remainder;
    return Number(digits[position]) === expected;
  }

  public equals(other: Cpf): boolean {
    return this.value === other.value;
  }

  public [Symbol.toPrimitive](): string {
    return this.value;
  }
}
