import { err, ok, type Result } from "neverthrow";
import type { ContactAddress, ContactAddressError, FullName } from "@cardio-tracker/shared-kernel";

export type EmergencyContactError =
    | { kind: "empty_relation" }
    | { kind: "contact_address_error"; error: ContactAddressError };

export type EmergencyContactProps = {
    name: FullName;
    relation: string;
    contact: ContactAddress;
};

export class EmergencyContact {
    readonly #name: FullName;
    readonly #relation: string;
    readonly #contact: ContactAddress;

    private constructor(props: EmergencyContactProps) {
        this.#name     = props.name;
        this.#relation = props.relation;
        this.#contact  = props.contact;
    }

    static create(props: EmergencyContactProps): Result<EmergencyContact, EmergencyContactError> {
        if (!props.relation.trim()) return err({ kind: "empty_relation" });
        return ok(new EmergencyContact(props));
    }

    get name(): FullName      { return this.#name; }
    get relation(): string    { return this.#relation; }
    get contact(): ContactAddress { return this.#contact; }
}
