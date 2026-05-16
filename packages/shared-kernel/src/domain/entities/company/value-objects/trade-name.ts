import { err, ok, type Result } from "neverthrow";

export type TradeNameError =
  | { kind: "empty_string" }
  | { kind: "malformed_unicode" }
  | { kind: "too_short"; minimum: number }
  | { kind: "too_long"; maximum: number };

export class TradeName {
  private static readonly MinLength = 2;
  private static readonly MaxLength = 120;

  private constructor(public readonly value: string) {}

  static create(input: string): Result<TradeName, TradeNameError> {
    const normalized = input.trim().replace(/\s+/g, " ");

    if (!normalized) return err({ kind: "empty_string" });
    if (!normalized.isWellFormed()) return err({ kind: "malformed_unicode" });
    if (normalized.length < TradeName.MinLength) return err({ kind: "too_short", minimum: TradeName.MinLength });
    if (normalized.length > TradeName.MaxLength) return err({ kind: "too_long", maximum: TradeName.MaxLength });

    return ok(new TradeName(normalized));
  }

  equals(other: TradeName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
