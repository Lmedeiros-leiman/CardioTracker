import { err, ok, type Result } from "neverthrow";

export type PhoneNumberError =
    | { kind: "empty_string" }
    | { kind: "invalid_format"; input: string };

export type PhoneNumberProps = {
    ddi?: string;
    ddd: string;
    local: string;
};

export class PhoneNumber {
    public static readonly E164Regex = /^\+[1-9]\d{1,14}$/;
    public static readonly DefaultDDI = "55";

    readonly #ddi: string;
    readonly #ddd: string;
    readonly #local: string;

    private constructor(ddi: string, ddd: string, local: string) {
        this.#ddi   = ddi;
        this.#ddd   = ddd;
        this.#local = local;
    }

    static create(props: PhoneNumberProps): Result<PhoneNumber, PhoneNumberError> {
        const ddi   = (props.ddi ?? PhoneNumber.DefaultDDI).trim();
        const ddd   = props.ddd.trim();
        const local = props.local.replace(/[\s().-]/g, "").trim();
        if (!ddd || !local) return err({ kind: "empty_string" });
        const e164 = `+${ddi}${ddd}${local}`;
        if (!PhoneNumber.E164Regex.test(e164)) return err({ kind: "invalid_format", input: e164 });
        return ok(new PhoneNumber(ddi, ddd, local));
    }

    /** Rehidratação do banco — o valor já foi validado anteriormente. */
    static fromTrusted(e164: string): PhoneNumber {
        const body  = e164.slice(1);
        const ddi   = body.startsWith("55") ? "55" : body.slice(0, 2);
        const ddd   = body.slice(ddi.length, ddi.length + 2);
        const local = body.slice(ddi.length + 2);
        return new PhoneNumber(ddi, ddd, local);
    }

    get ddi(): string   { return this.#ddi; }
    get ddd(): string   { return this.#ddd; }
    get local(): string { return this.#local; }
    get value(): string { return `+${this.#ddi}${this.#ddd}${this.#local}`; }

    get formatted(): string {
        if (this.#ddi === "55" && this.#local.length === 9) {
            return `+${this.#ddi} ${this.#ddd} ${this.#local.slice(0, 5)}-${this.#local.slice(5)}`;
        }
        return this.value;
    }

    equals(other: PhoneNumber): boolean { return this.value === other.value; }
    toString(): string { return this.value; }
    toJSON(): string { return this.value; }
    [Symbol.toPrimitive](): string { return this.value; }
}
