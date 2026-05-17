import { err, ok, type Result } from "neverthrow";

export type AddressError =
    | { kind: "empty_street" }
    | { kind: "empty_city" }
    | { kind: "empty_state" }
    | { kind: "empty_postal_code" }
    | { kind: "empty_country" };

export type AddressProps = {
    street: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export class Address {
    readonly #street: string;
    readonly #number: string | undefined;
    readonly #complement: string | undefined;
    readonly #neighborhood: string | undefined;
    readonly #city: string;
    readonly #state: string;
    readonly #postalCode: string;
    readonly #country: string;

    private constructor(props: AddressProps) {
        this.#street       = props.street;
        this.#number       = props.number;
        this.#complement   = props.complement;
        this.#neighborhood = props.neighborhood;
        this.#city         = props.city;
        this.#state        = props.state;
        this.#postalCode   = props.postalCode;
        this.#country      = props.country;
    }

    static create(props: AddressProps): Result<Address, AddressError> {
        const s = (v: string) => v.trim();
        const street     = s(props.street);
        const city       = s(props.city);
        const state      = s(props.state);
        const postalCode = s(props.postalCode);
        const country    = s(props.country);

        if (!street)     return err({ kind: "empty_street" });
        if (!city)       return err({ kind: "empty_city" });
        if (!state)      return err({ kind: "empty_state" });
        if (!postalCode) return err({ kind: "empty_postal_code" });
        if (!country)    return err({ kind: "empty_country" });

        return ok(new Address({
            street,
            city,
            state,
            postalCode,
            country,
            number:       props.number?.trim(),
            complement:   props.complement?.trim(),
            neighborhood: props.neighborhood?.trim(),
        }));
    }

    get street():       string           { return this.#street; }
    get number():       string | undefined { return this.#number; }
    get complement():   string | undefined { return this.#complement; }
    get neighborhood(): string | undefined { return this.#neighborhood; }
    get city():         string           { return this.#city; }
    get state():        string           { return this.#state; }
    get postalCode():   string           { return this.#postalCode; }
    get country():      string           { return this.#country; }

    equals(other: Address): boolean {
        return this.#postalCode === other.#postalCode &&
               this.#street     === other.#street     &&
               this.#number     === other.#number;
    }
}
