import { err, ok, type Result } from "neverthrow";

export const ProfessionalCouncilValues = [
    "CRM",     // Medicina
    "COREN",   // Enfermagem
    "CREFITO", // Fisioterapia e Terapia Ocupacional
    "CRN",     // Nutrição
    "CRP",     // Psicologia
] as const;

export type ProfessionalCouncil = (typeof ProfessionalCouncilValues)[number];

export type ProfessionalRegistrationError =
    | { kind: "empty_number" }
    | { kind: "empty_state" }
    | { kind: "invalid_state"; input: string };

export type ProfessionalRegistrationProps = {
    council: ProfessionalCouncil;
    number: string;
    state: string;
};

const BRAZILIAN_STATES = new Set([
    "AC","AL","AP","AM","BA","CE","DF","ES","GO",
    "MA","MT","MS","MG","PA","PB","PR","PE","PI",
    "RJ","RN","RS","RO","RR","SC","SP","SE","TO",
]);

export class ProfessionalRegistration {
    readonly #council: ProfessionalCouncil;
    readonly #number: string;
    readonly #state: string;

    private constructor(props: ProfessionalRegistrationProps) {
        this.#council = props.council;
        this.#number  = props.number;
        this.#state   = props.state;
    }

    static create(props: ProfessionalRegistrationProps): Result<ProfessionalRegistration, ProfessionalRegistrationError> {
        const number = props.number.trim();
        const state  = props.state.trim().toUpperCase();

        if (!number) return err({ kind: "empty_number" });
        if (!state)  return err({ kind: "empty_state" });
        if (!BRAZILIAN_STATES.has(state)) return err({ kind: "invalid_state", input: state });

        return ok(new ProfessionalRegistration({ council: props.council, number, state }));
    }

    static fromTrusted(props: ProfessionalRegistrationProps): ProfessionalRegistration {
        return new ProfessionalRegistration(props);
    }

    get council(): ProfessionalCouncil { return this.#council; }
    get number(): string               { return this.#number; }
    get state(): string                { return this.#state; }

    /** Ex: "CRM-SP 123456" */
    get formatted(): string {
        return `${this.#council}-${this.#state} ${this.#number}`;
    }

    equals(other: ProfessionalRegistration): boolean {
        return this.#council === other.#council &&
               this.#number  === other.#number  &&
               this.#state   === other.#state;
    }
}
