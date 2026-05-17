import { err, ok, type Result } from "neverthrow";

export type FullNameError =
    | { kind: "empty_string" }
    | { kind: "malformed_unicode" }
    | { kind: "too_short"; minimum: number }
    | { kind: "too_long"; maximum: number };

export class FullName {
    private static readonly MinLength = 2;
    private static readonly MaxLength = 255;

    readonly #value: string;

    private constructor(value: string) {
        this.#value = value;
    }

    static create(input: string): Result<FullName, FullNameError> {
        const normalized = input.trim().replace(/\s+/g, " ");
        if (!normalized) return err({ kind: "empty_string" });
        if (!normalized.isWellFormed()) return err({ kind: "malformed_unicode" });
        if (normalized.length < FullName.MinLength) return err({ kind: "too_short", minimum: FullName.MinLength });
        if (normalized.length > FullName.MaxLength) return err({ kind: "too_long", maximum: FullName.MaxLength });
        return ok(new FullName(normalized));
    }

    /** Para rehidratação do banco — o valor já foi validado anteriormente. */
    static fromTrusted(value: string): FullName {
        return new FullName(value);
    }

    get value(): string { return this.#value; }
    equals(other: FullName): boolean { return this.#value === other.#value; }
    toString(): string { return this.#value; }
    toJSON(): string { return this.#value; }
    [Symbol.toPrimitive](): string { return this.#value; }
}
